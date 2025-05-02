import { fetchAllCategories, fetchStoresByCategoryId, findCategoryBySlug } from "@/api/services/categoryService";
import { fetchProductsByStoreId } from "@/api/services/productService";
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

            const allCategories = await fetchAllCategories();
            const matchingCategory = await findCategoryBySlug(slug, allCategories);

            if (!matchingCategory) {
                console.error("Categoría no encontrada:", slug);
                set({
                    category: null,
                    stores: [],
                    storesWithProducts: [],
                });
                return;
            }

            const storesData = await fetchStoresByCategoryId(matchingCategory.id);

            const storesWithProductsData: StoreWithProducts[] = [];
            for (const store of storesData) {
                const productsData = await fetchProductsByStoreId(store.id, 4);
                if (productsData.length > 0) {
                    storesWithProductsData.push({
                        store,
                        products: productsData,
                    });
                }
            }

            set({
                category: matchingCategory,
                stores: storesData,
                storesWithProducts: storesWithProductsData,
            });
        } catch (error) {
            console.error("Error fetching category data:", error);
        } finally {
            set({ loading: false });
        }
    },
}));
