"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Menu, ShoppingBag, X } from "lucide-react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center justify-between px-10">
				<div className="flex items-center gap-2">
					<ShoppingBag className="h-6 w-6 text-rose-500" />
					<span className="text-xl font-bold text-rose-500">2Fast</span>
				</div>

				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="#features"
						className="text-sm font-medium hover:text-rose-500 transition-colors"
					>
						Características
					</Link>
					<Link
						href="#how-it-works"
						className="text-sm font-medium hover:text-rose-500 transition-colors"
					>
						Cómo funciona
					</Link>
					<Link
						href="#benefits"
						className="text-sm font-medium hover:text-rose-500 transition-colors"
					>
						Beneficios
					</Link>
					<Link
						href="#partners"
						className="text-sm font-medium hover:text-rose-500 transition-colors"
					>
						Socios
					</Link>
					<Button variant="default" className="bg-rose-500 hover:bg-rose-600">
						Descargar App
					</Button>
					<Button variant="outline">Ver catalogo</Button>
				</nav>

				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</Button>

				{isMenuOpen && (
					<div className="absolute top-16 left-0 right-0 bg-background border-b p-4 flex flex-col gap-4 md:hidden">
						<Link
							href="#features"
							className="text-sm font-medium hover:text-rose-500 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Características
						</Link>
						<Link
							href="#how-it-works"
							className="text-sm font-medium hover:text-rose-500 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Cómo funciona
						</Link>
						<Link
							href="#benefits"
							className="text-sm font-medium hover:text-rose-500 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Beneficios
						</Link>
						<Link
							href="#partners"
							className="text-sm font-medium hover:text-rose-500 transition-colors"
							onClick={() => setIsMenuOpen(false)}
						>
							Socios
						</Link>
						<Button
							variant="default"
							className="bg-rose-500 hover:bg-rose-600"
							onClick={() => setIsMenuOpen(false)}
						>
							Descargar App
						</Button>
						<Button variant="outline" onClick={() => setIsMenuOpen(false)}>
							Ver catalogo
						</Button>
					</div>
				)}
			</div>
		</header>
	);
}
