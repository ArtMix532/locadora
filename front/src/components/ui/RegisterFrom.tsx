import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [profissao, setProfissao] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!nome || !email || !rg || !cpf || !profissao || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const newUser = {
      nome,
      email,
      rg,
      cpf,
      profissao,
      password,
      nivelAcesso: "AGENTE", 
    };

    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        toast({
          title: "Cadastro realizado com sucesso!",
          description: `Bem-vindo, ${createdUser.nome}! Agora você pode fazer o login.`,
        });
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast({
          title: "Erro no cadastro",
          description: errorData.message || "Não foi possível criar a conta.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor.",
        variant: "destructive",
      });
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
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
          Crie sua conta
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Preencha os campos abaixo para se cadastrar
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* 3. Formulário atualizado com todos os campos */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>
          {/* Campo de RG adicionado */}
          <div className="space-y-2">
            <Label htmlFor="rg">RG</Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="rg"
                type="text"
                placeholder="Apenas números"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="cpf"
                type="text"
                placeholder="Apenas números"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profissao">Profissão</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="profissao"
                type="text"
                placeholder="Sua profissão"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
                className="pl-10 h-11"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crie uma senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login">
                <Button type="button" variant="link" className="p-0 h-auto">
                  Faça login
                </Button>
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
