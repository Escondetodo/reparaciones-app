import { create } from "zustand"
import { supabase } from "../services/supabase"
import type { User, Session } from "@supabase/supabase-js"
import { traducirError } from "../utils/helpers"

interface AuthState {
    user:User|null;
    loading:boolean;
    error:string|null;
    sesion:Session|null;
    login:(email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;
    register:(email:string,password:string, nombre: string)=>Promise<void>;
    checkSession:()=>Promise<void>;
    forgotPassword:(email:string)=>Promise<void>;
    updatePassword:(password:string)=>Promise<void>;
}

export const useAuthStore = create<AuthState>((set)=>({
    user:null,
    loading:true,
    error:null,
    sesion:null,

    checkSession:async ()=>{
       set({loading:true})
       const response = await supabase.auth.getSession()
       set({user:response.data.session?.user, loading:false,sesion:response.data.session})
    },

login: async(email:string,password:string)=>{
    set({loading:true, error:null})
    try{   
        const response = await supabase.auth.signInWithPassword({email,password})
        if(response.error){
            throw new Error(response.error.message)
        }
        const dataUser = response.data
        set({ user: dataUser.user, loading:false});
    }catch(error){
        const messageError = error instanceof Error ?  traducirError(error.message) : "Error al iniciar sesion";
        set({error:messageError, loading:false})
        throw Error(messageError);
    }
    },

logout: async()=>{
    set({loading:true, error:null})
    try{
        const response = await supabase.auth.signOut()
        if(response.error){
            throw new Error(response.error.message)
        }
        set({ user: null, loading:false});
    }catch(error){
        const messageError = error instanceof Error ? traducirError(error.message) : "Error al cerrar sesion";
        set({error:messageError, loading:false})
    }
},
register: async(email:string,password:string,nombre: string)=>{
    set({loading:true, error:null})
    try{
        const response = await supabase.auth.signUp({
            email,
            password, 
            options: {
                data: {nombre}
            }
        })
        if(response.error){
            throw new Error(response.error.message)
        }
        const dataUser = response.data
        set({ user: dataUser.user, loading:false});
    }catch(error){
        const messageError = error instanceof Error ? traducirError(error.message) : "Error al registrarse";
        set({error:messageError, loading:false})
    }
},
forgotPassword: async(email:string)=>{
    set({loading:true, error:null})
    try {
         const response = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`
        })
        if (response.error){
            throw new Error(response.error.message)
        }
        set({loading:false, error:null})
    } catch (error) {
      const messageError = error instanceof Error ? traducirError(error.message) : "Error al enviar el link de recuperación";
      set({error:messageError, loading:false})
      throw Error(messageError)
    }
},
updatePassword: async(password:string)=>{
    set({loading:true, error:null})
    try {
        const response = await supabase.auth.updateUser({password})
        if (response.error){
            throw new Error(response.error.message)
        }
        set({loading:false, error:null})
    } catch (error) {
        const messageError = error instanceof Error ? traducirError(error.message) : "Error al actualizar la contraseña";
        set({error:messageError, loading:false})
        throw Error(messageError)
    }
},   
}))