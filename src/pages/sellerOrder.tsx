import { Separator } from "@/components/ui/separator";
import SellerOrderItem from "@/components/my_components/sellerOrderItem";

export default function SellerOrder() {
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-8 lg:col-start-3">
					<p className="font-semibold text-2xl">Pesanan</p>
					<section className="mt-5">
						<section className="mb-3">
							<section className="border rounded-md">
								<SellerOrderItem />
								<Separator />
								<SellerOrderItem />
								<Separator />
								<SellerOrderItem />
								<Separator />
								<SellerOrderItem />
								<Separator />
								<SellerOrderItem />
							</section>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
