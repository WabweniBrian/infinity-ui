/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://infinityui.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml", "/api/*", "/admin/*", "/dashboard/*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://infinityui.vercel.app/server-sitemap.xml",
      "https://infinityui.vercel.app/extra-sitemap.xml",
    ],
  },
};
