import { Star } from "lucide-react";

export default function TestimonialsSection() {
	return (
		<section className="py-12 md:py-20">
			<div className="px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">
							Testimonios
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Lo que dicen nuestros usuarios
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
							Miles de personas confían en nosotros para sus necesidades
							diarias.
						</p>
					</div>
				</div>
				<div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
					<div className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="flex items-center gap-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className="h-5 w-5 fill-current text-yellow-400"
								/>
							))}
						</div>
						<p className="text-muted-foreground">
							"La mejor app de delivery que he usado. Rápida, confiable y con
							excelente servicio al cliente."
						</p>
						<div className="flex items-center gap-4 pt-4">
							<div className="rounded-full bg-muted p-1">
								<div className="h-8 w-8 rounded-full bg-gray-300" />
							</div>
							<div>
								<p className="text-sm font-medium">María González</p>
								<p className="text-xs text-muted-foreground">
									Cliente desde 2022
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="flex items-center gap-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className="h-5 w-5 fill-current text-yellow-400"
								/>
							))}
						</div>
						<p className="text-muted-foreground">
							"Increíble variedad de productos y restaurantes. Nunca me ha
							fallado una entrega."
						</p>
						<div className="flex items-center gap-4 pt-4">
							<div className="rounded-full bg-muted p-1">
								<div className="h-8 w-8 rounded-full bg-gray-300" />
							</div>
							<div>
								<p className="text-sm font-medium">Carlos Rodríguez</p>
								<p className="text-xs text-muted-foreground">
									Cliente desde 2021
								</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="flex items-center gap-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className="h-5 w-5 fill-current text-yellow-400"
								/>
							))}
						</div>
						<p className="text-muted-foreground">
							"Como dueño de restaurante, esta app ha aumentado mis ventas en un
							40%. Excelente plataforma."
						</p>
						<div className="flex items-center gap-4 pt-4">
							<div className="rounded-full bg-muted p-1">
								<div className="h-8 w-8 rounded-full bg-gray-300" />
							</div>
							<div>
								<p className="text-sm font-medium">Ana Martínez</p>
								<p className="text-xs text-muted-foreground">
									Socia desde 2020
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
