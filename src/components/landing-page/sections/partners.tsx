import { ArrowRight, Clock, ShoppingBag, Star } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";

export default function PartnersSection() {
	return (
		<section id="partners" className="py-12 md:py-20 bg-rose-50">
			<div className="px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">
							Socios
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Únete a nuestra red de socios
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
							Haz crecer tu negocio con nuestra plataforma de delivery.
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
					<div className="relative mx-auto w-full max-w-sm md:max-w-none overflow-hidden rounded-xl shadow-xl">
						<Image
							src="/3.png"
							width={400}
							height={600}
							alt="Partners"
							className="w-full object-contain"
						/>
					</div>
					<div className="flex flex-col justify-center space-y-8">
						<div className="flex items-start gap-4">
							<div className="rounded-full bg-rose-100 p-2">
								<ShoppingBag className="h-5 w-5 text-rose-500" />
							</div>
							<div>
								<h3 className="text-lg font-bold">Aumenta tus ventas</h3>
								<p className="text-muted-foreground">
									Llega a miles de nuevos clientes y aumenta tus ingresos.
								</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<div className="rounded-full bg-rose-100 p-2">
								<Clock className="h-5 w-5 text-rose-500" />
							</div>
							<div>
								<h3 className="text-lg font-bold">Logística eficiente</h3>
								<p className="text-muted-foreground">
									Nuestro sistema de entrega te permite enfocarte en tu negocio.
								</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<div className="rounded-full bg-rose-100 p-2">
								<Star className="h-5 w-5 text-rose-500" />
							</div>
							<div>
								<h3 className="text-lg font-bold">Visibilidad y marketing</h3>
								<p className="text-muted-foreground">
									Promociona tu negocio en nuestra plataforma y llega a más
									clientes.
								</p>
							</div>
						</div>
						<Button className="bg-rose-500 hover:bg-rose-600 text-white w-full sm:w-auto">
							Conviértete en socio
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
