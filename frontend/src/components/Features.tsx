import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Map, 
  Calendar, 
  Globe, 
  Zap, 
  Heart,
  Clock,
  Users
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Planning",
    description: "Our intelligent agent analyzes your preferences, budget, and travel style to create personalized itineraries that match your dreams.",
    badge: "Smart"
  },
  {
    icon: Map,
    title: "Dynamic Itineraries",
    description: "Real-time adjustments based on weather, local events, and your changing preferences. Your plan evolves as you travel.",
    badge: "Adaptive"
  },
  {
    icon: Calendar,
    title: "Seamless Scheduling",
    description: "Automatically optimize timing, book reservations, and sync with your calendar. Never miss a moment of your adventure.",
    badge: "Automated"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "From hidden local gems to world-famous landmarks. Access curated recommendations for every destination worldwide.",
    badge: "Worldwide"
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description: "Get real-time notifications about flight changes, weather updates, and local recommendations delivered instantly.",
    badge: "Real-time"
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Learn from your travel history and preferences to suggest experiences that truly resonate with your unique style.",
    badge: "Personalized"
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "What used to take hours of research now happens in minutes. Spend less time planning, more time exploring.",
    badge: "Efficient"
  },
  {
    icon: Users,
    title: "Group Travel",
    description: "Coordinate complex group trips with shared preferences, split costs, and collaborative planning features.",
    badge: "Collaborative"
  }
];

const Features = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Powered by AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Travel Planning
            <span className="bg-gradient-ocean bg-clip-text text-transparent"> Reimagined</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of travel with our intelligent planning agent that understands your desires and crafts perfect adventures.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-soft transition-all duration-300 hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;