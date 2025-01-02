export const SpinnerLoading = ({ message = "Cargando, por favor espera..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Message */}
      <p className="mt-4 text-lg font-medium text-gray-700">
        {message}
      </p>
    </div>
  );
};


