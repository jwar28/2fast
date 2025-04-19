import { Clock, ShoppingBag, Star } from "lucide-react";
import Image from "next/image"

export default function BenefitsSection() {
    return (
      <section id="benefits" className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-500">Beneficios</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                ¿Por qué elegir nuestra app?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Descubre las ventajas que nos hacen diferentes.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
            <div className="flex flex-col space-y-8 justify-center">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-rose-100 p-2">
                  <Clock className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Entrega ultra rápida</h3>
                  <p className="text-muted-foreground">Recibe tus pedidos en menos de 30 minutos, garantizado.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-rose-100 p-2">
                  <ShoppingBag className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Amplia variedad</h3>
                  <p className="text-muted-foreground">Miles de productos y servicios disponibles en una sola app.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-rose-100 p-2">
                  <Star className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Calidad garantizada</h3>
                  <p className="text-muted-foreground">Trabajamos solo con los mejores comercios y restaurantes.</p>
                </div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm md:max-w-none overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/2.png"
                width={400}
                height={600}
                alt="App benefits"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }