import RiceProductCard from "./RiceProductCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import riceSack from "@/assets/rice-sack.jpg";

const products = [
  { id: "1", name: "Sinandomeng Premium", variety: "Sinandomeng", pricePerKg: 48, stock: 120, unit: "kg", image: riceSack, badge: "Best Seller" },
  { id: "2", name: "Jasmine Fragrant", variety: "Jasmine", pricePerKg: 55, stock: 85, unit: "kg", image: riceSack, badge: "Popular" },
  { id: "3", name: "Dinorado Special", variety: "Dinorado", pricePerKg: 62, stock: 4, unit: "kg", image: riceSack },
  { id: "4", name: "NFA Well-Milled", variety: "NFA", pricePerKg: 38, stock: 200, unit: "kg", image: riceSack },
];

const PopularProducts = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
            Shop <span className="text-primary">Fresh Rice</span>
          </h2>
          <p className="text-muted-foreground">Handpicked varieties with real-time stock levels</p>
        </div>
        <Link to="/shop" className="hidden md:block">
          <Button variant="outline" className="gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <RiceProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link to="/shop">
          <Button variant="outline" className="gap-2">
            View All Products <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default PopularProducts;
