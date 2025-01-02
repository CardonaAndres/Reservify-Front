import { SERVER_URL } from "../configs/config.js";

export const getAllTables = async (page) => {

    try {
        const res = await fetch(`${SERVER_URL}/tables/tables?page=${page}`, {
            method : 'GET', headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Error al obtener las mesas')

        return { status : true, data }

    } catch (err){
        return { status : true, message : err.message }
    }

}

export const getTableByID = async (table_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/tables/table/${table_ID}`, {
            method : 'GET', headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Error al obtener las mesas')

        return { status : true, data }

    } catch (err) {
        return { status : true, message : err.message }
    }
}

export const createTable = async (dataTable) => {
    try {
        const res = await fetch(`${SERVER_URL}/tables/table`, {
            method : 'POST', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(dataTable)
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Error al registrar la mesa.')

        return { status : true, data }

    } catch (err) {
        return { status : true, message : err.message }
    }
}

export const updateTable = async (dataTable, table_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/tables/table/${table_ID}`, {
            method : 'PUT', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(dataTable)
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Error al actualizar la mesa.')

        return { status : true, data }

    } catch (err) {
        return { status : true, message : err.message }
    }

}

export const deleteTable = async (table_ID) => {
    try {
        const res = await fetch(`${SERVER_URL}/tables/table/${table_ID}`, {
            method : 'DELETE', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
        });

        const data = await res.json();

        if(!res.ok)
            throw new Error(data.message || 'Error al eliminar la mesa.')

        return { status : true, data }

    } catch (err) {
        return { status : true, message : err.message }
    }
}

