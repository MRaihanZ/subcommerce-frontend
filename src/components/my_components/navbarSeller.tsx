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
export default function NavbarSeller() {
	const path = useLocation();
	const activePage = path.pathname;

	return (
		<>
			<nav className="container mx-auto flex justify-between py-3 px-3">
				<Link to={"http://" + location.host + "/seller"}>
					Sub Commerce Seller
				</Link>
				<section className="flex">
					<section className="hidden md:block">
						<Link
							to={"http://" + location.host + "/seller"}
							className={
								activePage === "/seller"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Home
						</Link>
						<Link
							to={"http://" + location.host + "/seller/subscription"}
							className={
								activePage === "/seller/subscription"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Langganan
						</Link>
						<Link
							to={"http://" + location.host + "/seller/order"}
							className={
								activePage === "/seller/order"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Pesanan
						</Link>
						<Link
							to={"http://" + location.host + "/seller/product"}
							className={
								activePage === "/seller/product"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Produk
						</Link>
						<Link
							to={"http://" + location.host + "/seller/chat"}
							className={
								activePage === "/seller/chat"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Pesan
						</Link>
						<Link
							to={"http://" + location.host + "/seller/profile"}
							className={
								activePage === "/seller/profile"
									? "w-full border-b-2 border-black mx-3"
									: "w-full mx-3"
							}
						>
							Profile
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
										to={"http://" + location.host + "/seller"}
										className={
											activePage === "/seller"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Home
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/seller/subscription"}
										className={
											activePage === "/seller/subscription"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Langganan
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/seller/order"}
										className={
											activePage === "/seller/order"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Pesanan
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/seller/product"}
										className={
											activePage === "/seller/product"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Produk
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/seller/chat"}
										className={
											activePage === "/seller/chat"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Chat
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/seller/profile"}
										className={
											activePage === "/seller/profile"
												? "w-full border-b-2 border-black mx-3"
												: "w-full mx-3"
										}
									>
										Profile
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
