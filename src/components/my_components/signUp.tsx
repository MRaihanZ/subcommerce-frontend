import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface SignUpProps {
	setOpenCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp({ setOpenCloseDialog }: SignUpProps) {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [open, setOpen] = useState(false);
	return (
		<>
			<section className="mx-auto max-w-md">
				{/* <!-- ... --> */}

				<section>
					<span className="flex justify-center pt-8">
						{/* <img src="..." alt="Logo" className="w-16" /> */}
						<p className="text-2xl font-bold">SubCommerce</p>
					</span>
					<section className="pt-8 font-bold text-black text-center text-xl tracking-widest uppercase">
						Welcome!
					</section>
					<section className="text-center mb-5 mt-3">
						Please enter your details to sign up.
					</section>
					<form className="bg-grey-lightest py-3">
						{/* {{ csrf_field() }} */}
						<section className="mb-3">
							<label htmlFor="name">Full Name</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="name"
								type="text"
								id="name"
								placeholder="Enter your full name..."
							/>
						</section>
						<section className="mb-3">
							<label htmlFor="email">E-Mail Address</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="email"
								type="email"
								id="email"
								placeholder="Enter your E-Mail..."
							/>
						</section>
						<section className="flex flex-col mb-3">
							<Label htmlFor="date" className="mb-1 font-normal">
								Tanggal Lahir
							</Label>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										id="date"
										className="w-full justify-between font-normal"
									>
										{date ? date.toLocaleDateString() : "Pilih Tanggal"}
										<CalendarIcon />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto overflow-hidden p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={date}
										captionLayout="dropdown"
										onSelect={(date) => {
											setDate(date);
											setOpen(false);
										}}
										className="mx-auto"
									/>
								</PopoverContent>
							</Popover>
						</section>
						<section className="mb-6">
							<label htmlFor="password">Password</label>
							<input
								className="border w-full p-3 rounded-lg"
								name="password"
								type="password"
								id="password"
								placeholder="* * * * * * * * * *"
							/>
						</section>
						<section className="flex">
							<button
								type="button"
								className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider"
								onClick={() => {
									setOpenCloseDialog(false);
								}}
							>
								Daftar
							</button>
						</section>
					</form>

					{/* <section className="border-t px-24 py-6 flex justify-center">
						<a
							href="/"
							className="font-bold text-primary hover:text-primary-dark no-underline"
						>
							Already have an account?
						</a>
					</section> */}
				</section>
			</section>
		</>
	);
}
