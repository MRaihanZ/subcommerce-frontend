import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/importEnv";
import { GetCsrf } from "../utils/csrf";

import { toast } from "sonner";

interface PayoutData {
	name: string;
	pay_id: string;
	amount: number;
	description: string;
}

interface CreatePayoutProps {
	walletAmount: number;
}

export default function CreatePayout({ walletAmount }: CreatePayoutProps) {
	const [inputRequired, setInputRequired] = useState(false);
	const [name, setName] = useState<string>("");
	const [payId, setPayId] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);
	const [description, setDescription] = useState<string>("");

	useEffect(() => {
		if (amount < 0) {
			setAmount(0);
		}
		if (amount >= walletAmount) {
			setAmount(walletAmount);
		}
	}, [amount]);

	const handleSubmit = async () => {
		if (name === "") {
			setInputRequired(true);
			return;
		} else if (payId === "") {
			setInputRequired(true);
			return;
		} else if (amount === 0) {
			setInputRequired(true);
			return;
		} else if (description === "") {
			setInputRequired(true);
			return;
		}
		const csrfToken = await GetCsrf();

		const payload: PayoutData = {
			name: name,
			pay_id: payId,
			amount: amount,
			description: description,
		};

		try {
			const send = await fetch(`${apiUrl}/api/v1/payments/payout`, {
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
				toast(
					"Berhasil menambahkan permintaan pengiriman uang ke dalam antrian",
				);
				window.location.reload();
			} else {
				toast.error(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
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
								setInputRequired(false);
							}}
						/>
					</section>
					<section className="mb-3">
						<label htmlFor="noTelp">Nomor Telepon</label>
						<input
							className="border w-full p-3 rounded-lg"
							name="noTelp"
							type="text"
							id="noTelp"
							placeholder="Nomor Telepon..."
							required
							onChange={(e) => setPayId(e.target.value)}
							onFocus={() => {
								setInputRequired(false);
							}}
						/>
					</section>
					<section className="mb-3">
						<label htmlFor="jumlah">Jumlah</label>
						<input
							className="border w-full p-3 rounded-lg"
							name="jumlah"
							type="number"
							id="jumlah"
							placeholder="Jumlah..."
							value={amount}
							required
							onChange={(e) => setAmount(Number(e.target.value))}
							onFocus={() => {
								setInputRequired(false);
							}}
						/>
					</section>
					<section className="mb-6">
						<label htmlFor="description">Deskripsi</label>
						<input
							className="border w-full p-3 rounded-lg"
							name="description"
							type="text"
							id="description"
							placeholder="Deskripsi..."
							required
							onChange={(e) => setDescription(e.target.value)}
							onFocus={() => {
								setInputRequired(false);
							}}
						/>
					</section>
					{inputRequired === true ? (
						<p className="mb-6 ms-1 text-red-500 font-semibold">
							Nama, nomor telepon, jumlah, deskripsi harus diisi
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
			</section>
		</>
	);
}
