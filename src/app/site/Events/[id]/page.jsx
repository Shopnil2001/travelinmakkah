import EventBookingClient from './EventBookingClient';

const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/events`);
    const events = await res.json();

    return events.map((event) => ({
      id: event._id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching events for static params:', error);
    return [];
  }
}

export default async function EventBookingPage({ params }) {
  const { id } = await params;
  return <EventBookingClient id={id} />;
}
