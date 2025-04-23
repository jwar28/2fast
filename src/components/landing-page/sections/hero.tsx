import Image from "next/image";
import { ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white py-12 md:py-20 w-full">
			<div className="px-4 md:px-6 w-full">
				<div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-16 items-center">
					<div className="flex flex-col gap-4">
						<h1 className="text-3xl font-bold text-balance tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
							Todo lo que necesitas,{" "}
							<span className="text-rose-500 italic">
								entregado al instante
							</span>
						</h1>
						<p className="text-muted-foreground text-pretty md:text-xl">
							Comida, supermercado, farmacia y mucho más. Entrega rápida en
							minutos, directamente a tu puerta.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 mt-4">
							<Button className="bg-rose-500 hover:bg-rose-600 text-white h-12 px-6">
								Descargar ahora
								<Download className="ml-2 h-5 w-5" />
							</Button>
							<Button variant="outline" className="h-12 px-6">
								Conocer más
								<ChevronRight className="ml-2 h-5 w-5" />
							</Button>
						</div>
					</div>
					<div className="relative mx-auto w-full max-w-sm md:max-w-none overflow-hidden rounded-xl shadow-xl md:order-last">
						<Image
							src="/1.jpg"
							width={400}
							height={600}
							alt="App screenshot"
							className="w-full object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
