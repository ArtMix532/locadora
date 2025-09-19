import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ArrowLeft, Users, Fuel, Cog } from "lucide-react";
import { Link } from "react-router-dom";

const Fleet = () => {
  const cars = [
    {
      id: 1,
      name: "Renault Kwid",
      category: "Econômico",
      price: "R$ 85",
      features: ["5 Lugares", "Manual", "Flex", "Ar Condicionado"],
      image: "🚗"
    },
    {
      id: 2,
      name: "Fiat Argo",
      category: "Compacto",
      price: "R$ 95",
      features: ["5 Lugares", "Manual/Automático", "Flex", "Direção Elétrica"],
      image: "🚙"
    },
    {
      id: 3,
      name: "Hyundai HB20",
      category: "Compacto",
      price: "R$ 100",
      features: ["5 Lugares", "Manual/Automático", "Flex", "Central Multimídia"],
      image: "🚗"
    },
    {
      id: 4,
      name: "Toyota Corolla",
      category: "Sedan Premium",
      price: "R$ 180",
      features: ["5 Lugares", "Automático CVT", "Flex", "Toyota Safety Sense"],
      image: "🚘"
    },
    {
      id: 5,
      name: "Volkswagen T-Cross",
      category: "SUV Compacto",
      price: "R$ 150",
      features: ["5 Lugares", "Manual/Automático", "TSI", "Teto Solar"],
      image: "🚙"
    },
    {
      id: 6,
      name: "Honda HR-V",
      category: "SUV Premium",
      price: "R$ 170",
      features: ["5 Lugares", "CVT", "Flex", "Bancos de Couro"],
      image: "🚙"
    }
  ];

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
      case "SUV Premium":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-gradient rounded-full">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-blue-gradient bg-clip-text text-transparent">
                AutoLux Rental
              </h1>
            </div>
          </div>
          <Link to="/login">
            <Button className="bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-soft hover:shadow-strong transition-all duration-300">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Nossa Frota Premium
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Escolha o veículo perfeito para sua viagem. Todos os nossos carros são revisados e higienizados.
          </p>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Card key={car.id} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 border-border">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {car.image}
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-foreground">{car.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(car.category)}`}>
                    {car.category}
                  </span>
                </div>
                <CardDescription className="text-muted-foreground">
                  A partir de {car.price}/dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-muted-foreground">
                      {index === 0 && <Users className="h-4 w-4 text-primary" />}
                      {index === 1 && <Cog className="h-4 w-4 text-primary" />}
                      {index === 2 && <Fuel className="h-4 w-4 text-primary" />}
                      {index === 3 && <Car className="h-4 w-4 text-primary" />}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-soft hover:shadow-strong transition-all duration-300">
                  Reservar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
              Encontrou o carro ideal?
            </h3>
            <p className="text-xl text-muted-foreground">
              Faça login para reservar seu veículo e aproveitar ofertas exclusivas
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-strong hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                Fazer Login e Reservar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-blue-gradient rounded-full">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-blue-gradient bg-clip-text text-transparent">
              AutoLux Rental
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 AutoLux Rental. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Fleet;