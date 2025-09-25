import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Car, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8082/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("authToken", data.accessToken); // Corrigido para data.accessToken
        localStorage.setItem("user", JSON.stringify(data));

        console.log(data);
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${data.nome || "usuário"}!`, // Corrigido para data.nome
        });

        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        toast({
          title: "Erro no login",
          description:
            errorData.message || "E-mail ou senha inválidos. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Lida com erros de rede (ex: API offline)
      toast({
        title: "Erro de conexão",
        description:
          "Não foi possível conectar ao servidor. Verifique sua internet.",
        variant: "destructive",
      });
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false); // Para o carregamento, tanto em sucesso quanto em erro
    }
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
        <CardTitle className="text-xl text-foreground">
          Entre em sua conta
        </CardTitle>
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

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm text-primary hover:text-primary-hover transition-smooth"
            >
              Esqueci minha senha
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-[1.02]"
            disabled={isLoading} // Desabilita o botão durante o carregamento
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/register">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-sm text-primary hover:text-primary-hover transition-smooth font-semibold"
                >
                  Cadastre-se
                </Button>
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
