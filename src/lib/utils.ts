import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Función para generar slugs consistentes
export function generateSlug(text: string): string {
	return text.toLowerCase().replace(/\s+/g, "-");
}
