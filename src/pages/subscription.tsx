import { useState, useEffect } from "react";

import { apiUrl } from "@/lib/api";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	// DialogClose,
	DialogContent,
	DialogDescription,
	// DialogFooter,
	DialogHeader,
	DialogTitle,
	// DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import DetailSubscription from "../components/my_components/detailSubscription";

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

function formatCurrency(value: number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(value);
}

export default function Subscription() {
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [subscriptions, setSubscriptions] = useState<UserSubscription[]>();
	const [selectSubscription, setSelectSubscription] =
		useState<UserSubscription>();
	const [loading, setLoading] = useState<boolean>(false);
	// Mock list data – replace with API data
	// const subscriptions: UserSubscription[] = Array.from({ length: 6 }).map(
	// 	(_, i) => ({
	// 		id: `550e8400-e29b-41d4-a716-44665544${i}`,
	// 		order_pretty_id: `ORD-2026-00${i + 1}`,
	// 		seller_name: "Awesome Seller",
	// 		seller_img: "https://placehold.co/48x48",
	// 		product_name: "Premium Subscription",
	// 		product_variant_name: "Gold Plan",
	// 		product_img: "https://placehold.co/64x64",
	// 		price: 200000,
	// 		discount: 25,
	// 		interval: 1,
	// 		interval_name: "month",
	// 		next_send: "2026-01-20",
	// 		next_warning_send: "2026-01-24",
	// 		next_remove: "2026-01-27",
	// 		is_over: i === 4,
	// 	}),
	// );

	const fetchSubs = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/subscriptions/`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setSubscriptions(json.data);
				setLoading(false);
			} else {
				toast.error(json.error);
				setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSubs();
	}, []);

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

	return (
		<>
			<div className="mx-auto max-w-6xl px-4 py-8">
				<h1 className="mb-6 text-xl font-semibold">Langganan</h1>

				{subscriptions === undefined ? (
					<p className="text-center text-3xl">Tidak Ada Langganan</p>
				) : (
					<div className="grid gap-4">
						{subscriptions?.map((sub) => {
							const discountedPrice = Math.floor(
								sub.price - sub.price * (sub.discount / 100),
							);
							return (
								<Card
									key={sub.id}
									onClick={() => {
										setSelectSubscription({
											id: sub.id,
											order_pretty_id: sub.order_pretty_id,
											payment_name: sub.payment_name,
											order_status_name: sub.order_status_name,
											seller_name: sub.seller_name,
											seller_img: sub.seller_img,
											product_id: sub.product_id,
											product_name: sub.product_name,
											product_variant_id: sub.product_variant_id,
											product_variant_name: sub.product_variant_name,
											product_img: sub.product_img,
											quantity: sub.quantity,
											note: sub.note,
											price: sub.price,
											discount: sub.discount,
											interval: sub.interval,
											interval_name: sub.interval_name,
											last_sent_at: sub.last_sent_at,
											next_send: sub.next_send,
											next_warning_send: sub.next_warning_send,
											next_remove: sub.next_remove,
											is_over: sub.is_over,
										});
										setOpenDialog(true);
									}}
									className={
										sub.is_over
											? "rounded-xl transition border-red-500 hover:border-primary/40 bg-black/20 line-through"
											: "rounded-xl transition hover:border-primary/40"
									}
								>
									<CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
										{/* Left */}
										<div className="flex gap-4">
											<img
												src={sub.product_img}
												alt={sub.product_name}
												className="h-16 w-16 rounded-lg border object-cover"
											/>

											<div className="space-y-1">
												<p className="font-medium leading-tight">
													{sub.product_name}
												</p>
												<p className="text-sm text-muted-foreground">
													{sub.product_variant_name === "default"
														? ""
														: sub.product_variant_name}
												</p>
												<p className="text-xs text-muted-foreground">
													Penjual: {sub.seller_name}
												</p>
											</div>
										</div>

										{/* Middle */}
										<div className="flex flex-col gap-1 text-sm">
											<span className="font-semibold">
												{formatCurrency(discountedPrice)}
											</span>
											<span className="text-xs text-muted-foreground line-through">
												{formatCurrency(sub.price)}
											</span>
											<Badge
												variant="secondary"
												className="w-fit text-xs text-red-600"
											>
												-{sub.discount}%
											</Badge>
										</div>

										{/* Right */}
										<div className="flex flex-wrap items-center gap-3 text-sm">
											{toUTCDateNumber(new Date(sub.next_send)) < todayUTC ? (
												<>
													<Badge variant="outline" className="line-through">
														Selanjutnya
													</Badge>
													<span className="line-through">
														{formatDate(sub.next_send)}
													</span>
												</>
											) : (
												<>
													<Badge className="bg-green-600">Selanjutnya</Badge>
													<span>{formatDate(sub.next_send)}</span>
												</>
											)}
											{toUTCDateNumber(new Date(sub.next_warning_send)) <
											todayUTC ? (
												<>
													<Badge variant="outline" className="line-through">
														Akan Berakhir
													</Badge>
													<span className="line-through">
														{formatDate(sub.next_warning_send)}
													</span>
												</>
											) : (
												<>
													<Badge className="bg-yellow-500 text-black">
														Akan Berakhir
													</Badge>
													<span>{formatDate(sub.next_warning_send)}</span>
												</>
											)}
											{toUTCDateNumber(new Date(sub.next_remove)) < todayUTC ? (
												<>
													<Badge variant="outline" className="line-through">
														Jatuh Tempo
													</Badge>
													<span className="line-through">
														{formatDate(sub.next_remove)}
													</span>
												</>
											) : (
												<>
													<Badge variant="destructive">Jatuh Tempo</Badge>
													<span>{formatDate(sub.next_remove)}</span>
												</>
											)}

											{sub.is_over && (
												<Badge variant="destructive">Berakhir</Badge>
											)}
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</div>
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent className="sm:max-w-7xl overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Detail Langganan</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<DetailSubscription data={selectSubscription} />
				</DialogContent>
			</Dialog>
		</>
	);
}
