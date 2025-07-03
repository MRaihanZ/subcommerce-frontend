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
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Cart from "@/pages/cart";
import Profile from "@/pages/profile";
import Checkout from "@/pages/checkout";
import DetailItem from "@/pages/detailItem";
import Search from "@/pages/search";
import SellerOrder from "@/pages/sellerOrder";
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
			component: Home,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/cart",
		element: handleFallback({
			title: "Cart Page",
			component: Cart,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/chat",
		element: handleFallback({
			title: "Chat Page",
			component: Chat,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/checkout",
		element: handleFallback({
			title: "Checkout Page",
			component: Checkout,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/detail",
		element: handleFallback({
			title: "Detail Item Page",
			component: DetailItem,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/search",
		element: handleFallback({
			title: "Search Page",
			component: Search,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/profile",
		element: handleFallback({
			title: "Profile Page",
			component: Profile,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/seller/order",
		element: handleFallback({
			title: "Seller Order Page",
			component: SellerOrder,
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
