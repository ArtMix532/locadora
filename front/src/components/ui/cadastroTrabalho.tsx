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
import {
  User,
  Home,
  Briefcase,
  Loader2,
  CheckCircle,
  PlusCircle,
  ServerCrash,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Supondo que você tenha um hook de toast

// --- INTERFACES PARA TIPAGEM ---
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
  user_id: string;
}
interface Trabalho {
  id?: number;
  empresa: string;
  cargo: string;
  salario: number;
}

export const CadastroDadosAdicionais = ({ handleNextStep, handlePrevStep }) => {
  const { toast } = useToast();

  const [user, setUser] = useState<UserData | null>(null);
  const [existingAddress, setExistingAddress] = useState<Endereco | null>(null);
  const [hasCheckedAddress, setHasCheckedAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Endereco>({
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
    user_id: "",
  });
  const [existingJobs, setExistingJobs] = useState<Trabalho[]>([]);
  const [newJob, setNewJob] = useState({ empresa: "", cargo: "", salario: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataString = localStorage.getItem("user");
      if (!userDataString) {
        setError("Usuário não autenticado.");
        setIsLoading(false);
        return;
      }
      const parsedUser = JSON.parse(userDataString);
      setUser(parsedUser);

      try {
        const token = parsedUser.accessToken;
        const userId = parsedUser.id;

        const [jobsRes] = await Promise.all([
          // fetch(`http://localhost:8080/api/users/${userId}/endereco`, {
          //   headers: { Authorization: `Bearer ${token}` },
          // }),
          fetch(`http://localhost:8080/api/users/${userId}/trabalhos`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // if (addressRes.ok) {
        //   setExistingAddress(await addressRes.json());
        // } else if (addressRes.status !== 404) {
        //   throw new Error("Falha ao verificar endereço.");
        // }
        setHasCheckedAddress(true);

        if (jobsRes.ok) {
          setExistingJobs(await jobsRes.json());
        } else {
          throw new Error("Falha ao buscar trabalhos.");
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar dados.");
        toast({
          title: "Erro",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [toast]);

  const handleAddressChange = (field: keyof Endereco, value: string) =>
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  const handleJobChange = (field: keyof typeof newJob, value: string) =>
    setNewJob((prev) => ({ ...prev, [field]: value }));

  const handleAddJob = async () => {
    if (!newJob.empresa || !newJob.cargo || !newJob.salario) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os dados do trabalho para adicionar.",
        variant: "destructive",
      });
      return;
    }
    if (!user) return;

    const localDate = new Date();

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${user.id}/trabalhos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            ...newJob,
            salario: parseFloat(newJob.salario),
            comeco: localDate,
            user_id: user.id,
          }),
        }
      );
      if (!response.ok) throw new Error("Não foi possível salvar o trabalho.");
      const savedJob = await response.json();
      setExistingJobs((prev) => [...prev, savedJob]);
      setNewJob({ empresa: "", cargo: "", salario: "" });
      toast({ title: "Sucesso!", description: "Trabalho adicionado." });
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNext = async () => {
    if (!user) return;
    if (!existingAddress && !newAddress.rua) {
      toast({
        title: "Pendente",
        description: "O endereço é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    if (existingJobs.length === 0) {
      toast({
        title: "Pendente",
        description: "Você deve cadastrar pelo menos um trabalho.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (!existingAddress && newAddress.rua) {
        const response = await fetch(
          `http://localhost:8080/api/users/${user.id}/endereco`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            body: JSON.stringify({ user_id: user.id, newAddress }),
          }
        );
        if (!response.ok) throw new Error("Falha ao salvar o endereço.");
        console.log(response);
      }
      handleNextStep();
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        Carregando seus dados...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-destructive">
        <ServerCrash className="h-10 w-10 mb-2" />
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Seus Dados
        </CardTitle>
        <CardDescription>
          Confirme ou preencha suas informações profissionais e de endereço
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Endereço
          </h3>
          {existingAddress ? (
            <div className="p-4 bg-muted/50 rounded-lg border space-y-1">
              <p className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle className="h-5 w-5" />
                Endereço já cadastrado.
              </p>
              <p className="text-sm text-muted-foreground pl-7">{`${existingAddress.rua}, ${existingAddress.numero} - ${existingAddress.cidade}/${existingAddress.estado}`}</p>
            </div>
          ) : (
            hasCheckedAddress && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="rua">Rua *</Label>
                  <Input
                    id="rua"
                    value={newAddress.rua}
                    onChange={(e) => handleAddressChange("rua", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    value={newAddress.numero}
                    onChange={(e) =>
                      handleAddressChange("numero", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={newAddress.cep}
                    onChange={(e) => handleAddressChange("cep", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={newAddress.cidade}
                    onChange={(e) =>
                      handleAddressChange("cidade", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    value={newAddress.estado}
                    onChange={(e) =>
                      handleAddressChange("estado", e.target.value)
                    }
                    placeholder="Ex: MG"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={newAddress.complemento}
                    onChange={(e) =>
                      handleAddressChange("complemento", e.target.value)
                    }
                  />
                </div>
              </div>
            )
          )}
        </div>
        <div>
          <div className="mb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Briefcase className="h-5 w-5 text-primary" />
              Dados Profissionais
            </CardTitle>
            <CardDescription>
              Você deve ter no minimo um emprego cadastrado, e no maximo 3
            </CardDescription>
          </div>
          <div className="space-y-4">
            {existingJobs.map((job) => (
              <div
                key={job.id}
                className="grid grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50"
              >
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Empresa
                  </Label>
                  <p>{job.empresa}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Cargo</Label>
                  <p>{job.cargo}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Salário
                  </Label>
                  <p>R$ {job.salario.toLocaleString("pt-BR")}</p>
                </div>
              </div>
            ))}
            {existingJobs.length < 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-dashed border rounded-lg items-end">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa *</Label>
                  <Input
                    id="empresa"
                    value={newJob.empresa}
                    onChange={(e) => handleJobChange("empresa", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo *</Label>
                  <Input
                    id="cargo"
                    value={newJob.cargo}
                    onChange={(e) => handleJobChange("cargo", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salario">Renda Mensal *</Label>
                  <Input
                    id="salario"
                    type="number"
                    value={newJob.salario}
                    onChange={(e) => handleJobChange("salario", e.target.value)}
                    placeholder="Apenas números"
                  />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddJob}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <PlusCircle className="mr-2 h-4 w-4" />
                    )}
                    Adicionar Trabalho
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handlePrevStep}>
            Anterior
          </Button>
          <Button
            onClick={onNext}
            className="bg-blue-gradient hover:bg-blue-gradient-dark text-white"
            disabled={
              isSubmitting ||
              existingJobs.length === 0 ||
              (!existingAddress && !newAddress.rua)
            }
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Próximo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
