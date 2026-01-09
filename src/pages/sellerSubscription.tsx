import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SellerSubscription() {
	return (
		<>
			<section className="grid grid-cols-12">
				<section className="col-span-12 lg:col-span-8 lg:col-start-3">
					<p className="font-semibold text-2xl">Langganan</p>
					<section className="mt-5">
						<section className="mb-3">
							<section className="ms-3 mt-5 py-5 px-5 border rounded-md">
								<section className="flex justify-between items-center ms-6 mb-5">
									<section className="flex items-center">
										<Avatar>
											<AvatarImage src={data.s_img} />
											<AvatarFallback>Image Profile Seller</AvatarFallback>
										</Avatar>
										<p className="ms-3 font-semibold">{data.s_name}</p>
									</section>
									<section>
										<p>{data.o_order_pretty_id}</p>
									</section>
								</section>
								<section className="flex">
									<section className="flex-none my-auto">
										<img src={data.p_img} alt="" className="w-40 h-40 ms-3" />
									</section>
									<section className="flex-auto ms-5">
										<p className="my-3 text-lg">
											{data.p_name}
											{data.pv_name === "default" ? "" : " - " + data.pv_name}
										</p>
										<section className="flex justify-between">
											<section>
												{data.pv_name === "default" ? (
													""
												) : (
													<p>
														variant:
														<Badge variant="outline" className="mx-1">
															{data.pv_name}
														</Badge>
													</p>
												)}
												<p>
													Periode:
													<Badge variant="outline" className="mx-1">
														{data.interval + " " + data.i_name}
													</Badge>
												</p>
												<p>
													Jumlah:
													<Badge variant="outline" className="ms-1">
														{data.quantity}
													</Badge>
												</p>
												<p>
													Harga Total: Rp
													{new Intl.NumberFormat("id-ID").format(
														data.total_price
													)}
												</p>
											</section>
											<section>
												<p>
													pembayaran:
													<Badge variant="default" className="ms-1">
														{data.pay_name}
													</Badge>
												</p>
												<p>
													status:
													<Badge variant="default" className="ms-1">
														{data.os_name}
													</Badge>
												</p>
											</section>
										</section>
									</section>
								</section>
								<section className="flex justify-end">
									{data.os_name === "menunggu konfirmasi seller" ? (
										<Button
											className="cursor-pointer mt-5"
											variant="destructive"
											onClick={() => setPenilaian((prev) => !prev)}
										>
											Batalkan pesanan
										</Button>
									) : (
										""
									)}
								</section>
							</section>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
