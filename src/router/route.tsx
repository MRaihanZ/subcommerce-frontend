import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// Layouts
import MainLayout from "../layouts/mainLayout";

// Components
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Loading from "../components/loading";

// Pages
import NotFound from "../pages/notFound";
import HomePage from "../pages/home";

const handleFallback = (Component: React.ComponentType) => {
	return (
		<Suspense fallback={<Loading />}>
			<Navbar />
			<MainLayout pages={Component} />
			<Footer />
		</Suspense>
	);
};

const routes = createBrowserRouter([
	{
		path: "/",
		element: handleFallback(HomePage),
	},
	{
		path: "/about",
		element: handleFallback(HomePage),
		children: [],
	},
	{
		path: "*",
		element: handleFallback(NotFound),
	},
	{
		path: "/test",
		Component: Loading,
	},
]);

export default function Routes() {
	return <RouterProvider router={routes}></RouterProvider>;
}
