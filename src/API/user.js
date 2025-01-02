import { SERVER_URL } from "../configs/config";

export const profileRequest = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/users/profile`,{
            method : 'GET', credentials : 'include', headers : { 'Content-Type': 'application/json' }
        });

        const data = await res.json()

        if (!res.ok)
            throw new Error(data.message || 'Hubo un error al obtener los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const getAllUsers = async (page) => {
    try {
        const res = await fetch(`${SERVER_URL}/users/users?page=${page}`,{
            method : 'GET', credentials : 'include', headers : { 'Content-Type': 'application/json' }
        });

        const data = await res.json()

        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al obtener los usuarios')
        
        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const getUserByEmail = async (email) => {
    try {
        const res = await fetch(`${SERVER_URL}/users/user-by-email/${email}`,{
            method : 'GET', credentials : 'include', headers : { 'Content-Type': 'application/json' }
        });

        const data = await res.json();

        if(!res.ok) 
            throw new Error(data.message || 'Hubo algún error al obtener los datos del usuario')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const changeRole = async (email, role_ID) => {
    try { 
        const res = await fetch(`${SERVER_URL}/users/change-role`,{
            method : 'PUT', credentials : 'include', 
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({ email, role_ID })
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al actualizar el rol, volver a intentar')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const updateUserRequest = async (userData) => {
    try {
        const res = await fetch(`${SERVER_URL}/users/update`, {
            method : 'PUT', credentials : 'include', 
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(userData)
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Hubo algún error al actualizar la información')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}