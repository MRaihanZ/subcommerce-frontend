import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router";
import { apiUrl } from "@/lib/importEnv";

import { GetCsrf } from "@/components/utils/csrf";

import { supabase } from "@/lib/supabase";

// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ProfileMessage from "@/components/my_components/profileMessage";
import Message from "@/components/my_components/message";

interface Conversation {
	id: string;
	user_id: string;
	seller_id: string;
	name: string;
	img: string;
	last_message_at?: string;
	last_message_content?: string;
}

interface ConversationRoom {
	id: string;
	name: string;
	img: string;
}

interface Message {
	id: string;
	is_user: boolean;
	content: string;
	sent_at: string;
}

interface MessageSent {
	conv_id: string;
	content: string;
}

export default function Chat() {
	const [isConversation, setIsConversation] = useState(false);
	const [conversation, setConversation] = useState<Conversation[] | null>(null);
	const [conversationRoom, setConversationRoom] =
		useState<ConversationRoom | null>(null);

	const [messages, setMessages] = useState<Message[]>([]);
	const [text, setText] = useState<string>("");
	const [cursor, setCursor] = useState<
		{ sent_at: string; id: string } | undefined
	>(undefined);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();

	const containerRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const isInitialLoadRef = useRef(true);
	const isSecondLoadRef = useRef(true);

	const [searchParams] = useSearchParams();

	const idSellerParam = searchParams.get("id");

	const fetchConversations = async () => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/chats/` + "?state=user", {
				credentials: "include",
			});
			const json = await res.json();
			if (json.code === 200 && json.status === "ok") {
				setConversation(json.data);
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

	const fetchConversationRoom = async () => {
		try {
			const res = await fetch(
				`${apiUrl}/api/v1/chats/` + idSellerParam + "?state=user",
				{
					credentials: "include",
				},
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

	const fetchMessages = async (
		convId: string,
		cursor?: { sent_at: string; id: string },
	) => {
		const params = new URLSearchParams({ limit: "10", state: "user" });

		if (cursor) {
			params.append("before", cursor.sent_at);
			params.append("msg_id", cursor.id);
		}

		const res = await fetch(
			`${apiUrl}/api/v1/chats/messages/${convId}?${params.toString()}`,
			{
				credentials: "include",
			},
		);

		if (!res.ok) {
			const text = await res.text();
			console.error("Non-JSON response:", text);
			throw new Error("Failed to fetch messages");
		}

		return res.json();
	};

	// Initial load
	useEffect(() => {
		if (!idSellerParam) {
			setConversationRoom(null);
			setIsConversation(false);
			return;
		}

		setMessages([]);
		setCursor(undefined);
		setIsConversation(true);

		fetchConversationRoom();
	}, [idSellerParam]);

	useEffect(() => {
		if (conversationRoom !== null) {
			loadMore();
		}
	}, [conversationRoom, idSellerParam]);

	const fetchingRef = useRef(false);

	const prevScrollHeightRef = useRef<number>(0);

	const loadMore = async () => {
		if (fetchingRef.current || !conversationRoom) return;

		const container = containerRef.current;
		if (container) {
			prevScrollHeightRef.current = container.scrollHeight;
		}

		fetchingRef.current = true;
		setLoading(true);

		const res = await fetchMessages(conversationRoom?.id, cursor);
		if (!res?.data) return;

		const newMessages = res.data as Message[];

		if (newMessages.length > 0) {
			setMessages((prev) => [...newMessages, ...prev]);

			const oldest = newMessages[0];
			setCursor({ sent_at: oldest.sent_at, id: oldest.id });
		}

		setLoading(false);
		fetchingRef.current = false;
	};

	const isAtBottomRef = useRef(true);

	const handleScroll = () => {
		const container = containerRef.current;
		if (!container) return;

		const nearBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight <
			20;

		isAtBottomRef.current = nearBottom;

		if (container.scrollTop <= 10 && !fetchingRef.current) {
			loadMore();
		}
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		});
	};

	useEffect(() => {
		fetchConversations();
	}, []);

	function subscribeToConversation(
		conversationId: string,
		onMessage: (msg: any) => void,
	) {
		const channel = supabase
			.channel(`conversation:${conversationId}`)
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "messages",
					filter: `conversation_id=eq.${conversationId}`,
				},
				(payload) => {
					onMessage(payload.new);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}

	useEffect(() => {
		if (conversationRoom !== null) {
			const unsubscribe = subscribeToConversation(
				conversationRoom?.id,
				(msg) => {
					setMessages((prev) => [...prev, msg]);
				},
			);

			return () => unsubscribe();
		}
	}, [conversationRoom]);

	const sendMessage = async () => {
		const csrfToken = await GetCsrf();
		const payload: MessageSent = {
			conv_id: conversationRoom?.id,
			content: text,
		};
		const params = new URLSearchParams({ state: "user" });
		if (!text.trim()) return;
		try {
			const send = await fetch(
				`${apiUrl}/api/v1/chats/messages/` +
					conversationRoom?.id +
					"?" +
					params.toString(),
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-CSRF-TOKEN": csrfToken,
					},
					credentials: "include",
					body: JSON.stringify(payload),
				},
			);

			setText("");
			const result = await send.json();
			if (result.code !== 200) {
				toast.error(result.error);
			}
		} catch (err) {
			const errFetch = "Network Error: " + err;
			toast(errFetch);
			setError(errFetch);
			// setLoading(false);
		}
	};

	// useEffect(() => {
	// if (!isConversation) return;
	// 	bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	// }, [idSellerParam, isConversation, messages.length]);

	// temporary, use the useEffect on top when messages state is ready

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Initial load → jump to bottom once
		if (isInitialLoadRef.current) {
			container.scrollTop = container.scrollHeight;
			isInitialLoadRef.current = false;
			return;
		} else if (isSecondLoadRef.current) {
			container.scrollTop = container.scrollHeight;
			isSecondLoadRef.current = false;
			return;
		}
		if (prevScrollHeightRef.current) {
			// If loading older messages (prepend)
			const newHeight = container.scrollHeight;
			const diff = newHeight - prevScrollHeightRef.current;
			container.scrollTop = diff;
			prevScrollHeightRef.current = 0;
			return;
		}

		// New realtime message → scroll only if user was at bottom
		if (isAtBottomRef.current) {
			container.scrollTop = container.scrollHeight;
		}
	}, [messages.length]);

	return (
		<>
			<section className="grid grid-cols-10 my-[1rem]">
				<section className="border-1 col-span-10 lg:col-start-2 lg:col-span-2 rounded-s-md">
					<p className="text-center text-xl font-semibold py-[1rem]">Chat</p>
					<Separator />
					<ScrollArea className="h-184">
						{conversation
							? conversation.map((conv, idx) => (
									<>
										<Link
											key={conv.id}
											to={
												"http://" + location.host + "/chat?id=" + conv.seller_id
											}
										>
											<ProfileMessage
												img={conv.img}
												name={conv.name}
												message={conv.last_message_content}
												isActive={idSellerParam === conv.seller_id}
											/>
										</Link>
									</>
								))
							: ""}
					</ScrollArea>
				</section>
				<section className="hidden lg:flex lg:flex-col lg:col-span-6 h-[50rem] border-1 rounded-e-md">
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
							{/* <ScrollArea className="h-169 px-3"> */}
							<div
								className="h-169 px-3 overflow-y-auto"
								ref={containerRef}
								onScroll={handleScroll}
							>
								{messages.map((msg, index) => (
									<Message
										key={msg.id}
										name=""
										sent={formatDate(msg.sent_at)}
										message={msg.content}
										isSender={msg.is_user}
									/>
								))}
								<div ref={bottomRef}></div>
							</div>
							{/* </ScrollArea> */}
							<section className="h-16 py-2 flex items-center mx-3">
								<Input
									type="text"
									placeholder="Message"
									value={text}
									onChange={(e) => setText(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											sendMessage();
										}
									}}
									className="flex-auto me-3"
								/>
								<Button
									className="flex-none cursor-pointer"
									variant="outline"
									onClick={sendMessage}
								>
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
