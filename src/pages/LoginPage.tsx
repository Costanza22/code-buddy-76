import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postLogin, type AuthUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Obrigatório"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const loginMut = useMutation({
    mutationFn: (v: FormValues) => postLogin(v.email, v.password),
    onSuccess: (user: AuthUser) => {
      queryClient.setQueryData(["auth", "me"], user);
      toast.success(`Olá, ${user.name}!`);
      navigate("/");
    },
    onError: (e: Error) => {
      toast.error(e.message || "Não foi possível entrar.");
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
            <CardTitle className="text-2xl font-bold tracking-tight">Entrar</CardTitle>
            <CardDescription className="font-mono text-xs mt-2">
              Usa a tua conta para continuar as trilhas.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((v) => loginMut.mutate(v))}
              className="space-y-4"
            >
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
                      <Input type="password" autoComplete="current-password" className="font-mono text-sm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full font-mono uppercase tracking-wider"
                disabled={loginMut.isPending}
              >
                {loginMut.isPending ? "A entrar…" : "Entrar"}
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm text-muted-foreground mt-6 font-mono">
            Sem conta?{" "}
            <Link to="/registar" className="text-primary font-medium hover:underline">
              Registar
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
