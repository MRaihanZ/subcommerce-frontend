import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useGlobalData } from "@/contexts/GlobalDataContext";
import { GetCsrf } from "@/components/utils/csrf";

import { toast } from "sonner";

export default function SellerRegistration() {
	const [name, setName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [error, setError] = useState<string>();
	const { data, setData, setGlobalToast } = useGlobalData();

	const navigate = useNavigate();

	const handleRegisterSellerSubmit = async () => {
		if (data?.code !== 200) return;
		const csrfToken = await GetCsrf();

		const payload = {
			name: name,
			address: address,
		};

		try {
			const send = await fetch(
				"http://localhost:8080/api/v1/auth/register/seller",
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
				setData({
					code: result.code,
					status: result.status,
					data: {
						is_login: true,
						is_seller: true,
					},
					error: null,
				});
				setGlobalToast("Berhasil Registrasi");
				navigate("/seller");
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
			<section className="mx-auto max-w-md">
				<section className="flex flex-col h-screen justify-center">
					<section className="bg-gradient-to-b from-[#edf2f4] from-10% via-white via-30% to-white to-60% rounded-lg shadow p-5">
						<span className="flex justify-center pt-8">
							{/* <img src="..." alt="Logo" className="w-16" /> */}
							<p className="text-2xl font-bold">SubCommerce</p>
						</span>
						<section className="pt-8 font-bold text-black text-center text-xl tracking-widest uppercase">
							Selamat Datang!
						</section>
						<section className="text-center mb-5 mt-3">
							Isi form dibawah ini untuk menjadi penjual
						</section>
						<form className="bg-grey-lightest py-3">
							{/* {{ csrf_field() }} */}
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
			</section>
		</>
	);
}
