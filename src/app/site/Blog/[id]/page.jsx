import { redirect } from 'next/navigation';

const API_BASE_URL = 'https://travelinmakkah-backend.vercel.app/api';

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`);
    const blogs = await res.json();

    // Return an array of objects with the id parameter
    return blogs.map((blog) => ({
      id: blog._id || blog.id,
    }));
  } catch (error) {
    console.error('Error fetching blogs for static params:', error);
    // Return empty array if API fails - pages will be generated on-demand
    return [];
  }
}

// Fetch blog data at build time
async function getBlog(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      cache: 'force-cache'
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Redirect old /site/Blog/:id URLs to new /:slug URLs
export default async function BlogDetails({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (blog && blog.slug) {
    // Redirect to the new root-level slug-based URL
    redirect(`/${blog.slug}/`);
  }

  // If blog not found or no slug, redirect to blog listing
  redirect('/site/Blog/');
}
