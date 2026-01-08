import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function FilterSideBar() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const location = useLocation();

	// get existing search query (?s=...)
	const search = searchParams.get("s") || "";

	const [minHarga, setMinHarga] = useState("");
	const [maxHarga, setMaxHarga] = useState("");

	const handlerFilter = () => {
		const params = new URLSearchParams();

		// keep existing search query
		if (search) {
			params.set("s", search);
		}

		// only add if value exists
		if (minHarga) {
			params.set("min", minHarga);
		}

		if (maxHarga) {
			params.set("max", maxHarga);
		}

		const query = params.toString();

		if (location.pathname !== "/search") {
			navigate(query ? `/?${query}` : "/");
		} else {
			navigate(query ? `/search?${query}` : "/search");
		}
	};
	return (
		<>
			<section className="px-3">
				<section className="my-3">
					<p className="font-bold text-xl">Harga</p>
					<section className="flex items-center my-3 relative">
						<p className="absolute left-3">Rp</p>
						<Input
							name="minHarga"
							type="number"
							placeholder="Minimal Harga"
							onChange={(e) => setMinHarga(e.target.value)}
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
							placeholder="Maximal Harga"
							onChange={(e) => setMaxHarga(e.target.value)}
							className="ps-9"
						/>
					</section>
				</section>
				<section className="my-3">
					<Button
						variant="outline"
						className="w-full cursor-pointer"
						onClick={handlerFilter}
					>
						Terapkan
					</Button>
				</section>
			</section>
		</>
	);
}
