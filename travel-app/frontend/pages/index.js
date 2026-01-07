// frontend/pages/index.js
import { useEffect, useState } from 'react';
import api from '../utils/api';
import OfferCard from '../components/OfferCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    api.get('/offers').then((res) => setOffers(res.data)).catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1>Offres de voyage</h1>
        {offers.map((o) => (
          <OfferCard key={o.id} offer={o} />
        ))}
      </main>
      <Footer />
    </>
  );
}
