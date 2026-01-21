import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import Items from "@/components/my_components/items";
import FilterSideBar from "@/components/my_components/filterSideBar";

export default function Search() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [searchParams] = useSearchParams();

	const nameProdParam = searchParams.get("s");
	const minProdParam = searchParams.get("min");
	const maxProdParam = searchParams.get("max");

	const fetchProducts = async () => {
		setProducts([]);

		const params = new URLSearchParams();
		if (nameProdParam) {
			params.set("search", nameProdParam);
		}
		if (minProdParam) {
			params.set("min", minProdParam);
		}
		if (maxProdParam) {
			params.set("max", maxProdParam);
		}
		const queryString = params.toString();

		try {
			const res = await fetch(`${apiUrl}/api/v1/products/?` + queryString);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setProducts(json.data);
				setLoading(false);
			} else {
				console.error("API Error:", json.error);
				setError(json.error);
				setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			setError(errFetch);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [nameProdParam, minProdParam, maxProdParam]);
	return (
		<>
			<section className="grid grid-cols-12 mt-5">
				<section className="col-span-2 h-fit w-full border rounded-sm shadow-sm">
					<FilterSideBar />
				</section>
				<section className="col-start-3 col-span-10">
					<Items data={products} />
				</section>
			</section>
		</>
	);
}
