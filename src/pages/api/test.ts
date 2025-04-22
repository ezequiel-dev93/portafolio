export function GET() {
    return new Response(JSON.stringify({ working: true }), {
      status: 200
    });
  }