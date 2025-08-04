'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface PromptFormProps {
  variant?: "hero" | "cta" | "chat";
  placeholder?: string;
  className?: string;
  query?: string;
  onSendMessage?: (prompt: string, clear: () => void) => void;
}

const PromptForm = ({ 
  variant = "hero", 
  placeholder = "Where would you like to go? (e.g., Tokyo for 5 days)",
  className,
  query,
  onSendMessage
}: PromptFormProps) => {
  const [prompt, setPrompt] = useState(query || "");
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      if (pathname === "/") {
        router.push(`/chat?query=${encodeURIComponent(prompt)}`);
        return;
      }
      if (onSendMessage) {
        onSendMessage(prompt, () => setPrompt(""));
        return;
      }
      console.log("Planning trip for:", prompt);
      // Here you would integrate with your AI planning service
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full max-w-2xl mx-auto",
        variant === "chat" ? "fixed bottom-0 left-0 right-0 z-50 border-border shadow-lg p-4 px-10 max-w-7xl mx-auto" : "",
        className
      )}
    >
      <div className={cn(
        "relative flex items-center gap-2 p-2 rounded-2xl border transition-all duration-300",
        variant === "hero" 
          ? "bg-card/30 backdrop-blur-md border-border/40 hover:border-primary/50 focus-within:border-primary/70 focus-within:bg-card/40" 
          : "bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 focus-within:border-primary"
      )}>
        <div className="flex-shrink-0 p-3">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 border-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        />
        
        <Button 
          type="submit" 
          size="sm"
          variant={variant === "hero" ? "hero" : "default"}
          disabled={!prompt.trim()}
          className={cn(
            "flex-shrink-0 group px-6",
            variant === "hero" ? "shadow-glow" : variant === 'chat' ? 'bg-gradient-ocean': ""
          )}
        >
          {variant === "chat" ? "Send Message" : "Plan Trip"}
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      {variant === "hero" && (
        <p className="text-sm text-muted-foreground/80 mt-3 text-center">
          ✨ AI will create your perfect itinerary in seconds
        </p>
      )}
    </form>
  );
};

export default PromptForm;