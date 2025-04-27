import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
	name: string;
	image: string;
	href: string;
}

export function CategoryCard({ name, image, href }: CategoryCardProps) {
	return (
		<Link href={href} className="block">
			<div className="flex flex-col items-center space-y-2 rounded-lg border p-4 hover:border-rose-200 hover:bg-rose-50 transition-colors">
				<div className="relative h-16 w-16 overflow-hidden rounded-full">
					<Image
						src={image || "/placeholder.svg"}
						alt={name}
						fill
						className="object-cover"
					/>
				</div>
				<span className="text-sm font-medium">{name}</span>
			</div>
		</Link>
	);
}
