import { fetchAllCategories, findCategoryBySlug, fetchStoresByCategoryId } from "./categoryService";
import { fetchProductsByStoreId } from "./productService";

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
