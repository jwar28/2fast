"use client";

import Link from "next/link";
import { Home, Search, Heart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
	const pathname = usePathname();

	return (
		<div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
			<div className="grid h-16 grid-cols-4">
				<Link
					href="/"
					className={cn(
						"flex flex-col items-center justify-center",
						pathname === "/" ? "text-rose-500" : "text-muted-foreground",
					)}
				>
					<Home className="h-5 w-5" />
					<span className="text-xs">Inicio</span>
				</Link>
				<Link
					href="/explore"
					className={cn(
						"flex flex-col items-center justify-center",
						pathname.startsWith("/explore")
							? "text-rose-500"
							: "text-muted-foreground",
					)}
				>
					<Search className="h-5 w-5" />
					<span className="text-xs">Explorar</span>
				</Link>
				<Link
					href="/explore/favorites"
					className={cn(
						"flex flex-col items-center justify-center",
						pathname === "/explore/favorites"
							? "text-rose-500"
							: "text-muted-foreground",
					)}
				>
					<Heart className="h-5 w-5" />
					<span className="text-xs">Favoritos</span>
				</Link>
				<Link
					href="/profile"
					className={cn(
						"flex flex-col items-center justify-center",
						pathname === "/profile" ? "text-rose-500" : "text-muted-foreground",
					)}
				>
					<User className="h-5 w-5" />
					<span className="text-xs">Perfil</span>
				</Link>
			</div>
		</div>
	);
}
