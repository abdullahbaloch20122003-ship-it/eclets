export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  newArrival: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "ECLETS Black Shirt",
    slug: "eclets-black-shirt",
    price: 8999,
    category: "Shirts",
    description:
      "A refined contemporary shirt defined by clean lines, understated detailing and an effortless silhouette.",
    image: "/images/products/shirt-black.png",
    images: ["/images/products/shirt-black.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    featured: true,
    newArrival: true,
  },

  {
    id: 2,
    name: "ECLETS White Shirt",
    slug: "eclets-white-shirt",
    price: 8999,
    category: "Shirts",
    description:
      "A timeless white shirt reinterpreted through a modern ECLETS silhouette with a precise, minimal finish.",
    image: "/images/products/shirt-white.png",
    images: ["/images/products/shirt-white.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    featured: true,
    newArrival: true,
  },

  {
    id: 3,
    name: "Signature Trouser",
    slug: "signature-trouser",
    price: 10999,
    category: "Trousers",
    description:
      "A structured contemporary trouser designed with balanced proportions and a sophisticated everyday silhouette.",
    image: "/images/products/trouser.png",
    images: ["/images/products/trouser.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal"],
    featured: true,
    newArrival: true,
  },

  {
    id: 4,
    name: "Structured Shirt",
    slug: "structured-shirt",
    price: 9999,
    category: "Shirts",
    description:
      "A sharper interpretation of the modern shirt, built around structure, proportion and quiet confidence.",
    image: "/images/styles/bold.png",
    images: ["/images/styles/bold.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    featured: true,
    newArrival: true,
  },

  {
    id: 5,
    name: "Essential Shirt",
    slug: "essential-shirt",
    price: 8999,
    category: "Shirts",
    description:
      "The essential ECLETS shirt — minimal, versatile and designed to become part of your everyday uniform.",
    image: "/images/styles/minimal.png",
    images: ["/images/styles/minimal.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    featured: false,
    newArrival: true,
  },

  {
    id: 6,
    name: "ECLETS Overshirt",
    slug: "eclets-overshirt",
    price: 12999,
    category: "Overshirts",
    description:
      "A contemporary overshirt combining architectural structure with relaxed everyday wearability.",
    image: "/images/styles/sharp.png",
    images: ["/images/styles/sharp.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal"],
    featured: false,
    newArrival: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getNewArrivals() {
  return products.filter((product) => product.newArrival);
}