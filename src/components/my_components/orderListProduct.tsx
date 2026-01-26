import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/importEnv";

import { GetCsrf } from "@/components/utils/csrf";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export interface OrderProducts {
	o_id: number;
	order_uq_id: string;
	o_order_pretty_id: string;
	pay_name: string;
	os_name: string;
	rating: boolean;
	p_id: number;
	pv_id: number;
	s_name: string;
	s_img: string;
	p_name: string;
	p_img: string;
	active: string;
	pv_name: string;
	interval: number;
	i_name: string;
	note: string;
	payment_link: string;
	quantity: number;
	total_price: number;
}

interface OrderListProductProps {
	data: OrderProducts;
}

export default function OrderListProduct({ data }: OrderListProductProps) {
	const [penilaian, setPenilaian] = useState(false);
	const [rate, setRate] = useState<number>(0);
	const [comment, setComment] = useState<string>("");
	const [error, setError] = useState<string>();

	const handleOrderRatingSubmit = async () => {
		if (!rate) {
			toast.warning("Pilih rating terlebih dahulu");
			return;
		}
		const csrfToken = await GetCsrf();

		const payload = {
			rating: rate,
			comment: comment,
		};

		try {
			const send = await fetch(
				`${apiUrl}/api/v1/ratings/` +
					data.p_id +
					"/" +
					data.pv_id +
					"/" +
					data.o_id,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: JSON.stringify(payload),
				},
			);

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				setPenilaian((prev) => !prev);
				toast.success("Berhasil memberikan penilaian");
			} else {
				toast.error(result.error);
				setError(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
		}
	};

	const handleStatus = async (status: number) => {
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(
				`${apiUrl}/api/v1/orders/` + data.o_id + "/" + status,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
				},
			);

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				window.location.reload();
			} else {
				toast.error(result.error);
				setError(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
		}
	};

	const handleCancelPayment = async () => {
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(
				`${apiUrl}/api/v1/orders/cancel/${data.order_uq_id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
				},
			);

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				window.location.reload();
			} else {
				toast.error(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
		}
	};

	const handlePaymentLink = (payment_url: string) => {
		window.location.href = payment_url;
	};

	if (error) {
		return <p>{error}</p>;
	}
	return (
		<>
			<section className="ms-3 mt-5 py-5 px-5 border rounded-md">
				<section className="flex justify-between items-center ms-6 mb-5">
					<section className="flex items-center">
						<Avatar>
							<AvatarImage src={data.s_img} />
							<AvatarFallback>Image Profile Seller</AvatarFallback>
						</Avatar>
						<p className="ms-3 font-semibold">{data.s_name}</p>
					</section>
					<section>
						<p>
							{data.o_order_pretty_id} | {data.order_uq_id}
						</p>
					</section>
				</section>
				<section className="flex">
					<section className="flex-none my-auto">
						<img src={data.p_img} alt="" className="w-40 h-40 ms-3" />
					</section>
					<section className="flex-auto ms-5">
						<p className="my-3 text-lg">
							{data.p_name}
							{data.pv_name === "default" ? "" : " - " + data.pv_name}
						</p>
						<section className="flex justify-between">
							<section>
								{data.pv_name === "default" ? (
									""
								) : (
									<p>
										variant:
										<Badge variant="outline" className="mx-1">
											{data.pv_name}
										</Badge>
									</p>
								)}
								<p>
									Periode:
									<Badge variant="outline" className="mx-1">
										{data.interval + " " + data.i_name}
									</Badge>
								</p>
								<p>
									Jumlah:
									<Badge variant="outline" className="ms-1">
										{data.quantity}
									</Badge>
								</p>
								<p>
									Harga Total: Rp
									{new Intl.NumberFormat("id-ID").format(data.total_price)}
								</p>
							</section>
							<section>
								<p>
									pembayaran:
									<Badge variant="default" className="ms-1">
										{data.pay_name}
									</Badge>
								</p>
								<p>
									status:
									<Badge variant="default" className="ms-1">
										{data.os_name}
									</Badge>
								</p>
								<p>
									note:
									<Badge variant="outline" className="ms-1">
										{data.note ? data.note : "-"}
									</Badge>
								</p>
							</section>
						</section>
					</section>
				</section>
				<section className="flex justify-end">
					{data.os_name === "menunggu pembayaran" ? (
						<>
							<Button
								className="cursor-pointer mt-5"
								variant="destructive"
								onClick={() => {
									handleCancelPayment();
								}}
							>
								Batalkan pembayaran
							</Button>
							<Button
								className="cursor-pointer mt-5 ms-3"
								onClick={() => handlePaymentLink(data.payment_link)}
							>
								Bayar
							</Button>
						</>
					) : (
						""
					)}
					{data.os_name === "sedang dalam proses" ? (
						<>
							<Button
								className="cursor-pointer mt-5"
								variant="destructive"
								onClick={() => {
									handleCancelPayment();
								}}
							>
								Batalkan pembayaran
							</Button>
							<Button
								className="cursor-pointer mt-5 ms-3"
								onClick={() => handlePaymentLink(data.payment_link)}
							>
								Bayar
							</Button>
						</>
					) : (
						""
					)}
					{/* {data.os_name === "menunggu konfirmasi seller" ? (
						<Button
							className="cursor-pointer mt-5"
							variant="destructive"
							onClick={() => {
								handleStatus(6);
							}}
						>
							Batalkan pesanan
						</Button>
					) : (
						""
					)} */}
					{data.os_name === "produk sudah dikirim" ? (
						<section className="mt-5">
							<Button
								className="cursor-pointer"
								onClick={() => {
									handleStatus(10);
								}}
							>
								Produk diterima
							</Button>
							<Button
								className="cursor-pointer ms-3"
								variant="destructive"
								onClick={() => {
									handleStatus(9);
								}}
							>
								Produk tidak diterima
							</Button>
						</section>
					) : (
						""
					)}
					{data.os_name === "pesanan selesai" && data.rating === false ? (
						<Button
							className="cursor-pointer mt-5"
							onClick={() => setPenilaian((prev) => !prev)}
						>
							Beri Nilai
						</Button>
					) : (
						""
					)}
				</section>
				{penilaian ? (
					<section className="mt-5">
						<section className="flex items-center gap-3 mb-3">
							<p>Beri Penilaian:</p>
							<Button
								variant={rate === 1 ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => setRate(1)}
							>
								⭐
							</Button>
							<Button
								variant={rate === 2 ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => setRate(2)}
							>
								⭐⭐
							</Button>
							<Button
								variant={rate === 3 ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => setRate(3)}
							>
								⭐⭐⭐
							</Button>
							<Button
								variant={rate === 4 ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => setRate(4)}
							>
								⭐⭐⭐⭐
							</Button>
							<Button
								variant={rate === 5 ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => setRate(5)}
							>
								⭐⭐⭐⭐⭐
							</Button>
						</section>
						<section className="w-full mb-5">
							<Label htmlFor="note" className="mb-1">
								Komen
							</Label>
							<textarea
								className="border w-full p-3 rounded-lg"
								id="note"
								name="note"
								placeholder="..."
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								rows={3}
							></textarea>
						</section>
						<Button
							className="cursor-pointer w-full"
							onClick={handleOrderRatingSubmit}
						>
							Kirim
						</Button>
					</section>
				) : (
					""
				)}
			</section>
		</>
	);
}
