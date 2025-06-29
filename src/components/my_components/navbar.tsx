import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
export default function Navbar() {
	return (
		<>
			<nav className="container mx-auto md:px-4 flex justify-between">
				<p>Sub Commerce</p>

				<section className="flex">
					<section className="flex w-full max-w-sm items-center">
						<label htmlFor="search">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="currentColor"
							>
								<path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
							</svg>
						</label>
						<Input
							id="search"
							type="text"
							placeholder="Search"
							className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
						/>
						<Button
							type="submit"
							variant="outline"
							className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1"
						>
							Search
						</Button>
					</section>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Login</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you absolutely sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanently delete
									your account and remove your data from our servers.
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</section>
			</nav>
		</>
	);
}
