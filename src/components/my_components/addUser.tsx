import { useState } from "react";

import { apiUrl } from "@/lib/api";

import { CreateCsrf } from "../utils/csrf";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function AddUser() {
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [inputRequired, setInputRequired] = useState(false);
	const [emailExist, setEmailExist] = useState<boolean>();

	function formatDateLocal(date: Date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	const handleSubmit = async () => {
		if (name === "") {
			setInputRequired(true);
			return;
		} else if (email === "") {
			setInputRequired(true);
			return;
		} else if (date === undefined) {
			setInputRequired(true);
			return;
		} else if (password === "") {
			setInputRequired(true);
			return;
		}
		const csrfToken = await CreateCsrf();

		const payload = {
			name: name,
			email: email,
			dob: formatDateLocal(date),
			password: password,
		};

		try {
			const send = await fetch(`${apiUrl}/api/v1/admins/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: JSON.stringify(payload),
			});

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				toast("Berhasil menambahkan user baru");
				window.location.reload();
			} else if (result.code === 409 && result.status === "error") {
				setEmailExist(true);
			} else {
				toast(result.error);
				setError(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast(errFetch);
			setError(errFetch);
			// setLoading(false);
		}
	};
	return (
		<>
			<section>
				<form className="bg-grey-lightest py-3">
					{/* {{ csrf_field() }} */}
					<section className="mb-3">
						<label htmlFor="name">Nama</label>
						<input
							className="border w-full p-3 rounded-lg"
							name="name"
							type="text"
							id="name"
							placeholder="Nama..."
							required
							onChange={(e) => setName(e.target.value)}
							onFocus={() => {
								setEmailExist(false);
								setInputRequired(false);
							}}
						/>
					</section>
					<section className="mb-3">
						<label htmlFor="email">Email</label>
						<input
							className="border w-full p-3 rounded-lg"
							name="email"
							type="email"
							id="email"
							placeholder="Email..."
							required
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => {
								setEmailExist(false);
								setInputRequired(false);
							}}
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
									required
									onSelect={(date) => {
										setDate(date);
										setOpen(false);
										setInputRequired(false);
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
							required
							onChange={(e) => setPassword(e.target.value)}
							onFocus={() => {
								setEmailExist(false);
								setInputRequired(false);
							}}
						/>
					</section>
					{inputRequired === true ? (
						<p className="mb-6 ms-1 text-red-500 font-semibold">
							Nama, email, tanggal dan password harus diisi
						</p>
					) : (
						""
					)}
					{emailExist === true ? (
						<p className="mb-6 ms-1 text-red-500 font-semibold">
							Email sudah terdaftar
						</p>
					) : (
						""
					)}
					<section className="flex">
						<button
							type="button"
							className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider"
							onClick={handleSubmit}
						>
							Submit
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
		</>
	);
}
