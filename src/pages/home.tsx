import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Card,
	// CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

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
			<section className="mt-5 grid grid-cols-5 gap-y-10">
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
				<Link to={"http://" + location.host + "/detail"}>
					<Card className="w-full max-w-3xs">
						<CardHeader>
							<CardTitle>
								<img src="/assets/img/item.jpg" alt="" />
							</CardTitle>
							<CardDescription className="flex">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
								</svg>
								<span className="self-center">Indo Server</span>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>VPS Linux Indonesia</p>
							<p className="text-xl font-bold">Rp64.000</p>
						</CardContent>
						<CardFooter>
							<p>⭐ 4.5 | 100 terjual</p>
						</CardFooter>
					</Card>
				</Link>
			</section>
		</>
	);
}
