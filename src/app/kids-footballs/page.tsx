import { CategoryPage } from "@/components/products/category-page"; import { pageMetadata } from "@/config/page-metadata";
export const metadata = pageMetadata.kids; export default function Page() { return <CategoryPage category="kids" />; }
