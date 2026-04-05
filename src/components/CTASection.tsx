import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => (
  <section className="py-20 bg-gradient-to-br from-primary via-primary to-grain-earth relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent animate-float" />
      <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-grain-gold animate-float" style={{ animationDelay: "1s" }} />
    </div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <Sparkles className="w-10 h-10 text-accent mx-auto mb-4" />
      <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-4">
        Ready to Order Fresh Rice?
      </h2>
      <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
        Join hundreds of families who trust GrainDispatch for their daily rice needs. Fast delivery, fair prices, always fresh.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/shop">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-base px-8 font-semibold">
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
        <Link to="/about">
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default CTASection;
