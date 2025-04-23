export default function HowItWorksSection() {
	return (
		<section id="how-it-works" className="py-12 md:py-20 bg-rose-50">
			<div className="px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">
							Cómo funciona
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Simple, rápido y eficiente
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
							En solo unos pasos, tendrás todo lo que necesitas en la puerta de
							tu casa.
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
					<div className="relative flex flex-col items-center space-y-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white">
							1
						</div>
						<h3 className="text-xl font-bold">Descarga la app</h3>
						<p className="text-center text-muted-foreground">
							Disponible para iOS y Android. Regístrate en segundos.
						</p>
					</div>
					<div className="relative flex flex-col items-center space-y-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white">
							2
						</div>
						<h3 className="text-xl font-bold">Elige lo que quieras</h3>
						<p className="text-center text-muted-foreground">
							Explora miles de productos y servicios disponibles cerca de ti.
						</p>
					</div>
					<div className="relative flex flex-col items-center space-y-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white">
							3
						</div>
						<h3 className="text-xl font-bold">Recibe tu pedido</h3>
						<p className="text-center text-muted-foreground">
							Sigue tu pedido en tiempo real y recíbelo en minutos.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
