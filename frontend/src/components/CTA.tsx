import { Sparkles, Globe } from "lucide-react";
import PromptForm from "@/components/PromptForm";

const CTA = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Ready to Start?</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Your Dream Trip is
          <br />
          <span className="bg-gradient-ocean bg-clip-text text-transparent">
            Just One Click Away
          </span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of travelers who've discovered the magic of AI-powered trip planning. 
          Your personalized adventure awaits.
        </p>
        
        <PromptForm 
          variant="cta" 
          placeholder="Tell us about your dream trip..."
          className="mb-8"
        />
        
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>No credit card required</span>
          </div>
         
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-ocean opacity-5 rounded-full blur-3xl" />
    </section>
  );
};

export default CTA;