import { Sparkles } from "lucide-react";
import PromptForm from "@/components/PromptForm";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/assets/hero.jpg"
        alt="Travel Hero Background"
        fill
        className="object-cover object-center absolute inset-0 w-full h-full z-0"
        priority
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-border/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-white">AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-primary bg-clip-text text-transparent drop-shadow-lg">
              Your Next Adventure
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            Let our AI agent craft the perfect itinerary for your dream destination. 
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent font-semibold">
              Personalized recommendations, seamless planning, unforgettable experiences.
            </span>
          </p>
          
          <PromptForm variant="hero" className="mb-6" />
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <div className="w-20 h-20 bg-primary/30 rounded-full blur-xl" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <div className="w-32 h-32 bg-accent/30 rounded-full blur-xl" />
      </div>
    </section>
  );
};

export default Hero;
