import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// Layouts
import MainLayout from "@/layouts/mainLayout";

// Components
import Navbar from "@/components/my_components/navbar";
import Footer from "@/components/my_components/footer";
// import Loading from "@/components/loading";

// Pages
import NotFound from "@/pages/notFound";
import HomePage from "@/pages/home";
import ChatPage from "@/pages/chat";
// import SignUp from "@/components/signUp";

interface HandleFallbackProps {
	title: string;
	component: React.ComponentType;
	showNavbar: boolean;
	showFooter: boolean;
}

const handleFallback = ({
	title,
	component,
	showNavbar,
	showFooter,
}: HandleFallbackProps) => {
	return (
		<Suspense fallback={"Loading......"}>
			<title>{title}</title>
			{showNavbar && <Navbar />}
			<MainLayout page={component} />
			{showFooter && <Footer />}
		</Suspense>
	);
};

const routes = createBrowserRouter([
	{
		path: "/",
		element: handleFallback({
			title: "Home Page",
			component: HomePage,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/chat",
		element: handleFallback({
			title: "Chat Page",
			component: ChatPage,
			showNavbar: true,
			showFooter: true,
		}),
	},
	// {
	// 	path: "/daftar",
	// 	element: handleFallback(SignUp),
	// 	children: [],
	// },
	{
		path: "*",
		element: handleFallback({
			title: "Page Not Found",
			component: NotFound,
			showNavbar: true,
			showFooter: true,
		}),
	},
	// {
	// 	path: "/test",
	// 	Component: Loading,
	// },
]);

export default function Routes() {
	return <RouterProvider router={routes}></RouterProvider>;
}
