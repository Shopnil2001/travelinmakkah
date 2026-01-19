import VisaDetailsClient from './VisaDetailsClient';

const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/visas`);
    const visas = await res.json();

    return visas.map((visa) => ({
      id: visa._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching visas for static params:', error);
    return [];
  }
}

export default function VisaDetailsPage({ params }) {
  return <VisaDetailsClient id={params.id} />;
}
