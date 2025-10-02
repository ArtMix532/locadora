import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import {
  Search,
  Filter,
  Eye,
  Edit,
  X,
  Calendar,
  Car,
  Loader2,
  ServerCrash,
} from "lucide-react";

// --- INTERFACES PARA OS DADOS VINDOS DA API ---
interface UserData {
  id: number;
  nome: string;
  nivelAcesso: string;
  accessToken: string;
}
interface LocacaoResponse {
  id: number;
  clienteId: number;
  agenteId: number;
  carroId: number;
  retirada: string;
  devolucao: string;
  valorPrevisto: number;
  status: "RESERVADA" | "ATIVA" | "CONCLUIDA" | "CANCELADA";
  clienteNome: string;
  agenteNome: string;
  carroMarca: string;
  carroModelo: string;
}

// Hook de toast simulado para evitar erros
const useToast = () => ({
  toast: (options: { title: string; description: string; variant?: string }) =>
    console.log(
      `[Toast - ${options.variant || "default"}] ${options.title}: ${
        options.description
      }`
    ),
});

const ClientOrders = () => {
  // --- ESTADOS PARA DADOS REAIS, LOADING E ERRO ---
  const [locacoes, setLocacoes] = useState<LocacaoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  // Estado para o botão de cancelar
  const [cancelingId, setCancelingId] = useState<number | null>(null);
  const { toast } = useToast();

  // --- BUSCA OS DADOS DA API QUANDO O COMPONENTE CARREGA ---
  useEffect(() => {
    const fetchClientData = async () => {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        setError("Usuário não autenticado. Por favor, faça o login.");
        setIsLoading(false);
        return;
      }

      const parsedUser: UserData = JSON.parse(userDataString);
      setUser(parsedUser);

      try {
        const response = await fetch(
          `http://localhost:8080/api/clientes/${parsedUser.id}/locacoes`,
          { headers: { Authorization: `Bearer ${parsedUser.accessToken}` } }
        );
        if (!response.ok)
          throw new Error("Não foi possível carregar seus pedidos.");

        const data = await response.json();
        setLocacoes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClientData();
  }, []); // Array vazio para buscar dados apenas uma vez

  const getStatusBadge = (status: LocacaoResponse["status"]) => {
    const statusMap = {
      RESERVADA: "analise", // Mapeando RESERVADA para "Em Análise"
      ATIVA: "aprovado",
      CONCLUIDA: "concluido",
      CANCELADA: "cancelado",
    };
    const mappedStatus = statusMap[status] || "pendente";

    const variants: Record<
      string,
      { variant: any; label: string; className?: string }
    > = {
      aprovado: {
        variant: "default",
        label: "Aprovado",
        className: "bg-green-100 text-green-800",
      },
      analise: {
        variant: "secondary",
        label: "Em Análise",
        className: "bg-yellow-100 text-yellow-800",
      },
      pendente: {
        variant: "outline",
        label: "Pendente",
        className: "bg-orange-100 text-orange-800",
      },
      cancelado: { variant: "destructive", label: "Cancelado" },
      concluido: {
        variant: "default",
        label: "Concluído",
        className: "bg-blue-100 text-blue-800",
      },
    };
    const statusInfo = variants[mappedStatus];
    return (
      <Badge variant={statusInfo.variant} className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  // --- FILTRO APLICADO NO FRONTEND ---
  const filteredOrders = locacoes.filter((loc) => {
    const vehicleName = `${loc.carroMarca} ${loc.carroModelo}`.toLowerCase();
    const matchesSearch =
      vehicleName.includes(searchTerm.toLowerCase()) ||
      `PED-${loc.id.toString().padStart(3, "0")}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const statusMap = {
      RESERVADA: "analise",
      ATIVA: "aprovado",
      CONCLUIDA: "concluido",
      CANCELADA: "cancelado",
    };
    const mappedStatus = statusMap[loc.status] || "pendente";

    const matchesStatus =
      statusFilter === "todos" || mappedStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // --- FUNÇÃO DE CANCELAR ---
  const handleCancelOrder = async (locacao: LocacaoResponse) => {
    if (
      !window.confirm(
        `Tem certeza que deseja cancelar o pedido PED-${locacao.id
          .toString()
          .padStart(3, "0")}?`
      )
    ) {
      return;
    }
    if (!user) return;

    setCancelingId(locacao.id);
    try {
      const response = await fetch(
        `http://localhost:8080/api/locacoes/${locacao.id}/status?status=CANCELADA`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao cancelar o pedido.");
      }

      setLocacoes((prevLocacoes) =>
        prevLocacoes.map((loc) =>
          loc.id === locacao.id ? { ...loc, status: "CANCELADA" } : loc
        )
      );
      toast({ title: "Sucesso!", description: "O pedido foi cancelado." });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCancelingId(null);
    }
  };

  const canEditOrCancel = (status: LocacaoResponse["status"]) =>
    status === "RESERVADA";

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Buscando seus
        pedidos...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold text-destructive mb-2">
          Erro ao carregar dados
        </h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-6">
          Tentar Novamente
        </Button>
      </div>
    );
  }
  if (!user) {
    return <div>Redirecionando para o login...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType={user.nivelAcesso} userName={user.nome} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Meus Pedidos
          </h1>
          <p className="text-muted-foreground">
            Acompanhe o status dos seus pedidos de aluguel de veículos
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por veículo ou código do pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="analise">Em Análise</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de Pedidos</CardTitle>
                <CardDescription>
                  {filteredOrders.length} pedido(s) encontrado(s)
                </CardDescription>
              </div>
              <Button
                onClick={() => (window.location.href = "/novo-pedido")}
                className="bg-blue-gradient hover:bg-blue-gradient-dark text-white"
              >
                <Car className="mr-2 h-4 w-4" />
                Novo Pedido
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Agente</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((loc) => (
                      <TableRow key={loc.id}>
                        <TableCell className="font-medium">
                          PED-{loc.id.toString().padStart(3, "0")}
                        </TableCell>
                        <TableCell>{`${loc.carroMarca} ${loc.carroModelo}`}</TableCell>
                        <TableCell>{getStatusBadge(loc.status)}</TableCell>
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(loc.retirada).toLocaleDateString(
                              "pt-BR"
                            )}{" "}
                            -{" "}
                            {new Date(loc.devolucao).toLocaleDateString(
                              "pt-BR"
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {loc.valorPrevisto.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell>
                          {loc.agenteId === 1 ? "Davi" : loc.agenteNome}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {canEditOrCancel(loc.status) && (
                              <>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleCancelOrder(loc)}
                                  disabled={cancelingId === loc.id}
                                >
                                  {cancelingId === loc.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <X className="h-4 w-4" />
                                  )}
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nenhum pedido encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientOrders;
