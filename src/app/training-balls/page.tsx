import { CategoryPage } from "@/components/products/category-page"; import { pageMetadata } from "@/config/page-metadata";
export const metadata = pageMetadata.training; export default function Page() { return <CategoryPage category="training" />; }
