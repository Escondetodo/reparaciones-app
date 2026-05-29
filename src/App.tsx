import { AppRouter } from "./AppRouter";
import { useAuthStore } from "./store/auth";
import { useEffect } from "react";
import { supabase } from "./services/supabase";

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

  return <AppRouter />;
}

export default App;