import { ArrowRight, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-rice.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Premium rice grains" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-grain-earth/90 via-grain-earth/70 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-grain-leaf animate-pulse-soft" />
            <span className="text-sm font-medium text-grain-cream">Fresh stock available today</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-grain-cream leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Premium Rice,{" "}
            <span className="text-gradient">Delivered</span>{" "}
            to Your Door
          </h1>

          <p className="text-lg md:text-xl text-grain-cream/80 mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            From farm to table — order Sinandomeng, Jasmine, and more. Real-time inventory, fast delivery, fair prices.
          </p>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/shop">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8 grain-shadow">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/track">
              <Button size="lg" variant="outline" className="border-grain-cream/30 text-grain-cream hover:bg-grain-cream/10 gap-2 text-base px-8">
                Track Order
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Truck, label: "Same-day delivery" },
              { icon: Shield, label: "Quality guaranteed" },
              { icon: Clock, label: "Real-time tracking" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-grain-cream/70">
                <Icon className="w-4 h-4 text-grain-gold" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
