import { AppRouter } from "./AppRouter";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";
import { supabase } from "./services/supabase";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      useAuthStore.setState({
        user: session?.user ?? null,
        sesion: session ?? null,
        loading: false,
      });
    });
    return () => subscription.unsubscribe();
  }, [checkSession]);

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
