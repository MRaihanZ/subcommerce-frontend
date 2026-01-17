import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useGlobalData } from "@/contexts/GlobalDataContext";
import { apiUrl } from "@/lib/api";

import { GetCsrf } from "@/components/utils/csrf";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";

import SignInUp from "./signInUp";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Navbar() {
	const [openDropDownMenu, setOpenDropDownMenu] = useState(false);
	const [openDialogSignUpIn, setOpenDialogSignUpIn] = useState(false);
	const [isSignUpIn, setIsSignUpIn] = useState(false);
	const [isSeller, setIsSeller] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [notFound, setNotFound] = useState<boolean>();
	const [error, setError] = useState<string | null>(null);

	const { setData, setGlobalLoading } = useGlobalData();

	const navigate = useNavigate();
	const locate = useLocation();

	const isLogin = async () => {
		try {
			const send = await fetch(`${apiUrl}/api/v1/auth/status`, {
				credentials: "include",
			}).then();

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				setIsSignUpIn(true);
				setIsSeller(result.data.is_seller);
				setIsAdmin(result.data.is_admin);
				setData(result);
				setGlobalLoading(false);
			} else {
				setData(result);
				setIsSignUpIn(false);
				setGlobalLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setNotFound(true);
			setGlobalLoading(false);
		}
	};

	useEffect(() => {
		if (!isSignUpIn) {
			isLogin();
		}
		if (isAdmin) {
			navigate("/admin");
		}
	}, [isSignUpIn]);

	const logout = async () => {
		const csrfToken = await GetCsrf();
		if (csrfToken === "error") {
			setError("Error getting token");
		}
		try {
			const send = await fetch(`${apiUrl}/api/v1/auth/logout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				body: JSON.stringify({}),
				credentials: "include",
			});
			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				setIsSignUpIn(false);
				window.location.reload();
			} else {
				setError(result.error);
				setNotFound(true);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setData({ error: errFetch });
			// setLoading(false);
		}
	};

	const handleSearch = () => {
		if (!search.trim()) return; // optional: prevent empty search
		navigate(`/search?s=${encodeURIComponent(search)}`);
	};

	return (
		<>
			<nav className="container mx-auto flex justify-between py-3">
				<Link to={"http://" + location.host}>Sub Commerce</Link>
				<section className="flex">
					<section className="w-full hidden md:flex md:max-w-sm items-center justify-center">
						<Input
							id="search"
							type="text"
							placeholder="..."
							onChange={(e) => setSearch(e.target.value)}
							className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
						/>
						<Button
							type="submit"
							variant="outline"
							onClick={handleSearch}
							className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
						>
							Cari
						</Button>
					</section>
					<section className="md:ms-5 hidden">
						<Dialog
							open={openDialogSignUpIn}
							onOpenChange={setOpenDialogSignUpIn}
						>
							<DialogTrigger asChild>
								<Button variant="outline" className="cursor-pointer">
									Login
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle></DialogTitle>
									<DialogDescription></DialogDescription>
								</DialogHeader>
								<SignInUp
									setOpenCloseDialog={setOpenDialogSignUpIn}
									setOpenCloseDropDownMenu={setOpenDropDownMenu}
								/>
							</DialogContent>
						</Dialog>
					</section>
					<section className="ms-5">
						<DropdownMenu
							open={openDropDownMenu}
							onOpenChange={setOpenDropDownMenu}
						>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
									</svg>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Menu</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
									<section className="w-full flex md:hidden max-w-sm items-center justify-center">
										<Input
											id="search"
											type="text"
											placeholder="..."
											onChange={(e) => setSearch(e.target.value)}
											className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
										/>
										<Button
											type="submit"
											variant="outline"
											onClick={handleSearch}
											className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
										>
											Cari
										</Button>
									</section>
								</DropdownMenuItem>
								{isSignUpIn ? (
									<>
										<DropdownMenuItem
											className="cursor-pointer"
											onSelect={() => {
												setOpenDropDownMenu(false);
												navigate("/cart");
											}}
										>
											Keranjang
										</DropdownMenuItem>
										<DropdownMenuItem
											className="cursor-pointer"
											onSelect={() => {
												setOpenDropDownMenu(false);
												navigate("/subscription");
											}}
										>
											Langganan
										</DropdownMenuItem>
										<DropdownMenuItem
											className="cursor-pointer"
											onSelect={() => {
												setOpenDropDownMenu(false);
												navigate("/order-list");
											}}
										>
											Pesanan
										</DropdownMenuItem>
										<DropdownMenuItem
											className="cursor-pointer"
											onSelect={() => {
												setOpenDropDownMenu(false);
												navigate("/chat");
											}}
										>
											Pesan
										</DropdownMenuItem>
										{!isSeller ? (
											<DropdownMenuItem
												className="cursor-pointer"
												onSelect={() => {
													setOpenDropDownMenu(false);
													navigate("/seller/register");
												}}
											>
												Daftar Penjual
											</DropdownMenuItem>
										) : (
											<DropdownMenuItem
												className="cursor-pointer"
												onSelect={() => {
													setOpenDropDownMenu(false);
													navigate("/seller");
												}}
											>
												Dashboard Penjual
											</DropdownMenuItem>
										)}
										<DropdownMenuItem
											className="cursor-pointer"
											onSelect={() => {
												setOpenDropDownMenu(false);
												navigate("/profile");
											}}
										>
											Profile
										</DropdownMenuItem>
										<DropdownMenuItem
											className="cursor-pointer"
											onSelect={() => {
												setOpenDropDownMenu(false);
												logout();
											}}
										>
											Logout
										</DropdownMenuItem>
									</>
								) : (
									<DropdownMenuItem
										className="cursor-pointer"
										onSelect={(e) => {
											e.preventDefault(); // prevent default close/focus behavior
											setTimeout(() => setOpenDialogSignUpIn(true), 10); // delay to avoid race condition
										}}
									>
										Masuk/Daftar
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</section>
				</section>
			</nav>
		</>
	);
}
