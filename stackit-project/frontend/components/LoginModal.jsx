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



export function LoginModal({ children }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      case 'fullName':
        if (value.trim().length < 2) {
          newErrors.fullName = 'Please enter your full name';
        } else {
          delete newErrors.fullName;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  return (
    
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden" aria-describedby="login-description">
        <div id="login-description" className="sr-only">
          Login or sign up to access your StatKit account
        </div>
        
        {/* Header with logo */}
        <div className="px-6 pt-6 pb-2 border-b">
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 bg-statkit-red rounded-lg flex items-center justify-center">
              <span className="text-statkit-red-foreground font-bold text-sm">S</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-foreground">StatKit</span>
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
                  Sign in to your StatKit account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 px-0">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className={`pl-10 h-11 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
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

                <div className="flex justify-end">
                  <a href="#" className="text-sm text-statkit-red hover:text-statkit-red-hover transition-colors">
                    Forgot your password?
                  </a>
                </div>

                <Button className="w-full h-11 bg-statkit-red hover:bg-statkit-red-hover text-statkit-red-foreground font-medium transition-colors">
                  Sign In
                </Button>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    OR
                  </span>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-11 font-medium hover:bg-muted/50 transition-colors"
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="px-6 pb-6 mt-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center px-0 pb-6">
                <CardTitle className="text-xl">Join StatKit</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Create your account to start asking and answering questions
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 px-0">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      id="fullName" 
                      placeholder="John Doe" 
                      className={`pl-10 h-11 ${errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      onBlur={(e) => validateField('fullName', e.target.value)}
                    />
                  </div>
                  {errors.fullName && (
                    <div className="flex items-center gap-1 text-destructive text-xs">
                      <AlertCircle className="h-3 w-3" />
                      {errors.fullName}
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
                      className="pl-10 pr-10 h-11"
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
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                    className="data-[state=checked]:bg-statkit-red data-[state=checked]:border-statkit-red"
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                    I agree to the{" "}
                    <a href="#" className="text-statkit-red hover:text-statkit-red-hover transition-colors">
                      Terms of Service
                    </a>
                    {" "}and{" "}
                    <a href="#" className="text-statkit-red hover:text-statkit-red-hover transition-colors">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                <Button 
                  className="w-full h-11 bg-statkit-red hover:bg-statkit-red-hover text-statkit-red-foreground font-medium transition-colors disabled:opacity-50"
                  disabled={!agreeToTerms}
                >
                  Create Account
                </Button>

                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    OR
                  </span>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-11 font-medium hover:bg-muted/50 transition-colors"
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  Sign up with Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}