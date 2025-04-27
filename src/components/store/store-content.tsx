"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	ShoppingBag,
	ChevronLeft,
	Star,
	Clock,
	Heart,
	Info,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/utils";
import type { Store, Product, ProductCategory } from "@/lib/types";
import { usePathname } from "next/navigation";
import { LoginModal } from "../shared/login-modal";
import { MobileNav } from "../shared/mobile-nav";
import { StoreProductCard } from "../shared/store-product-card";

export function StoreContent() {
	const pathname = usePathname();
	const [categorySlug, setCategorySlug] = useState<string>("");
	const [storeSlug, setStoreSlug] = useState<string>("");
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [store, setStore] = useState<Store | null>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const [productCategories, setProductCategories] = useState<ProductCategory[]>(
		[],
	);
	const [loading, setLoading] = useState(true);

	// Extraer los slugs de categoría y tienda de la URL
	useEffect(() => {
		if (pathname) {
			// La URL será algo como /explore/categoria/tienda
			const parts = pathname.split("/");
			if (parts.length >= 4) {
				const extractedCategorySlug = parts[2];
				const extractedStoreSlug = parts[3];
				console.log(
					"Extracted from URL - Category:",
					extractedCategorySlug,
					"Store:",
					extractedStoreSlug,
				);
				setCategorySlug(extractedCategorySlug);
				setStoreSlug(extractedStoreSlug);
			}
		}
	}, [pathname]);

	useEffect(() => {
		async function fetchStoreData() {
			try {
				// Si no tenemos los slugs necesarios, no hacer nada
				if (!categorySlug || !storeSlug) {
					return;
				}

				setLoading(true);
				console.log(
					"Fetching data for store:",
					storeSlug,
					"in category:",
					categorySlug,
				);

				// Primero intentamos buscar todas las tiendas
				const { data: allStores, error: storesError } = await supabase
					.from("stores")
					.select("*");

				if (storesError) throw storesError;

				// Encontrar la tienda que coincide con el slug
				const matchingStore = allStores?.find((store) => {
					const generatedSlug = generateSlug(store.name);
					return generatedSlug === storeSlug;
				});

				if (matchingStore) {
					console.log("Found matching store:", matchingStore.name);
					setStore(matchingStore);

					// Fetch product categories for this store
					const { data: categoriesData, error: categoriesError } =
						await supabase
							.from("product_categories")
							.select("*")
							.eq("store_id", matchingStore.id)
							.order("name");

					if (categoriesError) throw categoriesError;
					setProductCategories(categoriesData || []);

					// Fetch products for this store
					const { data: productsData, error: productsError } = await supabase
						.from("products")
						.select(`
              id, store_id, name, description, price, sale_price, image_url, 
              is_featured, is_active, stock, created_at, updated_at,
              product_to_category(category_id)
            `)
						.eq("store_id", matchingStore.id)
						.eq("is_active", true)
						.order("is_featured", { ascending: false });

					if (productsError) throw productsError;
					setProducts(
						(productsData || []).map((product) => ({
							...product,
							product_to_category: (product.product_to_category || []).map(
								(category) => ({
									...category,
									product_id: product.id, // Add missing product_id
								}),
							),
						})) as Product[],
					);
				} else {
					console.error("Tienda no encontrada:", storeSlug);
					// Aquí podrías redirigir a una página 404 o mostrar un mensaje
				}
			} catch (error) {
				console.error("Error fetching store data:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchStoreData();
	}, [categorySlug, storeSlug]);

	const handleAddToCart = () => {
		setShowLoginModal(true);
	};

	// Group products by category
	const getProductsByCategory = (categoryId: string) => {
		return products.filter((product) => {
			// Verificar si el producto tiene la relación con esta categoría
			if (!product.product_to_category) return false;

			return product.product_to_category.some(
				(relation) => relation.category_id === categoryId,
			);
		});
	};

	// Get featured products
	const featuredProducts = products.filter((product) => product.is_featured);

	// Get products with sale price
	const saleProducts = products.filter(
		(product) => product.sale_price !== null,
	);

	// Si no tenemos los slugs necesarios, mostrar un mensaje de carga
	if (!categorySlug || !storeSlug) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center">
				<ShoppingBag className="h-12 w-12 text-rose-500 animate-pulse" />
				<h2 className="mt-4 text-xl font-semibold">Cargando tienda...</h2>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className=" flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<Link
							href={`/explore/${categorySlug}`}
							className="flex items-center"
						>
							<ChevronLeft className="h-5 w-5" />
							<span className="sr-only">Volver</span>
						</Link>
						<h1 className="text-lg font-bold">
							{store?.name || "Cargando..."}
						</h1>
					</div>

					<div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Buscar en esta tienda..."
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
						<Button variant="ghost" size="icon">
							<Heart className="h-5 w-5" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowLoginModal(true)}
						>
							<ShoppingBag className="h-5 w-5" />
						</Button>
					</div>
				</div>
				{showFilters && (
					<div className=" py-2 md:hidden">
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Buscar en esta tienda..."
								className="w-full bg-background pl-8 rounded-full"
							/>
						</div>
					</div>
				)}
			</header>

			<div className="relative h-40 md:h-64 w-full">
				<Image
					src={
						store?.cover_image_url || "/placeholder.svg?height=300&width=1200"
					}
					alt={store?.name || "Tienda"}
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
				<div className="absolute bottom-0 left-0 p-4 text-white">
					<h1 className="text-2xl md:text-3xl font-bold">{store?.name}</h1>
					<div className="flex items-center gap-4 mt-2">
						<div className="flex items-center">
							<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
							<span className="ml-1 text-sm">
								{store?.rating} (200+ reseñas)
							</span>
						</div>
						<div className="flex items-center">
							<Clock className="h-4 w-4" />
							<span className="ml-1 text-sm">{store?.delivery_time}</span>
						</div>
					</div>
				</div>
			</div>

			<main className="flex-1 pb-16 md:pb-0">
				<div className=" px-4 py-4 md:px-6 md:py-6">
					<div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
						<Badge variant="outline" className="rounded-full py-1 px-3">
							Destacados
						</Badge>
						<Badge variant="outline" className="rounded-full py-1 px-3">
							Promociones
						</Badge>
						{productCategories.map((category) => (
							<Badge
								key={category.id}
								variant="outline"
								className="rounded-full py-1 px-3"
							>
								{category.name}
							</Badge>
						))}
					</div>

					<Tabs defaultValue="menu" className="w-full">
						<TabsList className="grid w-full grid-cols-3 h-auto">
							<TabsTrigger value="menu" className="py-2">
								Menú
							</TabsTrigger>
							<TabsTrigger value="info" className="py-2">
								Información
							</TabsTrigger>
							<TabsTrigger value="reviews" className="py-2">
								Reseñas
							</TabsTrigger>
						</TabsList>
						<TabsContent value="menu" className="mt-4">
							<div className="space-y-8">
								{featuredProducts.length > 0 && (
									<section>
										<h2 className="text-xl font-bold mb-4">Más populares</h2>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{featuredProducts.map((product) => (
												<StoreProductCard
													key={product.id}
													name={product.name}
													image={
														product.image_url ||
														"/placeholder.svg?height=120&width=120"
													}
													description={product.description || ""}
													price={product.price}
													originalPrice={product.sale_price || undefined}
													onAddToCart={handleAddToCart}
													productId={product.id}
												/>
											))}
										</div>
									</section>
								)}

								{saleProducts.length > 0 && (
									<section>
										<h2 className="text-xl font-bold mb-4">Promociones</h2>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{saleProducts.map((product) => (
												<StoreProductCard
													key={product.id}
													name={product.name}
													image={
														product.image_url ||
														"/placeholder.svg?height=120&width=120"
													}
													description={product.description || ""}
													price={product.sale_price || product.price}
													originalPrice={product.price}
													onAddToCart={handleAddToCart}
													productId={product.id}
												/>
											))}
										</div>
									</section>
								)}

								{productCategories.map((category) => {
									const categoryProducts = getProductsByCategory(category.id);
									if (categoryProducts.length === 0) return null;

									return (
										<section key={category.id}>
											<h2 className="text-xl font-bold mb-4">
												{category.name}
											</h2>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												{categoryProducts.map((product) => (
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
										</section>
									);
								})}
							</div>
						</TabsContent>
						<TabsContent value="info" className="mt-4">
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<Info className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div>
										<h3 className="font-medium">Acerca de {store?.name}</h3>
										<p className="text-muted-foreground mt-1">
											{store?.description || "No hay descripción disponible."}
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div>
										<h3 className="font-medium">Horario</h3>
										<p className="text-muted-foreground mt-1">
											Lunes a Domingo: 8:00 AM - 10:00 PM
										</p>
									</div>
								</div>
								<div className="flex items-start gap-4">
									<ShoppingBag className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div>
										<h3 className="font-medium">Información de entrega</h3>
										<p className="text-muted-foreground mt-1">
											Tiempo estimado de entrega:{" "}
											{store?.delivery_time || "30-45 minutos"}
											<br />
											Costo de envío: $
											{store?.delivery_fee?.toFixed(2) || "2.99"}
											<br />
											Pedido mínimo: $
											{store?.minimum_order?.toFixed(2) || "10.00"}
										</p>
									</div>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="reviews" className="mt-4">
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<div className="flex items-center">
											<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
											<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
											<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
											<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
											<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
											<span className="ml-2 font-medium">{store?.rating}</span>
										</div>
										<p className="text-sm text-muted-foreground">
											Basado en 200+ reseñas
										</p>
									</div>
									<Button
										variant="outline"
										onClick={() => setShowLoginModal(true)}
									>
										Escribir reseña
									</Button>
								</div>

								<div className="space-y-4">
									<div className="border rounded-lg p-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="h-8 w-8 rounded-full bg-gray-200" />
												<span className="font-medium">Usuario 1</span>
											</div>
											<div className="flex">
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
											</div>
										</div>
										<p className="mt-2 text-sm text-muted-foreground">
											Excelente servicio y productos de calidad. La entrega fue
											rápida y todo llegó en perfectas condiciones.
											Definitivamente volveré a comprar.
										</p>
										<p className="mt-1 text-xs text-muted-foreground">
											Hace 2 días
										</p>
									</div>

									<div className="border rounded-lg p-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="h-8 w-8 rounded-full bg-gray-200" />
												<span className="font-medium">Usuario 2</span>
											</div>
											<div className="flex">
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
												<Star className="h-4 w-4" />
											</div>
										</div>
										<p className="mt-2 text-sm text-muted-foreground">
											Muy buena experiencia en general. Los productos son de
											buena calidad, aunque la entrega tardó un poco más de lo
											esperado.
										</p>
										<p className="mt-1 text-xs text-muted-foreground">
											Hace 1 semana
										</p>
									</div>
								</div>

								<Button variant="outline" className="w-full">
									Ver más reseñas
								</Button>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</main>

			<MobileNav />
			<LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
		</div>
	);
}
