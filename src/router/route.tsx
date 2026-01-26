import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

// Layouts
import MainLayout from "@/layouts/mainLayout";

// Components
import Navbar from "@/components/my_components/navbar";
import NavbarSeller from "@/components/my_components/navbarSeller";
import NavbarAdmin from "@/components/my_components/navbarAdmin";
import Footer from "@/components/my_components/footer";
// import Loading from "@/components/loading";

// Pages
import Admin from "@/pages/admin";
import AdminUsers from "@/pages/adminUsers";
import AdminSellers from "@/pages/adminSellers";
import AdminProduct from "@/pages/adminProduct";
import AdminPayout from "@/pages/adminPayout";
import NotFound from "@/pages/notFound";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Cart from "@/pages/cart";
import Profile from "@/pages/profile";
import Checkout from "@/pages/checkout";
import DetailItem from "@/pages/detailItem";
import ForgotPassword from "@/pages/forgotPassword";
import OrderList from "@/pages/orderList";
import Otp from "@/pages/otp";
import Search from "@/pages/search";
import Subscription from "@/pages/subscription";
import Seller from "@/pages/seller";
import SellerChat from "@/pages/sellerChat";
import SellerItem from "@/pages/sellerItem";
import SellerOrder from "@/pages/sellerOrder";
import SellerProfile from "@/pages/sellerProfile";
import SellerRegistration from "@/pages/sellerRegistration";
import SellerSubscription from "@/pages/sellerSubscription";
// import SignUp from "@/components/signUp";

interface HandleFallbackProps {
	title: string;
	component: React.ComponentType;
	showNavbar: boolean;
	showFooter: boolean;
}

const handleFallbackAdmin = ({
	title,
	component,
	showNavbar,
	showFooter,
}: HandleFallbackProps) => {
	return (
		<Suspense fallback={"Loading......"}>
			<title>{title}</title>
			{showNavbar && <NavbarAdmin />}
			<MainLayout page={component} />
			{showFooter && <Footer />}
		</Suspense>
	);
};

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
		path: "/admin",
		element: handleFallbackAdmin({
			title: "Admin Page",
			component: Admin,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/admin/users",
		element: handleFallbackAdmin({
			title: "Admin Users Page",
			component: AdminUsers,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/admin/sellers",
		element: handleFallbackAdmin({
			title: "Admin Sellers Page",
			component: AdminSellers,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/admin/products",
		element: handleFallbackAdmin({
			title: "Admin Products Page",
			component: AdminProduct,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/admin/payout",
		element: handleFallbackAdmin({
			title: "Admin Payout Page",
			component: AdminPayout,
			showNavbar: true,
			showFooter: true,
		}),
	},
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
		path: "/forgot-password",
		element: handleFallbackUser({
			title: "Forgot Password Page",
			component: ForgotPassword,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/order-list",
		element: handleFallbackUser({
			title: "Order List Page",
			component: OrderList,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/otp",
		element: handleFallbackUser({
			title: "OTP Page",
			component: Otp,
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
		path: "/subscription",
		element: handleFallbackUser({
			title: "Subscription Page",
			component: Subscription,
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
		path: "/seller/chat",
		element: handleFallbackSeller({
			title: "Seller Chat Page",
			component: SellerChat,
			showNavbar: true,
			showFooter: true,
		}),
	},
	{
		path: "/seller/product",
		element: handleFallbackSeller({
			title: "Seller Product Page",
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
		path: "/seller/profile",
		element: handleFallbackSeller({
			title: "Seller Profile Page",
			component: SellerProfile,
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
	{
		path: "/seller/subscription",
		element: handleFallbackSeller({
			title: "Seller Registration Page",
			component: SellerSubscription,
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
