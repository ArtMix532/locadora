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

// Mock data - In a real app, this would come from an API
const dashboardData = {
  cliente: {
    stats: [
      {
        title: "Pedidos Ativos",
        value: "3",
        icon: FileText,
        color: "text-blue-ocean",
      },
      {
        title: "Contratos Vigentes",
        value: "1",
        icon: Car,
        color: "text-green-600",
      },
      {
        title: "Histórico Total",
        value: "12",
        icon: Clock,
        color: "text-muted-foreground",
      },
      {
        title: "Próximo Vencimento",
        value: "15 dias",
        icon: Calendar,
        color: "text-orange-500",
      },
    ],
    recentOrders: [
      {
        id: 1,
        vehicle: "Toyota Corolla",
        status: "aprovado",
        date: "2024-01-15",
        amount: "R$ 2.800/mês",
      },
      {
        id: 2,
        vehicle: "Honda HR-V",
        status: "analise",
        date: "2024-01-10",
        amount: "R$ 3.200/mês",
      },
      {
        id: 3,
        vehicle: "VW T-Cross",
        status: "pendente",
        date: "2024-01-08",
        amount: "R$ 2.950/mês",
      },
    ],
  },
  agente: {
    stats: [
      {
        title: "Pedidos Pendentes",
        value: "24",
        icon: AlertCircle,
        color: "text-orange-500",
      },
      {
        title: "Aprovados Hoje",
        value: "8",
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        title: "Receita Mensal",
        value: "R$ 485K",
        icon: DollarSign,
        color: "text-blue-ocean",
      },
      {
        title: "Clientes Ativos",
        value: "156",
        icon: Users,
        color: "text-purple-600",
      },
    ],
    recentOrders: [
      {
        id: 1,
        client: "João Silva",
        vehicle: "Toyota Corolla",
        status: "analise",
        date: "2024-01-15",
        amount: "R$ 2.800/mês",
      },
      {
        id: 2,
        client: "Maria Santos",
        vehicle: "Honda HR-V",
        status: "pendente",
        date: "2024-01-14",
        amount: "R$ 3.200/mês",
      },
      {
        id: 3,
        client: "Pedro Costa",
        vehicle: "VW T-Cross",
        status: "aprovado",
        date: "2024-01-13",
        amount: "R$ 2.950/mês",
      },
    ],
  },
};

interface DashboardProps {
  userType?: "cliente" | "agente";
  userName?: string;
}

const Dashboard = ({
  userType = "cliente",
  userName = "João Silva",
}: DashboardProps) => {
  const data = dashboardData[userType];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      aprovado: { variant: "default", label: "Aprovado" },
      analise: { variant: "secondary", label: "Em Análise" },
      pendente: { variant: "outline", label: "Pendente" },
    };

    const statusInfo = variants[status] || variants.pendente;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType={userType} userName={userName} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo, {userName}!
            </h1>
            <p className="text-muted-foreground">
              {userType === "agente"
                ? "Gerencie pedidos, contratos e análises financeiras"
                : "Acompanhe seus pedidos e contratos de aluguel"}
            </p>
          </div>
          <Link
            to={userType === "agente" ? "/avaliar-pedidos" : "/novo-pedido"}
          >
            <Button className="bg-blue-gradient hover:bg-blue-gradient-dark text-white shadow-soft">
              <Plus className="mr-2 h-4 w-4" />
              {userType === "agente" ? "Avaliar Pedidos" : "Novo Pedido"}
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.stats.map((stat, index) => (
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {userType === "agente"
                  ? "Pedidos Recentes"
                  : "Meus Pedidos Recentes"}
              </CardTitle>
              <CardDescription>
                {userType === "agente"
                  ? "Últimos pedidos que precisam de atenção"
                  : "Seus pedidos mais recentes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth"
                >
                  <div className="space-y-1">
                    {userType === "agente" && (
                      <p className="text-sm font-medium text-foreground">
                        {(order as any).client}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {order.vehicle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-semibold text-foreground">
                      {order.amount}
                    </p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
              <Link
                to={
                  userType === "agente" ? "/avaliar-pedidos" : "/meus-pedidos"
                }
              >
                <Button variant="outline" className="w-full">
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
              {userType === "agente" ? (
                <>
                  <Link to="/avaliar-pedidos" className="block">
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
                  <Link to="/clientes" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Cadastro de Clientes
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
                  <Link to="/frota" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Car className="mr-2 h-4 w-4" />
                      Consultar Frota
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
