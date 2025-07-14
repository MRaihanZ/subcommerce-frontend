import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// Layouts
import MainLayout from "@/layouts/mainLayout";

// Components
import Navbar from "@/components/my_components/navbar";
import NavbarSeller from "@/components/my_components/navbarSeller";
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
import Seller from "@/pages/seller";
import SellerItem from "@/pages/sellerItem";
import SellerOrder from "@/pages/sellerOrder";
import SellerRegistration from "@/pages/sellerRegistration";
// import SignUp from "@/components/signUp";

interface HandleFallbackProps {
	title: string;
	component: React.ComponentType;
	showNavbar: boolean;
	showFooter: boolean;
}

const handleFallbackUser = ({
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

const handleFallbackSeller = ({
	title,
	component,
	showNavbar,
	showFooter,
}: HandleFallbackProps) => {
	return (
		<Suspense fallback={"Loading......"}>
			<title>{title}</title>
			{showNavbar && <NavbarSeller />}
			<MainLayout page={component} />
			{showFooter && <Footer />}
		</Suspense>
	);
};

const routes = createBrowserRouter([
	{
		path: "/",
		element: handleFallbackUser({
			title: "Home Page",
			component: Home,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/cart",
		element: handleFallbackUser({
			title: "Cart Page",
			component: Cart,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/chat",
		element: handleFallbackUser({
			title: "Chat Page",
			component: Chat,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/checkout",
		element: handleFallbackUser({
			title: "Checkout Page",
			component: Checkout,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/detail",
		element: handleFallbackUser({
			title: "Detail Item Page",
			component: DetailItem,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/search",
		element: handleFallbackUser({
			title: "Search Page",
			component: Search,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/profile",
		element: handleFallbackUser({
			title: "Profile Page",
			component: Profile,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/seller",
		element: handleFallbackSeller({
			title: "Seller Page",
			component: Seller,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/seller/item",
		element: handleFallbackSeller({
			title: "Seller Item Page",
			component: SellerItem,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/seller/order",
		element: handleFallbackSeller({
			title: "Seller Order Page",
			component: SellerOrder,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/seller/register",
		element: handleFallbackUser({
			title: "Seller Registration Page",
			component: SellerRegistration,
			showNavbar: true,
			showFooter: true,
		}),
	},
	// {
	// 	path: "/daftar",
	// 	element: handleFallbackUser(SignUp),
	// 	children: [],
	// },
	{
		path: "*",
		element: handleFallbackUser({
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
