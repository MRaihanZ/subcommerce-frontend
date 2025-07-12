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
							>
								Hot
							</TabsTrigger>
							<TabsTrigger
								value="diskon"
								className="data-[state=active]:shadow-none data-[state=active]:border-b-3 border-0 rounded-none cursor-pointer data-[state=active]:border-black mx-3"
							>
								Diskon
							</TabsTrigger>
						</TabsList>
						<TabsContent value="hot">
							<Items title="HOT" />
						</TabsContent>
						<TabsContent value="diskon">
							<Items title="DISKON" />
						</TabsContent>
					</Tabs>
				</section>
			</section>
		</>
	);
}
