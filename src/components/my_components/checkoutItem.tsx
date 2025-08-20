import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CheckoutProduct {
	p_id: number;
	pv_id: number;
	s_name: string;
	s_img: string;
	p_name: string;
	p_img: string;
	pv_name: string;
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

interface CheckoutItemProps {
	data: CheckoutProduct;
	index: number;
	orderFunc: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
	selectedPaymentId: number;
}

export default function CheckoutItem({
	data,
	index,
	orderFunc,
	selectedPaymentId,
}: CheckoutItemProps) {
	const [note, setNote] = useState<string>("");
	useEffect(() => {
		orderFunc((prev) => {
			const newOrder = [...prev];
			newOrder[index] = {
				pay_id: selectedPaymentId,
				p_id: data.p_id,
				pv_id: data.pv_id,
				note: note,
				quantity: data.quantity,
				unit_price: data.total_price / data.quantity,
				total_price: data.total_price,
			};
			return newOrder;
		});
	}, [note, data, selectedPaymentId]);
	return (
		<>
			<section className="ms-3 py-5 px-5">
				<section className="flex items-center">
					<Avatar>
						<AvatarImage src={data.s_img} />
						<AvatarFallback>Image Profile Seller</AvatarFallback>
					</Avatar>
					<p className="ms-3 font-semibold">{data.s_name}</p>
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
						<section className="mt-5">
							<Label htmlFor="note" className="mb-1">
								Catatan
							</Label>
							<Input
								id="note"
								name="note"
								type="text"
								placeholder="..."
								value={note ?? ""}
								onChange={(e) => setNote(e.target.value)}
							/>
						</section>
					</section>
				</section>
			</section>
			<Separator />
		</>
	);
}
