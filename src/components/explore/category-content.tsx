"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Search,
	ShoppingBag,
	User,
	Heart,
	Filter,
	ChevronLeft,
	Star,
	Clock,
} from "lucide-react";
import { generateSlug } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LoginModal } from "../shared/login-modal";
import { MobileNav } from "../shared/mobile-nav";
import { ProductCard } from "../shared/product-card";
import { StoreProductCard } from "../shared/store-product-card";
import { useCategoryStore } from "@/stores/categoryStore";

export function CategoryContent() {
	const pathname = usePathname();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [viewMode, setViewMode] = useState<"stores" | "products">("stores");

	const {
		category,
		categorySlug,
		stores,
		storesWithProducts,
		loading,
		setCategorySlug,
		fetchCategoryData,
	} = useCategoryStore();

	// Extraer slug de la URL
	useEffect(() => {
		if (pathname) {
			const parts = pathname.split("/");
			if (parts.length >= 3) {
				const extractedCategorySlug = parts[2];
				setCategorySlug(extractedCategorySlug);
			}
		}
	}, [pathname, setCategorySlug]);

	// Cargar datos de categoría al cambiar el slug
	useEffect(() => {
		if (categorySlug) {
			fetchCategoryData(categorySlug);
		}
	}, [categorySlug, fetchCategoryData]);

	const handleAddToCart = () => {
		setShowLoginModal(true);
	};

	const getCategoryDisplayName = () => {
		if (category) return category.name;
		if (!categorySlug) return "Categoría";

		const name = categorySlug.replace(/-/g, " ");
		return name.charAt(0).toUpperCase() + name.slice(1);
	};

	if (!categorySlug) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center">
				<ShoppingBag className="h-12 w-12 text-rose-500 animate-pulse" />
				<h2 className="mt-4 text-xl font-semibold">Cargando categoría...</h2>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className=" flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<Link href="/explore" className="flex items-center">
							<ChevronLeft className="h-5 w-5" />
							<span className="sr-only">Volver</span>
						</Link>
						<h1 className="text-lg font-bold">{getCategoryDisplayName()}</h1>
					</div>

					<div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Buscar..."
								className="w-full bg-background pl-8 rounded-full"
							/>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setShowFilters(!showFilters)}
						>
							<Search className="h-5 w-5" />
						</Button>
						<Link href="/explore/favorites" className="hidden md:flex">
							<Button variant="ghost" size="icon">
								<Heart className="h-5 w-5" />
							</Button>
						</Link>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowLoginModal(true)}
						>
							<User className="h-5 w-5" />
						</Button>
					</div>
				</div>
				{showFilters && (
					<div className=" py-2 md:hidden">
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Buscar..."
								className="w-full bg-background pl-8 rounded-full"
							/>
						</div>
					</div>
				)}
			</header>

			<main className="flex-1 pb-16 md:pb-0">
				<div className=" px-4 py-4 md:px-6 md:py-6">
					<div className="flex items-center justify-between mb-6">
						<h1 className="text-2xl font-bold">{getCategoryDisplayName()}</h1>
						<div className="flex items-center gap-2">
							<div className="flex rounded-lg border p-1">
								<Button
									variant={viewMode === "stores" ? "secondary" : "ghost"}
									size="sm"
									onClick={() => setViewMode("stores")}
									className="rounded-md"
								>
									Tiendas
								</Button>
								<Button
									variant={viewMode === "products" ? "secondary" : "ghost"}
									size="sm"
									onClick={() => setViewMode("products")}
									className="rounded-md"
								>
									Productos
								</Button>
							</div>
							<Button variant="outline" size="sm" className="gap-2">
								<Filter className="h-4 w-4" />
								Filtros
							</Button>
						</div>
					</div>

					{loading ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{Array(4)
								.fill(0)
								.map((_, i) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={i}
										className="h-64 animate-pulse rounded-lg bg-muted"
									/>
								))}
						</div>
					) : viewMode === "stores" ? (
						stores.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{stores.map((store) => (
									<ProductCard
										key={store.id}
										name={store.name}
										image={
											store.cover_image_url ||
											"/placeholder.svg?height=160&width=320"
										}
										description={store.description || ""}
										price={
											store.minimum_order ? `$${store.minimum_order}` : "$"
										}
										rating={store.rating || 0}
										deliveryTime={store.delivery_time || "30-45 min"}
										href={`/explore/${categorySlug}/${generateSlug(store.name)}`}
										onAddToCart={handleAddToCart}
										storeId={store.id}
									/>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
								<h2 className="mt-4 text-xl font-semibold">
									No hay tiendas disponibles
								</h2>
								<p className="mt-2 text-muted-foreground">
									No se encontraron tiendas en esta categoría. Por favor,
									intenta con otra categoría.
								</p>
								<Button className="mt-6" variant="outline" asChild>
									<Link href="/explore">Volver a explorar</Link>
								</Button>
							</div>
						)
					) : // Vista de productos agrupados por tienda
					storesWithProducts.length > 0 ? (
						<div className="space-y-8">
							{storesWithProducts.map((storeWithProducts) => (
								<div key={storeWithProducts.store.id} className="space-y-4">
									<div className="flex items-center justify-between">
										<Link
											href={`/explore/${categorySlug}/${generateSlug(storeWithProducts.store.name)}`}
											className="group"
										>
											<div className="flex items-center gap-3">
												<div className="relative h-12 w-12 overflow-hidden rounded-full border">
													<Image
														src={
															storeWithProducts.store.logo_url ||
															"/placeholder.svg?height=48&width=48"
														}
														alt={storeWithProducts.store.name}
														fill
														className="object-cover"
													/>
												</div>
												<div>
													<h3 className="font-medium group-hover:text-rose-500 transition-colors">
														{storeWithProducts.store.name}
													</h3>
													<div className="flex items-center gap-3 text-sm text-muted-foreground">
														<div className="flex items-center">
															<Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
															<span>{storeWithProducts.store.rating}</span>
														</div>
														<div className="flex items-center">
															<Clock className="h-3 w-3 mr-1" />
															<span>
																{storeWithProducts.store.delivery_time}
															</span>
														</div>
													</div>
												</div>
											</div>
										</Link>
										<Link
											href={`/explore/${categorySlug}/${generateSlug(storeWithProducts.store.name)}`}
											className="text-sm text-rose-500 font-medium hover:underline"
										>
											Ver más
										</Link>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{storeWithProducts.products.map((product) => (
											<StoreProductCard
												key={product.id}
												name={product.name}
												image={
													product.image_url ||
													"/placeholder.svg?height=120&width=120"
												}
												description={product.description || ""}
												price={product.sale_price || product.price}
												originalPrice={
													product.sale_price ? product.price : undefined
												}
												onAddToCart={handleAddToCart}
												productId={product.id}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
							<h2 className="mt-4 text-xl font-semibold">
								No hay productos disponibles
							</h2>
							<p className="mt-2 text-muted-foreground">
								No se encontraron productos en esta categoría. Por favor,
								intenta con otra categoría.
							</p>
							<Button className="mt-6" variant="outline" asChild>
								<Link href="/explore">Volver a explorar</Link>
							</Button>
						</div>
					)}
				</div>
			</main>

			<MobileNav />
			<LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
		</div>
	);
}
