import { fetchProductCategoriesByStoreId, fetchAllProductsByStoreId } from "@/api/services/productService";
import { fetchAllStores } from "@/api/services/storeService";
import { generateSlug } from "@/lib/utils";
import { create } from "zustand";

interface StoreContentState {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
    store: any | null;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
    products: any[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
    productCategories: any[];
    loading: boolean;
    fetchStoreContent: (categorySlug: string, storeSlug: string) => Promise<void>;
}

export const useStoreContentStore = create<StoreContentState>((set) => ({
    store: null,
    products: [],
    productCategories: [],
    loading: false,

    fetchStoreContent: async (_categorySlug, storeSlug) => {
        try {
            set({ loading: true });

            const allStores = await fetchAllStores();
            const matchingStore = allStores.find((store) => generateSlug(store.name) === storeSlug);

            if (!matchingStore) {
                console.error("Tienda no encontrada:", storeSlug);
                set({
                    store: null,
                    productCategories: [],
                    products: [],
                });
                return;
            }

            const categoriesData = await fetchProductCategoriesByStoreId(matchingStore.id);
            const productsData = await fetchAllProductsByStoreId(matchingStore.id);

            const mappedProducts = productsData.map((product) => ({
                ...product,
                product_to_category: (product.product_to_category || []).map((category) => ({
                    ...category,
                    product_id: product.id,
                })),
            }));

            set({
                store: matchingStore,
                productCategories: categoriesData,
                products: mappedProducts,
            });
        } catch (error) {
            console.error("Error fetching store content:", error);
        } finally {
            set({ loading: false });
        }
    },
}));