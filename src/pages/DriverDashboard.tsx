import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wheat, Package, Truck, CheckCircle2, MapPin, ScanLine,
  LogOut, Phone, DollarSign, Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockDeliveries = [
  {
    id: "GD-001", buyer: "Maria Santos", phone: "+63 917 111 2222",
    address: "123 Rizal St, Manila", items: "10kg Sinandomeng",
    total: 480, status: "ready", scanned: false,
  },
  {
    id: "GD-004", buyer: "Carlo Tan", phone: "+63 918 333 4444",
    address: "321 Aguinaldo Blvd, Cavite", items: "3kg Dinorado",
    total: 186, status: "ready", scanned: false,
  },
  {
    id: "GD-002", buyer: "Jose Garcia", phone: "+63 919 555 6666",
    address: "456 Mabini Ave, QC", items: "5kg Jasmine",
    total: 275, status: "in_transit", scanned: true,
  },
  {
    id: "GD-005", buyer: "Liza Cruz", phone: "+63 920 777 8888",
    address: "100 P. Burgos St, Pasig", items: "20kg NFA",
    total: 760, status: "delivered", scanned: true,
  },
];

type DeliveryStatus = "ready" | "in_transit" | "delivered";

const statusConfig: Record<DeliveryStatus, { label: string; className: string }> = {
  ready: { label: "Ready for Pickup", className: "bg-accent text-accent-foreground" },
  in_transit: { label: "In Transit", className: "bg-primary text-primary-foreground" },
  delivered: { label: "Delivered", className: "bg-secondary text-secondary-foreground" },
};

const DriverDashboard = () => {
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleScan = (id: string) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, scanned: true, status: "in_transit" } : d))
    );
    toast({ title: "✅ Sack Scanned", description: `GrainTag ${id} verified. You may leave the shop.` });
  };

  const handleDeliver = (id: string) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "delivered" } : d))
    );
    toast({ title: "🎉 Delivered!", description: `Order ${id} marked as delivered. Cash collected.` });
  };

  const openMaps = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank");
  };

  const todayEarnings = deliveries
    .filter((d) => d.status === "delivered")
    .reduce((s, d) => s + d.total, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <Truck className="w-4 h-4 text-secondary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              Driver <span className="text-secondary">Portal</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.displayName || "Driver"}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl bg-card border border-border p-4 text-center">
            <Package className="w-5 h-5 text-accent-foreground mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{deliveries.filter((d) => d.status !== "delivered").length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-center">
            <CheckCircle2 className="w-5 h-5 text-secondary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{deliveries.filter((d) => d.status === "delivered").length}</p>
            <p className="text-xs text-muted-foreground">Delivered</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-center">
            <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">₱{todayEarnings.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Collected</p>
          </div>
        </div>

        <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Today's Deliveries</h2>

        <div className="space-y-4">
          {deliveries.map((delivery) => {
            const config = statusConfig[delivery.status as DeliveryStatus];
            return (
              <div key={delivery.id} className="rounded-xl bg-card border border-border p-5 animate-fade-in-up">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-heading font-semibold text-foreground">{delivery.id}</p>
                    <p className="text-sm text-muted-foreground">{delivery.buyer}</p>
                  </div>
                  <Badge className={config.className}>{config.label}</Badge>
                </div>

                <p className="text-sm text-foreground mb-1">{delivery.items}</p>
                <p className="text-sm font-semibold text-primary mb-3">₱{delivery.total} (COD)</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{delivery.address}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {delivery.status === "ready" && !delivery.scanned && (
                    <Button size="sm" className="gap-1 bg-accent text-accent-foreground" onClick={() => handleScan(delivery.id)}>
                      <ScanLine className="w-3 h-3" /> Scan to Leave
                    </Button>
                  )}

                  {delivery.status === "in_transit" && (
                    <Button size="sm" className="gap-1 bg-secondary text-secondary-foreground" onClick={() => handleDeliver(delivery.id)}>
                      <CheckCircle2 className="w-3 h-3" /> Mark Delivered
                    </Button>
                  )}

                  {delivery.status !== "delivered" && (
                    <>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => openMaps(delivery.address)}>
                        <MapPin className="w-3 h-3" /> Navigate
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => window.open(`tel:${delivery.phone}`)}>
                        <Phone className="w-3 h-3" /> Call
                      </Button>
                    </>
                  )}

                  {delivery.status === "delivered" && (
                    <p className="text-xs text-secondary flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed & cash collected
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
