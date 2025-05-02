import { supabase } from "@/lib/supabase/client";
import { create } from "zustand";

interface StoreState {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	categories: any[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
	restaurants: any[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
	groceryStores: any[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
	pharmacies: any[];
	loading: boolean;
	fetchExploreData: () => Promise<void>;
}

export const useStoreStore = create<StoreState>((set) => ({
	categories: [],
	restaurants: [],
	groceryStores: [],
	pharmacies: [],
	loading: false,

	fetchExploreData: async () => {
		try {
			set({ loading: true });

			const { data: categoriesData, error: categoriesError } = await supabase
				.from("categories")
				.select("*")
				.order("name");

			if (categoriesError) throw categoriesError;

			const restaurantCategory = categoriesData.find(
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(cat: any) => cat.name === "Restaurantes",
			);
			const groceryCategory = categoriesData.find(
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(cat: any) => cat.name === "Supermercado",
			);
			const pharmacyCategory = categoriesData.find(
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(cat: any) => cat.name === "Farmacia",
			);

			const [restaurantsData, groceryData, pharmacyData] = await Promise.all([
				restaurantCategory
					? supabase
							.from("stores")
							.select("*")
							.eq("category_id", restaurantCategory.id)
							.eq("is_active", true)
							.order("rating", { ascending: false })
							.limit(4)
							.then((res) => res.data || [])
					: [],
				groceryCategory
					? supabase
							.from("stores")
							.select("*")
							.eq("category_id", groceryCategory.id)
							.eq("is_active", true)
							.order("rating", { ascending: false })
							.limit(4)
							.then((res) => res.data || [])
					: [],
				pharmacyCategory
					? supabase
							.from("stores")
							.select("*")
							.eq("category_id", pharmacyCategory.id)
							.eq("is_active", true)
							.order("rating", { ascending: false })
							.limit(4)
							.then((res) => res.data || [])
					: [],
			]);

			set({
				categories: categoriesData || [],
				restaurants: restaurantsData,
				groceryStores: groceryData,
				pharmacies: pharmacyData,
			});
		} catch (error) {
			console.error("Error fetching explore data:", error);
		} finally {
			set({ loading: false });
		}
	},
}));
