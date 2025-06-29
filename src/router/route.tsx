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
	Title: string;
	Component: React.ComponentType;
	ShowNavbar: boolean;
	ShowFooter: boolean;
}

const handleFallback = ({
	Title,
	Component,
	ShowNavbar,
	ShowFooter,
}: HandleFallbackProps) => {
	return (
		<Suspense fallback={"Loading......"}>
			<title>{Title}</title>
			{ShowNavbar && <Navbar />}
			<MainLayout Page={Component} />
			{ShowFooter && <Footer />}
		</Suspense>
	);
};

const routes = createBrowserRouter([
	{
		path: "/",
		element: handleFallback({
			Title: "Home Page",
			Component: HomePage,
			ShowNavbar: true,
			ShowFooter: true,
		}),
	},
	{
		path: "/chat",
		element: handleFallback({
			Title: "Chat Page",
			Component: ChatPage,
			ShowNavbar: true,
			ShowFooter: true,
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
			Title: "Page Not Found",
			Component: NotFound,
			ShowNavbar: true,
			ShowFooter: true,
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
