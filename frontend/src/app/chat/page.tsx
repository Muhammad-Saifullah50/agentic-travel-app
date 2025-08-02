import PromptForm from "@/components/PromptForm";

import React from "react";
import MessageBox from "@/components/MessageBox";

const messages = [
	{
		role: "user",
		message: "Hi! Can you help me plan a trip to Paris?",
	},
	{
		role: "assistant",
		message:
			"Absolutely! What dates are you planning to travel and what is your budget?",
	},
	{
		role: "user",
		message: "I'm thinking about next month, and my budget is $1500.",
	},
	{
		role: "assistant",
		message:
			"Great! Would you like recommendations for sightseeing, food, or something else?",
	},
	{
		role: "user",
		message: "Sightseeing and food, please!",
	},
	{
		role: "assistant",
		message:
			"Perfect! I'll suggest a 5-day itinerary with the best sights and food spots in Paris.",
	},
	{
		role: "user",
		message: "Hi! Can you help me plan a trip to Paris?",
	},
	{
		role: "assistant",
		message:
			"Absolutely! What dates are you planning to travel and what is your budget?",
	},
	{
		role: "user",
		message: "I'm thinking about next month, and my budget is $1500.",
	},
	{
		role: "assistant",
		message:
			"Great! Would you like recommendations for sightseeing, food, or something else?",
	},
	{
		role: "user",
		message: "Sightseeing and food, please!",
	},
	{
		role: "assistant",
		message:
			"Perfect! I'll suggest a 5-day itinerary with the best sights and food spots in Paris.",
	},
];



const ChatPage = () => {
	return (
		<div className="min-h-screen bg-background flex flex-col pt-8 pb-32">
			<div className="flex-1 w-full  mx-auto py-10 overflow-y-scroll max-w-7xl">
				{messages.map((msg, idx) => (
					<MessageBox
						key={idx}
						role={msg.role as "user" | "assistant"}
						message={msg.message}
					/>
				))}
			</div>
			<div className="fixed bottom-0 left-0 right-0 z-50 bg-transparent">
				<PromptForm variant="chat" />
			</div>
		</div>
	);
};

export default ChatPage;