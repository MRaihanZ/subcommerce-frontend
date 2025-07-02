import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/my_components/cartItem";
export default function Cart() {
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-6 lg:col-start-2 lg:mb-5">
					<p className="font-semibold text-3xl">Keranjang</p>
					<section className="mt-5">
						<section className="flex justify-between items-center  ms-3 mb-3">
							<section className="flex">
								<Checkbox className="border-black" id="allItem" />
								<Label htmlFor="allItem" className="ms-3">
									Pilih Semua
								</Label>
							</section>
							<Button
								variant="outline"
								className="w-fit cursor-pointer hover:bg-red-600 px-3"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
								</svg>
								Hapus Semua
							</Button>
						</section>
						<section className="">
							<CartItem />
							<CartItem />
							<CartItem />
							<CartItem />
							<CartItem />
						</section>
					</section>
				</section>
				<section className="col-span-12 lg:col-span-4 ms-3 mb-5 lg:ms-5 mt-5 lg:mt-28">
					<section className="py-7 px-5 bottom-0 bg-white border rounded-md">
						<section className="mb-5">
							<p className="font-semibold text-xl pb-5">Ringkasan Belanja</p>
							<Separator />
						</section>
						<section className="flex justify-between mb-5">
							<p className="font-bold text-xl">Total</p>
							<p className="font-bold text-xl">Rp240.000</p>
						</section>
						<Button className="bg-green-600 hover:bg-green-800 w-full cursor-pointer">
							Beli
						</Button>
					</section>
				</section>
			</section>
		</>
	);
}
