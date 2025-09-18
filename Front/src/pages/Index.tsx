import { Button } from "@/components/ui/button";
import { Car, Users, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-gradient rounded-full">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-blue-gradient bg-clip-text text-transparent">
              AutoLux Rental
            </h1>
          </div>
          <Link to="/login">
            <Button className="bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-soft hover:shadow-strong transition-all duration-300">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground">
            Alugue o carro
            <br />
            <span className="bg-blue-gradient bg-clip-text text-transparent">
              dos seus sonhos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore nossa frota premium de veículos. Qualidade, conforto e segurança 
            garantidos para sua próxima viagem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105">
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
              Ver Frota
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Por que escolher a AutoLux?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos a melhor experiência em locação de veículos com serviços diferenciados
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-3 bg-blue-light rounded-full mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Frota Premium</h4>
              <p className="text-muted-foreground">
                Mais de 500 veículos de luxo e modelos recentes sempre disponíveis
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-3 bg-blue-light rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Atendimento VIP</h4>
              <p className="text-muted-foreground">
                Equipe especializada para te ajudar em todos os momentos
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-3 bg-blue-light rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Disponível 24/7</h4>
              <p className="text-muted-foreground">
                Suporte e retirada de veículos disponível a qualquer hora
              </p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex p-3 bg-blue-light rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Segurança Total</h4>
              <p className="text-muted-foreground">
                Seguro completo e assistência 24h inclusos em todos os planos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
              Pronto para sua próxima aventura?
            </h3>
            <p className="text-xl text-muted-foreground">
              Faça login agora e reserve o carro perfeito para sua viagem
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-blue-gradient hover:bg-blue-gradient-dark text-white font-semibold shadow-strong hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                Fazer Login
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

export default Index;
