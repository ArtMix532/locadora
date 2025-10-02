import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Fleet from "./pages/Fleet";
import Dashboard from "./pages/Dashboard";
import ClientOrders from "./pages/ClientOrders";
import AgentOrders from "./pages/AgentOrders";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import NewOrder from "./pages/NewOrder";
import Cars from "./pages/Cars";
import CadastroCliente from "./pages/CadastroCliente";
import ManageAllOrders from "./pages/ClientOrdersAll";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/frota" element={<Fleet />} />
          <Route path="/register" element={<Register />} />
          <Route path="/novo-pedido" element={<NewOrder />} />
          <Route path="/cadastro-frota" element={<Cars />} />
          <Route path="/cadastro-clientes" element={<CadastroCliente />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meus-pedidos" element={<ClientOrders />} />
          <Route path="/avaliar-pedidos" element={<AgentOrders />} />
          <Route path="/ManageAllOrders" element={<ManageAllOrders />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
