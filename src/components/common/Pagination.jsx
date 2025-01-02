import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const Pagination = ({ page, totalPages, handleNextPage, handlePrevPage }) => {
    return (
        <div className="mt-8 flex justify-center space-x-4">
            <button onClick={handlePrevPage}disabled={page === 1}
                className={`flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium transition-colors 
                    ${page === 1 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                <ChevronLeft className="h-5 w-5 mr-1" />
                Anterior
            </button>

            <button onClick={handleNextPage} disabled={page === totalPages}
                className={`flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium transition-colors 
                    ${page === totalPages 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                Siguiente
                <ChevronRight className="h-5 w-5 ml-1" />
            </button>
        </div>
    );
}
