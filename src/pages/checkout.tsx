import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import { GetCsrf } from "@/components/utils/csrf";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/components/hooks/use-media-query";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

import CheckoutItem from "@/components/my_components/checkoutItem";

interface Payment {
	p_id: number;
	p_name: string;
	category_payment_id: number;
	cp_name: string;
}

interface CheckoutProduct {
	p_id: number;
	pv_id: number;
	s_name: string;
	s_img: string;
	p_name: string;
	p_img: string;
	pv_name: string;
	interval: string;
	i_name: string;
	quantity: number;
	total_price: number;
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

interface PaymentListsProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	payments: Payment[] | null;
	categoryPayments: string[] | null;
	setSelectedPaymentId: React.Dispatch<React.SetStateAction<number>>;
	setSelectedPaymentName: React.Dispatch<React.SetStateAction<string | null>>;
	setPaymentPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function Checkout() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [payments, setPayments] = useState<Payment[] | null>(null);
	const [categoryPayments, setCategoryPayments] = useState<string[] | null>(
		null,
	);
	const selectedPaymentId = 1;
	const [selectedPaymentName, setSelectedPaymentName] = useState<string | null>(
		null,
	);

	const [checkout, setCheckout] = useState<CheckoutProduct[] | null>(null);
	const servicePrice = 3000;
	const [paymentPrice, setPaymentPrice] = useState<number>(0);
	const [totalPriceProduct, setTotalPriceProduct] = useState<number>(0);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	const [order, setOrder] = useState<OrderProduct[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const navigate = useNavigate();

	useEffect(() => {
		// Checkout
		const fetchCheckout = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/v1/orders/checkouts`, {
					credentials: "include",
				});
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					toast.success("Berhasil mengambil data checkout");
					setCheckout(json.data);
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
		fetchCheckout();

		// Payments
		const fetchPayments = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/v1/orders/payments`, {
					credentials: "include",
				});
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setPayments(json.data);
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
		fetchPayments();
	}, []);

	useEffect(() => {
		const allCategories = payments?.map((item) => item.cp_name);
		const uniqueCategories = Array.from(new Set(allCategories));

		setCategoryPayments(uniqueCategories);
	}, [payments]);

	useEffect(() => {
		if (checkout) {
			const total = checkout.reduce(
				(total, price) => total + price.total_price,
				0,
			);
			setTotalPriceProduct(total);
			setTotalPrice(total + servicePrice);
		}
	}, [checkout, paymentPrice]);

	const handleOrderSubmit = async () => {
		// if (!selectedPaymentName) {
		// 	toast.warning("Pilih jenis pembayaran terlebih dahulu");
		// 	return;
		// }
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(`${apiUrl}/api/v1/orders/`, {
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
			setError(errFetch);
		}
	};

	const handleCancelOrderSubmit = async () => {
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(`${apiUrl}/api/v1/orders/checkouts`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"X-CSRF-TOKEN": csrfToken,
				},
				credentials: "include",
			});

			const result = await send.json();
			if (result.code === 200 && result.status === "ok") {
				navigate("/");
			} else {
				toast.error(result.error);
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	if (!checkout) return <p>Produk tidak ditemukan</p>;
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-6 lg:col-start-2">
					<p className="font-semibold text-2xl">Checkout</p>
					<section className="mt-5">
						<section className="mb-3">
							<section className="border rounded-md">
								{checkout.map((item, index) => (
									<CheckoutItem
										key={index}
										data={item}
										index={index}
										orderFunc={setOrder}
										selectedPaymentId={selectedPaymentId}
										globalTotalPrice={totalPrice}
									/>
								))}
							</section>
						</section>
					</section>
				</section>
				<section className="col-span-12 lg:col-span-4 ms-3 mb-5 lg:ms-5 mt-5 lg:mt-13">
					<section className="py-7 px-5 bottom-0 bg-white border rounded-md">
						<section className="mb-5">
							<p className="font-semibold text-xl pb-5">Ringkasan Belanja</p>
							<Separator />
						</section>
						{/* <section className="mb-5">
							{isDesktop ? (
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											className="w-[15rem] justify-start"
										>
											{selectedPaymentName ? (
												<>{selectedPaymentName}</>
											) : (
												<>Pilih Metode Pembayaran</>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[15rem] p-0" align="start">
										<PaymentLists
											setOpen={setOpen}
											payments={payments}
											categoryPayments={categoryPayments}
											setSelectedPaymentId={setSelectedPaymentId}
											setSelectedPaymentName={setSelectedPaymentName}
											setPaymentPrice={setPaymentPrice}
										/>
									</PopoverContent>
								</Popover>
							) : (
								<Drawer open={open} onOpenChange={setOpen}>
									<DrawerTrigger asChild>
										<Button
											variant="outline"
											className="w-[15rem] justify-start"
										>
											{selectedPaymentName ? (
												<>{selectedPaymentName}</>
											) : (
												<>Pilih Metode Pembayaran</>
											)}
										</Button>
									</DrawerTrigger>
									<DrawerContent>
										<div className="mt-4 border-t">
											<PaymentLists
												setOpen={setOpen}
												payments={payments}
												categoryPayments={categoryPayments}
												setSelectedPaymentId={setSelectedPaymentId}
												setSelectedPaymentName={setSelectedPaymentName}
												setPaymentPrice={setPaymentPrice}
											/>
										</div>
									</DrawerContent>
								</Drawer>
							)}
						</section> */}
						<section className="flex justify-between mb-2">
							<p className="text-md">Total Harga</p>
							<p className="text-md">
								Rp{new Intl.NumberFormat("id-ID").format(totalPriceProduct)}
							</p>
						</section>
						{/* {selectedPaymentName ? (
							<section className="flex justify-between mb-2">
								<p className="text-md">Biaya Admin</p>
								<p className="text-md">
									Rp{new Intl.NumberFormat("id-ID").format(paymentPrice)}
								</p>
							</section>
						) : (
							<></>
						)} */}

						<section className="flex justify-between mb-2">
							<p className="text-md">Biaya Jasa Aplikasi</p>
							<p className="text-md">
								Rp{new Intl.NumberFormat("id-ID").format(servicePrice)}
							</p>
						</section>
						<section className="flex justify-between mb-5">
							<p className="font-bold text-xl">Total Tagihan</p>
							<p className="font-bold text-xl">
								Rp{new Intl.NumberFormat("id-ID").format(totalPrice)}
							</p>
						</section>
						<Button
							className="bg-green-600 hover:bg-green-800 w-full cursor-pointer"
							onClick={() => {
								handleOrderSubmit();
							}}
						>
							Beli
						</Button>
						<Button
							className="bg-red-600 hover:bg-red-800 w-full cursor-pointer mt-5"
							onClick={handleCancelOrderSubmit}
						>
							Batal
						</Button>
					</section>
				</section>
			</section>
		</>
	);
}

function PaymentLists({
	setOpen,
	payments,
	categoryPayments,
	setSelectedPaymentId,
	setSelectedPaymentName,
	setPaymentPrice,
}: PaymentListsProps) {
	return (
		<Command>
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandSeparator />
				{categoryPayments?.map((vcp, i) => (
					<section key={i}>
						<CommandSeparator />
						<CommandGroup heading={vcp}>
							{payments?.map((vp, i) => (
								<section key={i}>
									{vcp === vp.cp_name ? (
										<CommandItem
											value={vp.p_name}
											onSelect={(value) => {
												setSelectedPaymentId(vp.p_id);
												setSelectedPaymentName(value);
												setPaymentPrice(2500);
												setOpen(false);
											}}
										>
											{vp.p_name}
										</CommandItem>
									) : (
										""
									)}
								</section>
							))}
						</CommandGroup>
					</section>
				))}
			</CommandList>
		</Command>
	);
}
