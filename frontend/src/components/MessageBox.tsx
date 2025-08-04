import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

const MessageBox = ({
	role,
	message,
}: {
	role: "user" | "assistant";
	message: string;
}) => (
	<div
		className={cn(
			"flex w-full items-center mx-auto my-3 px-10",
			role === "user" ? "justify-end" : "justify-start"
		)}
	>
		{role === "assistant" && (
			<div className="flex flex-col items-center mr-2">
				<Bot className="h-8 w-8 text-blue-400 " />
			</div>
		)}
		<div
			className={cn(
				"relative px-6 py-3 rounded-3xl text-base",
				"transition-all",
			
				role === "user" ? "ml-2 bg-gradient-sunset text-black" : "mr-2 text-white bg-gradient-ocean"
			)}
			
			tabIndex={0}
			title="Click to choose an image (feature coming soon)"
		>
			{message}
		</div>
		{role === "user" && (
			<div className="flex flex-col items-center ml-2 justify-center">
				<User className="h-8 w-8 text-blue-500" />
			</div>
		)}
	</div>
);

export default MessageBox