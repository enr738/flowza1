export async function GET() {
  const number = process.env.CONTACT_WHATSAPP;
  const message = encodeURIComponent(
    "Hello! I found you on Flowza and I'd like to get in touch."
  );
  return Response.redirect(`https://wa.me/${number}?text=${message}`);
}
