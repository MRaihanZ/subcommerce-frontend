import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<>
			<h1>Home Page</h1>
			<Button variant="destructive">destructive</Button>
			// 33% of the carousel width.
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
			<Card>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card Description</CardDescription>
					<CardAction>Card Action</CardAction>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</>
	);
}
