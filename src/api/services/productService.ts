import { supabase } from "@/lib/supabase/client";

export async function fetchProductCategoriesByStoreId(storeId: string) {
    const { data, error } = await supabase
        .from("product_categories")
        .select("*")
        .eq("store_id", storeId)
        .order("name");
    if (error) throw error;
    return data || [];
}

export async function fetchProductsByStoreId(storeId: string, limit = 4) {
	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("store_id", storeId)
		.eq("is_active", true)
		.order("is_featured", { ascending: false })
		.limit(limit);
	if (error) throw error;
	return data || [];
}

export async function fetchAllProductsByStoreId(storeId: string) {
    const { data, error } = await supabase
        .from("products")
        .select(`
            id, store_id, name, description, price, sale_price, image_url, 
            is_featured, is_active, stock, created_at, updated_at,
            product_to_category(category_id)
        `)
        .eq("store_id", storeId)
        .eq("is_active", true)
        .order("is_featured", { ascending: false });
    if (error) throw error;
    return data || [];
}