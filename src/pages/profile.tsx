import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import InputFormProfile from "@/components/my_components/inputFormProfile";

export default function Profile() {
	const [nama, setNama] = useState("...");
	const [email, setEmail] = useState("...");
	// const [dob, setDob] = useState("13/mm/yyyy");
	return (
		<>
			<section className="grid grid-cols-5">
				<section className="col-span-3 col-start-2 border rounded-2xl">
					<p className="text-center py-3">Bio Data</p>
					<Separator />
					<section className="grid grid-cols-2">
						<section className="ms-5">
							<InputFormProfile
								labelName="Nama"
								id="nama"
								name="nama"
								type="text"
								value={nama}
								setValue={setNama}
							/>
							<InputFormProfile
								labelName="Email"
								id="email"
								name="email"
								type="email"
								value={email}
								setValue={setEmail}
							/>
							{/* <InputFormProfile
								labelName="Tanggal Lahir"
								id="dob"
								name="dob"
								type="date"
								value={dob}
								setValue={setDob}
							/> */}
						</section>
						<section className="justify-self-center-safe">
							<img
								src="/assets/img/item.jpg"
								alt=""
								className="w-70 h-70 ms-3"
							/>
						</section>
					</section>
				</section>
			</section>
		</>
	);
}
