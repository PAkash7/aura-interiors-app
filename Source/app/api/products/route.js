import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/db';


function generateId() {
    return 'p' + Date.now().toString(36);
}

export async function GET() {
    const products = getProducts();
    return NextResponse.json(products);
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, category, price, image, description } = body;

        // Basic validation
        if (!name || !price) {
            return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
        }

        const products = getProducts();
        const newProduct = {
            id: generateId(),
            name,
            category: category || 'Uncategorized',
            price: Number(price),
            image: image || '/images/placeholder.png', // You might want to handle file uploads separately
            description: description || '',
            tags: [] // Can add tags logic if needed
        };

        products.push(newProduct);
        saveProducts(products);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: 'Error adding product' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'ID required' }, { status: 400 });
        }

        let products = getProducts();
        const initialLength = products.length;
        products = products.filter(p => p.id !== id);

        if (products.length === initialLength) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }

        saveProducts(products);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (e) {
        return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
    }
}
