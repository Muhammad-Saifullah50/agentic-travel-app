'use client';

import { use, useEffect, useRef, useState } from "react";
import PromptForm from "@/components/PromptForm";
import MessageBox from "@/components/MessageBox";
import Loader from "@/components/Loader";

const ChatPage = ({ searchParams }: { searchParams: { query: string } }) => {

	const usableParams = use(searchParams)
	const [messages, setMessages] = useState<
		{ role: "user" | "assistant"; content: string }[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);
	
	// Create refs for the messages container and scroll target
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const handleSendMessage = async (prompt: string, clear: () => void) => {
		setMessages((prev) => [...prev, { role: "user", content: prompt }]);
		clear();

		const updatedMessages = [...messages, { role: "user", content: prompt }];
		const controller = new AbortController();
		
		// Show loader when starting to fetch response
		setIsLoading(true);

		try {
			const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
			const res = await fetch(`${backendUrl}/send-message`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: updatedMessages }),
				signal: controller.signal,
			});

			const reader = res.body?.getReader();
			const decoder = new TextDecoder("utf-8");
			let fullMessage = "";

			if (!reader) throw new Error("No stream");

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				fullMessage += chunk;

				//  append partial message live
				setMessages((prev) => {
					const last = prev[prev.length - 1];
					if (last?.role === "assistant") {
						return [
							...prev.slice(0, -1),
							{ role: "assistant", content: last.content + chunk },
						];
					} else {
						return [...prev, { role: "assistant", content: chunk }];
					}
				});
			}
		} catch (err) {
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: err.message },
			]);
		} finally {
			// Hide loader when response is complete or error occurs
			setIsLoading(false);
		};
	};

	// Function to scroll to bottom
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Scroll to bottom when messages change
	useEffect(() => {
		scrollToBottom();
	}, [messages, isLoading]);

	
	return (
		<div className="min-h-screen bg-background flex flex-col pt-8 pb-32">
			<div 
				ref={messagesContainerRef}
				className="flex-1 w-full max-w-7xl mx-auto py-10 overflow-y-scroll max-h-[calc(100vh-10vh)] px-4"
			>
				{messages.map((msg, idx) => (
					<MessageBox
						key={idx}
						role={msg.role as "user" | "assistant"}
						text={msg.content}
					/>
				))}
				{isLoading && <Loader />}
				<div ref={messagesEndRef} />
			</div>
			<div className="fixed bottom-0 left-0 right-0 z-50 bg-transparent">
				<PromptForm
					variant="chat"
					query={usableParams.query}
					onSendMessage={handleSendMessage}
				/>
			</div>
		</div>
	);
};

export default ChatPage;