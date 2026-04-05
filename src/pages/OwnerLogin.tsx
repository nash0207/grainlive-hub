import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wheat, Crown, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: "Welcome, boss!", description: "Your dashboard is ready" });
      navigate("/owner/dashboard");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-grain-gold/20 via-accent/10 to-primary/20 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Owner Dashboard</h2>
          <p className="text-muted-foreground text-lg">Manage inventory, process orders, assign drivers, and track finances — your complete business command center.</p>
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

          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">Owner Login</h1>
          <p className="text-muted-foreground mb-8">Access your business dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="owner@graindispatch.ph" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <div className="relative">
                <Input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
              {loading ? "Please wait..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="flex gap-3 mt-8 pt-6 border-t border-border">
            <Link to="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">Buyer Login</Button>
            </Link>
            <Link to="/driver/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">Driver Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
