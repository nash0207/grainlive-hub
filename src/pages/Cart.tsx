import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import riceSack from "@/assets/rice-sack.jpg";

const initialCart = [
  { id: "1", name: "Sinandomeng Premium", pricePerKg: 48, qty: 5, image: riceSack },
  { id: "2", name: "Jasmine Fragrant", pricePerKg: 55, qty: 2, image: riceSack },
];

const Cart = () => {
  const [items, setItems] = useState(initialCart);
  const { toast } = useToast();

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Removed", description: "Item removed from cart" });
  };

  const subtotal = items.reduce((s, i) => s + i.pricePerKg * i.qty, 0);
  const delivery = 50;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/shop"><Button className="bg-primary text-primary-foreground">Shop Now</Button></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-xl bg-card border border-border p-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₱{item.pricePerKg}/kg</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1.5 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm">{item.qty} kg</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1.5 hover:bg-muted"><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-semibold text-primary">₱{(item.pricePerKg * item.qty).toFixed(0)}</span>
                      <button onClick={() => remove(item.id)} className="ml-auto text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-card border border-border p-6 h-fit">
              <h3 className="font-heading font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₱{subtotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery Fee</span><span className="text-foreground">₱{delivery}</span></div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span className="text-foreground">Total</span><span className="text-primary text-lg">₱{subtotal + delivery}</span>
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-primary text-primary-foreground gap-2"
                onClick={() => toast({ title: "Order placed!", description: "Your rice is on its way 🎉" })}
              >
                Place Order (COD) <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">Cash on Delivery — pay when your rice arrives</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
