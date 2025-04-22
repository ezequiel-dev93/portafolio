import { Resend } from 'resend';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export async function post({ request }: { request: Request }) {
  
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  
  if (!RESEND_API_KEY) {
    throw new Error('⚠️ Falta la API Key de Resend en las variables de entorno.');
  }

  const resend = new Resend(RESEND_API_KEY);
  const contact: ContactForm = await request.json();

  console.log('📩 Datos recibidos:', contact); // Opcional: solo para debug

  try {
    const data = await resend.emails.send({
      from: 'ezequielsuarez-dev.com',
      to: ['ezequielsuarez.dev@gmail.com'],
      replyTo: contact.email,
      subject: `Nuevo mensaje de ${contact.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Mensaje:</strong> ${contact.message}</p>
      `
    });

    console.log('✅ Email enviado');
    return new Response(
      JSON.stringify({ message: 'Correo enviado exitosamente' }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ Error al enviar email:', error); 
    
    return new Response(
      JSON.stringify({ 
        error: 'Error al enviar el email',
        details: error.message
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function get() {
  return new Response(
    JSON.stringify({ message: '✅ API funcionando correctamente' }),
    { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}