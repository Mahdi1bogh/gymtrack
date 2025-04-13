import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        vendor: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        vendorId: body.vendorId, // This should come from the authenticated user
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
} 