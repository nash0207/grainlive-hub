import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RiceProductCard from "@/components/RiceProductCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import riceSack from "@/assets/rice-sack.jpg";

const allProducts = [
  { id: "1", name: "Sinandomeng Premium", variety: "Sinandomeng", pricePerKg: 48, stock: 120, unit: "kg", image: riceSack, badge: "Best Seller" },
  { id: "2", name: "Jasmine Fragrant", variety: "Jasmine", pricePerKg: 55, stock: 85, unit: "kg", image: riceSack, badge: "Popular" },
  { id: "3", name: "Dinorado Special", variety: "Dinorado", pricePerKg: 62, stock: 4, unit: "kg", image: riceSack },
  { id: "4", name: "NFA Well-Milled", variety: "NFA", pricePerKg: 38, stock: 200, unit: "kg", image: riceSack },
  { id: "5", name: "Malagkit Sticky Rice", variety: "Malagkit", pricePerKg: 58, stock: 45, unit: "kg", image: riceSack },
  { id: "6", name: "Brown Rice Organic", variety: "Brown Rice", pricePerKg: 72, stock: 30, unit: "kg", image: riceSack, badge: "Healthy" },
  { id: "7", name: "Red Rice Premium", variety: "Red Rice", pricePerKg: 68, stock: 25, unit: "kg", image: riceSack },
  { id: "8", name: "Sinandomeng Regular", variety: "Sinandomeng", pricePerKg: 42, stock: 180, unit: "kg", image: riceSack },
];

const varieties = ["All", "Sinandomeng", "Jasmine", "Dinorado", "NFA", "Malagkit", "Brown Rice", "Red Rice"];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [activeVariety, setActiveVariety] = useState("All");

  const filtered = allProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchVariety = activeVariety === "All" || p.variety === activeVariety;
    return matchSearch && matchVariety;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Rice Shop</h1>
          <p className="text-muted-foreground">Browse our selection of premium rice — live inventory, fair prices</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search rice varieties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0" />
            {varieties.map((v) => (
              <button
                key={v}
                onClick={() => setActiveVariety(v)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeVariety === v
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <RiceProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
