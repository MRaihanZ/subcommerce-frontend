// import { Separator } from "@/components/ui/separator";

import OrderListProduct from "@/components/my_components/orderListProduct";
export default function OrderList() {
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-8 lg:col-start-3">
					<p className="font-semibold text-2xl">Pembelian Produk</p>
					<section className="mt-5">
						<section className="mb-3">
							<section className="">
								<OrderListProduct />
							</section>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
