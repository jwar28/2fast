import { fetchAllCategories, fetchStoresByCategoryId } from "@/api/services/categoryService";
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

            const categoriesData = await fetchAllCategories();

            const restaurantCategory = categoriesData.find((cat) => cat.name === "Restaurantes");
            const groceryCategory = categoriesData.find((cat) => cat.name === "Supermercado");
            const pharmacyCategory = categoriesData.find((cat) => cat.name === "Farmacia");

            const [restaurantsData, groceryData, pharmacyData] = await Promise.all([
                restaurantCategory ? fetchStoresByCategoryId(restaurantCategory.id) : [],
                groceryCategory ? fetchStoresByCategoryId(groceryCategory.id) : [],
                pharmacyCategory ? fetchStoresByCategoryId(pharmacyCategory.id) : [],
            ]);

            set({
                categories: categoriesData,
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