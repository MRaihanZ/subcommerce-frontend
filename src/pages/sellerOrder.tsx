import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/importEnv";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import SellerOrderItem from "@/components/my_components/sellerOrderItem";

interface Orders {
	order_id: number;
	order_pretty_id: string;
	u_id: string;
	u_name: string;
	u_img: string;
	product_id: number;
	product_variant_id: number;
	p_name: string;
	pv_name: string;
	p_img: string;
	quantity: number;
	interval: number;
	i_name: string;
	pay_name: string;
	os_name: string;
	total_price: number;
	created_at: string;
}

export default function SellerOrder() {
	const [orders, setOrders] = useState<Orders[]>([]);
	const [sellerId, setSellerId] = useState<string[]>([]);
	const [firstOrderId, setFirstOrderId] = useState<number>(0);
	const [firstOrderCreatedAt, setFirstOrderCreatedAt] = useState<string>("");
	const [lastOrderId, setLastOrderId] = useState<number>(0);
	const [lastOrderCreatedAt, setLastOrderCreatedAt] = useState<string>("");
	const [page, setPage] = useState<number>(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();
	const [notFound, setNotFound] = useState<boolean>(false);
	const totalData = 2;

	// order
	const fetchOrders = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/orders/seller`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setOrders(json.data);
				setFirstOrderId(json.data[0].order_id);
				setFirstOrderCreatedAt(json.data[0].created_at);
				setLastOrderId(json.data[json.data.length - 1].order_id);
				setLastOrderCreatedAt(json.data[json.data.length - 1].created_at);
				setPage(1);
				setLoading(false);
			} else if (json.code === 404 && json.status === "error") {
				setNotFound(true);
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

	// next orders
	const fetchNextOrders = async () => {
		try {
			const res = await fetch(
				`${apiUrl}/api/v1/orders/seller?state=next&order_create=` +
					lastOrderCreatedAt +
					"&order_id=" +
					lastOrderId,
				{
					credentials: "include",
				},
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setOrders([]);
				setOrders(json.data);
				setFirstOrderId(json.data[0].order_id);
				setFirstOrderCreatedAt(json.data[0].created_at);
				setLastOrderId(json.data[json.data.length - 1].order_id);
				setLastOrderCreatedAt(json.data[json.data.length - 1].created_at);
				setPage(page + 1);
				setLoading(false);
			} else if (json.code === 404 && json.status === "error") {
				setNotFound(true);
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

	// previous orders
	const fetchPreviousOrders = async () => {
		try {
			const res = await fetch(
				`${apiUrl}/api/v1/orders/seller?state=previous&order_create=` +
					firstOrderCreatedAt +
					"&order_id=" +
					firstOrderId,
				{
					credentials: "include",
				},
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setOrders([]);
				setOrders(json.data.reverse());
				setFirstOrderId(json.data[0].order_id);
				setFirstOrderCreatedAt(json.data[0].created_at);
				setLastOrderId(json.data[json.data.length - 1].order_id);
				setLastOrderCreatedAt(json.data[json.data.length - 1].created_at);
				setPage(page - 1);
				setLoading(false);
			} else if (json.code === 404 && json.status === "error") {
				setNotFound(true);
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
		fetchOrders();
	}, []);
	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-8 lg:col-start-3">
					<p className="font-semibold text-2xl">Pesanan</p>
					<section className="mt-5">
						<section className="mb-3">
							{notFound ? (
								<p>Tidak Ada Pesanan</p>
							) : (
								<section className="border rounded-md">
									{orders.map((order) => (
										<section key={order.order_id}>
											<SellerOrderItem data={order} />
											<Separator />
										</section>
									))}
								</section>
							)}
						</section>
						{page !== 1 && orders?.length >= totalData ? (
							<section className="mt-5 mb-10 text-right">
								{page !== 1 ? (
									<>
										<Button
											variant="outline"
											className="cursor-pointer mx-1"
											onClick={fetchPreviousOrders}
										>
											Data Sebelumnya
										</Button>
									</>
								) : (
									""
								)}

								{page !== 1 && orders?.length >= totalData ? (
									<span>{" | "}</span>
								) : (
									""
								)}

								{orders?.length >= totalData ? (
									<Button
										variant="outline"
										className="cursor-pointer mx-1"
										onClick={fetchNextOrders}
									>
										Data Selanjutnya
									</Button>
								) : (
									""
								)}
							</section>
						) : (
							""
						)}
					</section>
				</section>
			</section>
		</>
	);
}
