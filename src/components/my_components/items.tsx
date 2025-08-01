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

interface DataFetch {
	p_id: number;
	p_name: string;
	pv_id: number;
	pv_name: string;
	img: string;
	price: number;
	average_rating: number;
	sold: number;
	discount: number;
	seller_name: string;
}

interface ItemsProps {
	data: DataFetch[];
}

export default function Items({ data }: ItemsProps) {
	return (
		<>
			<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center content-stretch gap-y-10">
				{data.map((prod, index) => (
					<Link
						key={index}
						to={
							prod.pv_name === "default"
								? "http://" + location.host + "/detail?product=" + prod.p_id
								: "http://" +
								  location.host +
								  "/detail?product=" +
								  prod.p_id +
								  "&variant=" +
								  prod.pv_id
						}
						className="w-full max-w-35 md:max-w-45 2xl:max-w-55 h-full"
					>
						<Card className="border-0 rounded-sm h-full relative">
							<CardHeader>
								<CardTitle>
									<img src={prod.img} alt="" />
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
									<span className="self-center">{prod.seller_name}</span>
								</CardDescription>
							</CardHeader>
							<CardContent className="mb-10">
								{prod.pv_name === "default" ? (
									<p className="">{prod.p_name}</p>
								) : (
									<p className="">
										{prod.p_name} - {prod.pv_name}
									</p>
								)}
								{prod.discount === 0 ? (
									<p className="text-xl font-bold">{prod.price}</p>
								) : (
									<>
										<p className="text-xl font-bold">{prod.price}</p>
										<section className="flex items-center">
											<p className="text-sm font-normal line-through">
												{prod.price}
											</p>
											<p className="text-sm font-bold text-red-500 ms-3">
												{prod.discount}%
											</p>
										</section>
									</>
								)}
							</CardContent>
							<CardFooter className="absolute inset-x-0 bottom-6">
								<p>
									⭐ {Math.floor(prod.average_rating * 10) / 10} | {prod.sold}{" "}
									terjual
								</p>
							</CardFooter>
						</Card>
					</Link>
				))}
			</section>
		</>
	);
}
