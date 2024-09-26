/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://infinityui-ug.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml", "/api/*", "/admin/*", "/dashboard/*"],
};
