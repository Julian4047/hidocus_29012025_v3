import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'sql8.freesqldatabase.com',
    user: 'sql8758808',
    password: 'eYt14QdL3Z',
    database: 'sql8758808',
    port: 3306,
};

// Función para registrar logs en la base de datos
async function logToDatabase(message) {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'INSERT INTO Payments (Payments) VALUES (?)';
        await connection.execute(query, [message]);
        await connection.end();
    } catch (error) {
        console.error('Error al registrar log en la base de datos:', error.message);
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const event = req.body;

        // Registrar el evento completo para inspección
        const eventLog = `Evento completo recibido: ${JSON.stringify(event, null, 2)}`;
        console.log(eventLog);
        await logToDatabase(eventLog);

        // Extraer información relevante del evento
        const paymentData = event.data || {};
        const payer = paymentData.payer || {};
        const paymentId = paymentData.id || 'No disponible'; // Número de operación
        const amount = paymentData.transaction_amount || 'No disponible'; // Monto
        const payerFirstName = payer.first_name || 'No disponible'; // Nombre del pagador
        const payerLastName = payer.last_name || 'No disponible'; // Apellido del pagador
        const payerEmail = payer.email || 'No disponible'; // Correo del pagador
        const payerPhone = payer.phone ? payer.phone.number : 'No disponible'; // Teléfono del pagador
        const status = paymentData.status || 'No disponible'; // Estado del pago
        const dateCreated = paymentData.date_created || 'No disponible'; // Fecha de creación

        // Crear un registro consolidado y acotado
        const logMessage = JSON.stringify({
            operation_id: paymentId,
            amount,
            payer: `${payerFirstName} ${payerLastName}`,
            email: payerEmail,
            phone: payerPhone,
            status,
            date_created: dateCreated,
        });

        console.log(logMessage); // Log al servidor
        await logToDatabase(logMessage); // Guardar en la base de datos

        // Responder a Mercado Pago para confirmar recepción
        res.status(200).send('OK');
    } else {
        // Manejar métodos no permitidos
        const errorLog = 'Método no permitido';
        console.log(errorLog);
        await logToDatabase(errorLog);
        res.status(405).send(errorLog);
    }
}
