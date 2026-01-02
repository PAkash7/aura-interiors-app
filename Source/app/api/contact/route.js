import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getMessages, saveMessages } from '@/lib/db';

export async function GET() {
    const messages = getMessages();
    return NextResponse.json(messages);
}

function generateId() {
    return 'msg_' + Date.now().toString(36);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Save to JSON
        const messages = getMessages();
        const newMessage = {
            id: generateId(),
            name,
            email,
            message,
            date: new Date().toISOString()
        };
        messages.push(newMessage);
        saveMessages(messages);

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Nodemailer Transporter
        // NOTE: In a real production app, use environment variables for these values.
        // Example: process.env.SMTP_HOST, process.env.SMTP_USER, etc.
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER || 'ethereal_user',
                pass: process.env.SMTP_PASS || 'ethereal_pass',
            },
        });

        // Check if we have valid credentials or are mocking
        const isMock = !process.env.SMTP_HOST;

        if (isMock) {
            console.log("--- CONTACT FORM SUBMISSION (Mock) ---");
            console.log(`Name: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Message: ${message}`);
            console.log("To send real emails, configure STMP environment variables.");
            console.log("--------------------------------------");
        } else {
            // Send email
            await transporter.sendMail({
                from: `"${name}" <${email}>`, // sender address
                to: process.env.ADMIN_EMAIL || "admin@example.com", // list of receivers
                subject: `New Contact from Aura Interiors: ${name}`, // Subject line
                text: message, // plain text body
                html: `<p>You have a new contact form submission:</p>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong></p>
                 <p>${message}</p>`, // html body
            });
        }

        return NextResponse.json(
            { message: 'Message sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { message: 'Failed to send message.' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    try {
        const messages = getMessages();
        const filteredMessages = messages.filter(msg => msg.id !== id);
        saveMessages(filteredMessages);
        return NextResponse.json({ message: 'Message deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete message' }, { status: 500 });
    }
}
