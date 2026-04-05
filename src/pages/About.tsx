import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wheat, Users, TrendingUp, Heart } from "lucide-react";

const stats = [
  { value: "500+", label: "Families Served" },
  { value: "10K+", label: "Sacks Delivered" },
  { value: "99.5%", label: "On-Time Rate" },
  { value: "24/7", label: "Order Tracking" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Wheat className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
          About <span className="text-primary">GrainDispatch</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We're digitizing the traditional rice retail business in the Philippines — connecting shop owners, delivery drivers, and customers through one live, cloud-powered platform.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center p-6 rounded-xl bg-card border border-border">
            <p className="font-heading font-bold text-3xl text-primary mb-1">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[
          { icon: Users, title: "For the Community", desc: "Built for Filipino sari-sari stores, rice dealers, and households who deserve modern convenience." },
          { icon: TrendingUp, title: "For Growth", desc: "Owners get full visibility on inventory, sales, and debts — turning chaos into clarity." },
          { icon: Heart, title: "For Trust", desc: "Every sack is tagged, every delivery is tracked. Complete transparency from warehouse to doorstep." },
        ].map((item) => (
          <div key={item.title} className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
