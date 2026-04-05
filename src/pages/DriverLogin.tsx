import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wheat, Truck, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DriverLogin = () => {
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
        await register(email, password, "driver", name);
        toast({ title: "Driver account created!", description: "Welcome aboard" });
      } else {
        await login(email, password);
        toast({ title: "Welcome back, driver!", description: "Your deliveries await" });
      }
      navigate("/driver/dashboard");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-secondary/20 via-grain-leaf/10 to-primary/20 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Driver Portal</h2>
          <p className="text-muted-foreground text-lg">View your deliveries, scan sacks, update order statuses, and collect payments — all from your phone.</p>
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
            {isRegister ? "Register as Driver" : "Driver Login"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isRegister ? "Create your driver account" : "Sign in to access your deliveries"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Driver name" required />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="driver@email.com" required />
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
            <Button type="submit" className="w-full bg-secondary text-secondary-foreground" disabled={loading}>
              {loading ? "Please wait..." : isRegister ? "Create Driver Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {isRegister ? "Already registered?" : "Need an account?"}{" "}
            <button onClick={() => setIsRegister(!isRegister)} className="text-secondary font-medium hover:underline">
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>

          <div className="flex gap-3 mt-8 pt-6 border-t border-border">
            <Link to="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">Buyer Login</Button>
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

export default DriverLogin;
