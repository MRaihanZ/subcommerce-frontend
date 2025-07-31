import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useGlobalData } from "@/contexts/GlobalDataContext";

import { GetCsrf } from "@/components/utils/csrf";

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
	const [openDialog, setOpenDialog] = useState(false);
	const [isSignUpIn, setIsSignUpIn] = useState(false);
	const [notFound, setNotFound] = useState<boolean>();
	const [error, setError] = useState<string | null>(null);
	const [id, setId] = useState<string | null>(null);

	const { setData, setGlobalLoading } = useGlobalData();

	const navigate = useNavigate();

	const locate = useLocation();
	useEffect(() => {
		const isLogin = async () => {
			try {
				const send = await fetch("http://localhost:8080/api/v1/auth/status", {
					credentials: "include",
				}).then();

				const result = await send.json();
				if (result.code === 200 && result.status === "ok") {
					setIsSignUpIn(true);
					setData(result);
					setGlobalLoading(false);
				} else {
					setIsSignUpIn(false);
					setData({ error: result.error });
					setGlobalLoading(false);
				}
			} catch (err) {
				const errFetch = "Network Error: " + err;
				setData({ error: errFetch });
				setNotFound(true);
				setGlobalLoading(false);
			}
		};
		isLogin();
	}, [locate.pathname]);

	const logout = async () => {
		const csrfToken = await GetCsrf();
		if (csrfToken === "error") {
			setError("Error getting token");
		}
		try {
			const send = await fetch("http://localhost:8080/api/v1/auth/logout", {
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
				setId(null);
				window.location.reload();
			} else {
				setError(result.error);
				console.log(error);
				setNotFound(true);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setData({ error: errFetch });
			// setLoading(false);
		}
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
							className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
						/>
						<Button
							type="submit"
							variant="outline"
							onClick={() => navigate("/search")}
							className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
						>
							Cari
						</Button>
					</section>
					<section className="md:ms-5 hidden">
						<Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
								<SignInUp setOpenCloseDialog={setOpenDialog} />
							</DialogContent>
						</Dialog>
					</section>
					<section className="ms-5">
						<DropdownMenu>
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
											className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
										/>
										<Button
											type="submit"
											variant="outline"
											className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
										>
											Cari
										</Button>
									</section>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/cart?user=" + id}
										className="w-full"
									>
										Keranjang
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/chat?user=" + id}
										className="w-full"
									>
										Pesan
									</Link>
								</DropdownMenuItem>
								{isSignUpIn ? (
									<>
										<DropdownMenuItem>
											<Link
												to={"http://" + location.host + "/seller/register"}
												className="w-full"
											>
												Daftar Penjual
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Link
												to={"http://" + location.host + "/profile?user=" + id}
												className="w-full"
											>
												Profile
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Button
												variant="outline"
												className="border-0 shadow-none w-full justify-start p-0 font-normal h-5 bg-transparent cursor-pointer"
												onClick={logout}
											>
												Logout
											</Button>
										</DropdownMenuItem>
									</>
								) : (
									<DropdownMenuItem
										onSelect={(e) => {
											e.preventDefault(); // prevent default close/focus behavior
											setTimeout(() => setOpenDialog(true), 10); // delay to avoid race condition
										}}
										className="cursor-pointer"
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
