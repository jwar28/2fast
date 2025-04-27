"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Clock, Plus } from "lucide-react";

interface ProductCardProps {
	name: string;
	image: string;
	description: string;
	price: string;
	rating: number;
	deliveryTime: string;
	href: string;
	onAddToCart: () => void;
	storeId: string;
}

export function ProductCard({
	name,
	image,
	description,
	price,
	rating,
	deliveryTime,
	href,
	onAddToCart,
	storeId,
}: ProductCardProps) {
	return (
		<div className="group relative flex flex-col overflow-hidden rounded-lg border">
			<Link href={href} className="block overflow-hidden">
				<div className="relative h-40 w-full overflow-hidden">
					<Image
						src={image || "/placeholder.svg"}
						alt={name}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>
			</Link>
			<div className="flex flex-1 flex-col p-4">
				<Link href={href}>
					<h3 className="font-medium">{name}</h3>
					<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
						{description}
					</p>
				</Link>
				<div className="mt-2 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="flex items-center">
							<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
							<span className="ml-1 text-sm">{rating}</span>
						</div>
						<div className="flex items-center">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span className="ml-1 text-sm text-muted-foreground">
								{deliveryTime}
							</span>
						</div>
					</div>
					<span className="text-sm">{price}</span>
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-2 top-2 bg-white shadow-sm hover:bg-rose-50"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onAddToCart();
					}}
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
