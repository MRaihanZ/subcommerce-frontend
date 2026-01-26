import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import CreatePayout from "@/components/my_components/createPayout";

import { GetCsrf } from "@/components/utils/csrf";

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
	TableFooter,
} from "@/components/ui/table";
import {
	Dialog,
	// DialogClose,
	DialogContent,
	DialogDescription,
	// DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Seller {
	id: string;
	name: string;
	img: string;
	address: string;
	wallet: number;
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

interface Orders {
	order_id: number;
	order_pretty_id: string;
	u_name: string;
	u_img: string;
	product_id: number;
	product_variant_id: number;
	p_name: string;
	pv_name: string;
	p_img: string;
	quantity: number;
	interval: number;
	i_name: string;
	pay_name: string;
	os_name: string;
	total_price: number;
	created_at: string;
}

export default function Seller() {
	const [seller, setSeller] = useState<Seller | null>(null);
	const [wallet, setWallet] = useState<number>(0);
	const [currentRevenue, setCurrentRevenue] = useState<number>(0);
	const [previousRevenue, setPreviousRevenue] = useState<number>(0);
	const [orders, setOrders] = useState<Orders[]>([]);
	const [firstOrderId, setFirstOrderId] = useState<number>(0);
	const [firstOrderCreatedAt, setFirstOrderCreatedAt] = useState<string>("");
	const [lastOrderId, setLastOrderId] = useState<number>(0);
	const [lastOrderCreatedAt, setLastOrderCreatedAt] = useState<string>("");
	const [page, setPage] = useState<number>(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();
	const navigate = useNavigate();
	const totalData = 10;

	// seller
	const fetchSeller = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/sellers/`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setSeller({
					id: json.data.id,
					name: json.data.name,
					img: json.data.img,
					address: json.data.address,
					wallet: json.data.wallet,
					total_sold_products: json.data.total_sold_products,
					average_rating: json.data.average_rating,
					current_month_sales: json.data.current_month_sales,
					previous_month_sales: json.data.previous_month_sales,
					current_month_cancellations: json.data.current_month_cancellations,
					previous_month_cancellations: json.data.previous_month_cancellations,
					current_month_revenue: json.data.current_month_revenue,
					previous_month_revenue: json.data.previous_month_revenue,
					current_month: json.data.current_month,
					previous_month: json.data.previous_month,
				});
				setWallet(json.data.wallet);
				setCurrentRevenue(json.data.current_month_revenue);
				setPreviousRevenue(json.data.previous_month_revenue);
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

	// order
	const fetchOrders = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/orders/seller`, {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setOrders(json.data);
				setFirstOrderId(json.data[0].order_id);
				setFirstOrderCreatedAt(json.data[0].created_at);
				setLastOrderId(json.data[json.data.length - 1].order_id);
				setLastOrderCreatedAt(json.data[json.data.length - 1].created_at);
				setPage(1);
				setLoading(false);
			} else if (json.code === 404 && json.status === "error") {
				setOrders([]);
				setLoading(false);
			} else {
				toast.error(json.error);
				// setError(json.error);
				setLoading(false);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast.error(errFetch);
			setError(errFetch);
			setLoading(false);
		}
	};

	// next orders
	const fetchNextOrders = async () => {
		try {
			const res = await fetch(
				`${apiUrl}/api/v1/orders/seller?state=next&order_create=` +
					lastOrderCreatedAt +
					"&order_id=" +
					lastOrderId,
				{
					credentials: "include",
				},
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setOrders([]);
				setOrders(json.data);
				setFirstOrderId(json.data[0].order_id);
				setFirstOrderCreatedAt(json.data[0].created_at);
				setLastOrderId(json.data[json.data.length - 1].order_id);
				setLastOrderCreatedAt(json.data[json.data.length - 1].created_at);
				setPage(page + 1);
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

	// previous orders
	const fetchPreviousOrders = async () => {
		try {
			const res = await fetch(
				`${apiUrl}/api/v1/orders/seller?state=previous&order_create=` +
					firstOrderCreatedAt +
					"&order_id=" +
					firstOrderId,
				{
					credentials: "include",
				},
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setOrders([]);
				setOrders(json.data.reverse());
				setFirstOrderId(json.data[0].order_id);
				setFirstOrderCreatedAt(json.data[0].created_at);
				setLastOrderId(json.data[json.data.length - 1].order_id);
				setLastOrderCreatedAt(json.data[json.data.length - 1].created_at);
				setPage(page - 1);
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

	useEffect(() => {
		fetchSeller();
		fetchOrders();
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
					<section className="flex gap-3 items-center">
						<section className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="currentColor"
							>
								<path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z" />
							</svg>
							<p className="">Dompet:</p>
						</section>
						<p className="">
							Rp
							{new Intl.NumberFormat("id-ID").format(wallet)}
						</p>

						<Dialog>
							<DialogTrigger asChild>
								{wallet === 0 ? (
									<Button variant="outline" className="cursor-pointer" disabled>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24px"
											viewBox="0 -960 960 960"
											width="24px"
											fill="currentColor"
										>
											<path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
										</svg>
										Kirim Uang
									</Button>
								) : (
									<Button variant="outline" className="cursor-pointer">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24px"
											viewBox="0 -960 960 960"
											width="24px"
											fill="currentColor"
										>
											<path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
										</svg>
										Kirim Uang
									</Button>
								)}
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Isi Data</DialogTitle>
									<DialogDescription></DialogDescription>
								</DialogHeader>
								<CreatePayout walletAmount={wallet} />
							</DialogContent>
						</Dialog>
						<section className="h-7 flex justify-center">
							<Separator orientation="vertical" />
						</section>
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
				<section className="my-7 border rounded-md">
					<Table className="">
						{/* <TableCaption>Tabel Penjualan</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead className="w-[200px]">Id</TableHead>
								<TableHead>Nama Pembeli</TableHead>
								<TableHead>Nama Produk</TableHead>
								<TableHead>Nama Varian</TableHead>
								<TableHead>Jumlah</TableHead>
								<TableHead>Periode</TableHead>
								<TableHead>Payment Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Harga</TableHead>
								<TableHead className="text-right">Tanggal Pembelian</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders?.length === 0 ? (
								<TableRow>
									<TableCell colSpan={10} className="text-center font-medium">
										Tidak ada order
									</TableCell>
								</TableRow>
							) : (
								""
							)}
							{orders?.map((order) => (
								<TableRow key={order.order_id}>
									<TableCell className="font-medium">
										{order.order_pretty_id}
									</TableCell>
									<TableCell>{order.u_name}</TableCell>
									<TableCell>{order.p_name}</TableCell>
									<TableCell>{order.pv_name}</TableCell>
									<TableCell>{order.quantity}</TableCell>
									<TableCell>
										{order.interval} {order.i_name}
									</TableCell>
									<TableCell>{order.pay_name}</TableCell>
									<TableCell>{order.os_name}</TableCell>
									<TableCell>{order.total_price}</TableCell>
									<TableCell className="text-right">
										{order.created_at}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						{page !== 1 && orders?.length >= totalData ? (
							<TableFooter>
								<TableRow>
									<TableCell colSpan={10} className="text-right">
										{page !== 1 ? (
											<>
												<Button
													variant="outline"
													className="cursor-pointer mx-1"
													onClick={fetchPreviousOrders}
												>
													Data Sebelumnya
												</Button>
											</>
										) : (
											""
										)}

										{page !== 1 && orders?.length >= totalData ? (
											<span>{" | "}</span>
										) : (
											""
										)}

										{orders?.length >= totalData ? (
											<Button
												variant="outline"
												className="cursor-pointer mx-1"
												onClick={fetchNextOrders}
											>
												Data Selanjutnya
											</Button>
										) : (
											""
										)}
									</TableCell>
								</TableRow>
							</TableFooter>
						) : (
							""
						)}
					</Table>
				</section>
			</section>
		</>
	);
}
