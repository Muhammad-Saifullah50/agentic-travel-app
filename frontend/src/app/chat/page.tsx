'use client';

import { use, useState } from "react";
import PromptForm from "@/components/PromptForm";
import MessageBox from "@/components/MessageBox";

const ChatPage = ({ searchParams }: { searchParams: { query: string } }) => {

	const usableParams = use(searchParams)
	const [messages, setMessages] = useState<
		{ role: "user" | "assistant"; content: string }[]
	>([]);

	const handleSendMessage = async (prompt: string, clear: () => void) => {
		setMessages((prev) => [...prev, { role: "user", content: prompt }]);
		clear();

		const updatedMessages = [...messages, { role: "user", content: prompt }];
		const controller = new AbortController();

		try {
			const res = await fetch("http://localhost:8000/send-message", {
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
		}
	};


	return (
		<div className="min-h-screen bg-background flex flex-col pt-8 pb-32">
			<div className="flex-1 w-full mx-auto py-10 overflow-y-scroll max-w-7xl">
				{messages.map((msg, idx) => (
					<MessageBox
						key={idx}
						role={msg.role as "user" | "assistant"}
						text={msg.content}
					/>
				))}
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