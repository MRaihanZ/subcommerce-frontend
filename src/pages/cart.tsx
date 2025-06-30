import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CartItem from "@/components/my_components/cartItem";
export default function Cart() {
	return (
		<>
			<section className="grid grid-cols-7">
				<section className="col-span-5 col-start-2">
					<p className="font-semibold text-3xl">Keranjang</p>
					<section className="mt-5">
						<section className="flex ms-3 mb-3">
							<Checkbox className="border-black" id="allItem" />
							<Label htmlFor="allItem" className="ms-3">
								Pilih Semua
							</Label>
						</section>
						<section className="">
							<CartItem />
							<CartItem />
							<CartItem />
							<CartItem />
							<CartItem />
						</section>
					</section>
					<section className="justify-between flex ms-3 bottom-0 bg-white border">
						<section className="flex justify-between">
							<p>Total</p>
							<p>Rp240.000</p>
						</section>
						<Button className="bg-green-600">Beli</Button>
					</section>
				</section>
			</section>
		</>
	);
}
