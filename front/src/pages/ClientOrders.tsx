import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import { Search, Filter, Eye, Edit, X, Calendar, Car } from "lucide-react";

// Mock data
const orders = [
  {
    id: "PED-2024-001",
    vehicle: "Toyota Corolla 2023",
    status: "aprovado",
    requestDate: "2024-01-15",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    monthlyValue: "R$ 2.800",
    totalValue: "R$ 16.800",
    agent: "Banco XYZ"
  },
  {
    id: "PED-2024-002", 
    vehicle: "Honda HR-V 2023",
    status: "analise",
    requestDate: "2024-01-10",
    startDate: "2024-02-15",
    endDate: "2024-08-15",
    monthlyValue: "R$ 3.200",
    totalValue: "R$ 19.200",
    agent: "AutoFinance"
  },
  {
    id: "PED-2024-003",
    vehicle: "VW T-Cross 2022",
    status: "pendente",
    requestDate: "2024-01-08",
    startDate: "2024-02-20",
    endDate: "2024-08-20",
    monthlyValue: "R$ 2.950",
    totalValue: "R$ 17.700",
    agent: "Empresa ABC"
  },
  {
    id: "PED-2023-045",
    vehicle: "Hyundai HB20 2022",
    status: "cancelado",
    requestDate: "2023-12-15",
    startDate: "2024-01-01",
    endDate: "2024-07-01",
    monthlyValue: "R$ 2.400",
    totalValue: "R$ 14.400",
    agent: "Banco XYZ"
  },
  {
    id: "PED-2023-032",
    vehicle: "Renault Kwid 2021",
    status: "concluido",
    requestDate: "2023-10-10",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    monthlyValue: "R$ 2.100",
    totalValue: "R$ 6.300",
    agent: "AutoFinance"
  }
];

const ClientOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; className?: string }> = {
      aprovado: { variant: "default", label: "Aprovado", className: "bg-green-100 text-green-800" },
      analise: { variant: "secondary", label: "Em Análise", className: "bg-yellow-100 text-yellow-800" },
      pendente: { variant: "outline", label: "Pendente", className: "bg-orange-100 text-orange-800" },
      cancelado: { variant: "destructive", label: "Cancelado" },
      concluido: { variant: "default", label: "Concluído", className: "bg-blue-100 text-blue-800" },
    };
    
    const statusInfo = variants[status] || variants.pendente;
    return (
      <Badge variant={statusInfo.variant} className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const canEdit = (status: string) => status === "pendente" || status === "analise";
  const canCancel = (status: string) => status === "pendente" || status === "analise";

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="cliente" userName="João Silva" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meus Pedidos</h1>
          <p className="text-muted-foreground">
            Acompanhe o status dos seus pedidos de aluguel de veículos
          </p>
        </div>

        {/* Filters */}
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

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de Pedidos</CardTitle>
                <CardDescription>
                  {filteredOrders.length} pedido(s) encontrado(s)
                </CardDescription>
              </div>
              <Button className="bg-blue-gradient hover:bg-blue-gradient-dark text-white">
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
                    <TableHead>Data Solicitação</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Valor Mensal</TableHead>
                    <TableHead>Agente</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.vehicle}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{new Date(order.requestDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.startDate).toLocaleDateString('pt-BR')} - {new Date(order.endDate).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">{order.monthlyValue}</TableCell>
                      <TableCell>{order.agent}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {canEdit(order.status) && (
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {canCancel(order.status) && (
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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