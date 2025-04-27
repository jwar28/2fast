import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t bg-background">
			<div className="px-4 py-8 md:px-6 md:py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<ShoppingBag className="h-6 w-6 text-rose-500" />
							<span className="text-xl font-bold text-rose-500">2Fast</span>
						</div>
						<p className="text-sm text-muted-foreground">
							La plataforma líder de delivery en Latinoamérica. Todo lo que
							necesitas, entregado al instante.
						</p>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-bold">Compañía</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Sobre nosotros
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Trabaja con nosotros
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Prensa
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-bold">Información</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Términos y condiciones
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Política de privacidad
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Preguntas frecuentes
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
								>
									Ayuda
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-bold">Contacto</h3>
						<ul className="space-y-2">
							<li className="text-sm text-muted-foreground">
								contacto@toofast.com
							</li>
							<li className="text-sm text-muted-foreground">
								+1 (555) 123-4567
							</li>
							<li className="text-sm text-muted-foreground">
								Av. Principal 123, Ciudad
							</li>
						</ul>
						<div className="flex gap-4">
							<Link
								href="#"
								className="text-muted-foreground hover:text-rose-500"
							>
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-5 w-5"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-rose-500"
							>
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-5 w-5"
								>
									<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
								</svg>
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-rose-500"
							>
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-5 w-5"
								>
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
				<div className="mt-8 border-t pt-8 text-center">
					<p className="text-xs text-muted-foreground">
						© 2Fast. Todos los derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
