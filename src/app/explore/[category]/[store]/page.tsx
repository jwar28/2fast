import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StoreContent } from "@/components/store/store-content";

export default function StorePage() {
	return (
		<Suspense fallback={<StorePageSkeleton />}>
			<StoreContent />
		</Suspense>
	);
}

function StorePageSkeleton() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 h-16" />
			<div className="relative h-40 md:h-64 w-full bg-gray-200" />
			<main className="flex-1 pb-16 md:pb-0">
				<div className=" px-4 py-4 md:px-6 md:py-6">
					<div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
						{Array(4)
							.fill(0)
							.map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<Skeleton key={i} className="h-8 w-24 rounded-full" />
							))}
					</div>
					<Skeleton className="h-10 w-full mb-6" />
					<div className="space-y-8">
						<section>
							<Skeleton className="h-8 w-48 mb-4" />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{Array(4)
									.fill(0)
									.map((_, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<Skeleton key={i} className="h-32 w-full rounded-lg" />
									))}
							</div>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
}
