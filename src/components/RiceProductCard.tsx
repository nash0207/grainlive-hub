import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RiceProduct {
  id: string;
  name: string;
  variety: string;
  pricePerKg: number;
  stock: number;
  unit: string;
  image: string;
  badge?: string;
}

const RiceProductCard = ({ product }: { product: RiceProduct }) => {
  const [qty, setQty] = useState(1);
  const isLowStock = product.stock <= 5;

  return (
    <div className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:grain-shadow transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={400}
          height={400}
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{product.badge}</Badge>
        )}
        {isLowStock && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">Low Stock</Badge>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{product.variety}</p>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {product.stock} {product.unit} available
        </p>

        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">₱{product.pricePerKg}</span>
            <span className="text-sm text-muted-foreground">/kg</span>
          </div>
          <div className="flex items-center gap-2 border border-border rounded-lg">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-1.5 hover:bg-muted rounded-l-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="p-1.5 hover:bg-muted rounded-r-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <ShoppingCart className="w-4 h-4" /> Add to Cart — ₱{(product.pricePerKg * qty).toFixed(0)}
        </Button>
      </div>
    </div>
  );
};

export default RiceProductCard;
