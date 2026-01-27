import { useState, useEffect } from "react";

import { apiUrl } from "@/lib/importEnv";

import { GetCsrf } from "../components/utils/csrf";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	// TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Payout {
	id: string;
	seller_name: string;
	created_at: string; // time.Time → ISO string (from JSON)

	transfer_name: string;
	transfer_type: string;
	transfer_id: string;
	transfer_amount: number;
	transfer_description: string;
	transfer_status: string | null;
}

export default function AdminPayout() {
	const [payouts, setPayouts] = useState<Payout[] | null>(null);
	// const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const fetchAdmins = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/admins/payout`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setPayouts(json.data);
				setLoading(false);
			} else {
				toast.error(json.error);
				setError(json.error);
				setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setError(errFetch);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchAdmins();
	}, []);

	// const fetchAdmin = async () => {
	// 	try {
	// 		const res = await fetch(`${apiUrl}/api/v1/admins/` + search, {
	// 			credentials: "include",
	// 		});
	// 		const json = await res.json();
	// 		if (json.code === 200 && json.status === "ok") {
	// 			setAdmins(json.data);
	// 			setLoading(false);
	// 		} else {
	// 			toast.error(json.error);
	// 			setError(json.error);
	// 			setLoading(false);
	// 		}
	// 	} catch (err) {
	// 		const errFetch = "Network Error: " + err;
	// 		toast.error(errFetch);
	// 		setError(errFetch);
	// 		setLoading(false);
	// 	}
	// };

	// const handleSearch = () => {
	// 	if (search !== "") {
	// 		fetchAdmin();
	// 	} else {
	// 		fetchAdmins();
	// 	}
	// };

	// useEffect(() => {
	// 	if (search === "") {
	// 		fetchAdmins();
	// 	}
	// }, [search]);

	const processPayoutHandler = async (payId: string) => {
		const csrfToken = await GetCsrf();
		// const payId = await getPayId();

		const payload = {
			status: "permintaan sedang diproses",
		};

		try {
			const send = await fetch(`${apiUrl}/api/v1/admins/payout/` + payId, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: JSON.stringify(payload),
			});

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				toast("Berhasil diproses");
				window.location.reload();
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

	if (loading) return <p>Loading...</p>;
	if (error) {
		toast.error(error);
	}
	if (!payouts) toast.error("No item found");
	return (
		<>
			<section className="my-7">
				<section className="flex justify-between mb-3">
					{/* <section className="w-full flex-1 flex max-w-3xs sm:max-w-2xs md:max-w-xs lg:max-w-sm items-center justify-center">
						<Input
							id="search"
							type="text"
							placeholder="..."
							onChange={(e) => setSearch(e.target.value)}
							className="rounded-r-none border-l-1 border-t-1 border-r-0 border-b-1"
						/>
						<Button
							type="submit"
							variant="outline"
							onClick={() => handleSearch()}
							className="rounded-l-none border-l-1 border-t-1 border-r-1 border-b-1 cursor-pointer"
						>
							Cari
						</Button>
					</section> */}
				</section>
				<Table>
					<TableCaption>Tarik Uang</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Id</TableHead>
							<TableHead>Nama Penjual</TableHead>
							<TableHead>Atas Nama</TableHead>
							<TableHead>Tipe Pembayaran</TableHead>
							<TableHead>Nomor</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Deskripsi</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-center">Aksi</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{payouts?.map((payout) => (
							<TableRow key={payout.id}>
								<TableCell>{payout.id}</TableCell>
								{/* <TableCell className="max-w-50 truncate">
									{payout.seller_name}
								</TableCell> */}
								<TableCell>{payout.seller_name}</TableCell>
								<TableCell>{payout.transfer_name}</TableCell>
								<TableCell>{payout.transfer_type}</TableCell>
								<TableCell>{payout.transfer_id}</TableCell>
								<TableCell>{payout.transfer_amount}</TableCell>
								<TableCell className="max-w-50 truncate">
									{payout.transfer_description}
								</TableCell>
								<TableCell>{payout.transfer_status}</TableCell>
								<TableCell>
									<section className="flex flex-col justify-center items-center gap-3 py-5">
										{payout.transfer_status ===
										"permintaan sedang dalam antrian" ? (
											<Button
												className="cursor-pointer w-full"
												variant="default"
												onClick={() => {
													processPayoutHandler(payout.id);
												}}
											>
												Proses
											</Button>
										) : (
											""
										)}
									</section>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{/* <TableFooter>
							<TableRow>
								<TableCell colSpan={5} className="text-right">
									Total: Rp750.000
								</TableCell>
							</TableRow>
						</TableFooter> */}
				</Table>
			</section>
		</>
	);
}
