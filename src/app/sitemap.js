// app/sitemap.js
export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://travelinmakkah.com";

  try {
    const response = await fetch("https://travelinmakkah-backend.vercel.app/api/blogs", {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error("Failed to fetch blogs");
    const blogs = await response.json();

    const blogUrls = blogs.map((blog) => {
      // SAFE DATE CHECK:
      // If blog.updatedAt is null/invalid, use current date
      const rawDate = blog.updatedAt || blog.createdAt;
      const parsedDate = new Date(rawDate);
      const finalDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

      return {
        url: `${baseUrl}/${blog.slug}`,
        lastModified: finalDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    });

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
    console.error("Sitemap automation error:", error);
    // Fallback so the build doesn't fail
    return [{ url: baseUrl, lastModified: new Date() }];
  }
}