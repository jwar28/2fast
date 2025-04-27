"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface StoreProductCardProps {
	name: string;
	image: string;
	description: string;
	price: number;
	originalPrice?: number;
	onAddToCart: () => void;
	productId: string;
}

export function StoreProductCard({
	name,
	image,
	description,
	price,
	originalPrice,
	onAddToCart,
	productId,
}: StoreProductCardProps) {
	return (
		<div className="flex items-start gap-4 rounded-lg border p-4">
			<div className="relative h-24 w-24 min-w-24 overflow-hidden rounded-md">
				<Image
					src={image || "/placeholder.svg"}
					alt={name}
					fill
					className="object-cover"
				/>
			</div>
			<div className="flex flex-1 flex-col">
				<h3 className="font-medium">{name}</h3>
				<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
					{description}
				</p>
				<div className="mt-2 flex items-center justify-between">
					<div className="flex items-center gap-2">
						{originalPrice && originalPrice > price ? (
							<>
								<span className="font-medium">${price.toFixed(2)}</span>
								<span className="text-sm text-muted-foreground line-through">
									${originalPrice.toFixed(2)}
								</span>
							</>
						) : (
							<span className="font-medium">${price.toFixed(2)}</span>
						)}
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600"
						onClick={onAddToCart}
					>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
