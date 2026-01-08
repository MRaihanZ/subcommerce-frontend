import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useGlobalData } from "@/contexts/GlobalDataContext";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Items from "@/components/my_components/items";
import FilterSideBar from "@/components/my_components/filterSideBar";
import { toast } from "sonner";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [activeTab, setActiveTab] = useState("hot");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { globalToast, setGlobalToast } = useGlobalData();

	useEffect(() => {
		if (globalToast !== null) {
			toast(globalToast);
			setGlobalToast(null);
		}
	}, [globalToast]);

	// for min and max filter params
	const [searchParams] = useSearchParams();

	const minProdParam = searchParams.get("min");
	const maxProdParam = searchParams.get("max");

	const fetchProductsHot = async () => {
		setProducts([]);

		const params = new URLSearchParams();
		if (minProdParam) {
			params.set("min", minProdParam);
		}
		if (maxProdParam) {
			params.set("max", maxProdParam);
		}
		const queryString = params.toString();

		try {
			const res = await fetch(
				"http://localhost:8080/api/v1/products/hot?" + queryString
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
	const fetchProductsDiscount = async () => {
		setProducts([]);

		const params = new URLSearchParams();
		if (minProdParam) {
			params.set("min", minProdParam);
		}
		if (maxProdParam) {
			params.set("max", maxProdParam);
		}
		const queryString = params.toString();

		try {
			const res = await fetch(
				"http://localhost:8080/api/v1/products/discount?" + queryString
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
		if (activeTab == "hot") {
			fetchProductsHot();
		}
		if (activeTab == "discount") {
			fetchProductsDiscount();
		}
	}, [activeTab, minProdParam, maxProdParam]);

	if (loading) return <p>Loading...</p>;
	if (error) {
		toast.error(error);
	}
	return (
		<>
			<Carousel>
				<CarouselContent>
					<CarouselItem className="flex justify-center">
						<img src="/assets/img/carousel/carousel1.jpg" alt="Testing" />
					</CarouselItem>
					<CarouselItem className="flex justify-center">
						<img src="/assets/img/carousel/carousel2.jpg" alt="Testing" />
					</CarouselItem>
					<CarouselItem className="flex justify-center">
						<img src="/assets/img/carousel/carousel3.jpg" alt="Testing" />
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<section className="grid grid-cols-12 mt-5">
				<section className="col-span-2 h-fit w-full border rounded-sm shadow-sm mt-11">
					<FilterSideBar />
				</section>
				<section className="col-start-3 col-span-10">
					<Tabs defaultValue="hot">
						<TabsList className="ms-10 bg-white">
							<p>Menu: </p>
							<TabsTrigger
								value="hot"
								className="data-[state=active]:shadow-none data-[state=active]:border-b-3 border-0 rounded-none cursor-pointer data-[state=active]:border-black mx-3"
								onClick={() => setActiveTab("hot")}
							>
								Hot
							</TabsTrigger>
							<TabsTrigger
								value="diskon"
								className="data-[state=active]:shadow-none data-[state=active]:border-b-3 border-0 rounded-none cursor-pointer data-[state=active]:border-black mx-3"
								onClick={() => setActiveTab("discount")}
							>
								Diskon
							</TabsTrigger>
						</TabsList>
						<TabsContent value="hot">
							{products.length === 0 ? (
								<section className="ms-11">No products found.</section>
							) : (
								<Items data={products} />
							)}
						</TabsContent>
						<TabsContent value="diskon">
							{products.length === 0 ? (
								<section className="ms-11">No products found.</section>
							) : (
								<Items data={products} />
							)}
						</TabsContent>
					</Tabs>
				</section>
			</section>
		</>
	);
}
