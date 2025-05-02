import { supabase } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/utils";
import { create } from "zustand";

interface StoreWithProducts {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	store: any;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
	products: any[];
}

interface CategoryState {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
	category: any | null;
	categorySlug: string;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
	stores: any[];
	storesWithProducts: StoreWithProducts[];
	loading: boolean;
	setCategorySlug: (slug: string) => void;
	fetchCategoryData: (slug: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
	category: null,
	categorySlug: "",
	stores: [],
	storesWithProducts: [],
	loading: false,

	setCategorySlug: (slug: string) => set({ categorySlug: slug }),

	fetchCategoryData: async (slug: string) => {
		try {
			set({ loading: true });

			const { data: allCategories, error: categoriesError } = await supabase
				.from("categories")
				.select("*");

			if (categoriesError) throw categoriesError;

			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const matchingCategory = allCategories.find((cat: any) => {
				const generatedSlug = generateSlug(cat.name);
				return generatedSlug === slug;
			});

			if (!matchingCategory) {
				console.error("Categoría no encontrada:", slug);
				set({
					category: null,
					stores: [],
					storesWithProducts: [],
				});
				return;
			}

			set({ category: matchingCategory });

			const { data: storesData, error: storesError } = await supabase
				.from("stores")
				.select("*")
				.eq("category_id", matchingCategory.id)
				.eq("is_active", true)
				.order("rating", { ascending: false });

			if (storesError) throw storesError;

			const storesWithProductsData: StoreWithProducts[] = [];

			for (const store of storesData || []) {
				const { data: productsData, error: productsError } = await supabase
					.from("products")
					.select("*")
					.eq("store_id", store.id)
					.eq("is_active", true)
					.order("is_featured", { ascending: false })
					.limit(4);

				if (productsError) throw productsError;

				if (productsData && productsData.length > 0) {
					storesWithProductsData.push({
						store,
						products: productsData,
					});
				}
			}

			set({
				stores: storesData || [],
				storesWithProducts: storesWithProductsData,
			});
		} catch (error) {
			console.error("Error fetching category data:", error);
		} finally {
			set({ loading: false });
		}
	},
}));
