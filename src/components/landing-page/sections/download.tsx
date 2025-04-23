import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function DownloadSection() {
	return (
		<section className="py-12 md:py-20 bg-rose-500 text-white">
			<div className="px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Descarga nuestra app
						</h2>
						<p className="max-w-[900px] text-rose-100 md:text-xl/relaxed">
							Disponible para iOS y Android. Millones de descargas y contando.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 mt-6">
						<Button
							variant="outline"
							className="bg-white text-rose-500 hover:bg-rose-50 border-white h-12 px-6"
						>
							<Image
								src="/placeholder.svg?height=24&width=24"
								width={24}
								height={24}
								alt="App Store"
								className="mr-2 h-5 w-5"
							/>
							App Store
						</Button>
						<Button
							variant="outline"
							className="bg-white text-rose-500 hover:bg-rose-50 border-white h-12 px-6"
						>
							<Image
								src="/placeholder.svg?height=24&width=24"
								width={24}
								height={24}
								alt="Google Play"
								className="mr-2 h-5 w-5"
							/>
							Google Play
						</Button>
					</div>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
						<div className="relative mx-auto w-full max-w-sm">
							<Image
								src="/placeholder.svg?height=600&width=300"
								width={300}
								height={600}
								alt="App screenshot"
								className="w-full object-cover"
							/>
						</div>
						<div className="space-y-4">
							<h3 className="text-2xl font-bold">
								Descubre un mundo de posibilidades
							</h3>
							<ul className="space-y-2">
								<li className="flex items-center gap-2">
									<div className="rounded-full bg-rose-400 p-1">
										<ChevronRight className="h-4 w-4" />
									</div>
									<span>Más de 10,000 comercios asociados</span>
								</li>
								<li className="flex items-center gap-2">
									<div className="rounded-full bg-rose-400 p-1">
										<ChevronRight className="h-4 w-4" />
									</div>
									<span>Entregas en menos de 30 minutos</span>
								</li>
								<li className="flex items-center gap-2">
									<div className="rounded-full bg-rose-400 p-1">
										<ChevronRight className="h-4 w-4" />
									</div>
									<span>Soporte al cliente 24/7</span>
								</li>
								<li className="flex items-center gap-2">
									<div className="rounded-full bg-rose-400 p-1">
										<ChevronRight className="h-4 w-4" />
									</div>
									<span>Promociones exclusivas todos los días</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
