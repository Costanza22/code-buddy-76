import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, postLogout, type AuthUser } from "@/lib/api";

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => void;
  isLoggingOut: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const queryClient = useQueryClient();
  const { data: user = null, isPending } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    staleTime: 60_000,
  });

  const logoutMut = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.setQueryData(["auth", "me"], null);
    },
  });

  const value = useMemo(
    () => ({
      user,
      isLoading: isPending,
      logout: () => {
        logoutMut.mutate();
      },
      isLoggingOut: logoutMut.isPending,
    }),
    [user, isPending, logoutMut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
