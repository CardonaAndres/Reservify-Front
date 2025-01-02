
import { Instagram, Facebook, Twitter } from '@mui/icons-material';

export const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                {/* Información de la empresa */}
                <div className="space-y-4">
                    <h4 className="text-4xl font-extrabold mb-2 text-white">Reservify</h4>
                    <p className="text-lg text-gray-200 max-w-sm">
                        Tu plataforma de reservas de confianza para experiencias gastronómicas inolvidables.
                    </p>
                    <p className="text-sm text-gray-300">¡Nos encanta hacer tus momentos aún más especiales!</p>
                </div>

                {/* Servicios destacados */}
                <div className="space-y-4">
                    <h4 className="text-2xl font-semibold text-white">Servicios Destacados</h4>
                    <ul className="space-y-2 text-lg text-gray-300">
                        <li>Reservas rápidas y fáciles</li>
                        <li>Soporte 24/7 para una experiencia sin problemas</li>
                    </ul>
                </div>

                {/* Suscripción al boletín */}
                <div className="space-y-4">
                    <h4 className="text-2xl font-semibold text-white">Suscríbete a nuestro boletín</h4>
                    <p className="text-lg text-gray-200">Recibe las últimas actualizaciones, promociones y novedades directamente en tu bandeja de entrada.</p>
                    <form action="#" className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                        <input 
                            type="email" 
                            placeholder="Introduce tu correo"
                            className="px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                        />
                        <button 
                            type="submit" 
                            className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
                        >
                            ¡Suscríbete!
                        </button>
                    </form>
                </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-gray-500 mt-12 pt-6 text-center text-gray-300">
                <p>&copy; 2024 Reservify. Todos los derechos reservados.</p>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center space-x-6 text-3xl mt-8">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-300 transition duration-200 ease-in-out">
                    <Instagram />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-300 transition duration-200 ease-in-out">
                    <Facebook />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-300 transition duration-200 ease-in-out">
                    <Twitter />
                </a>
            </div>
        </div>
    );
};
