import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router";
export default function NavbarAdmin() {
	const path = useLocation();
	const activePage = path.pathname;

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
							Home
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
						<Link to={"http://" + location.host} className="w-full mx-3">
							Kembali
						</Link>
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
										Home
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/seller/users"}
										className={
											activePage === "/seller/users"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Users
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/seller/sellers"}
										className={
											activePage === "/seller/sellers"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Sellers
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to={"http://" + location.host} className="w-full mx-3">
										Kembali
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</section>
				</section>
			</nav>
		</>
	);
}
