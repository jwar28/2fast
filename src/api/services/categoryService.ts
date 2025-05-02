import { supabase } from "@/lib/supabase/client";
import { generateSlug } from "@/lib/utils";

export async function fetchAllCategories() {
	const { data, error } = await supabase.from("categories").select("*");
	if (error) throw error;
	return data || [];
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function findCategoryBySlug(slug: string, categories: any[]) {
	return categories.find((cat) => generateSlug(cat.name) === slug) || null;
}

export async function fetchStoresByCategoryId(categoryId: string) {
	const { data, error } = await supabase
		.from("stores")
		.select("*")
		.eq("category_id", categoryId)
		.eq("is_active", true)
		.order("rating", { ascending: false });
	if (error) throw error;
	return data || [];
}
