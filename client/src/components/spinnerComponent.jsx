export default function SkyLuxSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Loading Spinner */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-32 h-32 border-4 border-blue-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          
          {/* Inner rotating ring */}
          <div className="absolute top-4 left-4 w-24 h-24 border-3 border-indigo-200 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
            <div className="absolute top-0 left-0 w-full h-full border-3 border-transparent border-t-indigo-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>

        {/* SkyLux Text */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-wide">
            Sky<span className="text-blue-600">Lux</span>
          </h1>
          <p className="text-gray-600 text-lg animate-pulse">
            Loading your flight experience...
          </p>
        </div>

        {/* Loading dots animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-12 h-12 bg-indigo-200 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-blue-300 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-32 w-20 h-20 bg-indigo-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}