import { SERVER_URL } from "../configs/config.js";

export const loginRequest = async ({email, password}) => {

    try {

        const res = await fetch(`${SERVER_URL}/auth/login`, {
            method : 'POST', 
            credentials : 'include', 
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({email, password})
        })

        const data = await res.json()

        if(!res.ok)
            throw new Error(data.message || 'Hubo algún error al iniciar sesión')
             
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message || 'Hubo algún error al iniciar sesión' }
    }

}

export const registerRequest = async (userData) => {
    try {
        const res = await fetch(`${SERVER_URL}/auth/register`,{
            method : 'POST',
            credentials : 'include',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(userData)
        });

        const data = await res.json()

        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al hacer el registro, por favor volver a intentar' )

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}

export const logoutRequest = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/auth/logout`, {
            method : 'POST', credentials : 'include', headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json()

        if(!res.ok)
            throw new Error('Hubo algún error al cerrar sesión')

        return { status : true, message : 'Sesión cerrada correctamente' }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const updatePasswordRequest = async ({ email, new_password }) => {
    try {
        const res = await fetch(`${SERVER_URL}/auth/update-password`, {
            method : 'PUT', credentials : 'include', 
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({email, new_password})
        });
        
        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Hubo algún error al cambiar la contraseña')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const verifySession = async () => {

    try {

        const res = await fetch(`${SERVER_URL}/auth/verify-session`, {
            method : 'GET', 
            credentials : 'include', 
            headers : { 'Content-Type': 'application/json' }
        })

        const data = await res.json()

        if(!res.ok)
            throw new Error(data?.detail)
        
            
        return { status : true, data}

    } catch (err) {
        return { status : false, message : err.message || 'Hubo algún error, inicia sesión nuevamente' }
    }

}