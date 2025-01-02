import { useAuth } from '../../context/AuthContext.jsx';
import { SpinnerLoading } from '../common/SpinnerLoading.jsx';
import { router } from '../../configs/config.js';
import { Link } from 'react-router-dom'

export const Hero = () => {
  const { isAuth, loading } = useAuth();
  const route = isAuth ? router.dashboard : router.login;

  if (loading) return <SpinnerLoading />

  return (
    <div className="pt-24 pb-12 px-4 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Reserva tu mesa en el mejor restaurante de la ciudad
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Disfruta de una experiencia gastronómica única en un ambiente elegante y acogedor.
              Haz tu reserva en minutos.
            </p>
            <Link to={route} className="bg-purple-600 text-white px-8 py-3 rounded-full 
              text-lg hover:bg-purple-700 transition-colors shadow-lg">         
             Hacer Reserva
            </Link>

          </div>
          <div className="md:w-1/2 p-8">
            <img src="https://img.freepik.com/fotos-premium/mesa-madera-clara-fondo-palabras-aleatorias-e-imagenes-bebidas-pizzas_311379-1217.jpg?w=740" alt="Restaurante elegante" 
            className="rounded-lg shadow-xl" />
          </div>
        </div>
    </div>
  )
}
