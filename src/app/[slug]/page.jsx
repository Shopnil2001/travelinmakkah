import { notFound } from 'next/navigation';
import BlogDetailsClient from './BlogDetailsClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://travelinmakkah-backend.vercel.app/api';

// List of reserved paths that should NOT be handled by this dynamic route
const RESERVED_PATHS = [
  'admin',
  'site',
  'api',
  '_next',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml',
  'manifest.json',
];

// Validate if a slug is a valid blog slug (not a reserved path or internal route)
function isValidBlogSlug(slug) {
  // Must be a non-empty string
  if (!slug || typeof slug !== 'string') {
    return false;
  }

  // Reject reserved paths
  if (RESERVED_PATHS.includes(slug.toLowerCase())) {
    return false;
  }

  // Reject if starts with underscore (Next.js internal)
  if (slug.startsWith('_')) {
    return false;
  }

  // Reject pure numbers (likely old ID-based URLs)
  if (/^\d+$/.test(slug)) {
    return false;
  }

  // Reject if contains file extension (except trailing slash which is OK)
  if (/\.[a-zA-Z0-9]+$/.test(slug)) {
    return false;
  }

  // Valid blog slugs contain only lowercase letters, numbers, and hyphens
  // and should have at least one letter
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return false;
  }

  return true;
}

// Generate static params for all blog slugs
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error('Failed to fetch blogs for static params');
      return [];
    }

    const blogs = await res.json();

    // Only return blogs that have valid slugs
    return blogs
      .filter(blog => blog.slug && isValidBlogSlug(blog.slug))
      .map(blog => ({
        slug: blog.slug,
      }));
  } catch (error) {
    console.error('Error fetching blogs for static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (!isValidBlogSlug(slug)) {
    return {
      title: 'Not Found',
    };
  }

  try {
    const blog = await getBlog(slug);

    if (!blog) {
      return {
        title: 'Blog Not Found | Travel in Makkah',
      };
    }

    return {
      title: `${blog.title} | Travel in Makkah`,
      description: blog.summary || blog.title,
      openGraph: {
        title: blog.title,
        description: blog.summary || blog.title,
        images: blog.image ? [blog.image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Blog | Travel in Makkah',
    };
  }
}

// Fetch blog data by slug
async function getBlog(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/slug/${encodeURIComponent(slug)}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Main page component
export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  // Validate slug - if not valid, return 404
  if (!isValidBlogSlug(slug)) {
    notFound();
  }

  // Fetch blog data
  const blog = await getBlog(slug);

  // If blog not found, return 404
  if (!blog) {
    notFound();
  }

  return <BlogDetailsClient blog={blog} />;
}
