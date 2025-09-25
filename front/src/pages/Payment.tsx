import { useState } from "react";
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
import CreditCardForm from "@/components/CreditCardForm";
import {
  ArrowLeft,
  Check,
  CreditCard,
  FileText,
  Car,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - em produção virá da navegação/props
const orderData = {
  id: "PED-2024-004",
  vehicle: {
    name: "Toyota Corolla 2023",
    category: "Sedan",
    monthlyPrice: 2800,
  },
  period: {
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    months: 6,
  },
  customer: {
    name: "João Silva",
    email: "joao@email.com",
    cpf: "123.456.789-00",
  },
  totalValue: 16800,
  discount: 840, // 5% desconto à vista
  finalValue: 15960,
};

const Payment = () => {
  const [paymentStep, setPaymentStep] = useState<
    "review" | "payment" | "success"
  >("review");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePaymentSubmit = async (creditCardData: any) => {
    setIsProcessing(true);

    try {
      // Simula processamento do pagamento
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Aqui você faria a integração com seu backend
      console.log("Processando pagamento:", {
        order: orderData,
        creditCard: creditCardData,
      });

      setPaymentStep("success");

      toast({
        title: "Pagamento processado com sucesso!",
        description: "Seu pedido foi confirmado e será analisado em breve.",
      });
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description:
          "Houve um problema ao processar seu pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToOrders = () => {
    window.location.href = "/meus-pedidos";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userType="cliente" userName={orderData.customer.name} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {paymentStep === "success"
                  ? "Pagamento Confirmado!"
                  : "Pagamento"}
              </h1>
              <p className="text-muted-foreground">
                {paymentStep === "success"
                  ? "Seu pedido foi processado com sucesso"
                  : "Finalize seu pedido de aluguel"}
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              Novo Pedido
            </span>
            <span>→</span>
            <span
              className={`flex items-center gap-1 ${
                paymentStep !== "review" ? "text-foreground font-medium" : ""
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Pagamento
            </span>
            {paymentStep === "success" && (
              <>
                <span>→</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <Check className="h-4 w-4" />
                  Confirmado
                </span>
              </>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Step 1: Review Order */}
          {paymentStep === "review" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Resumo do Pedido */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Resumo do Pedido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Veículo */}
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border">
                      <div className="w-16 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {orderData.vehicle.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {orderData.vehicle.category}
                        </p>
                        <p className="text-sm text-green-600 font-medium">
                          R${" "}
                          {orderData.vehicle.monthlyPrice.toLocaleString(
                            "pt-BR"
                          )}
                          /mês
                        </p>
                      </div>
                    </div>

                    {/* Período */}
                    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Data de Início
                          </p>
                          <p className="font-medium">
                            {new Date(
                              orderData.period.startDate
                            ).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Data de Término
                          </p>
                          <p className="font-medium">
                            {new Date(
                              orderData.period.endDate
                            ).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cliente */}
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Dados do Cliente</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="text-muted-foreground">Nome:</span>{" "}
                          {orderData.customer.name}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Email:</span>{" "}
                          {orderData.customer.email}
                        </p>
                        <p>
                          <span className="text-muted-foreground">CPF:</span>{" "}
                          {orderData.customer.cpf}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Resumo Financeiro */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Resumo Financeiro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Período:</span>
                        <span className="font-medium">
                          {orderData.period.months} meses
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valor mensal:</span>
                        <span>
                          R${" "}
                          {orderData.vehicle.monthlyPrice.toLocaleString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>
                          R$ {orderData.totalValue.toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Desconto à vista:</span>
                        <span>
                          -R$ {orderData.discount.toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span>
                            R$ {orderData.finalValue.toLocaleString("pt-BR")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setPaymentStep("payment")}
                      className="w-full bg-blue-gradient hover:bg-blue-gradient-dark text-white"
                      size="lg"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Continuar para Pagamento
                    </Button>

                    <div className="text-xs text-muted-foreground text-center">
                      Ao continuar você concorda com nossos termos de uso
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: Payment Form */}
          {paymentStep === "payment" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CreditCardForm onSubmit={handlePaymentSubmit} />
                {isProcessing && (
                  <Card className="mt-6 border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-blue-800">
                          Processando pagamento...
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Resumo lateral durante pagamento */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {orderData.vehicle.name}
                    </CardTitle>
                    <CardDescription>
                      {orderData.period.months} meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-center text-green-600">
                      R$ {orderData.finalValue.toLocaleString("pt-BR")}
                    </div>
                    <div className="text-sm text-center text-muted-foreground mt-1">
                      Valor total com desconto
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {paymentStep === "success" && (
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Pagamento Confirmado!
                </h2>
                <p className="text-muted-foreground">
                  Seu pedido foi processado com sucesso e será analisado pela
                  nossa equipe.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Passos</CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Análise Financeira</p>
                        <p className="text-sm text-muted-foreground">
                          Nossa equipe analisará seus dados em até 48 horas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Notificação</p>
                        <p className="text-sm text-muted-foreground">
                          Você receberá um email com o resultado da análise
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Contrato</p>
                        <p className="text-sm text-muted-foreground">
                          Após aprovação, o contrato será enviado para
                          assinatura
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Ir para Dashboard
                </Button>
                <Button
                  onClick={handleBackToOrders}
                  className="bg-blue-gradient hover:bg-blue-gradient-dark text-white"
                >
                  Ver Meus Pedidos
                </Button>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="text-sm">
                    <p className="font-medium mb-1">Código do Pedido:</p>
                    <Badge variant="secondary" className="text-base">
                      {orderData.id}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
