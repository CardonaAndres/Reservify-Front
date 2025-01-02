import { SERVER_URL } from "../configs/config.js";


export const getFullSchedule = async () => {
    try {
        const res = await fetch(`${SERVER_URL}/schedules/schedules`, {
            method : 'GET', headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al obtener los datos del horario')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const getDayByID = async (day_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/schedules/schedule/${day_ID}`, {
            method : 'GET', headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al obtener los datos del día')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const registerDay = async (dayData) => {
    try {
        const res = await fetch(`${SERVER_URL}/schedules/schedule`, {
            method : 'POST', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(dayData)
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al registrar los datos del horario')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}

export const updateDay = async (dayData, day_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/schedules/schedule/${day_ID}`, {
            method : 'PUT', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(dayData)
        });

        const data = await res.json();
        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al actualizar los datos del horario')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
    

}

export const deleteDay = async (day_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/schedules/schedule/${day_ID}`, {
            method : 'DELETE', credentials : 'include',
            headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json();
        if(!res.ok)
            throw new Error(data.message || 'Hubo un error al eliminar el día')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
    

}