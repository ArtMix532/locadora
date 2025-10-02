import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Car,
  CreditCard,
  FileText,
  User,
  ServerCrash,
  // --- IMPORTS ADICIONADOS ---
  Home,
  Briefcase,
  Loader2,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import React from "react";
import { CadastroDadosAdicionais } from "@/components/ui/cadastroTrabalho";
import Navbar from "@/components/Navbar";

// --- INTERFACES ---
interface Carro {
  id: number;
  matricula: string;
  modelo: string;
  marca: string;
  placa: string;
  ano: number;
  disponivel: boolean;
  valor: number;
  category: string;
}
// Interface de usuário mais completa para a Etapa 3
interface UserData {
  id: number;
  nome: string;
  nivelAcesso: string;
  accessToken: string;
}
interface Endereco {
  id?: number;
  rua: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
}
interface Trabalho {
  id?: number;
  empresa: string;
  cargo: string;
  salario: number;
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

const NewOrder = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast(); // Ho
  // --- Estado 'formData' e 'handleInputChange' removidos ---

  const [availableCars, setAvailableCars] = useState<Carro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // --- Estado 'user' atualizado para usar a interface completa ---
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        setUser(JSON.parse(userDataString));
      } else {
        setError("Usuário não autenticado.");
        setIsLoading(false);
        return;
      }

      try {
        const token = JSON.parse(userDataString).accessToken;
        const response = await fetch(
          "http://localhost:8080/api/carros/disponiveis",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar os carros: ${response.statusText}`);
        }

        const dataFromApi: Omit<Carro, "category">[] = await response.json();
        const carsWithCategory = dataFromApi.map((car) => ({
          ...car,
          category: car.modelo.toLowerCase().includes("suv") ? "SUV" : "Sedan",
        }));
        setAvailableCars(carsWithCategory);
      } catch (err: any) {
        setError(err.message || "Não foi possível carregar a frota.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const selectedVehicleData = availableCars.find(
    (car) => car.id === selectedVehicleId
  );

  const calculateDays = () => {
    if (!startDate || !endDate || endDate < startDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    return selectedVehicleData ? selectedVehicleData.valor * days : 0;
  };

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    // 1. Validação inicial
    if (!user || !selectedVehicleId || !startDate || !endDate) {
      toast({
        title: "Dados incompletos",
        description: "Selecione o veículo e o período antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // --- CORREÇÃO FINAL APLICADA AQUI ---
    // Renomeamos as chaves para bater com o DTO do backend (clienteId, carroId, etc.)
    const locacaoData = {
      clienteId: user.id,
      carroId: selectedVehicleId,
      agenteId: 1, // Placeholder
      retirada: startDate.toISOString(),
      devolucao: endDate.toISOString(),
      valorPrevisto: calculateTotal(),
      tipo: "ONLINE", // Valor Padrão
    };
    // --- FIM DA CORREÇÃO ---

    console.log("Enviando para o backend:", locacaoData);

    try {
      // 3. Faz a requisição POST para o endpoint de locações
      const response = await fetch("http://localhost:8080/api/locacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(locacaoData),
      });

      if (response.ok) {
        toast({
          title: "Pedido de locação enviado!",
          description: "Sua reserva foi criada e está em análise.",
        });
        window.location.href = `/dashboard`;
      } else {
        // Lógica de erro melhorada para evitar o crash do 'json()'
        let errorMessage = "Não foi possível criar a locação.";
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          console.error(
            "Não foi possível parsear a resposta de erro como JSON."
          );
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      toast({
        title: "Erro ao enviar pedido",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Carregando dados...
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
    return (
      <div className="flex h-screen items-center justify-center">
        Redirecionando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType={user.nivelAcesso} userName={user.nome} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Novo Pedido de Aluguel
          </h1>
          <p className="text-muted-foreground">
            Solicite o aluguel do veículo dos seus sonhos
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-blue-gradient text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step < currentStep ? "bg-blue-gradient" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-sm text-muted-foreground">
            <span>Veículo</span>
            <span>Período</span>
            <span>Dados</span>
            <span>Resumo</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Seleção do Veículo */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Escolha seu Veículo
                </CardTitle>
                <CardDescription>
                  Selecione o veículo que deseja alugar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableCars.map((carro) => (
                    <Card
                      key={carro.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedVehicleId === carro.id
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : ""
                      }`}
                      onClick={() => setSelectedVehicleId(carro.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                          <Car className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">{`${carro.marca} ${carro.modelo}`}</CardTitle>
                        <CardDescription>
                          {carro.category} - {carro.ano}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          R$ {carro.valor.toLocaleString("pt-BR")}
                        </div>
                        <p className="text-sm text-muted-foreground">por dia</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <Button
                    onClick={handleNextStep}
                    disabled={!selectedVehicleId}
                    className="bg-blue-gradient hover:bg-blue-gradient-dark text-white"
                  >
                    Próximo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Seleção do Período */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Período do Aluguel
                </CardTitle>
                <CardDescription>
                  Defina o período que deseja utilizar o veículo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Data de Início</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate
                            ? format(startDate, "PPP", { locale: ptBR })
                            : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Data de Término</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate
                            ? format(endDate, "PPP", { locale: ptBR })
                            : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date < (startDate || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                {startDate && endDate && selectedVehicleData && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Período</p>
                          <p className="font-medium">{calculateDays()} dias</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Valor Total Estimado
                          </p>
                          <p className="font-bold text-green-600 text-lg">
                            R$ {calculateTotal().toLocaleString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={!startDate || !endDate}
                    className="bg-blue-gradient hover:bg-blue-gradient-dark text-white"
                  >
                    Próximo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Dados Pessoais */}
          {currentStep === 3 && (
            <CadastroDadosAdicionais
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            />
          )}

          {/* Step 4: Resumo */}
          {currentStep === 4 && selectedVehicleData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resumo do Pedido
                </CardTitle>
                <CardDescription>
                  Revise todas as informações antes de finalizar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Veículo Selecionado
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold">{`${selectedVehicleData.marca} ${selectedVehicleData.modelo}`}</p>
                        <p className="text-muted-foreground">
                          {selectedVehicleData.category}
                        </p>
                        <p className="text-xl font-semibold text-green-600">
                          R$ {selectedVehicleData.valor.toLocaleString("pt-BR")}
                          /dia
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Período e Valor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Período:</span>
                          <span className="font-medium">
                            {calculateDays()} dias
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Início:</span>
                          <span className="font-medium">
                            {startDate ? format(startDate, "dd/MM/yyyy") : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Término:</span>
                          <span className="font-medium">
                            {endDate ? format(endDate, "dd/MM/yyyy") : "-"}
                          </span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-green-600">
                              R$ {calculateTotal().toLocaleString("pt-BR")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">
                      ⚠️ Informações Importantes
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Seu pedido será analisado por nossos agentes
                        financeiros
                      </li>
                      <li>• O processo de aprovação pode levar até 48 horas</li>
                      <li>
                        • Você receberá notificações por email sobre o status
                      </li>
                      <li>• O contrato será enviado após a aprovação</li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Anterior
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-gradient hover:bg-blue-gradient-dark text-white"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Ir para Pagamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
