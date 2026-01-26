import { GetCsrf } from "@/components/utils/csrf";
import { apiUrl } from "@/lib/importEnv";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Orders {
	order_id: number;
	order_pretty_id: string;
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

interface SellerOrderItemProps {
	data: Orders;
}

export default function SellerOrderItem({ data }: SellerOrderItemProps) {
	const handleStatus = async (status: number) => {
		const csrfToken = await GetCsrf();

		try {
			const send = await fetch(
				`${apiUrl}/api/v1/orders/` + data.order_id + "/" + status,
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
				// setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
		}
	};
	return (
		<section className="ms-3 py-5 px-5">
			<section className="flex justify-between items-center ms-6 mb-5">
				<section className="flex items-center">
					<Avatar>
						<AvatarImage src={data.u_img} />
						<AvatarFallback>Image Profile Seller</AvatarFallback>
					</Avatar>
					<p className="ms-3 font-semibold">{data.u_name}</p>
				</section>
				<section>
					<p>{data.order_pretty_id}</p>
				</section>
			</section>
			<section className="flex flex-col sm:flex-row">
				<section className="flex-none my-auto">
					<img src={data.p_img} alt="" className="w-40 h-40 mx-auto sm:ms-3" />
				</section>
				<section className="flex-auto ms-5">
					<p className="my-3 text-lg">
						{data.p_name}{" "}
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
								status:
								<Badge variant="default" className="ms-1">
									{data.os_name}
								</Badge>
							</p>
						</section>
					</section>
					<section className="mt-5 flex gap-1">
						{/* {data.os_name === "menunggu konfirmasi seller" ? (
							<>
								<Button
									variant="outline"
									className="grow cursor-pointer"
									onClick={() => {
										handleStatus(7);
									}}
								>
									Proses
								</Button>
								<Button
									variant="destructive"
									className="grow cursor-pointer"
									onClick={() => {
										handleStatus(6);
									}}
								>
									Tolak
								</Button>
							</>
						) : (
							""
						)} */}
						{data.os_name === "produk sedang disiapkan" ? (
							<>
								<Button
									variant="outline"
									className="grow cursor-pointer"
									onClick={() => {
										handleStatus(10);
									}}
								>
									Pesanan Selesai
								</Button>
							</>
						) : (
							""
						)}
					</section>
				</section>
			</section>
		</section>
	);
}
