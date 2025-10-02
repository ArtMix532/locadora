import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, ArrowLeft, Users, Fuel, Cog, ServerCrash } from "lucide-react";
import { Link } from "react-router-dom";

// Interface para garantir a tipagem dos dados vindos da API
interface Carro {
  id: number;
  matricula: string;
  modelo: string;
  marca: string;
  placa: string;
  ano: number;
  valor: number;
  disponivel: boolean;
}

interface UserData {
  id: number;
  nome: string;
  nivelAcesso: string;
  accessToken: string;
}
const Frota = () => {
  // Estados para gerenciar os dados, carregamento e erros
  const [availableCars, setAvailableCars] = useState<Carro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os dados da API quando o componente montar
  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        // Buscamos o token para autenticação
        const userString = localStorage.getItem("user");
        const token = userString ? JSON.parse(userString).accessToken : null;

        if (!token) {
          throw new Error("Token de autenticação não encontrado.");
        }

        const response = await fetch(
          "http://localhost:8080/api/carros/disponiveis",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar os carros: ${response.statusText}`);
        }

        const data: Carro[] = await response.json();
        setAvailableCars(data);
      } catch (err: any) {
        setError(err.message || "Não foi possível carregar a frota.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableCars();
  }, []); // O array vazio [] garante que o efeito rode apenas uma vez

  // Função para simular a categoria (já que não vem do backend)
  const getCategory = (modelo: string): string => {
    if (
      modelo.toLowerCase().includes("kwid") ||
      modelo.toLowerCase().includes("argo")
    )
      return "Econômico";
    if (
      modelo.toLowerCase().includes("corolla") ||
      modelo.toLowerCase().includes("sedan")
    )
      return "Sedan Premium";
    if (
      modelo.toLowerCase().includes("t-cross") ||
      modelo.toLowerCase().includes("hr-v")
    )
      return "SUV Compacto";
    return "Compacto";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Econômico":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Compacto":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Sedan Premium":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "SUV Compacto":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const carEmojis = ["🚗", "🚙", "🚘", "🚖"];

  // Renderização condicional para o estado de carregamento
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Car className="h-16 w-16 text-primary animate-pulse mb-4" />
        <p className="text-xl text-muted-foreground">
          Carregando nossa frota...
        </p>
      </div>
    );
  }

  // Renderização condicional para o estado de erro
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-destructive mb-2">
          Oops! Algo deu errado.
        </h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-6">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar userType={user.nivelAcesso} userName={user.nome} />

      {/* Hero Section */}
      <section className="bg-blue-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Nossa Frota Premium
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Escolha o veículo perfeito para sua viagem. Todos os nossos carros
            são revisados e higienizados.
          </p>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="container mx-auto px-4 py-16">
        {availableCars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableCars.map((car, index) => {
              const category = getCategory(car.modelo);
              return (
                <Card
                  key={car.id}
                  className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-border"
                >
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {carEmojis[index % carEmojis.length]}
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-foreground">{`${car.marca} ${car.modelo}`}</CardTitle>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                          category
                        )}`}
                      >
                        {category}
                      </span>
                    </div>
                    {/* AVISO: O preço não vem do backend, adicionei um valor fixo */}
                    <CardDescription className="text-muted-foreground">
                      A partir de R$ {car.valor}/dia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {/* AVISO: Features fixas, usando o ano que vem do backend */}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>5 Lugares</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Cog className="h-4 w-4 text-primary" />
                        <span>Manual</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Fuel className="h-4 w-4 text-primary" />
                        <span>Flex</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Car className="h-4 w-4 text-primary" />
                        <span>Ano {car.ano}</span>
                      </div>
                    </div>
                    <Link to="/login">
                      <Button className="w-full bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-soft hover:shadow-strong transition-all duration-300">
                        Reservar Agora
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Car className="h-20 w-20 text-muted mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">
              Nenhum carro disponível no momento.
            </h3>
            <p className="text-muted-foreground mt-2">
              Por favor, verifique novamente mais tarde.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Frota;
