import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import WeatherComponent from "./WeatherComponent";
import ImageGallery from "./ImageGallery";
import ItineraryComponent from "./ItineraryComponent";

function extractJsonFromMarkdown(text: string): { json: any; cleanText: string } | null {
	const trimmedText = text.trim();
	
	// Pattern to match JSON code blocks with optional language specifier
	const codeBlockPattern = /^```(?:json|javascript|js)?\s*\n?([\s\S]*?)\n?```$/;
	const match = trimmedText.match(codeBlockPattern);
	
	if (match) {
		try {
			const jsonString = match[1].trim();
			const parsed = JSON.parse(jsonString);
			return { json: parsed, cleanText: jsonString };
		} catch (e) {
			console.warn('Failed to parse JSON from code block:', e);
		}
	}
	
	// Try to find JSON within the text (even if not in code blocks)
	const jsonPattern = /\{[\s\S]*\}/;
	const jsonMatch = trimmedText.match(jsonPattern);
	
	if (jsonMatch) {
		try {
			const jsonString = jsonMatch[0];
			const parsed = JSON.parse(jsonString);
			return { json: parsed, cleanText: jsonString };
		} catch (e) {
			console.warn('Failed to parse JSON from text:', e);
		}
	}
	
	// Try parsing the entire text as JSON
	try {
		const parsed = JSON.parse(trimmedText);
		return { json: parsed, cleanText: trimmedText };
	} catch (e) {
		// Not JSON, return null
	}
	
	return null;
}

function isValidJsonObject(obj: any): boolean {
	return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

const MessageBox = ({
	role,
	text,
}: {
	role: "user" | "assistant";
	text: string;
}) => {
	const jsonResult = extractJsonFromMarkdown(text);
	const isJson = jsonResult !== null && isValidJsonObject(jsonResult.json);
	const parsed = jsonResult?.json;
	const type = isJson && parsed?.type ? parsed.type : null;
	
	// Debug logging
	console.log('Original text:', text);
	console.log('JSON extraction result:', jsonResult);
	console.log('Parsed object:', parsed);
	console.log('Type detected:', type);

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
						{parsed?.message && (
							<p className="mb-2 font-semibold">{parsed.message}</p>
						)}
						{type === "weather" && parsed?.data && (
							<WeatherComponent data={parsed.data} />
						)}
						{type === "places" && parsed?.data && (
							<ImageGallery data={parsed.data} />
						)}
						{type === "itinerary" && parsed?.data && (
							<ItineraryComponent data={parsed.data} />
						)}
						{/* Fallback for JSON without specific type */}
						{!type && (
							<pre className="text-sm bg-black/20 p-2 rounded overflow-auto">
								{JSON.stringify(parsed, null, 2)}
							</pre>
						)}
					</>
				) : (
					<div className="whitespace-pre-wrap">{text}</div>
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

// weather display
// itenary display