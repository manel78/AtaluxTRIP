// frontend/components/OfferCard.js
import Link from 'next/link';

export default function OfferCard({ offer }) {
  return (
    <article>
      <h2>{offer.title}</h2>
      <p>{offer.destination}</p>
      <p>{offer.price} €</p>
      <Link href={`/offerDetail?id=${offer.id}`}>Voir les détails</Link>
    </article>
  );
}
