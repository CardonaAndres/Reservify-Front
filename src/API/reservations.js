import { SERVER_URL } from "../configs/config.js";

export const getAllMyReservations = async (page) => {
    try {
        const res = await fetch(`${SERVER_URL}/reservations/reservations?page=${page}`, {
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

export const getAllMReservations = async (page) => {
    try {
        const res = await fetch(`${SERVER_URL}/reservations/all-reservations?page=${page}`, {
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

export const getReservationByID = async (reservationID) => {
    try {
        const res = await fetch(`${SERVER_URL}/reservations/reservation/${reservationID}`, {
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

export const verifyAllReservations = async () => {
    try {
        
        const res = await fetch(`${SERVER_URL}/reservations/verify_reservations`, {
            method : 'GET', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al validar los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const createReservation = async (dataReservation) => {
    try {
        const res = await fetch(`${SERVER_URL}/reservations/reservation`, {
            method : 'POST', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(dataReservation)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al registrar los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}

export const updateReservation = async (dataReservation, reservationID) => {
    try {
        const res = await fetch(`${SERVER_URL}/reservations/reservation/${reservationID}`, {
            method : 'PUT', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(dataReservation)
        });

        const data = await res.json();
        console.log(data);
        if(!res.ok) throw new Error(data.message || 'Hubo un error al actualizar los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}

export const deleteReservation = async (reservationID) => {
    try {
        const res = await fetch(`${SERVER_URL}/reservations/reservation/${reservationID}`, {
            method : 'DELETE', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
        });

        const data = await res.json();

        if(!res.ok) throw new Error(data.message || 'Hubo un error al eleminar la reserva')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}