import BenefitsSection from "./sections/benefits";
import DownloadSection from "./sections/download";
import FeaturesSection from "./sections/features";
import Footer from "./sections/footer";
import Header from "./sections/header";
import HeroSection from "./sections/hero";
import HowItWorksSection from "./sections/how-it-works";
import PartnersSection from "./sections/partners";
import TestimonialsSection from "./sections/testimonials";

export default function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col justify-content items-center">
			<Header />
			<main className="flex-1">
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<BenefitsSection />
				<PartnersSection />
				<TestimonialsSection />
				<DownloadSection />
			</main>
			<Footer />
		</div>
	);
}
