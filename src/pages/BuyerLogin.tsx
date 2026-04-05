import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wheat, ShoppingBag, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BuyerLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await register(email, password, "buyer", name);
        toast({ title: "Account created!", description: "Welcome to GrainDispatch" });
      } else {
        await login(email, password);
        toast({ title: "Welcome back!", description: "You're logged in" });
      }
      navigate("/shop");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 via-grain-gold/10 to-secondary/20 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Shop Premium Rice</h2>
          <p className="text-muted-foreground text-lg">Browse real-time inventory, order your favorite rice varieties, and track delivery — all in one place.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Wheat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              Grain<span className="text-primary">Dispatch</span>
            </span>
          </Link>

          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            {isRegister ? "Create Buyer Account" : "Buyer Login"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isRegister ? "Sign up to start ordering rice" : "Welcome back! Sign in to your account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Dela Cruz" required />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <div className="relative">
                <Input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
              {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-medium hover:underline">
              {isRegister ? "Sign In" : "Sign Up"}
            </button>
          </p>

          <div className="flex gap-3 mt-8 pt-6 border-t border-border">
            <Link to="/driver/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">Driver Login</Button>
            </Link>
            <Link to="/owner/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">Owner Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerLogin;
