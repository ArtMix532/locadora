import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import {
  Car,
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreditCard, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
// Ícones
import { Loader2 } from "lucide-react";

interface CarroData {
  matricula: string;
  modelo: string;
  marca: string;
  placa: string;
  ano: string; // Manter como string para o input, converter antes de enviar
  valor: number;
  disponivel: boolean;
}

const useToast = () => {
  return {
    toast: ({ title, description, variant = "default" }) => {
      // Usando console.log como alternativa para a notificação visual
      console.log(`[Toast - ${variant}] ${title}: ${description}`);
      // Em uma aplicação completa, você poderia usar um alert ou um modal simples aqui
      // alert(`${title}\n${description}`);
    },
  };
};

const Cars = () => {
  const [user, setUser] = useState<{
    nome: string;
    nivelAcesso: string;
    accessToken: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast(); // Hook para exibir notificações (usando o placeholder)
  const navigate = useNavigate(); // Hook para navegação

  // Estado para armazenar os dados do formulário
  const [carData, setCarData] = useState<CarroData>({
    matricula: "",
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
    valor: "",
    disponivel: true, // Valor padrão conforme o backend
  });

  // Efeito para ler os dados do usuário do localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    } else {
      // Opcional: Redirecionar para login se não houver usuário
      navigate("/login");
    }
  }, [navigate]);

  // Função para lidar com a mudança nos inputs
  const handleInputChange = (
    field: keyof CarroData,
    value: string | boolean
  ) => {
    setCarData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Função para submeter o formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validação simples
    for (const key in carData) {
      if (
        key !== "disponivel" &&
        !carData[key as keyof Omit<CarroData, "disponivel">]
      ) {
        toast({
          title: "Campo obrigatório",
          description: `Por favor, preencha o campo: ${key}`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Preparando os dados para enviar
    const payload = {
      ...carData,
      ano: parseInt(carData.ano, 10),
      placa: carData.placa.toUpperCase().replace("-", ""), // Garante formato correto
    };

    try {
      // 1. Busque o token do localStorage

      const response = await fetch("http://localhost:8080/api/carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 2. Adicione o cabeçalho de autorização
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const createdCar = await response.json();
        toast({
          title: "Cadastro realizado com sucesso!",
          description: `O carro ${createdCar.modelo} - ${createdCar.placa} foi adicionado à frota.`,
        });
        setCarData({
          matricula: "",
          modelo: "",
          marca: "",
          placa: "",
          ano: "",
          valor: "",
          disponivel: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Erro no cadastro",
          description:
            errorData.message ||
            "Não foi possível cadastrar o carro. Verifique os dados.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Falha na comunicação com a API:", error);
      toast({
        title: "Erro de conexão",
        description:
          "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType={user.nivelAcesso} userName={user.nome} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Cadastro de Frota
          </h1>
          <p className="text-muted-foreground">
            Cadastre um novo carro para a frota
          </p>
        </div>

        {/* Forms  */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Dados do Veículo
            </CardTitle>
            <CardDescription>
              Todos os campos marcados com * são obrigatórios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="matricula">Matrícula *</Label>
                  <Input
                    id="matricula"
                    value={carData.matricula}
                    onChange={(e) =>
                      handleInputChange("matricula", e.target.value)
                    }
                    placeholder="Ex: 123456ABC"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="modelo">Modelo *</Label>
                  <Input
                    id="modelo"
                    value={carData.modelo}
                    onChange={(e) =>
                      handleInputChange("modelo", e.target.value)
                    }
                    placeholder="Ex: Onix, Corolla, Compass"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marca">Marca *</Label>
                  <Input
                    id="marca"
                    value={carData.marca}
                    onChange={(e) => handleInputChange("marca", e.target.value)}
                    placeholder="Ex: Chevrolet, Toyota, Jeep"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placa">Placa *</Label>
                  <Input
                    id="placa"
                    value={carData.placa}
                    onChange={(e) => handleInputChange("placa", e.target.value)}
                    placeholder="AAA1234 ou ABC1D23"
                    maxLength={7}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ano">Ano de Fabricação *</Label>
                  <Input
                    id="ano"
                    type="number"
                    value={carData.ano}
                    onChange={(e) => handleInputChange("ano", e.target.value)}
                    placeholder="Ex: 2023"
                    min="1900"
                    max="2100"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ano">Valor da Diaria *</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={carData.valor}
                    onChange={(e) => handleInputChange("valor", e.target.value)}
                    placeholder="Ex: 100"
                    min="0"
                    max="10000"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-gradient hover:bg-blue-gradient-dark text-white w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar Veículo"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cars;
