import { Clock, Gift, ShoppingBag, Star, Utensils } from "lucide-react";

export default function FeaturesSection() {
	return (
		<section id="features" className="py-12 md:py-20">
			<div className="px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">
							Características
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Todo en una sola app
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
							Descubre por qué miles de personas eligen nuestra plataforma para
							sus necesidades diarias.
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="rounded-full bg-rose-100 p-3">
							<ShoppingBag className="h-6 w-6 text-rose-500" />
						</div>
						<h3 className="text-xl font-bold">Supermercado</h3>
						<p className="text-center text-muted-foreground">
							Compra todo lo que necesitas sin salir de casa. Entrega en
							minutos.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="rounded-full bg-rose-100 p-3">
							<Utensils className="h-6 w-6 text-rose-500" />
						</div>
						<h3 className="text-xl font-bold">Restaurantes</h3>
						<p className="text-center text-muted-foreground">
							Tus restaurantes favoritos con entrega rápida y seguimiento en
							tiempo real.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="rounded-full bg-rose-100 p-3">
							<Clock className="h-6 w-6 text-rose-500" />
						</div>
						<h3 className="text-xl font-bold">Entrega Express</h3>
						<p className="text-center text-muted-foreground">
							Recibe tus pedidos en tiempo récord con nuestro servicio de
							entrega premium con drones.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="rounded-full bg-rose-100 p-3">
							<Gift className="h-6 w-6 text-rose-500" />
						</div>
						<h3 className="text-xl font-bold">Promociones</h3>
						<p className="text-center text-muted-foreground">
							Descuentos exclusivos y ofertas especiales todos los días.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm lg:col-span-2">
						<div className="rounded-full bg-rose-100 p-3">
							<Star className="h-6 w-6 text-rose-500" />
						</div>
						<h3 className="text-xl font-bold">Experiencia Premium</h3>
						<p className="text-center text-muted-foreground">
							Suscríbete a nuestro plan premium y disfruta de envíos gratis,
							atención prioritaria y beneficios exclusivos.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
