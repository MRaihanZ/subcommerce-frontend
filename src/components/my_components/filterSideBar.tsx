import { useState } from "react";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function FilterSideBar() {
	const [minHarga, setMinHarga] = useState(0);
	const [maxHarga, setMaxHarga] = useState(0);
	return (
		<>
			<section className="px-3">
				<Separator />
				<section className="my-3">
					<p className="font-bold text-xl">Harga</p>
					<section className="flex items-center my-3 relative">
						<p className="absolute left-3">Rp</p>
						<Input
							name="minHarga"
							type="number"
							placeholder={minHarga == 0 ? "Minimal Harga" : ""}
							value={minHarga == 0 ? "" : minHarga}
							onChange={(e) => setMinHarga(Number(e.target.value))}
							className="ps-9"
						/>
					</section>
					<section className="h-2 flex justify-center">
						<Separator orientation="vertical" />
					</section>
					<section className="flex items-center my-3 relative">
						<p className="absolute left-3">Rp</p>
						<Input
							name="maxHarga"
							type="number"
							placeholder={maxHarga == 0 ? "Maximal Harga" : ""}
							value={maxHarga == 0 ? "" : maxHarga}
							onChange={(e) => setMaxHarga(Number(e.target.value))}
							className="ps-9"
						/>
					</section>
				</section>
				<section className="my-3">
					<Button variant="outline" className="w-full cursor-pointer">
						Terapkan
					</Button>
				</section>
			</section>
		</>
	);
}
