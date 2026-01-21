import { useState, useEffect } from "react";

import { apiUrl } from "@/lib/importEnv";
import { GetCsrf } from "@/components/utils/csrf";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { toast } from "sonner";

// Mock data shape based on backend struct
export interface UserSubscription {
	id: string;
	order_pretty_id: string;
	payment_name: string;
	order_status_name: string;
	seller_name: string;
	seller_img: string;
	product_id: number;
	product_name: string;
	product_variant_id: number;
	product_variant_name: string;
	product_img: string;
	quantity: number;
	note: string;
	price: number;
	discount: number; // 1-100
	interval: number;
	interval_name: "day" | "week" | "month" | "year";
	last_sent_at: string;
	next_send: string;
	next_warning_send: string;
	next_remove: string;
	is_over: boolean;
}

interface OrderProduct {
	pay_id: number;
	p_id: number;
	pv_id: number;
	note: string;
	quantity: number;
	unit_price: number;
	total_price: number;
}

interface DetailSubscriptionProps {
	data: UserSubscription;
}

function formatCurrency(value: number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(value);
}

export default function DetailSubscription({ data }: DetailSubscriptionProps) {
	const [order, setOrder] = useState<OrderProduct[]>([]);

	const discountedPrice = Math.floor(
		data.price - data.price * (data.discount / 100),
	);

	const discountedTotalPrice = Math.floor(
		data.price * data.quantity -
			data.price * data.quantity * (data.discount / 100),
	);

	useEffect(() => {
		setOrder([
			{
				pay_id: 1,
				p_id: data.product_id,
				pv_id: data.product_variant_id,
				note: data.note,
				quantity: data.quantity,
				unit_price: discountedPrice,
				total_price: discountedTotalPrice,
			},
		]);
	}, [
		data.product_id,
		data.product_variant_id,
		data.note,
		data.quantity,
		discountedPrice,
		discountedTotalPrice,
	]);
	// Replace this with real data from API / loader
	// const data: UserSubscription = {
	// 	id: "550e8400-e29b-41d4-a716-446655440000",
	// 	order_pretty_id: "ORD-2026-0001",
	// 	payment_name: "Midtrans",
	// 	order_status_name: "Active",
	// 	seller_name: "Awesome Seller",
	// 	seller_img: "https://placehold.co/64x64",
	// 	product_id: 1,
	// 	product_name: "Premium Subscription",
	// 	product_variant_id: 10,
	// 	product_variant_name: "Gold Plan",
	// 	product_img: "https://placehold.co/96x96",
	// 	quantity: 1,
	// 	note: "Auto renewal enabled",
	// 	price: 200000,
	// 	discount: 25,
	// 	interval: 1,
	// 	interval_name: "month",
	// 	last_sent_at: "2026-01-10",
	// 	next_send: "2026-01-20",
	// 	next_warning_send: "2026-01-24",
	// 	next_remove: "2026-01-27",
	// 	is_over: false,
	// };

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};
	const toUTCDateNumber = (date: Date) =>
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

	const todayUTC = toUTCDateNumber(new Date());

	const orderHandler = async () => {
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(`${apiUrl}/api/v1/subscriptions/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
				body: JSON.stringify(order),
			});

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				window.location.href = result.data;
			} else {
				toast.error(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
		}
	};

	return (
		<Card className="rounded-2xl shadow-sm">
			<CardHeader className="space-y-2">
				<div className="flex flex-wrap items-center justify-between gap-4">
					{data.is_over ? (
						<Badge variant="destructive" className="text-sm">
							Langganan Sudah Berakhir
						</Badge>
					) : (
						<Badge className="text-sm bg-green-600">Langganan Aktif</Badge>
					)}
				</div>

				{/* IDs */}
				<div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
					<div>
						<span className="block text-xs">ID Langganan</span>
						<span className="font-medium text-foreground">{data.id}</span>
					</div>
					<div>
						<span className="block text-xs">ID Pesanan</span>
						<span className="font-medium text-foreground">
							{data.order_pretty_id}
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-8">
				{/* Seller & Product */}
				<section className="grid gap-6 md:grid-cols-2">
					<div className="flex gap-4">
						<img
							src={data.seller_img}
							alt={data.seller_name}
							className="h-16 w-16 rounded-xl border object-cover"
						/>
						<div>
							<p className="text-sm text-muted-foreground">Penjual</p>
							<p className="font-semibold">{data.seller_name}</p>
							<p className="text-sm text-muted-foreground">
								Pembayaran lewat {data.payment_name}
							</p>
						</div>
					</div>

					<div className="flex gap-4">
						<img
							src={data.product_img}
							alt={data.product_name}
							className="h-20 w-20 rounded-xl border object-cover"
						/>
						<div className="space-y-1">
							<p className="font-semibold">{data.product_name}</p>
							{data.product_variant_name === "default" ? (
								""
							) : (
								<p className="text-sm text-muted-foreground">
									Varian: {data.product_variant_name}
								</p>
							)}
							<p className="text-sm text-muted-foreground">
								kuantitas: {data.quantity}
							</p>
						</div>
					</div>
				</section>

				<Separator />

				{/* Pricing */}
				<section className="flex justify-between">
					<section className="space-y-2 flex gap-7">
						<section>
							<p className="text-sm font-medium">Harga</p>
							<div className="flex items-end gap-4">
								<span className="text-2xl font-bold">
									{formatCurrency(discountedPrice)}
								</span>
								<div className="flex items-center gap-2">
									<span className="text-sm line-through text-red-500">
										{formatCurrency(data.price)}
									</span>
									<Badge variant="secondary" className="text-red-600">
										-{data.discount}%
									</Badge>
								</div>
							</div>
						</section>
						<span className="self-center text-3xl"> | </span>
						<section>
							<p className="text-sm font-medium">Harga Total</p>
							<div className="flex items-end gap-4">
								<span className="text-2xl font-bold">
									{formatCurrency(discountedTotalPrice)}
								</span>
								<div className="flex items-center gap-2">
									<span className="text-sm line-through text-red-500">
										{formatCurrency(data.price * data.quantity)}
									</span>
									<Badge variant="secondary" className="text-red-600">
										-{data.discount}%
									</Badge>
								</div>
							</div>
						</section>
					</section>
					<section className="flex flex-col justify-center items-center">
						{data.is_over ? "" : <p className="mb-3 font-medium">Aksi</p>}
						<section className="flex">
							{data.is_over ? (
								""
							) : toUTCDateNumber(new Date(data.next_send)) > todayUTC ? (
								""
							) : (
								<>
									<Button
										className="cursor-pointer w-25"
										onClick={orderHandler}
									>
										Bayar
									</Button>
									<p className="mx-5"> | </p>
								</>
							)}
							{data.is_over ? (
								""
							) : (
								<Button className="cursor-pointer w-25" variant="destructive">
									Batalkan
								</Button>
							)}
						</section>
					</section>
				</section>

				<Separator />

				{/* Subscription Interval */}
				<section className="space-y-1">
					<p className="text-sm font-medium">Periode Langganan</p>
					<p className="text-sm text-muted-foreground">
						{data.interval} {data.interval_name}
					</p>
				</section>

				<Separator />

				{/* Reminder Timeline */}
				<section className="space-y-4">
					<p className="text-sm font-medium">Tanggal Pengingat Pembayaran</p>

					<div className="grid gap-3 md:grid-cols-3">
						<div className="rounded-xl border p-4">
							<div className="flex items-center justify-between">
								<p className="text-sm">Segera</p>
								<Badge className="bg-green-600">Aktif</Badge>
							</div>
							<p className="mt-2 font-medium">{formatDate(data.next_send)}</p>
							<p className="text-xs text-muted-foreground">
								Email pengingat akan dikirim
							</p>
						</div>

						<div className="rounded-xl border p-4">
							<div className="flex items-center justify-between">
								<p className="text-sm">Akan Berakhir</p>
								<Badge className="bg-yellow-500 text-black">Peringatan</Badge>
							</div>
							<p className="mt-2 font-medium">
								{formatDate(data.next_warning_send)}
							</p>
							<p className="text-xs text-muted-foreground">
								Email pengingat terakhir sebelum jatuh tempo
							</p>
						</div>

						<div className="rounded-xl border p-4">
							<div className="flex items-center justify-between">
								<p className="text-sm">Tanggal Jatuh Tempo</p>
								<Badge variant="destructive">Jatuh tempo</Badge>
							</div>
							<p className="mt-2 font-medium">{formatDate(data.next_remove)}</p>
							<p className="text-xs text-muted-foreground">
								Batas Akhir Pembayaran
							</p>
						</div>
					</div>

					{data.is_over && (
						<div className="rounded-xl border border-red-500/40 bg-red-50 p-4 text-sm text-red-700">
							Langganan ini telah melewati tanggal perpanjangannya dan sudah
							tidak aktif lagi.
						</div>
					)}
				</section>

				{data.note && (
					<>
						<Separator />
						<section>
							<p className="text-sm font-medium">Note</p>
							<p className="text-sm text-muted-foreground">{data.note}</p>
						</section>
					</>
				)}
			</CardContent>
		</Card>
	);
}
