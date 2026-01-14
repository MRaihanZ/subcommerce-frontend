import { useState } from "react";

import { CreateCsrf } from "../utils/csrf";

import { toast } from "sonner";

interface Admin {
	id: string;
	name: string;
	email: string;
}

interface EditAdminProps {
	data: Admin;
}

export default function EditAdmin({ data }: EditAdminProps) {
	const [name, setName] = useState<string>(data.name);
	const [email, setEmail] = useState<string>(data.email);
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [inputRequired, setInputRequired] = useState(false);
	const [emailExist, setEmailExist] = useState<boolean>();

	const handleSubmit = async () => {
		if (name === "") {
			setInputRequired(true);
			return;
		} else if (email === "") {
			setInputRequired(true);
			return;
		}
		const csrfToken = await CreateCsrf();

		const payload = new FormData();
		payload.append("name", name);
		payload.append("email", email);
		payload.append("password", password);

		try {
			const send = await fetch(
				"http://localhost:8080/api/v1/admins/" + data.id,
				{
					method: "PATCH",
					headers: {
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: payload,
				}
			);

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				toast("Profile berhasil di update");
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
							value={name}
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
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => {
								setEmailExist(false);
								setInputRequired(false);
							}}
						/>
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
							Nama dan email harus diisi
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
