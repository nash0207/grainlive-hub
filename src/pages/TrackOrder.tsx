import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, Truck, CheckCircle2, Clock } from "lucide-react";

const steps = [
  { icon: Clock, label: "Order Placed", time: "10:30 AM", done: true },
  { icon: Package, label: "Preparing", time: "10:45 AM", done: true },
  { icon: Truck, label: "Out for Delivery", time: "11:15 AM", done: true },
  { icon: CheckCircle2, label: "Delivered", time: "—", done: false },
];

const TrackOrder = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Track Your Order</h1>
      <p className="text-muted-foreground mb-8">Enter your order ID to see real-time delivery status</p>

      <div className="flex gap-3 max-w-md mb-12">
        <Input placeholder="e.g. GD-20260405-001" />
        <Button className="bg-primary text-primary-foreground gap-2 shrink-0">
          <Search className="w-4 h-4" /> Track
        </Button>
      </div>

      <div className="max-w-lg">
        <h2 className="font-heading font-semibold text-xl mb-6 text-foreground">Sample Order: GD-20260405-001</h2>
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 h-12 ${step.done ? "bg-secondary" : "bg-border"}`} />
                )}
              </div>
              <div className="pt-2">
                <p className={`font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                <p className="text-sm text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default TrackOrder;
