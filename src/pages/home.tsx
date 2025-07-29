import { useEffect, useState } from "react";

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

export default function Home() {
	const [products, setProducts] = useState([]);
	const [activeTab, setActiveTab] = useState("hot");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const fetchProductsHot = async () => {
		setProducts([]);
		try {
			const res = await fetch("http://localhost:8080/api/v1/products/hot");
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
		try {
			const res = await fetch("http://localhost:8080/api/v1/products/discount");
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
	}, [activeTab]);
	console.log(activeTab);

	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
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
							<Items data={products} />
						</TabsContent>
						<TabsContent value="diskon">
							<Items data={products} />
						</TabsContent>
					</Tabs>
				</section>
			</section>
		</>
	);
}
