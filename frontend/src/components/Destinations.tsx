'use client';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowRight } from "lucide-react";
import mountainsImg from "../../public/assets/mountains.jpg";
import cityImg from "../../public/assets/city.jpg";
import templeImg from "../../public/assets/temple.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const destinations = [
	{
		id: 1,
		name: "Swiss Alps Adventure",
		location: "Switzerland",
		image: mountainsImg,
		rating: 4.9,
		description:
			"Breathtaking mountain vistas, pristine hiking trails, and charming alpine villages await in this stunning Swiss adventure.",
		tags: ["Mountains", "Hiking", "Nature"],
		duration: "3 days",
		prompt: 'Plan a trip to Swiss Alps in Switzerland'
	},
	{
		id: 2,
		name: "Tokyo Metropolitan",
		location: "Japan",
		image: cityImg,
		rating: 4.8,
		description:
			"Experience the perfect blend of ancient traditions and cutting-edge technology in Japan's vibrant capital city.",
		tags: ["City", "Culture", "Technology"],
		duration: "3 days",
		prompt: 'Plan a trip to Tokyo in Japan'
	},
	{
		id: 3,
		name: "Ancient Wonders",
		location: "Cambodia",
		image: templeImg,
		rating: 4.7,
		description:
			"Discover mystical temple complexes hidden in lush jungles, where history and nature create magical experiences.",
		tags: ["History", "Culture", "Adventure"],
		duration: "3 days",
		prompt: 'Plan a trip to Angkor Wat in Cambodia'
	},
];

const Destinations = () => {

	const router = useRouter();
	return (
		<section className="py-24 px-6 bg-background">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<Badge variant="secondary" className="mb-4">
						Popular Destinations
					</Badge>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Discover Your Next
						<span className="bg-gradient-sunset bg-clip-text text-transparent">
							{" "}
							Adventure
						</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						From mountain peaks to bustling cities, our AI curates experiences
						that match your wanderlust.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{destinations.map((destination, index) => (
						<Card
							key={destination.id}
							className="group overflow-hidden bg-gradient-card border-border/50 hover:shadow-elevation transition-all duration-500 hover:scale-105"
							style={{ animationDelay: `${index * 0.2}s` }}
						>
							<div className="relative overflow-hidden">
								<Image
									src={destination.image}
									alt={destination.name}
									className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
									width={600}
									height={256}
									placeholder="blur"
									style={{ objectFit: "cover" }}
								/>
								<div className="absolute top-4 left-4">
									<Badge className="bg-card/90 backdrop-blur-sm">
										{destination.duration}
									</Badge>
								</div>
								<div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
									<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
									<span className="text-xs font-medium">
										{destination.rating}
									</span>
								</div>
							</div>

							<div className="p-6">
								<div className="flex items-center gap-2 mb-2">
									<MapPin className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">
										{destination.location}
									</span>
								</div>

								<h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
									{destination.name}
								</h3>

								<p className="text-muted-foreground mb-4 leading-relaxed">
									{destination.description}
								</p>

								<div className="flex flex-wrap gap-2 mb-4">
									{destination.tags.map((tag) => (
										<Badge key={tag} variant="outline" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>

								<Button variant="ghost" className="w-full group/btn" onClick={() => router.push(`/chat?query=${encodeURIComponent(destination.prompt)}`)}>
									Plan This Trip
									<ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
								</Button>
							</div>
						</Card>
					))}
				</div>

				<div className="text-center mt-12">
					<Button variant="cta" size="lg">
						Explore All Destinations
						<ArrowRight className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Destinations;