import { Resend } from 'resend';

export async function POST({ request }: { request: Request }) {
  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'API Key no configurada' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Datos incompletos' }),
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'ezequielsuarez-dev.com',
      
      to: ['ezequielsuarez.dev@gmail.com'],
      subject: `Mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error al procesar la solicitud',
        details: error.message 
      }),
      { status: 500 }
    );
  }
}

// Endpoint GET para pruebas
export async function GET() {
  return new Response(
    JSON.stringify({ status: 'API operativa' }),
    { status: 200 }
  );
}