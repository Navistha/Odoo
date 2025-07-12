import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Chrome, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export function LoginModal({ children }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Form data
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const { login, register } = useAuth();

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'email':
        if (!value.includes('@')) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        break;
      case 'username':
        if (value.trim().length < 2) {
          newErrors.username = 'Username must be at least 2 characters';
        } else {
          delete newErrors.username;
        }
        break;
      case 'confirmPassword':
        if (value !== registerData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(loginData.username, loginData.password);
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        setOpen(false);
        setLoginData({ username: '', password: '' });
      } else {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(registerData.username, registerData.email, registerData.password);
      if (result.success) {
        toast({
          title: "Welcome to StackIt!",
          description: "Your account has been created successfully.",
        });
        setOpen(false);
        setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden" aria-describedby="login-description">
        <div id="login-description" className="sr-only">
          Login or sign up to access your StackIt account
        </div>
        
        {/* Header with logo */}
        <div className="px-6 pt-6 pb-2 border-b">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-foreground">StackIt</span>
          </div>
        </div>

        <Tabs 
          value={isLogin ? "login" : "signup"} 
          onValueChange={(value) => {
            setIsLogin(value === "login");
            setErrors({});
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mx-6 mb-6 bg-muted/50">
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
            >
              Create Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="px-6 pb-6 mt-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center px-0 pb-6">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Sign in to your StackIt account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 px-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="username" 
                        type="text" 
                        placeholder="your_username" 
                        className={`pl-10 h-11 ${errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        onBlur={(e) => validateField('username', e.target.value)}
                      />
                    </div>
                    {errors.username && (
                      <div className="flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.username}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className={`pl-10 pr-10 h-11 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        onBlur={(e) => validateField('password', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="px-6 pb-6 mt-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center px-0 pb-6">
                <CardTitle className="text-xl">Join StackIt</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Create your account to start asking and answering questions
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 px-0">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="signup-username" 
                        placeholder="john_doe" 
                        className={`pl-10 h-11 ${errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        onBlur={(e) => validateField('username', e.target.value)}
                      />
                    </div>
                    {errors.username && (
                      <div className="flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.username}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        className={`pl-10 h-11 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        onBlur={(e) => validateField('email', e.target.value)}
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create a strong password" 
                        className={`pl-10 pr-10 h-11 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        onBlur={(e) => validateField('password', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="confirm-password" 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Confirm your password" 
                        className={`pl-10 pr-10 h-11 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        onBlur={(e) => validateField('confirmPassword', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center gap-1 text-destructive text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 py-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                        Terms of Service
                      </a>
                      {" "}and{" "}
                      <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors disabled:opacity-50"
                    disabled={!agreeToTerms || isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}