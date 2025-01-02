import Swal from "sweetalert2";

export const successAlert = async ({ message = 'La tarea se completó correctamente.' }) => {
    
    return Swal.fire({
        title: '¡Éxito!',
        text: message,
        icon: 'success',
        confirmButtonColor: '#6A0DAD', // Color morado
        background: '#FFFFFF', // Fondo blanco
        color: '#4B0082', // Texto morado oscuro
        iconColor: '#6A0DAD', // Color del icono
      });

}

export const errorAlert = async ({ message = 'Hubo un problema al realizar la tarea.' }) => {
    
    return Swal.fire({
        title: '¡Error!',
        text: message,
        icon: 'error',
        confirmButtonColor: '#6A0DAD', // Color morado
        background: '#FFFFFF', // Fondo blanco
        color: '#4B0082', // Texto morado oscuro
        iconColor: '#FF0000', // Color del icono
    });

};

export const warningAlert = async ({ message = '¿Estás seguro de realizar esta acción?' }) => {
    return Swal.fire({
        title: '¡Advertencia!',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6A0DAD', // Color morado
        cancelButtonColor: '#FF6347', // Color rojo para cancelar
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar',
        background: '#FFFFFF', // Fondo blanco
        color: '#4B0082', // Texto morado oscuro
        iconColor: '#FF6347', // Color del icono de advertencia (rojo)
        backdrop: `
            rgba(108, 99, 255, 0.4)
        `,
        customClass: {
            popup: 'swal-popup-custom'
        }
    });
};