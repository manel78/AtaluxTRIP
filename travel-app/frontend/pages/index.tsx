import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../lib/api";

type Offer = {
  id: number;
  title: string;
  destination: string;
  price: number;
  category: string;
  service_type: string;
};

export default function Home() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/offers")
      .then((res) => setOffers(res.data))
      .catch(() => setError("Impossible de charger les offres."));
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">AtaluxTrip</h1>
        <p className="text-gray-600">Offres disponibles</p>
      </header>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-3">
        {offers.map((o) => (
          <Link
            key={o.id}
            href={`/offers/${o.id}`}
            className="rounded-xl border p-4 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{o.title}</h2>
              <span className="font-medium">{o.price} €</span>
            </div>
            <p className="text-gray-700">{o.destination}</p>
            <p className="text-sm text-gray-500">
              {o.category} / {o.service_type}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
