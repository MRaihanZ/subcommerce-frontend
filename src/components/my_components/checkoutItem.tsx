// import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutItem() {
	return (
		<>
			<section className="ms-3 py-5 px-5">
				<section className="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="currentColor"
					>
						<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
					</svg>
					<p className="ms-3 font-semibold">User Name</p>
				</section>
				<section className="flex">
					<section className="flex-none my-auto">
						<img src="/assets/img/item.jpg" alt="" className="w-40 h-40 ms-3" />
					</section>
					<section className="flex-auto ms-5">
						<p className="my-3 text-lg">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
							finibus turpis a venenatis eleifend.
						</p>
						<p>
							variant:
							<Badge variant="outline" className="mx-1">
								2 Core 4GB
							</Badge>
							<Badge variant="outline">Indonesia</Badge>
						</p>
						<p>
							Jumlah:
							<Badge variant="outline" className="ms-1">
								1
							</Badge>
						</p>
						<p>Harga Total: Rp64.000</p>
						<section className="mt-5">
							<Label htmlFor="note">Catatan</Label>
							<Input id="note" name="note" type="text" placeholder="..." />
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
