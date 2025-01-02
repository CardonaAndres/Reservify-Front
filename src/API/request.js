import { SERVER_URL } from '../configs/config.js'

export const getAllRequests = async (page) => {
    try {

        const res = await fetch(`${SERVER_URL}/requests/requests?page=${page}`, {
            method : 'GET', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al obtener los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}

export const getAllMyRequests = async (page) => {
    try {

        const res = await fetch(`${SERVER_URL}/requests/my-requests?page=${page}`, {
            method : 'GET', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al obtener los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}

export const sendRequest = async (infoRequest) => {
    try {

        const res = await fetch(`${SERVER_URL}/requests/request`, {
            method : 'POST', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(infoRequest)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al mandar la solicitud')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}