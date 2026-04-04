import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">

      {/* Big 404 */}
      <h1 className="text-6xl font-bold text-red-500 mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 mb-4">
        Sorry, the page you are looking for does not exist.
      </p>

      {/* Error Details */}
      {error && (
        <p className="text-sm text-gray-500 mb-4">
          {error.status} : {error.statusText || error.message}
        </p>
      )}

      {/* Back Button */}
      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Go Back Home
        </button>
      </Link>

    </div>
  );
}