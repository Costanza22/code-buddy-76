import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function NavAuth() {
  const { user, logout, isLoggingOut } = useAuth();

  // Não esconder "Entrar" enquanto /api/auth/me carrega — senão, se a API falhar,
  // o utilizador fica só com "…" e parece que o botão sumiu.
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground max-w-[120px] truncate hidden sm:inline">
          {user.name}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="font-mono text-xs uppercase tracking-wider"
          onClick={() => logout()}
          disabled={isLoggingOut}
        >
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Link to="/login">
      <Button size="sm" className="font-mono text-xs uppercase tracking-wider">
        Entrar
      </Button>
    </Link>
  );
}
