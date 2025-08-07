// import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     const { name, email, message } = await req.json();

//     if (!name || !email || !message) {
//       return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//     }

//     await resend.emails.send({
//       from: 'Portfolio Contact <onboarding@resend.dev>',
//       to: 'abelmarkos2023@gmail.com',
//       subject: `New message from ${name}`,
//       text: `From: ${name} (${email})\n\n${message}`,
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  console.log("sending mail")

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // use verified sender
      to: process.env.CONTACT_EMAIL!, // your email address
      subject: "New Contact Message",
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log('email sent')

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
