import { supabase } from "@/lib/supabase/client";
import { fetchAllCategories, findCategoryBySlug, fetchStoresByCategoryId } from "./categoryService";
import { fetchProductsByStoreId } from "./productService";

export async function fetchAllStores() {
    const { data, error } = await supabase.from("stores").select("*");
    if (error) throw error;
    return data || [];
}

export async function fetchCategoryDataBySlug(slug: string) {
	const allCategories = await fetchAllCategories();
	const category = await findCategoryBySlug(slug, allCategories);

	if (!category) {
		throw new Error(`Categoría no encontrada: ${slug}`);
	}

	const stores = await fetchStoresByCategoryId(category.id);

	const storesWithProducts = [];
	for (const store of stores) {
		const products = await fetchProductsByStoreId(store.id);
		if (products.length > 0) {
			storesWithProducts.push({
				store,
				products,
			});
		}
	}

	return {
		category,
		stores,
		storesWithProducts,
	};
}
