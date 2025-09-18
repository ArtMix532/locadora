import { LoginForm } from "@/components/LoginForm";
import luxuryCarsHero from "@/assets/luxury-cars-hero.jpg";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${luxuryCarsHero})` }}
        />
        <div className="absolute inset-0 bg-blue-gradient-dark/60 backdrop-blur-[1px]" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Sua próxima
              <br />
              <span className="text-blue-light">aventura</span>
              <br />
              começa aqui
            </h1>
            <p className="text-lg text-blue-light/90 max-w-md">
              Alugue veículos premium com a melhor experiência em mobilidade.
              Qualidade, conforto e segurança garantidos.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-blue-light/80">Veículos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-blue-light/80">Suporte</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-blue-light/80">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 lg:max-w-lg xl:max-w-xl flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>

      {/* Mobile background */}
      <div className="lg:hidden absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${luxuryCarsHero})` }}
        />
        <div className="absolute inset-0 bg-background/95" />
      </div>
    </div>
  );
};

export default Login;