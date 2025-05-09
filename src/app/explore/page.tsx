import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExploreContent } from "@/components/explore/explore-content";

export default function ExplorePage() {
	return (
		<Suspense fallback={<ExplorePageSkeleton />}>
			<ExploreContent />
		</Suspense>
	);
}

function ExplorePageSkeleton() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 h-16" />
			<main className="flex-1 pb-16 md:pb-0">
				<div className=" px-4 py-4 md:px-6 md:py-6">
					<div className="flex items-center justify-between mb-4">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-8 w-24" />
					</div>
					<Skeleton className="h-10 w-full mb-6" />

					<div className="space-y-6">
						<section>
							<Skeleton className="h-8 w-48 mb-4" />
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
								{Array(5)
									.fill(0)
									.map((_, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<Skeleton key={i} className="h-32 w-full rounded-lg" />
									))}
							</div>
						</section>

						<section>
							<div className="flex items-center justify-between mb-4">
								<Skeleton className="h-8 w-48" />
								<Skeleton className="h-6 w-20" />
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{Array(4)
									.fill(0)
									.map((_, i) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<Skeleton key={i} className="h-64 w-full rounded-lg" />
									))}
							</div>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
}
