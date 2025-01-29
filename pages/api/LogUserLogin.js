export default function handler(req, res) {
    if (req.method === "POST") {
      const { user, email, loginTime } = req.body;
      console.log(`Nuevo usuario: ${user}, Email: ${email}, Hora: ${loginTime}`);
      res.status(200).json({ message: "Log registrado" });
    } else {
      res.status(405).json({ message: "Método no permitido" });
    }
  }
  