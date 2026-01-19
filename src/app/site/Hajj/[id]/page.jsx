import HajjDetailsClient from './HajjDetailsClient';

const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/packages?type=hajj`);
    const packages = await res.json();

    return packages.map((pkg) => ({
      id: pkg._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching Hajj packages for static params:', error);
    return [];
  }
}

export default function HajjDetailsPage({ params }) {
  return <HajjDetailsClient id={params.id} />;
}
