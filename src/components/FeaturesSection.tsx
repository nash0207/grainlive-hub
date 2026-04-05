import { Package, QrCode, TrendingUp, Users, Truck, BarChart3 } from "lucide-react";

const features = [
  { icon: Package, title: "Live Inventory", desc: "See exactly how many sacks and kilos are available — never order out-of-stock rice." },
  { icon: QrCode, title: "GrainTag QR System", desc: "Every sack gets a unique QR code. Scan before dispatch to prevent errors." },
  { icon: Truck, title: "Real-Time Tracking", desc: "Track your order from the shop to your doorstep with live status updates." },
  { icon: Users, title: "3-Portal Ecosystem", desc: "Buyer, Driver, and Owner portals — everyone stays connected in real time." },
  { icon: TrendingUp, title: "Smart Bulk-to-Retail", desc: "Order by kilo from open 50kg sacks. Precise decimal math, zero waste." },
  { icon: BarChart3, title: "Business Analytics", desc: "Owners get full financial dashboards with sales, debts, and low-stock alerts." },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
            Why Choose <span className="text-primary">GrainDispatch</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete logistics platform built for rice retailers — digitized, automated, and live.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:grain-shadow transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
