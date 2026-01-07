import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "../../lib/api";

type Offer = {
  id: number;
  title: string;
  description?: string | null;
  destination: string;
  price: string | number;
  category: string;
  service_type: string;
};

type RequestPayload = {
  email: string;
  destination: string;
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  category: string;
  service_type: string;
  message?: string;
};

export default function OfferDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState<RequestPayload>({
    email: "",
    destination: "",
    start_date: "",
    end_date: "",
    adults: 2,
    children: 0,
    category: "",
    service_type: "",
    message: "",
  });

  const [submitState, setSubmitState] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError("");
    setSubmitState({ type: "idle", message: "" });

    api
      .get(`/api/offers/${id}`)
      .then((res) => {
        const o: Offer = res.data;
        setOffer(o);

        // Pré-remplissage intelligent côté offre
        setForm((prev) => ({
          ...prev,
          destination: o.destination,
          category: o.category,
          service_type: o.service_type,
        }));
      })
      .catch(() => setError("Impossible de charger cette offre."))
      .finally(() => setLoading(false));
  }, [id]);

  function update<K extends keyof RequestPayload>(key: K, value: RequestPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState({ type: "idle", message: "" });

    // Validations minimales front (le back valide aussi)
    if (!form.email.trim()) {
      return setSubmitState({ type: "error", message: "Veuillez renseigner votre email." });
    }
    if (!form.start_date || !form.end_date) {
      return setSubmitState({ type: "error", message: "Veuillez renseigner les dates de séjour." });
    }
    if (form.adults < 1) {
      return setSubmitState({ type: "error", message: "Le nombre d’adultes doit être au moins 1." });
    }

    try {
      await api.post("/api/requests", form);
      setSubmitState({ type: "success", message: "Votre demande a bien été envoyée." });

      // Optionnel: reset partiel
      setForm((prev) => ({
        ...prev,
        start_date: "",
        end_date: "",
        adults: 2,
        children: 0,
        message: "",
      }));
    } catch (err: any) {
      setSubmitState({
        type: "error",
        message: "Erreur lors de l’envoi. Vérifiez les champs et réessayez.",
      });
    }
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <header className="mb-6">
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          ← Retour aux offres
        </Link>
      </header>

      {loading && <p>Chargement…</p>}

      {!loading && error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      {!loading && offer && (
        <>
          {/* Bloc offre */}
          <div className="rounded-2xl border p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">{offer.title}</h1>
                <p className="mt-1 text-gray-700">{offer.destination}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {offer.category} • {offer.service_type}
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <div className="rounded-xl bg-gray-50 px-4 py-3 text-right">
                  <p className="text-sm text-gray-600">À partir de</p>
                  <p className="text-2xl font-semibold">{offer.price} €</p>
                </div>
              </div>
            </div>

            {offer.description && (
              <>
                <hr className="my-6" />
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="mt-2 text-gray-700">{offer.description}</p>
              </>
            )}
          </div>

          {/* Formulaire demande */}
          <section className="mt-8 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Faire une demande</h2>
            <p className="mt-1 text-gray-600">
              Remplissez le formulaire ci-dessous, nous reviendrons vers vous rapidement.
            </p>

            <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="ex: manel@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Date de début</label>
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  type="date"
                  value={form.start_date}
                  onChange={(e) => update("start_date", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Date de fin</label>
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  type="date"
                  value={form.end_date}
                  onChange={(e) => update("end_date", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Adultes</label>
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  type="number"
                  min={1}
                  value={form.adults}
                  onChange={(e) => update("adults", Number(e.target.value))}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Enfants</label>
                <input
                  className="w-full rounded-lg border px-3 py-2"
                  type="number"
                  min={0}
                  value={form.children}
                  onChange={(e) => update("children", Number(e.target.value))}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                  className="w-full rounded-lg border px-3 py-2"
                  rows={4}
                  placeholder="Précisez vos attentes (hébergement, budget, contraintes…)…"
                  value={form.message || ""}
                  onChange={(e) => update("message", e.target.value)}
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
                >
                  Envoyer la demande
                </button>

                {submitState.type !== "idle" && (
                  <p
                    className={
                      submitState.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  >
                    {submitState.message}
                  </p>
                )}
              </div>
            </form>

            {/* Infos (pré-remplies, non éditables) */}
            <div className="mt-6 text-sm text-gray-600">
              <p>
                <span className="font-medium">Destination :</span> {form.destination}
              </p>
              <p>
                <span className="font-medium">Catégorie :</span> {form.category}
              </p>
              <p>
                <span className="font-medium">Service :</span> {form.service_type}
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
