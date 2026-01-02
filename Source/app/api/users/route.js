import { NextResponse } from 'next/server';
import { getUsers, saveUsers } from '@/lib/db';

export async function GET() {
    const users = getUsers();
    // Return users without passwords for security
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(safeUsers);
}

function generateId() {
    return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, age, phone, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Name, Email and Password are required.' },
                { status: 400 }
            );
        }

        const users = getUsers();

        // Check if user exists
        if (users.find(u => u.email === email)) {
            return NextResponse.json(
                { message: 'User with this email already exists.' },
                { status: 409 }
            );
        }

        const newUser = {
            id: generateId(),
            name,
            email,
            age: age || '',
            phone: phone || '',
            password, // In production, this MUST be hashed (e.g. bcrypt)
            joined: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);

        // Return user without password
        const { password: _, ...userResponse } = newUser;

        return NextResponse.json(
            { message: 'User registered successfully!', user: userResponse },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json(
            { message: 'Failed to register user.' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    try {
        const users = getUsers();
        const filteredUsers = users.filter(user => user.id !== id);
        saveUsers(filteredUsers);
        return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}
