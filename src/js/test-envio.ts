// test-envio.ts

import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarCorreoPrueba() {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM!,
      to: process.env.RESEND_EMAIL_TO!,
      subject: "🧪 Prueba local de envío",
      html: `<p>Esto es un <strong>mensaje de prueba</strong> desde entorno local</p>`,
    });

    console.log("✅ Correo enviado:", data);
  } catch (err) {
    console.error("❌ Error al enviar:", err);
  }
}

enviarCorreoPrueba();
