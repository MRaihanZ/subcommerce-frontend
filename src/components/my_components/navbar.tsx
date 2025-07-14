import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Link, useNavigate } from "react-router";
import { useState } from "react";
export default function Navbar() {
	const [openDialog, setOpenDialog] = useState(false);
	const [isSignUpIn, setIsSignUpIn] = useState(0);
	const navigate = useNavigate();
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
									<DialogDescription>
										<SignInUp
											isSignUpIn={setIsSignUpIn}
											setOpenCloseDialog={setOpenDialog}
										/>
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
								{isSignUpIn === 1 ? (
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
												to={"http://" + location.host + "/profile"}
												className="w-full"
											>
												Profile
											</Link>
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
