// frontend/pages/offerDetail.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OfferDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [offer, setOffer] = useState(null);
  const [form, setForm] = useState({
    email: '',
    start_date: '',
    end_date: '',
    adults: 2,
    children: 0,
    message: '',
  });

  useEffect(() => {
    if (!id) return;
    api.get(`/offers/${id}`).then((res) => setOffer(res.data));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/requests', {
      ...form,
      offer_id: id,
      destination: offer.destination,
      category: offer.category,
      service_type: offer.service_type,
    });
    alert('Demande envoyée');
  }

  if (!offer) return null;

  return (
    <>
      <Header />
      <main>
        <h1>{offer.title}</h1>
        <p>{offer.description}</p>
        <p>Destination : {offer.destination}</p>
        <p>Prix : {offer.price} €</p>

        <h2>Demande de réservation</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          /><br />
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
            required
          /><br />
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
            required
          /><br />
          <input
            type="number"
            value={form.adults}
            min={1}
            onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
          /><br />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          /><br />
          <button type="submit">Envoyer</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
