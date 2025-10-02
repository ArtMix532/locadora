import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car, User, LogOut, Settings, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  userType?: "cliente" | "AGENTE";
  userName?: string;
}

const Navbar = ({
  userType = "cliente",
  userName = "Usuário",
}: NavbarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const clienteMenuItems = [
    { path: "/dashboard", label: "Dashboard", active: isActive("/dashboard") },
    {
      path: "/meus-pedidos",
      label: "Meus Pedidos",
      active: isActive("/meus-pedidos"),
    },
    {
      path: "/novo-pedido",
      label: "Novo Pedido",
      active: isActive("/novo-pedido"),
    },
  ];

  const agenteMenuItems = [
    { path: "/dashboard", label: "Dashboard", active: isActive("/dashboard") },
    {
      path: "/ManageAllOrders",
      label: "Avaliar Pedidos",
      active: isActive("/ManageAllOrders"),
    },
    { path: "/contratos", label: "Contratos", active: isActive("/contratos") },
    {
      path: "/analise-financeira",
      label: "Análise Financeira",
      active: isActive("/analise-financeira"),
    },
    { path: "/clientes", label: "Clientes", active: isActive("/clientes") },
    { path: "/veiculos", label: "Veículos", active: isActive("/veiculos") },
  ];

  const menuItems = userType === "AGENTE" ? agenteMenuItems : clienteMenuItems;

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="p-2 bg-blue-gradient rounded-full">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-blue-gradient bg-clip-text text-transparent">
                AutoLux Rental
              </h1>
              <p className="text-xs text-muted-foreground">
                {userType === "agente"
                  ? "Painel do Agente"
                  : "Portal do Cliente"}
              </p>
            </div>
          </Link>

          {/* Menu Items - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  item.active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-accent/50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-gradient text-white text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {userType}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link to="/login">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-smooth ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
