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
        console.log(response.error)
        console.log("response", response)
        if(response.error){
            throw new Error(response.error.message)
        }
        const dataUser = response.data
        console.log("datauser", dataUser)
        set({ user: dataUser.user, loading:false});
    }catch(error){
        console.log(error)
        const messageError = error instanceof Error ?  traducirError(error.message) : "Error al iniciar sesion";
        set({error:messageError, loading:false})
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
        console.log(error)
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
        console.log("response", response)
        if(response.error){
            throw new Error(response.error.message)
        }
        const dataUser = response.data
        set({ user: dataUser.user, loading:false});
    }catch(error){
        console.log(error)
        const messageError = error instanceof Error ? traducirError(error.message) : "Error al registrarse";
        set({error:messageError, loading:false})
    }
},
}))