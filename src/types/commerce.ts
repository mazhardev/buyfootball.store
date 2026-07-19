export const currencies = ["USD", "EUR", "GBP", "CAD"] as const;
export type Currency = (typeof currencies)[number];

export const productCategories = ["match", "training", "futsal", "kids", "custom"] as const;
export type ProductCategory = (typeof productCategories)[number];
export type Construction = "Hand stitched" | "Machine stitched" | "Thermally bonded" | "Hybrid stitched";
export type Surface = "Natural grass" | "Artificial turf" | "Indoor court" | "Street & hard ground" | "Multi-surface";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  shortDescription: string;
  features: string[];
  constructionType: Construction;
  surfaceRecommendation: Surface[];
  sizeOptions: string[];
  colorOptions: string[];
  material: string;
  panelCount: number;
  bladderType: string;
  recommendedUse: string;
  skillLevel: string;
  weightRange: string;
  basePriceUsd: number;
  compareAtPriceUsd?: number;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  stockStatus: "In stock" | "Made to order" | "Sample only";
  minimumWholesaleQuantity: number;
  images: string[];
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  externalPaymentLink?: string;
  certificationLabel?: string;
  relatedProductIds: string[];
}

export interface CartItem {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  priceUsd: number;
  size: string;
  color: string;
  quantity: number;
}

export interface ProductFilters {
  query: string;
  categories: ProductCategory[];
  sizes: string[];
  maxPrice: number;
  constructions: Construction[];
  surfaces: Surface[];
}

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name-asc";
