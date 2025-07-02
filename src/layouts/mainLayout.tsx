import { Toaster } from "@/components/ui/sonner";

interface MainLayoutProps {
	page: React.ComponentType;
}

export default function MainLayout({ page: Page }: MainLayoutProps) {
	return (
		<>
			<main className="container mx-auto md:px-4">
				<Page />
			</main>
			<Toaster />
		</>
	);
}
