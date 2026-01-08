import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router";

import Items from "@/components/my_components/items";
import FilterSideBar from "@/components/my_components/filterSideBar";

export default function Search() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [searchParams] = useSearchParams();

	const nameProdParam = searchParams.get("s");

	const fetchProducts = async () => {
		setProducts([]);
		try {
			const res = await fetch(
				"http://localhost:8080/api/v1/products/?search=" + nameProdParam
			);
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
	}, [nameProdParam]);
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
