import { Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import { router } from '../../configs/config.js'

export const AdminOptions = () => {
  return (
    <>
        <Link to={router.adminOptions} className="flex items-center px-4 py-2 text-sm text-gray-70 hover:bg-purple-50 transition-colors duration-150">
            <Settings className="h-4 w-4 text-purple-600 mr-3" />
            <div>
                <p className="font-medium">Opciones de Administrador</p>
                <p className="text-xs text-gray-500">Accede a configuraciones de administración</p>
            </div>
        </Link>
    
    </>
  )
}
