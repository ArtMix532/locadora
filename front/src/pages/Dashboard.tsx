import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
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
  Clock,
  Calendar,
  Plus,
  TrendingUp,
  Loader2,
  ServerCrash,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Users,
} from "lucide-react";

// --- INTERFACES PARA OS DADOS VINDOS DA API ---
interface UserData {
  id: number;
  nome: string;
  nivelAcesso: "CLIENTE" | "AGENTE";
  accessToken: string;
}
interface LocacaoResponse {
  id: number;
  retirada: string;
  valorPrevisto: number;
  status: "RESERVADA" | "ATIVA" | "CONCLUIDA" | "CANCELADA";
  carroMarca: string;
  carroModelo: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [locacoes, setLocacoes] = useState<LocacaoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar os dados do usuário e suas locações
  useEffect(() => {
    const fetchDashboardData = async () => {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        setError("Usuário não autenticado. Por favor, faça o login.");
        setIsLoading(false);
        return;
      }

      const parsedUser: UserData = JSON.parse(userDataString);
      setUser(parsedUser);

      // Define o endpoint com base no tipo de usuário
      const endpoint =
        parsedUser.nivelAcesso === "AGENTE"
          ? "http://localhost:8080/api/locacoes" // Endpoint para Agente (busca tudo)
          : `http://localhost:8080/api/clientes/${parsedUser.id}/locacoes`; // Endpoint para Cliente

      try {
        const response = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${parsedUser.accessToken}` },
        });

        if (!response.ok) {
          throw new Error("Não foi possível carregar os dados do dashboard.");
        }

        const data = await response.json();
        setLocacoes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- CÁLCULOS DINÂMICOS ---
  // useMemo otimiza os cálculos para que só sejam refeitos se 'locacoes' mudar
  const dashboardData = useMemo(() => {
    if (!user) return null;

    // Lógica para Cliente
    if (user.nivelAcesso === "CLIENTE") {
      const hoje = new Date();
      const ultimoDiaDoMes = new Date(
        hoje.getFullYear(),
        hoje.getMonth() + 1,
        0
      );
      const diffTime = ultimoDiaDoMes.getTime() - hoje.getTime();
      const diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const totalPedidos = locacoes.length;
      const contratosVigentes = locacoes.filter(
        (loc) => loc.status === "ATIVA"
      ).length;

      return {
        stats: [
          {
            title: "Pedidos Ativos",
            value: totalPedidos.toString(),
            icon: FileText,
            color: "text-blue-ocean",
          },
          {
            title: "Contratos Vigentes",
            value: contratosVigentes.toString(),
            icon: Car,
            color: "text-green-600",
          },
          {
            title: "Histórico Total",
            value: totalPedidos.toString(),
            icon: Clock,
            color: "text-muted-foreground",
          },
          {
            title: "Próximo Vencimento",
            value: `${diasRestantes} dias`,
            icon: Calendar,
            color: "text-orange-500",
          },
        ],
        recentOrders: locacoes.slice(0, 3), // Pega os 3 mais recentes
      };
    }

    // Lógica para Agente (com placeholders onde a API não fornece dados diretos)
    if (user.nivelAcesso === "AGENTE") {
      const pedidosPendentes = locacoes.filter(
        (loc) => loc.status === "RESERVADA"
      ).length;

      return {
        stats: [
          {
            title: "Pedidos Pendentes",
            value: pedidosPendentes.toString(),
            icon: AlertCircle,
            color: "text-orange-500",
          },
          {
            title: "Aprovados Hoje",
            value: "N/D",
            icon: CheckCircle,
            color: "text-green-600",
          }, // Exigiria endpoint específico
          {
            title: "Receita Mensal",
            value: "N/D",
            icon: DollarSign,
            color: "text-blue-ocean",
          }, // Exigiria endpoint específico
          {
            title: "Clientes Ativos",
            value: "N/D",
            icon: Users,
            color: "text-purple-600",
          }, // Exigiria endpoint específico
        ],
        recentOrders: locacoes
          .filter((loc) => loc.status === "RESERVADA")
          .slice(0, 3),
      };
    }

    return null;
  }, [user, locacoes]);

  const getStatusBadge = (status: LocacaoResponse["status"]) => {
    const variants = {
      ATIVA: { label: "Ativa", className: "bg-green-100 text-green-800" },
      RESERVADA: {
        label: "Pendente",
        className: "bg-yellow-100 text-yellow-800",
      },
      CONCLUIDA: { label: "Concluída", className: "bg-blue-100 text-blue-800" },
      CANCELADA: { variant: "destructive" as const, label: "Cancelada" },
    };
    const statusInfo = variants[status] || { label: status, className: "" };
    return (
      <Badge variant={statusInfo.variant} className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando...
      </div>
    );
  }

  if (error || !user || !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-destructive mb-2">
          Erro ao carregar dashboard
        </h2>
        <p className="text-muted-foreground">
          {error || "Não foi possível carregar os dados do usuário."}
        </p>
        <Button onClick={() => window.location.reload()} className="mt-6">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType={user.nivelAcesso} userName={user.nome} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Bem-vindo, {user.nome}!
            </h1>
            <p className="text-muted-foreground">
              {user.nivelAcesso === "AGENTE"
                ? "Gerencie pedidos, contratos e análises financeiras"
                : "Acompanhe seus pedidos e contratos de aluguel"}
            </p>
          </div>
          <Link
            to={
              user.nivelAcesso === "AGENTE"
                ? "/avaliar-pedidos"
                : "/novo-pedido"
            }
          >
            <Button className="bg-blue-gradient hover:bg-blue-gradient-dark text-white">
              <Plus className="mr-2 h-4 w-4" />
              {user.nivelAcesso === "AGENTE"
                ? "Avaliar Pedidos"
                : "Novo Pedido"}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData.stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-soft transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {user.nivelAcesso === "AGENTE"
                  ? "Pedidos Recentes"
                  : "Meus Pedidos Recentes"}
              </CardTitle>
              <CardDescription>
                {user.nivelAcesso === "AGENTE"
                  ? "Últimos pedidos que precisam de atenção"
                  : "Seus pedidos mais recentes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboardData.recentOrders.map((loc) => (
                <div
                  key={loc.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth"
                >
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{`${loc.carroMarca} ${loc.carroModelo}`}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(loc.retirada).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-semibold text-foreground">
                      {loc.valorPrevisto.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    {getStatusBadge(loc.status)}
                  </div>
                </div>
              ))}
              <Link
                to={
                  user.nivelAcesso === "AGENTE"
                    ? "/avaliar-pedidos"
                    : "/meus-pedidos"
                }
              >
                <Button variant="outline" className="w-full mt-2">
                  Ver Todos os Pedidos
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Ações Rápidas
              </CardTitle>

              <CardDescription>
                Acesse rapidamente as principais funcionalidades
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {user.nivelAcesso === "AGENTE" ? (
                <>
                  <Link to="/ManageAllOrders" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Avaliar Pedidos Pendentes
                    </Button>
                  </Link>

                  <Link to="/analise-financeira" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Análise Financeira
                    </Button>
                  </Link>

                  <Link to="/contratos" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Gerenciar Contratos
                    </Button>
                  </Link>

                  <Link to="/cadastro-frota" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Car className="mr-2 h-4 w-4" />
                      Cadastro de Frota
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/novo-pedido" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Fazer Novo Pedido
                    </Button>
                  </Link>

                  <Link to="/meus-pedidos" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Meus Pedidos
                    </Button>
                  </Link>

                  <Link to="/historico" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      Histórico de Aluguéis
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
