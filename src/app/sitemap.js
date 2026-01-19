// app/sitemap.js
export const revalidate = 3600; // Automatically re-generate the sitemap every hour

export default async function sitemap() {
  const baseUrl = "https://travelinmakkah.com";

  try {
    // 1. Fetch all blogs from your backend API
    const response = await fetch("https://travelinmakkah-backend.vercel.app/api/blogs", {
      next: { revalidate: 3600 } 
    });
    const blogs = await response.json();

    // 2. Map the blogs to the sitemap format
    const blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/${blog.slug}`, // e.g., https://travelinmakkah.com/how-to-find-lost...
      lastModified: new Date(blog.updatedAt || blog.createdAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // 3. Return static pages + your automated blog pages
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...blogUrls,
    ];
  } catch (error) {
    console.error("Sitemap fetch failed:", error);
    return [{ url: baseUrl, lastModified: new Date() }]; // Fallback
  }
}