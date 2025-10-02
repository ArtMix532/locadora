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
import {
  Car,
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

interface DashboardProps {
  userType?: "cliente" | "agente";
  userName?: string;
}

const CadastroCliente = () => {
  const [user, setUser] = useState<{
    nome: string;
    nivelAcesso: string;
  } | null>(null);

  // Efeito para ler do localStorage quando o componente carregar
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      setUser(JSON.parse(userDataString));
    }
  }, []);

  if (!user) {
    return <div>Carregando informações do usuário...</div>;
  }
  return (
    <div className="min-h-screen bg-background">
      <Navbar userType={user.nivelAcesso} userName={user.nome} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Cadastro de Cliente
          </h1>
          <p className="text-muted-foreground">Cadastre um novo cliente</p>
        </div>
      </div>
    </div>
  );
};

export default CadastroCliente;
