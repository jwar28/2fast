"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingBag, User, Heart, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Category, Store } from "@/lib/types";
// Importar la función generateSlug
import { generateSlug } from "@/lib/utils";
import { CategoryCard } from "@/components/shared/category-card";
import { LoginModal } from "@/components/shared/login-modal";
import { MobileNav } from "@/components/shared/mobile-nav";
import { ProductCard } from "@/components/shared/product-card";

export function ExploreContent() {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [restaurants, setRestaurants] = useState<Store[]>([]);
	const [groceryStores, setGroceryStores] = useState<Store[]>([]);
	const [pharmacies, setPharmacies] = useState<Store[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				// Fetch categories
				const { data: categoriesData, error: categoriesError } = await supabase
					.from("categories")
					.select("*")
					.order("name");

				if (categoriesError) throw categoriesError;
				setCategories(categoriesData || []);

				// Get category IDs
				const restaurantCategory = categoriesData?.find(
					(cat) => cat.name === "Restaurantes",
				);
				const groceryCategory = categoriesData?.find(
					(cat) => cat.name === "Supermercado",
				);
				const pharmacyCategory = categoriesData?.find(
					(cat) => cat.name === "Farmacia",
				);

				// Fetch restaurants
				if (restaurantCategory) {
					const { data: restaurantsData, error: restaurantsError } =
						await supabase
							.from("stores")
							.select("*")
							.eq("category_id", restaurantCategory.id)
							.eq("is_active", true)
							.order("rating", { ascending: false })
							.limit(4);

					if (restaurantsError) throw restaurantsError;
					setRestaurants(restaurantsData || []);
				}

				// Fetch grocery stores
				if (groceryCategory) {
					const { data: groceryData, error: groceryError } = await supabase
						.from("stores")
						.select("*")
						.eq("category_id", groceryCategory.id)
						.eq("is_active", true)
						.order("rating", { ascending: false })
						.limit(4);

					if (groceryError) throw groceryError;
					setGroceryStores(groceryData || []);
				}

				// Fetch pharmacies
				if (pharmacyCategory) {
					const { data: pharmacyData, error: pharmacyError } = await supabase
						.from("stores")
						.select("*")
						.eq("category_id", pharmacyCategory.id)
						.eq("is_active", true)
						.order("rating", { ascending: false })
						.limit(4);

					if (pharmacyError) throw pharmacyError;
					setPharmacies(pharmacyData || []);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	const handleAddToCart = () => {
		setShowLoginModal(true);
	};

	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5">
				<div className=" flex h-16 items-center justify-between">
					<div className="flex items-center gap-2">
						<Link href="/" className="flex items-center gap-2">
							<ShoppingBag className="h-6 w-6 text-rose-500" />
							<span className="text-xl font-bold text-rose-500">
								RappiClone
							</span>
						</Link>
					</div>

					<div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Buscar productos, tiendas..."
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
								placeholder="Buscar productos, tiendas..."
								className="w-full bg-background pl-8 rounded-full"
							/>
						</div>
					</div>
				)}
			</header>

			<main className="flex-1 pb-16 md:pb-0">
				<div className=" px-4 py-4 md:px-6 md:py-6">
					<Tabs defaultValue="all" className="w-full">
						<div className="flex items-center justify-between mb-4">
							<h1 className="text-2xl font-bold">Explorar</h1>
							<Button variant="outline" size="sm" className="gap-2">
								<Filter className="h-4 w-4" />
								Filtros
							</Button>
						</div>
						<TabsList className="grid w-full grid-cols-4 h-auto">
							<TabsTrigger value="all" className="py-2">
								Todos
							</TabsTrigger>
							<TabsTrigger value="restaurants" className="py-2">
								Restaurantes
							</TabsTrigger>
							<TabsTrigger value="grocery" className="py-2">
								Supermercado
							</TabsTrigger>
							<TabsTrigger value="pharmacy" className="py-2">
								Farmacia
							</TabsTrigger>
						</TabsList>
						<TabsContent value="all" className="mt-4">
							<div className="space-y-6">
								<section>
									<h2 className="text-xl font-bold mb-4">
										Categorías populares
									</h2>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
										{categories.map((category) => (
											<CategoryCard
												key={category.id}
												name={category.name}
												image={
													category.image_url ||
													"/placeholder.svg?height=80&width=80"
												}
												href={`/explore/${generateSlug(category.name)}`}
											/>
										))}
									</div>
								</section>

								<section>
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-xl font-bold">
											Restaurantes destacados
										</h2>
										<Link
											href="/explore/restaurantes"
											className="text-sm text-rose-500 font-medium"
										>
											Ver todos
										</Link>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{restaurants.map((store) => (
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
												href={`/explore/restaurantes/${generateSlug(store.name)}`}
												onAddToCart={handleAddToCart}
												storeId={store.id}
											/>
										))}
									</div>
								</section>

								<section>
									<div className="flex items-center justify-between mb-4">
										<h2 className="text-xl font-bold">Supermercado</h2>
										<Link
											href="/explore/supermercado"
											className="text-sm text-rose-500 font-medium"
										>
											Ver todos
										</Link>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{groceryStores.map((store) => (
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
												deliveryTime={store.delivery_time || "15-30 min"}
												href={`/explore/supermercado/${generateSlug(store.name)}`}
												onAddToCart={handleAddToCart}
												storeId={store.id}
											/>
										))}
									</div>
								</section>
							</div>
						</TabsContent>
						<TabsContent value="restaurants" className="mt-4">
							<div className="space-y-6">
								<section>
									<h2 className="text-xl font-bold mb-4">
										Restaurantes populares
									</h2>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{restaurants.map((store) => (
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
												href={`/explore/restaurantes/${generateSlug(store.name)}`}
												onAddToCart={handleAddToCart}
												storeId={store.id}
											/>
										))}
									</div>
								</section>
							</div>
						</TabsContent>
						<TabsContent value="grocery" className="mt-4">
							<div className="space-y-6">
								<section>
									<h2 className="text-xl font-bold mb-4">Supermercados</h2>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{groceryStores.map((store) => (
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
												deliveryTime={store.delivery_time || "15-30 min"}
												href={`/explore/supermercado/${generateSlug(store.name)}`}
												onAddToCart={handleAddToCart}
												storeId={store.id}
											/>
										))}
									</div>
								</section>
							</div>
						</TabsContent>
						<TabsContent value="pharmacy" className="mt-4">
							<div className="space-y-6">
								<section>
									<h2 className="text-xl font-bold mb-4">Farmacias</h2>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{pharmacies.map((store) => (
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
												deliveryTime={store.delivery_time || "10-20 min"}
												href={`/explore/farmacia/${generateSlug(store.name)}`}
												onAddToCart={handleAddToCart}
												storeId={store.id}
											/>
										))}
									</div>
								</section>
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
