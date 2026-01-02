import { NextResponse } from 'next/server';
import { getApplications, saveApplications } from '@/lib/db';

export async function GET() {
    const apps = getApplications();
    return NextResponse.json(apps);
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, role, experience, portfolio } = body;

        if (!name || !email || !role) {
            return NextResponse.json(
                { message: 'Name, Email and Role are required.' },
                { status: 400 }
            );
        }

        const apps = getApplications();

        const newApp = {
            id: Date.now().toString(),
            name,
            email,
            role,
            experience: experience || '',
            portfolio: portfolio || '',
            date: new Date().toISOString()
        };

        apps.push(newApp);
        saveApplications(apps);

        return NextResponse.json(
            { message: 'Application submitted successfully!', application: newApp },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error submitting application:', error);
        return NextResponse.json(
            { message: 'Failed to submit application.' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ message: 'ID required' }, { status: 400 });

    try {
        const apps = getApplications();
        const filteredApps = apps.filter(app => app.id !== id);
        saveApplications(filteredApps);
        return NextResponse.json({ message: 'Application deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete application' }, { status: 500 });
    }
}
