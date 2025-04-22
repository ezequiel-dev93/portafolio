import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const post: APIRoute = async ({ request }) => {
  console.log('Endpoint /api/contact POST llamado');
  console.log('RESEND_API_KEY:', import.meta.env.RESEND_API_KEY ? 'Existe' : 'No existe');

  try {
    const body = await request.json();
    console.log('Datos recibidos:', body);

    const { name, email, message } = body;

    // Validación
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son obligatorios' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Envío del email
    const { data, error } = await resend.emails.send({
      from: import.meta.env.RESEND_EMAIL_FROM,
      to: import.meta.env.RESEND_EMAIL_TO,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br/>${message}</p>
      `,
    });

    if (error) {
      console.error('Error de Resend:', error);
      return new Response(
        JSON.stringify({ error: 'Error al enviar el correo' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Email enviado con éxito:', data);
    return new Response(
      JSON.stringify({ message: 'Mensaje enviado correctamente' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (err) {
    console.error('Error en el endpoint:', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};