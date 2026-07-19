"use client";

import { Grid2X2, List, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { categoryLabels } from "@/data/products";
import { filterProducts, sortProducts } from "@/lib/commerce";
import type { Construction, Product, ProductCategory, ProductFilters, ProductSort, Surface } from "@/types/commerce";
import { productCategories } from "@/types/commerce";
import { ProductCard } from "@/components/products/product-card";

const constructions: Construction[] = ["Hand stitched", "Machine stitched", "Thermally bonded", "Hybrid stitched"];
const surfaces: Surface[] = ["Natural grass", "Artificial turf", "Indoor court", "Street & hard ground", "Multi-surface"];
const initialFilters: ProductFilters = { query: "", categories: [], sizes: [], maxPrice: 60, constructions: [], surfaces: [] };

export function ProductCatalogue({ products, initialCategory }: { products: Product[]; initialCategory?: ProductCategory }) {
  const [filters, setFilters] = useState<ProductFilters>({ ...initialFilters, categories: initialCategory ? [initialCategory] : [] });
  const [sort, setSort] = useState<ProductSort>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const results = useMemo(() => sortProducts(filterProducts(products, filters), sort), [products, filters, sort]);
  const toggle = <T extends string>(key: "categories" | "sizes" | "constructions" | "surfaces", value: T) => setFilters((current) => ({ ...current, [key]: current[key].includes(value as never) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  const filterPanel = <div className="filter-panel"><div className="filter-mobile-head"><strong>Filter products</strong><button className="icon-button" onClick={() => setShowFilters(false)} aria-label="Close filters"><X /></button></div>
    <fieldset><legend>Category</legend>{productCategories.map((category) => <label key={category}><input type="checkbox" checked={filters.categories.includes(category)} onChange={() => toggle("categories", category)} />{categoryLabels[category]}</label>)}</fieldset>
    <fieldset><legend>Size</legend>{["3", "4", "5", "Futsal"].map((size) => <label key={size}><input type="checkbox" checked={filters.sizes.includes(size)} onChange={() => toggle("sizes", size)} />Size {size}</label>)}</fieldset>
    <fieldset><legend>Maximum price <span>USD ${filters.maxPrice}</span></legend><input aria-label="Maximum price in USD" type="range" min="18" max="60" value={filters.maxPrice} onChange={(event) => setFilters((current) => ({ ...current, maxPrice: Number(event.target.value) }))} /></fieldset>
    <fieldset><legend>Construction</legend>{constructions.map((item) => <label key={item}><input type="checkbox" checked={filters.constructions.includes(item)} onChange={() => toggle("constructions", item)} />{item}</label>)}</fieldset>
    <fieldset><legend>Surface</legend>{surfaces.map((item) => <label key={item}><input type="checkbox" checked={filters.surfaces.includes(item)} onChange={() => toggle("surfaces", item)} />{item}</label>)}</fieldset>
    <button className="button secondary wide" onClick={() => setFilters({ ...initialFilters, categories: initialCategory ? [initialCategory] : [] })}>Clear filters</button></div>;
  return <section id="catalogue" className="catalogue-layout"><div className={`filter-column ${showFilters ? "open" : ""}`}>{showFilters && <button className="filter-overlay" aria-label="Close filters" onClick={() => setShowFilters(false)} />}{filterPanel}</div><div className="catalogue-results"><div className="catalogue-toolbar"><label className="catalogue-search"><Search /><span className="sr-only">Search products</span><input type="search" placeholder="Search footballs…" value={filters.query} onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))} /></label><div className="toolbar-actions"><button className="button small secondary mobile-filter-toggle" onClick={() => setShowFilters(true)}><SlidersHorizontal /> Filters</button><label><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value as ProductSort)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name-asc">Name: A–Z</option></select></label><div className="view-buttons"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 /></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="List view"><List /></button></div></div></div><div className="result-count" aria-live="polite">{results.length} {results.length === 1 ? "football" : "footballs"}</div>{results.length ? <div className={`product-grid ${view === "list" ? "list-view" : ""}`}>{results.map((product) => <ProductCard key={product.id} product={product} view={view} />)}</div> : <div className="empty-state bordered"><Search size={42} /><h2>No footballs match those filters</h2><p>Try a wider price range or clear one of the selected options.</p><button className="button primary" onClick={() => setFilters({ ...initialFilters, categories: initialCategory ? [initialCategory] : [] })}>Clear filters</button></div>}</div></section>;
}
