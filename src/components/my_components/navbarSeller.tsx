import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
			<nav className="container mx-auto flex justify-between py-3">
				<Link to={"http://" + location.host + "/seller"}>
					Sub Commerce Seller
				</Link>
				<section className="flex">
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
						to={"http://" + location.host + "/seller/item"}
						className={
							activePage === "/seller/item"
								? "w-full border-b-2 border-black mx-3"
								: "w-full mx-3"
						}
					>
						Barang
					</Link>
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
										to={"http://" + location.host + "/cart"}
										className="w-full"
									>
										Keranjang
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										to={"http://" + location.host + "/chat"}
										className="w-full"
									>
										Pesan
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
