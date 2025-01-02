import { Phone, Email, LocationOn} from '@mui/icons-material';

export const Contact = () => {
  return (
    <div className="py-16 px-4 bg-purple-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Contáctanos
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <LocationOn className="text-purple-600 h-6 w-6" />
                <p className="text-gray-600">Calle Principal 123, Ciudad</p>
              </div>
              <div className="flex items-center space-x-3">
                <Email className="text-purple-600 h-6 w-6" />
                <p className="text-gray-600">info@reservify.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-purple-600 h-6 w-6" />
                <p className="text-gray-600">+34 123 456 789</p>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
              />
              <textarea
                placeholder="Mensaje"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
              ></textarea>
              <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
    </div>
  )
}
