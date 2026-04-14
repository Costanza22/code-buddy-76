import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postRegister, type AuthUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z
  .object({
    name: z.string().max(80, "Máximo 80 caracteres").optional(),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirm: z.string().min(1, "Confirma a palavra-passe"),
  })
  .refine((d) => d.password === d.confirm, { message: "As palavras-passe não coincidem", path: ["confirm"] });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  const regMut = useMutation({
    mutationFn: (v: FormValues) => postRegister(v.email, v.password, v.name?.trim() || undefined),
    onSuccess: (user: AuthUser) => {
      queryClient.setQueryData(["auth", "me"], user);
      toast.success(`Conta criada, ${user.name}!`);
      navigate("/");
    },
    onError: (e: Error) => {
      toast.error(e.message || "Não foi possível registar.");
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-background">
      <Link
        to="/"
        className="font-mono font-bold text-lg tracking-tight mb-8 hover:text-primary transition-colors"
      >
        codestart_
      </Link>

      <Card className="w-full max-w-md border-2 border-border shadow-none rounded-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <img
              src="/key.png"
              alt=""
              width={72}
              height={72}
              className="h-[72px] w-[72px] object-contain rounded-lg border-2 border-border bg-card p-2"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">Criar conta</CardTitle>
            <CardDescription className="font-mono text-xs mt-2">
              Grátis. Só precisas de email e palavra-passe.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((v) => regMut.mutate(v))}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Nome (opcional)</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" className="font-mono text-sm" placeholder="Como te chamamos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" className="font-mono text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Palavra-passe</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" className="font-mono text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Confirmar</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="new-password" className="font-mono text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full font-mono uppercase tracking-wider"
                disabled={regMut.isPending}
              >
                {regMut.isPending ? "A criar…" : "Criar conta"}
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-muted-foreground mt-6 font-mono">
            Já tens conta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
