import { Link } from "react-router";
import {
	Card,
	// CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ItemsProps {
	title: string;
}

export default function Items({ title }: ItemsProps) {
	return (
		<>
			<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-y-10">
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
								<span className="self-center">{title}</span>
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
				<Link
					to={"http://" + location.host + "/detail"}
					className="w-full max-w-35 md:max-w-45 2xl:max-w-55"
				>
					<Card className="border-0 rounded-sm">
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
