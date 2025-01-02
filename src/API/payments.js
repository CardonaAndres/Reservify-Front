import { SERVER_URL } from "../configs/config.js";

export const getAllPayments =  async (page) => {
    try {
        const res = await fetch(`${SERVER_URL}/payments/payments?page=${page}`, {
            method : 'GET', credentials : 'include',
            headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al obtener los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const getPayment =  async (paymentID) => {
    try {
        const res = await fetch(`${SERVER_URL}/payments/payment/${paymentID}`, {
            method : 'GET', credentials : 'include',
            headers : {'Content-Type': 'application/json'}
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al obtener los datos')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }
}

export const doPayment =  async (paymentData) => {
    try {
        const res = await fetch(`${SERVER_URL}/payments/payment`, {
            method : 'POST', credentials : 'include',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(paymentData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Hubo un error al realizar el pago')

        return { status : true, data }

    } catch (err) {
        return { status : false, message : err.message }
    }

}