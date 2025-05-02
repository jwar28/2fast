import { supabase } from "@/lib/supabase/client";

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
