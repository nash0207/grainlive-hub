import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Wheat, Package, Truck, Users, DollarSign, AlertTriangle,
  Plus, LogOut, ClipboardList, QrCode, TrendingUp, ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockInventory = [
  { id: "1", name: "Sinandomeng Premium", stock: 120, unit: "kg", sacks: 2.4, pricePerKg: 48 },
  { id: "2", name: "Jasmine Fragrant", stock: 85, unit: "kg", sacks: 1.7, pricePerKg: 55 },
  { id: "3", name: "Dinorado Special", stock: 4, unit: "kg", sacks: 0.08, pricePerKg: 62 },
  { id: "4", name: "NFA Well-Milled", stock: 200, unit: "kg", sacks: 4, pricePerKg: 38 },
  { id: "5", name: "Malagkit Sticky", stock: 45, unit: "kg", sacks: 0.9, pricePerKg: 58 },
];

const mockOrders = [
  { id: "GD-001", buyer: "Maria Santos", items: "10kg Sinandomeng", total: 480, status: "pending", address: "123 Rizal St, Manila" },
  { id: "GD-002", buyer: "Jose Garcia", items: "5kg Jasmine", total: 275, status: "dispatched", address: "456 Mabini Ave, QC", driver: "Pedro Cruz" },
  { id: "GD-003", buyer: "Ana Reyes", items: "25kg NFA", total: 950, status: "delivered", address: "789 Luna St, Makati", driver: "Juan Ramos" },
  { id: "GD-004", buyer: "Carlo Tan", items: "3kg Dinorado", total: 186, status: "pending", address: "321 Aguinaldo Blvd, Cavite" },
];

const mockDrivers = [
  { id: "d1", name: "Pedro Cruz", deliveries: 3, status: "active" },
  { id: "d2", name: "Juan Ramos", deliveries: 5, status: "active" },
  { id: "d3", name: "Mark Villanueva", deliveries: 0, status: "available" },
];

const statusColors: Record<string, string> = {
  pending: "bg-accent text-accent-foreground",
  dispatched: "bg-primary text-primary-foreground",
  delivered: "bg-secondary text-secondary-foreground",
};

type Tab = "overview" | "inventory" | "orders" | "drivers" | "finance";

const OwnerDashboard = () => {
  const [tab, setTab] = useState<Tab>("overview");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const lowStockItems = mockInventory.filter((i) => i.stock <= 5 * 50);
  const totalRevenue = mockOrders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.total, 0);
  const pendingOrders = mockOrders.filter((o) => o.status === "pending");

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "overview", label: "Overview", icon: TrendingUp },
    { key: "inventory", label: "Inventory", icon: Package },
    { key: "orders", label: "Orders", icon: ClipboardList },
    { key: "drivers", label: "Drivers", icon: Truck },
    { key: "finance", label: "Finance", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              Owner <span className="text-primary">Dashboard</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.displayName || user?.email || "Owner"}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tab nav */}
        <div className="flex gap-1 overflow-x-auto mb-8 bg-muted rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                tab === t.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Stock", value: `${mockInventory.reduce((s, i) => s + i.stock, 0)} kg`, icon: Package, color: "text-primary" },
                { label: "Pending Orders", value: pendingOrders.length.toString(), icon: ClipboardList, color: "text-accent-foreground" },
                { label: "Active Drivers", value: mockDrivers.filter((d) => d.status === "active").length.toString(), icon: Truck, color: "text-secondary" },
                { label: "Revenue Today", value: `₱${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
              ].map((card) => (
                <div key={card.label} className="rounded-xl bg-card border border-border p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{card.label}</span>
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{card.value}</p>
                </div>
              ))}
            </div>

            {lowStockItems.length > 0 && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="font-heading font-semibold text-foreground">Low Stock Alert</h3>
                </div>
                <div className="space-y-2">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{item.name}</span>
                      <Badge className="bg-destructive text-destructive-foreground">{item.stock} kg left</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="rounded-xl bg-card border border-border p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{order.id} — {order.buyer}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={statusColors[order.status]}>{order.status}</Badge>
                      <p className="text-sm font-semibold text-foreground mt-1">₱{order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inventory */}
        {tab === "inventory" && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-xl text-foreground">Inventory Control</h2>
              <Button className="gap-2 bg-primary text-primary-foreground" onClick={() => toast({ title: "Stock-In", description: "QR GrainTag generation coming soon!" })}>
                <Plus className="w-4 h-4" /> Stock In
              </Button>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-5 gap-4 px-5 py-3 bg-muted text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>Product</span><span>Stock</span><span>Sacks (50kg)</span><span>Price/kg</span><span>Status</span>
              </div>
              {mockInventory.map((item) => (
                <div key={item.id} className="grid grid-cols-5 gap-4 px-5 py-4 border-t border-border items-center">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">{item.stock} kg</span>
                  <span className="text-muted-foreground">{item.sacks.toFixed(1)}</span>
                  <span className="text-foreground">₱{item.pricePerKg}</span>
                  <Badge className={item.stock <= 10 ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground"}>
                    {item.stock <= 10 ? "Low" : "In Stock"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">Order Processing</h2>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="rounded-xl bg-card border border-border p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.buyer} — {order.address}</p>
                    </div>
                    <Badge className={statusColors[order.status]}>{order.status}</Badge>
                  </div>
                  <p className="text-sm text-foreground mb-3">{order.items} — <span className="font-semibold text-primary">₱{order.total}</span></p>
                  {order.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-1 bg-primary text-primary-foreground" onClick={() => toast({ title: "Assign Driver", description: "Select a driver for this order" })}>
                        <Truck className="w-3 h-3" /> Assign Driver
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => toast({ title: "QR Generated", description: `GrainTag for ${order.id} ready to print` })}>
                        <QrCode className="w-3 h-3" /> Generate GrainTag
                      </Button>
                    </div>
                  )}
                  {order.driver && (
                    <p className="text-xs text-muted-foreground mt-2">🚚 Assigned to: {order.driver}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drivers */}
        {tab === "drivers" && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">Driver Management</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockDrivers.map((driver) => (
                <div key={driver.id} className="rounded-xl bg-card border border-border p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{driver.name}</p>
                      <Badge className={driver.status === "active" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}>
                        {driver.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{driver.deliveries} deliveries today</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finance */}
        {tab === "finance" && (
          <div className="animate-fade-in-up">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">Financial Ledger</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-card border border-border p-5">
                <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                <p className="text-2xl font-bold text-primary">₱{(totalRevenue + 2450).toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-card border border-border p-5">
                <p className="text-sm text-muted-foreground mb-1">Collected (COD)</p>
                <p className="text-2xl font-bold text-secondary">₱{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-card border border-border p-5">
                <p className="text-sm text-muted-foreground mb-1">Utang (Debts)</p>
                <p className="text-2xl font-bold text-destructive">₱2,450</p>
              </div>
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Transaction History</h3>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-muted text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>Order</span><span>Customer</span><span>Amount</span><span>Status</span>
              </div>
              {mockOrders.map((o) => (
                <div key={o.id} className="grid grid-cols-4 gap-4 px-5 py-4 border-t border-border items-center">
                  <span className="font-medium text-foreground">{o.id}</span>
                  <span className="text-muted-foreground">{o.buyer}</span>
                  <span className="text-foreground font-semibold">₱{o.total}</span>
                  <Badge className={statusColors[o.status]}>{o.status === "delivered" ? "Paid" : o.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
