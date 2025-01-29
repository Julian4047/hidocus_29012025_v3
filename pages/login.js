import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    // Inicializar Google Sign-In
    window.google?.accounts.id.initialize({
      client_id: "606189646329-lq08c93nnua3atn4sdmjs26lnadj48s7.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    // Renderizar el botón de Google Sign-In
    window.google?.accounts.id.renderButton(document.getElementById("google-signin-btn"), {
      theme: "outline",
      size: "large",
    });

    console.log("Google Login initialized");
  }, []);

  function handleCredentialResponse(response) {
    const data = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("ID Token:", response.credential);
    console.log("User Info:", data);
    alert(`Bienvenido, ${data.name}`);
    logUserLogin(data);
  }

  async function logUserLogin(userData) {
    try {
      const response = await fetch("/api/logUserLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData.name,
          email: userData.email,
          loginTime: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Error al registrar el log");
      console.log("Log registrado en Vercel");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login with Google</h1>
      <div id="google-signin-btn"></div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </div>
  );
}
