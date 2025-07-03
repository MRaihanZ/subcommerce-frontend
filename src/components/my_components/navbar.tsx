import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
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
import { Link } from "react-router";

export default function Navbar() {
	return (
		<>
			<nav className="container mx-auto flex justify-between py-3">
				<Link to={"http://" + location.host}>Sub Commerce</Link>
				<section className="flex">
					<section className="flex w-full max-w-sm items-center">
						<Label htmlFor="search">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="currentColor"
							>
								<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
							</svg>
						</Label>
						<Input
							id="search"
							type="text"
							placeholder="Search"
							className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
						/>
						<Button
							type="submit"
							variant="outline"
							className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
						>
							Search
						</Button>
					</section>
					<section className="ms-5">
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" className="cursor-pointer">
									Login
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogDescription>
										<SignInUp />
									</DialogDescription>
								</DialogHeader>
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
										fill="#e3e3e3"
									>
										<path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
									</svg>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Menu</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to={"http://" + location.host + "/cart"}>Cart</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to={"http://" + location.host + "/chat"}>Chat</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Become Seller</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</section>
				</section>
			</nav>
		</>
	);
}
