import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  Car,
  Mail,
  Lock,
  IdCard,
  User,
  Briefcase,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [proficao, setProficao] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo à nossa locadora de veículos.",
    });
  };

  return (
    <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm shadow-strong border-border/50">
      <CardHeader className="space-y-2 text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-2 bg-blue-gradient rounded-full">
            <Car className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-blue-gradient bg-clip-text text-transparent">
            AutoLux Rental
          </h2>
        </div>
        <CardTitle className="text-xl text-foreground">Cadastre-se</CardTitle>
        <CardDescription className="text-muted-foreground">
          Acesse sua conta para gerenciar suas reservas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Nome
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Davi Guimaraes"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-11 bg-background border-border focus:ring-primary transition-smooth"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11 bg-background border-border focus:ring-primary transition-smooth"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              CPF
            </Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Davi Guimaraes"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
                className="pl-10 h-11 bg-background border-border focus:ring-primary transition-smooth"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Profição
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="proficao"
                type="text"
                placeholder="Davi Guimaraes"
                value={proficao}
                onChange={(e) => setProficao(e.target.value)}
                className="pl-10 h-11 bg-background border-border focus:ring-primary transition-smooth"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11 bg-background border-border focus:ring-primary transition-smooth"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-[1.02]"
          >
            Cadastrar
          </Button>

          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-sm text-primary hover:text-primary-hover transition-smooth font-semibold"
                >
                  Login
                </Button>
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
