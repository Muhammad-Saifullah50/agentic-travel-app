import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import WeatherComponent from "./WeatherComponent";
import ImageGallery from "./ImageGallery";
import ItineraryComponent from "./ItineraryComponent";

function extractJsonFromMarkdown(text: string): { json: any; cleanText: string } | null {
  const trimmedText = text.trim();

  // Match fenced code block
  const codeBlockPattern = /^```(?:json|javascript|js)?\s*\n?([\s\S]*?)\n?```$/;
  const match = trimmedText.match(codeBlockPattern);

  if (match) {
    try {
      const jsonString = match[1].trim();
      const parsed = JSON.parse(jsonString);
      return { json: parsed, cleanText: jsonString };
    } catch (e) {
      console.warn("Failed to parse JSON from code block:", e);
    }
  }

  // Try parsing the entire text
  try {
    const parsed = JSON.parse(trimmedText);
    return { json: parsed, cleanText: trimmedText };
  } catch {
    // not JSON
  }

  return null;
}

function isValidJsonObject(obj: any): boolean {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}

// Normalize Python-like list string into proper JSON
function safeParseData(data: any) {
  // If it's already an array or object, return as-is
  if (Array.isArray(data) || (typeof data === "object" && data !== null)) {
    return data;
  }

  // If it's a string, try to parse it
  if (typeof data === "string") {
    try {
      // First try parsing as-is (in case it's already valid JSON)
      return JSON.parse(data);
    } catch {
      try {
        // If that fails, try fixing Python-like syntax
        const fixed = data
          .replace(/'/g, '"') // single → double quotes
          .replace(/\bNone\b/g, "null") // Python None → null
          .replace(/\bTrue\b/g, "true") // Python True → true
          .replace(/\bFalse\b/g, "false"); // Python False → false
        return JSON.parse(fixed);
      } catch (e) {
        console.warn("Failed to parse inner data string:", e);
        return [];
      }
    }
  }

  return data;
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
  let parsed = jsonResult?.json;
  const type = isJson && parsed?.type ? parsed.type : null;

  // ✅ normalize data here
  if (parsed && "data" in parsed) {
    parsed = {
      ...parsed,
      data: safeParseData(parsed.data)
    };
  }

 Array.isArray(parsed?.data);

  let content = null;

  if (isJson) {
    const data = parsed?.data;

    content = (
      <>
        {parsed?.message && (
          <p className="mb-2 font-semibold">{parsed.message}</p>
        )}

        {type === "weather" && <WeatherComponent data={data} />}
        {type === "places" && <ImageGallery data={data} />}
        {type === "itinerary" && <ItineraryComponent data={data} />}

        {!type && (
          <pre className="text-sm bg-black/20 p-2 rounded overflow-auto">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        )}
      </>
    );
  } else {
    content = <div className="whitespace-pre-wrap">{text}</div>;
  }

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
      >
        {content}
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