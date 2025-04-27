import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryContent } from "@/components/explore/category-content";

export default function CategoryPage() {
	return (
		<Suspense fallback={<CategoryPageSkeleton />}>
			<CategoryContent />
		</Suspense>
	);
}

function CategoryPageSkeleton() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 h-16" />
			<main className="flex-1 pb-16 md:pb-0">
				<div className=" px-4 py-4 md:px-6 md:py-6">
					<div className="flex items-center justify-between mb-4">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-8 w-24" />
					</div>
					<Skeleton className="h-10 w-full mb-6" />

					<div className="space-y-6">
						<section>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{Array(8)
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
