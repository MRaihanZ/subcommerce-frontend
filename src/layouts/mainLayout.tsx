type MainLayoutProps = {
	pages: React.ComponentType;
};

export default function MainLayout({ pages: Page }: MainLayoutProps) {
	return (
		<>
			<main className="container mx-auto md:px-4">
				<Page />
			</main>
		</>
	);
}
