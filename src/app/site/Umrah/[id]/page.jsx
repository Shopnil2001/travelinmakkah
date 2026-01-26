import UmrahDetailsClient from './UmrahDetailsClient';

const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/packages?type=umrah`);
    const packages = await res.json();

    return packages.map((pkg) => ({
      id: pkg._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching Umrah packages for static params:', error);
    return [];
  }
}

export default async function UmrahDetailsPage({ params }) {
  const { id } = await params;
  return <UmrahDetailsClient id={id} />;
}
