interface MainLayoutProps {
	Page: React.ComponentType;
}

export default function MainLayout({ Page }: MainLayoutProps) {
	return (
		<>
			<main className="container mx-auto md:px-4">
				<Page />
			</main>
		</>
	);
}
