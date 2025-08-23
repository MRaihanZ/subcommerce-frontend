import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
	Card,
	// CardAction,
	CardContent,
	// CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Table,
	TableBody,
	// TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	// TableFooter,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Seller {
	id: string;
	name: string;
	img: string;
	address: string;
	total_sold_products: number;
	average_rating: number;
	current_month_sales: number;
	previous_month_sales: number | null;
	current_month_cancellations: number;
	previous_month_cancellations: number | null;
	current_month_revenue: number;
	previous_month_revenue: number | null;
	current_month: string;
	previous_month: string | null;
}

export default function Seller() {
	const [seller, setSeller] = useState<Seller | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();
	const navigate = useNavigate();

	useEffect(() => {
		// seller
		const fetchSeller = async () => {
			try {
				const res = await fetch("http://localhost:8080/api/v1/sellers/", {
					credentials: "include",
				});
				const json = await res.json();
				if (json.code === 200 && json.status === "ok") {
					setSeller({
						id: json.data.id,
						name: json.data.name,
						img: json.data.img,
						address: json.data.address,
						total_sold_products: json.data.total_sold_products,
						average_rating: json.data.average_rating,
						current_month_sales: json.data.current_month_sales,
						previous_month_sales: json.data.previous_month_sales,
						current_month_cancellations: json.data.current_month_cancellations,
						previous_month_cancellations:
							json.data.previous_month_cancellations,
						current_month_revenue: json.data.current_month_revenue,
						previous_month_revenue: json.data.previous_month_revenue,
						current_month: json.data.current_month,
						previous_month: json.data.previous_month,
					});
					setLoading(false);
				} else {
					toast.error(json.error);
					setError(json.error);
					setLoading(false);
				}
			} catch (err) {
				const errFetch = "Network Error: " + err;
				toast.error(errFetch);
				setError(errFetch);
				setLoading(false);
			}
		};
		fetchSeller();
	}, []);
	if (loading) return <p>Loading...</p>;
	if (error) {
		return <p>{error}</p>;
	}
	return (
		<>
			<section className="mt-10">
				<section className="flex justify-around">
					<section className="flex items-center gap-3">
						<Avatar>
							<AvatarImage src={seller?.img} />
							<AvatarFallback>Profile1</AvatarFallback>
						</Avatar>
						<section className="flex flex-col items-start">
							<Tooltip>
								<TooltipTrigger className="align-top ms-1">
									<p className="text-xl font-semibold text-left truncate w-30">
										{seller?.name}
									</p>
								</TooltipTrigger>
								<TooltipContent>
									<p>{seller?.name}</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger className="align-top ms-1">
									<section className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="16px"
											viewBox="0 -960 960 960"
											width="16px"
											fill="currentColor"
										>
											<path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
										</svg>
										<p className="ms-1 truncate w-30">{seller?.address}</p>
									</section>
								</TooltipTrigger>
								<TooltipContent>
									<p>{seller?.address}</p>
								</TooltipContent>
							</Tooltip>
						</section>
						<section className="h-7 flex justify-center">
							<Separator orientation="vertical" />
						</section>
						<section className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="currentColor"
							>
								<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
							</svg>
							<p className="ms-2">
								{seller?.total_sold_products} Barang Terjual
							</p>
						</section>
						<section className="h-7 flex justify-center">
							<Separator orientation="vertical" />
						</section>
						<p>⭐ {Math.floor(seller?.average_rating * 10) / 10}</p>
					</section>
					<section className="flex gap-5">
						<Button
							variant="outline"
							className="cursor-pointer"
							onClick={() => navigate("/seller/profile")}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="currentColor"
							>
								<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
							</svg>
							Edit Seller Profile
						</Button>
					</section>
				</section>
				<section className="xl:grid xl:grid-cols-11 2xl:grid-cols-12 flex flex-col sm:flex-row gap-y-5 sm:gap-x-5 justify-items-center mt-10">
					<Card className="col-start-2 2xl:col-start-4 col-span-3 2xl:col-span-2 w-full">
						<CardHeader>
							<CardTitle>
								Total Terjual
								<Tooltip>
									<TooltipTrigger className="align-top ms-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="16px"
											viewBox="0 -960 960 960"
											width="16px"
											fill="currentColor"
										>
											<path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
										</svg>
									</TooltipTrigger>
									<TooltipContent>
										<p>Total pesanan yang terjual per bulan</p>
									</TooltipContent>
								</Tooltip>
							</CardTitle>
							{/* <CardDescription>Barang yang terjual</CardDescription> */}
							{/* <CardAction>Card Action</CardAction> */}
						</CardHeader>
						<CardContent>
							<p className="font-bold text-2xl">
								{seller?.current_month_sales}
							</p>
						</CardContent>
						<CardFooter>
							<p>
								Bulan Lalu:{" "}
								<span className="font-bold text-xl">
									{seller?.previous_month_sales === null
										? 0
										: seller?.previous_month_sales}
								</span>
							</p>
						</CardFooter>
					</Card>
					<Card className="col-span-3 2xl:col-span-2 w-full">
						<CardHeader>
							<CardTitle>
								Total Dibatalkan
								<Tooltip>
									<TooltipTrigger className="align-top ms-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="16px"
											viewBox="0 -960 960 960"
											width="16px"
											fill="currentColor"
										>
											<path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
										</svg>
									</TooltipTrigger>
									<TooltipContent>
										<p>Total pesanan yang dibatalkan per bulan</p>
									</TooltipContent>
								</Tooltip>
							</CardTitle>
							{/* <CardDescription>Card Description</CardDescription> */}
							{/* <CardAction>Card Action</CardAction> */}
						</CardHeader>
						<CardContent>
							<p className="font-bold text-2xl">
								{seller?.current_month_cancellations}
							</p>
						</CardContent>
						<CardFooter>
							<p>
								Bulan Lalu:{" "}
								<span className="font-bold text-xl">
									{seller?.previous_month_cancellations === null
										? 0
										: seller?.previous_month_cancellations}
								</span>
							</p>
						</CardFooter>
					</Card>
					<Card className="col-span-3 2xl:col-span-2 w-full">
						<CardHeader>
							<CardTitle>
								Total Pendapatan
								<Tooltip>
									<TooltipTrigger className="align-top ms-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="16px"
											viewBox="0 -960 960 960"
											width="16px"
											fill="currentColor"
										>
											<path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
										</svg>
									</TooltipTrigger>
									<TooltipContent>
										<p>Total pendapatan per bulan</p>
									</TooltipContent>
								</Tooltip>
							</CardTitle>
							{/* <CardDescription>Card Description</CardDescription> */}
							{/* <CardAction>Card Action</CardAction> */}
						</CardHeader>
						<CardContent>
							<p className="font-bold text-2xl">
								Rp
								{new Intl.NumberFormat("id-ID").format(
									seller.current_month_revenue
								)}
							</p>
						</CardContent>
						<CardFooter>
							<p>
								Bulan Lalu:{" "}
								<span className="font-bold text-xl">
									Rp
									{seller?.previous_month_revenue === null
										? 0
										: new Intl.NumberFormat("id-ID").format(
												seller.previous_month_revenue
										  )}
								</span>
							</p>
						</CardFooter>
					</Card>
				</section>
				<section className="my-7 border rounded-md">
					<Table className="">
						{/* <TableCaption>Tabel Penjualan</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Id</TableHead>
								<TableHead>Nama</TableHead>
								<TableHead>Nama Varian</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Tanggal Pembelian</TableHead>
								<TableHead>Payment Id</TableHead>
								<TableHead className="text-right">Harga</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>default</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>A</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>B</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>default</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>default</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>default</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>default</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">INV001</TableCell>
								<TableCell>VPS Linux Indonesia</TableCell>
								<TableCell>default</TableCell>
								<TableCell>Paid</TableCell>
								<TableCell>2024-03-07 23:19</TableCell>
								<TableCell>PAY001</TableCell>
								<TableCell className="text-right">Rp150.000</TableCell>
							</TableRow>
						</TableBody>
						{/* <TableFooter>
							<TableRow>
								<TableCell colSpan={5} className="text-right">
									Total: Rp750.000
								</TableCell>
							</TableRow>
						</TableFooter> */}
					</Table>
				</section>
			</section>
		</>
	);
}
