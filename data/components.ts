export const componentsData = [
  {
    id: "1",
    name: "Navbar",
    slug: "navbar",
    category: "navbars",
    componentPath: "infinity-ui/navbars/navbar",
  },
  {
    id: "2",
    name: "Footer",
    slug: "footer",
    category: "footers",
    componentPath: "infinity-ui/footers/footer",
  },
  {
    id: "3",
    name: "Hero",
    slug: "hero",
    category: "heros",
    componentPath: "infinity-ui/heros/hero",
  },
];

export type Component = (typeof componentsData)[number];
