import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ProfileMessage from "@/components/my_components/profileMessage";
import Message from "@/components/my_components/message";

interface ConversationRoom {
	id: string;
	name: string;
	img: string;
}

export default function Chat() {
	const [isConversation, setIsConversation] = useState(false);
	const [conversationRoom, setConversationRoom] =
		useState<ConversationRoom | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>();

	const [searchParams] = useSearchParams();

	const idSellerParam = searchParams.get("id");

	const fetchConversationRoom = async () => {
		try {
			const res = await fetch(
				"http://localhost:8080/api/v1/chats/" + idSellerParam + "?state=user",
				{
					credentials: "include",
				}
			);
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setConversationRoom(json.data);
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
		if (idSellerParam) {
			fetchConversationRoom();
			setIsConversation(true);
		} else {
			setConversationRoom(null);
			setIsConversation(false);
		}
	}, [idSellerParam]);

	const bottomRef = useRef<HTMLDivElement | null>(null);
	// useEffect(() => {
	// 	bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	// }, [messages]);

	// temporary, use the useEffect on top when messages state is ready
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	return (
		<>
			<section className="grid grid-cols-10 my-[1rem]">
				<section className="border-1 col-span-10 lg:col-start-2 lg:col-span-2 rounded-s-md">
					<p className="text-center text-xl font-semibold py-[1rem]">Chat</p>
					<Separator />
					<ScrollArea className="h-212">
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={true}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>

						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>

						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>

						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
						<ProfileMessage
							img="assets/img/profile2.jpg"
							name="User Name"
							message="last message here and some more"
							isActive={false}
						/>
					</ScrollArea>
				</section>
				<section className="hidden lg:block lg:col-span-6 h-[57rem] border-1 rounded-e-md">
					{isConversation ? (
						<>
							<section className="flex items-center h-15 gap-2 ps-5 border-b-1">
								{/* <svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="currentColor"
								>
									<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
								</svg> */}
								<img
									src={conversationRoom?.img}
									alt={conversationRoom?.name + " seller profile"}
									className="w-[24px] h-[24px] rounded-full"
								/>
								<p>{conversationRoom?.name}</p>
							</section>
							<ScrollArea className="h-196 px-3">
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet ligula quam, quis vehicula nibh luctus at. Suspendisse tincidunt semper quam, ultricies porttitor orci euismod non. Vestibulum ultricies, dui quis placerat tempor, lacus nisl rhoncus dui, interdum tincidunt augue eros vitae magna. Ut feugiat accumsan elit, quis aliquam leo convallis nec. Maecenas hendrerit vel risus ac porttitor. Sed placerat tempus lectus, in posuere velit. Nullam ultricies nunc sed leo euismod blandit."
									isSender={false}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas imperdiet ligula quam, quis vehicula nibh luctus at. Suspendisse tincidunt semper quam, ultricies porttitor orci euismod non. Vestibulum ultricies, dui quis placerat tempor, lacus nisl rhoncus dui, interdum tincidunt augue eros vitae magna. Ut feugiat accumsan elit, quis aliquam leo convallis nec. Maecenas hendrerit vel risus ac porttitor. Sed placerat tempus lectus, in posuere velit. Nullam ultricies nunc sed leo euismod blandit."
									isSender={true}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<Message
									name="Bonnie Green"
									sent="20:00"
									message="testing sender"
									isSender={true}
								/>
								<Message
									name="John Blue"
									sent="21:00"
									message="testing receiver"
									isSender={false}
								/>
								<div ref={bottomRef} />
							</ScrollArea>
							<section className="h-16 py-2 flex items-center mx-3">
								<Input
									type="text"
									placeholder="Message"
									className="flex-auto me-3"
								/>
								<Button className="flex-none" variant="outline">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="currentColor"
									>
										<path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
									</svg>
								</Button>
							</section>
						</>
					) : (
						<section className="h-full flex flex-col justify-center items-center">
							<section className="text-center bg-black/70 rounded-full p-10">
								<p className="text-3xl text-white">Welcome</p>
								<p className="text-3xl text-white">To</p>
								<p className="text-3xl text-white">Subcommerce</p>
							</section>
						</section>
					)}
				</section>
			</section>
		</>
	);
}
