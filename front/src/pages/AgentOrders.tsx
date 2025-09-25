import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, FileText, DollarSign } from "lucide-react";

// Mock data
const orders = [
  {
    id: "PED-2024-001",
    client: {
      name: "João Silva",
      cpf: "123.456.789-00",
      rg: "12.345.678-9",
      address: "Rua das Flores, 123 - São Paulo/SP",
      profession: "Engenheiro",
      employers: [
        { name: "Empresa ABC", income: "R$ 8.500" },
        { name: "Consultoria XYZ", income: "R$ 2.000" }
      ]
    },
    vehicle: "Toyota Corolla 2023",
    status: "pendente",
    requestDate: "2024-01-15",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    monthlyValue: "R$ 2.800",
    totalValue: "R$ 16.800",
    creditContract: true,
    financialAnalysis: null
  },
  {
    id: "PED-2024-002", 
    client: {
      name: "Maria Santos",
      cpf: "987.654.321-00",
      rg: "98.765.432-1",
      address: "Av. Paulista, 456 - São Paulo/SP", 
      profession: "Médica",
      employers: [
        { name: "Hospital São João", income: "R$ 12.000" }
      ]
    },
    vehicle: "Honda HR-V 2023",
    status: "analise",
    requestDate: "2024-01-10",
    startDate: "2024-02-15",
    endDate: "2024-08-15",
    monthlyValue: "R$ 3.200",
    totalValue: "R$ 19.200",
    creditContract: false,
    financialAnalysis: "Renda compatível com valor solicitado. Cliente possui bom histórico de crédito."
  },
  {
    id: "PED-2024-003",
    client: {
      name: "Pedro Costa",
      cpf: "456.789.123-00",
      rg: "45.678.912-3",
      address: "Rua do Comércio, 789 - Rio de Janeiro/RJ",
      profession: "Advogado",
      employers: [
        { name: "Escritório Costa & Associados", income: "R$ 15.000" },
        { name: "Consultoria Jurídica", income: "R$ 3.500" }
      ]
    },
    vehicle: "VW T-Cross 2022",
    status: "aprovado",
    requestDate: "2024-01-08",
    startDate: "2024-02-20",
    endDate: "2024-08-20",
    monthlyValue: "R$ 2.950",
    totalValue: "R$ 17.700",
    creditContract: true,
    financialAnalysis: "Análise aprovada. Cliente possui excelente capacidade de pagamento."
  }
];

const AgentOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [analysisText, setAnalysisText] = useState("");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; className?: string }> = {
      aprovado: { variant: "default", label: "Aprovado", className: "bg-green-100 text-green-800" },
      analise: { variant: "secondary", label: "Em Análise", className: "bg-yellow-100 text-yellow-800" },
      pendente: { variant: "outline", label: "Pendente", className: "bg-orange-100 text-orange-800" },
      rejeitado: { variant: "destructive", label: "Rejeitado" },
    };
    
    const statusInfo = variants[status] || variants.pendente;
    return (
      <Badge variant={statusInfo.variant} className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (orderId: string) => {
    console.log("Aprovando pedido:", orderId);
    // Implementar lógica de aprovação
  };

  const handleReject = (orderId: string) => {
    console.log("Rejeitando pedido:", orderId);
    // Implementar lógica de rejeição
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="agente" userName="Ana Oliveira" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Avaliar Pedidos</h1>
          <p className="text-muted-foreground">
            Análise financeira e avaliação de pedidos de aluguel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Análise</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aprovados</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-ocean mr-3" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold">R$ 53,7K</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  placeholder="Buscar por cliente, veículo ou código..."
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
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos para Avaliação</CardTitle>
            <CardDescription>
              {filteredOrders.length} pedido(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor Mensal</TableHead>
                    <TableHead>Crédito</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.client.name}</p>
                          <p className="text-sm text-muted-foreground">{order.client.cpf}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.vehicle}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="font-semibold text-green-600">{order.monthlyValue}</TableCell>
                      <TableCell>
                        {order.creditContract ? (
                          <Badge variant="secondary">Com Crédito</Badge>
                        ) : (
                          <Badge variant="outline">Sem Crédito</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Pedido - {selectedOrder?.id}</DialogTitle>
                                <DialogDescription>
                                  Análise financeira e dados do cliente
                                </DialogDescription>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                  {/* Dados do Cliente */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Dados do Cliente</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <p className="text-sm font-medium">Nome:</p>
                                        <p className="text-sm text-muted-foreground">{selectedOrder.client.name}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">CPF:</p>
                                        <p className="text-sm text-muted-foreground">{selectedOrder.client.cpf}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">RG:</p>
                                        <p className="text-sm text-muted-foreground">{selectedOrder.client.rg}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Endereço:</p>
                                        <p className="text-sm text-muted-foreground">{selectedOrder.client.address}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Profissão:</p>
                                        <p className="text-sm text-muted-foreground">{selectedOrder.client.profession}</p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Dados Financeiros */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Rendimentos</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      {selectedOrder.client.employers.map((emp: any, idx: number) => (
                                        <div key={idx} className="p-3 border rounded-lg">
                                          <p className="text-sm font-medium">{emp.name}</p>
                                          <p className="text-sm text-green-600 font-semibold">{emp.income}</p>
                                        </div>
                                      ))}
                                      <div className="pt-3 border-t">
                                        <p className="text-sm font-medium">Renda Total:</p>
                                        <p className="text-lg font-bold text-green-600">
                                          R$ {selectedOrder.client.employers.reduce((total: number, emp: any) => 
                                            total + parseInt(emp.income.replace(/[^\d]/g, '')), 0
                                          ).toLocaleString()}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Análise Financeira */}
                                  <Card className="md:col-span-2">
                                    <CardHeader>
                                      <CardTitle className="text-lg">Análise Financeira</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {selectedOrder.financialAnalysis ? (
                                        <div className="p-4 bg-accent/50 rounded-lg">
                                          <p className="text-sm">{selectedOrder.financialAnalysis}</p>
                                        </div>
                                      ) : (
                                        <Textarea
                                          placeholder="Digite sua análise financeira..."
                                          value={analysisText}
                                          onChange={(e) => setAnalysisText(e.target.value)}
                                          className="min-h-24"
                                        />
                                      )}
                                      <div className="flex gap-3">
                                        <Button 
                                          className="bg-green-600 hover:bg-green-700"
                                          onClick={() => handleApprove(selectedOrder.id)}
                                        >
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          Aprovar
                                        </Button>
                                        <Button 
                                          variant="destructive"
                                          onClick={() => handleReject(selectedOrder.id)}
                                        >
                                          <XCircle className="mr-2 h-4 w-4" />
                                          Rejeitar
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {order.status === "pendente" && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApprove(order.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleReject(order.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
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

export default AgentOrders;