/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://infinityui.wabtech.tech",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/server-sitemap.xml", "/api/*", "/admin/*", "/dashboard/*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://infinityui.wabtech.tech/server-sitemap.xml",
      "https://infinityui.wabtech.tech/extra-sitemap.xml",
    ],
  },
};
