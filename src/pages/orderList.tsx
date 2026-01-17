import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/api";

import { toast } from "sonner";
// import { Separator } from "@/components/ui/separator";

import OrderListProduct from "@/components/my_components/orderListProduct";

export interface OrderProducts {
	o_id: number;
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
	quantity: number;
	total_price: number;
}

export default function OrderList() {
	const [order, setOrder] = useState<OrderProducts[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchCheckout = async () => {
			try {
				const res = await fetch(`${apiUrl}/api/v1/orders/`, {
					credentials: "include",
				});
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					toast.success("Berhasil mengambil data order");
					setOrder(json.data);
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
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	if (!order) return <p>Produk tidak ditemukan</p>;
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-8 lg:col-start-3">
					<p className="font-semibold text-2xl">Pembelian Produk</p>
					<section className="mt-5">
						<section className="mb-3">
							<section className="">
								{order.map((item, index) => (
									<OrderListProduct key={index} data={item} />
								))}
							</section>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
