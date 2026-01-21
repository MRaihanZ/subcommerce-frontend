import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import { useGlobalData } from "@/contexts/GlobalDataContext";
import { GetCsrf } from "@/components/utils/csrf";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function NavbarAdmin() {
	const [notFound, setNotFound] = useState<boolean>();
	const [error, setError] = useState<string | null>(null);

	const path = useLocation();
	const activePage = path.pathname;
	const navigate = useNavigate();

	const { setData } = useGlobalData();

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
				window.location.assign("/");
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
	return (
		<>
			<nav className="container mx-auto flex justify-between py-3 px-3">
				<Link to={"http://" + location.host + "/admin"}>
					Sub Commerce Admin
				</Link>
				<section className="flex">
					<section className="hidden md:block">
						<Link
							to={"http://" + location.host + "/admin"}
							className={
								activePage === "/admin"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Admin
						</Link>
						<Link
							to={"http://" + location.host + "/admin/users"}
							className={
								activePage === "/admin/users"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Users
						</Link>
						<Link
							to={"http://" + location.host + "/admin/sellers"}
							className={
								activePage === "/admin/sellers"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Sellers
						</Link>
						<Link
							to={"http://" + location.host + "/admin/products"}
							className={
								activePage === "/admin/products"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Products
						</Link>
						<Button
							variant="link"
							onClick={() => logout()}
							className="cursor-pointer hover:no-underline"
						>
							Logout
						</Button>
					</section>
					<section className="block md:hidden">
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
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/admin"}
										className={
											activePage === "/admin"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Admin
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/admin/users"}
										className={
											activePage === "/admin/users"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Users
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/admin/sellers"}
										className={
											activePage === "/admin/sellers"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Sellers
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/admin/products"}
										className={
											activePage === "/admin/products"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Products
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="w-full mx-3 cursor-pointer"
									onSelect={() => logout()}
								>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</section>
				</section>
			</nav>
		</>
	);
}
