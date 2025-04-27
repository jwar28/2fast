export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			addresses: {
				Row: {
					id: string;
					user_id: string;
					address: string;
					city: string;
					state: string;
					postal_code: string;
					is_default: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					address: string;
					city: string;
					state: string;
					postal_code: string;
					is_default?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					address?: string;
					city?: string;
					state?: string;
					postal_code?: string;
					is_default?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
			categories: {
				Row: {
					id: string;
					name: string;
					description: string | null;
					image_url: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					description?: string | null;
					image_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					name?: string;
					description?: string | null;
					image_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			favorites: {
				Row: {
					id: string;
					user_id: string;
					store_id: string | null;
					product_id: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					store_id?: string | null;
					product_id?: string | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					store_id?: string | null;
					product_id?: string | null;
					created_at?: string;
				};
			};
			order_items: {
				Row: {
					id: string;
					order_id: string;
					product_id: string | null;
					product_name: string;
					quantity: number;
					unit_price: number;
					total_price: number;
					notes: string | null;
					created_at: string;
				};
				Insert: {
					id?: string;
					order_id: string;
					product_id?: string | null;
					product_name: string;
					quantity: number;
					unit_price: number;
					total_price: number;
					notes?: string | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					order_id?: string;
					product_id?: string | null;
					product_name?: string;
					quantity?: number;
					unit_price?: number;
					total_price?: number;
					notes?: string | null;
					created_at?: string;
				};
			};
			orders: {
				Row: {
					id: string;
					user_id: string | null;
					store_id: string | null;
					address_id: string | null;
					status: string;
					subtotal: number;
					delivery_fee: number;
					total: number;
					payment_method: string;
					notes: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id?: string | null;
					store_id?: string | null;
					address_id?: string | null;
					status?: string;
					subtotal: number;
					delivery_fee: number;
					total: number;
					payment_method: string;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string | null;
					store_id?: string | null;
					address_id?: string | null;
					status?: string;
					subtotal?: number;
					delivery_fee?: number;
					total?: number;
					payment_method?: string;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			product_categories: {
				Row: {
					id: string;
					store_id: string;
					name: string;
					description: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					store_id: string;
					name: string;
					description?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					store_id?: string;
					name?: string;
					description?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			product_to_category: {
				Row: {
					product_id: string;
					category_id: string;
				};
				Insert: {
					product_id: string;
					category_id: string;
				};
				Update: {
					product_id?: string;
					category_id?: string;
				};
			};
			products: {
				Row: {
					id: string;
					store_id: string;
					name: string;
					description: string | null;
					price: number;
					sale_price: number | null;
					image_url: string | null;
					is_featured: boolean;
					is_active: boolean;
					stock: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					store_id: string;
					name: string;
					description?: string | null;
					price: number;
					sale_price?: number | null;
					image_url?: string | null;
					is_featured?: boolean;
					is_active?: boolean;
					stock?: number;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					store_id?: string;
					name?: string;
					description?: string | null;
					price?: number;
					sale_price?: number | null;
					image_url?: string | null;
					is_featured?: boolean;
					is_active?: boolean;
					stock?: number;
					created_at?: string;
					updated_at?: string;
				};
			};
			profiles: {
				Row: {
					id: string;
					email: string;
					full_name: string | null;
					avatar_url: string | null;
					phone: string | null;
					role: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					email: string;
					full_name?: string | null;
					avatar_url?: string | null;
					phone?: string | null;
					role?: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					full_name?: string | null;
					avatar_url?: string | null;
					phone?: string | null;
					role?: string;
					created_at?: string;
					updated_at?: string;
				};
			};
			reviews: {
				Row: {
					id: string;
					user_id: string | null;
					store_id: string | null;
					product_id: string | null;
					rating: number;
					comment: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id?: string | null;
					store_id?: string | null;
					product_id?: string | null;
					rating: number;
					comment?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string | null;
					store_id?: string | null;
					product_id?: string | null;
					rating?: number;
					comment?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			stores: {
				Row: {
					id: string;
					name: string;
					description: string | null;
					logo_url: string | null;
					cover_image_url: string | null;
					category_id: string | null;
					address: string;
					city: string;
					state: string;
					postal_code: string;
					latitude: number | null;
					longitude: number | null;
					phone: string | null;
					email: string | null;
					rating: number | null;
					delivery_time: string | null;
					delivery_fee: number | null;
					minimum_order: number | null;
					is_active: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					description?: string | null;
					logo_url?: string | null;
					cover_image_url?: string | null;
					category_id?: string | null;
					address: string;
					city: string;
					state: string;
					postal_code: string;
					latitude?: number | null;
					longitude?: number | null;
					phone?: string | null;
					email?: string | null;
					rating?: number | null;
					delivery_time?: string | null;
					delivery_fee?: number | null;
					minimum_order?: number | null;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					name?: string;
					description?: string | null;
					logo_url?: string | null;
					cover_image_url?: string | null;
					category_id?: string | null;
					address?: string;
					city?: string;
					state?: string;
					postal_code?: string;
					latitude?: number | null;
					longitude?: number | null;
					phone?: string | null;
					email?: string | null;
					rating?: number | null;
					delivery_time?: string | null;
					delivery_fee?: number | null;
					minimum_order?: number | null;
					is_active?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Store = Database["public"]["Tables"]["stores"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"] & {
	product_to_category?: ProductToCategory[];
};
export type ProductCategory =
	Database["public"]["Tables"]["product_categories"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// Añadir el tipo ProductToCategory
export type ProductToCategory = {
	product_id: string;
	category_id: string;
};
