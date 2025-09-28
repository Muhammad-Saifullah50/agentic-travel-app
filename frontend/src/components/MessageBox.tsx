import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import WeatherComponent from "./WeatherComponent";
import ImageGallery from "./ImageGallery";

function cleanMarkdownJson(md: string): string {
	// Remove Markdown code fences like ```json ... ```
	return md
		.trim()
		.replace(/^```(?:json)?/, "") // remove starting ```json or ```
		.replace(/```$/, "") // remove ending ```
		.trim();
}

const MessageBox = ({
	role,
	text,
}: {
	role: "user" | "assistant";
	text: string;
}) => {
	// Try to clean markdown before parsing
	let cleaned = text;
	if (text.trim().startsWith("```")) {
		cleaned = cleanMarkdownJson(text);
	}

	let parsed: Record<string, any> | null = null;
	let isJson = false;

	try {
		parsed = JSON.parse(cleaned);
		isJson = typeof parsed === "object" && parsed !== null;
	} catch (e) {
		isJson = false;
	}

	let type = isJson && parsed?.type ? parsed.type : null;
console.log(parsed)
	return (
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
					role === "user"
						? "ml-2 bg-gradient-sunset text-black"
						: "mr-2 text-white bg-gradient-ocean"
				)}
				tabIndex={0}
				title="Click to choose an image (feature coming soon)"
			>
				{isJson ? (
					<>
						<p className="mb-2 font-semibold">{parsed?.message ?? ""}</p>
						{type === "weather" && parsed?.data && (
							<WeatherComponent data={parsed.data} />
						)}
						{type === "places" && parsed?.data && (
							<ImageGallery data={parsed.data} />
						)}
					</>
				) : (
					text
				)}
			</div>
			{role === "user" && (
				<div className="flex flex-col items-center ml-2 justify-center">
					<User className="h-8 w-8 text-blue-500" />
				</div>
			)}
		</div>
	);
};

export default MessageBox;
