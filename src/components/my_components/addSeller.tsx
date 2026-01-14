import { useState } from "react";

import { GetCsrf } from "@/components/utils/csrf";

import { toast } from "sonner";

export default function AddSeller() {
	const [id, setId] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [error, setError] = useState<string>();

	const handleRegisterSellerSubmit = async () => {
		const csrfToken = await GetCsrf();

		const payload = {
			name: name,
			address: address,
		};

		try {
			const send = await fetch(
				"http://localhost:8080/api/v1/admins/sellers/" + id,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: JSON.stringify(payload),
				}
			);

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				toast("Berhasil menambahkan seller baru");
				window.location.reload();
			} else {
				toast.error(result.error);
				setError(result.error);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setError(errFetch);
		}
	};
	return (
		<>
			<form className="bg-grey-lightest py-3">
				{/* {{ csrf_field() }} */}
				<section className="mb-3">
					<label htmlFor="id">Id User</label>
					<input
						className="border w-full p-3 rounded-lg"
						name="id"
						type="text"
						id="id"
						value={id}
						placeholder="Masukkan id user..."
						onChange={(e) => setId(e.target.value)}
					/>
				</section>
				<section className="mb-3">
					<label htmlFor="name">Nama Toko</label>
					<input
						className="border w-full p-3 rounded-lg"
						name="name"
						type="text"
						id="name"
						value={name}
						placeholder="Masukkan nama toko..."
						onChange={(e) => setName(e.target.value)}
					/>
				</section>
				<section className="mb-3">
					<label htmlFor="alamat">Alamat Toko</label>
					<input
						className="border w-full p-3 rounded-lg"
						name="alamat"
						type="text"
						id="alamat"
						value={address}
						placeholder="Masukkan alamat toko..."
						onChange={(e) => setAddress(e.target.value)}
					/>
				</section>
				<section className="flex">
					<button
						type="button"
						className="cursor-pointer bg-black rounded-lg hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider"
						onClick={handleRegisterSellerSubmit}
					>
						Submit
					</button>
				</section>
			</form>
		</>
	);
}
