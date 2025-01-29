import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a mi App</h1>
      <Link href="/login">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Iniciar Sesión</button>
      </Link>
    </div>
  );
}
