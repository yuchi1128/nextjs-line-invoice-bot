import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await request.json();
  const updatedInvoice = await prisma.invoice.update({
    where: { id },
    data: body,
  });
  return NextResponse.json(updatedInvoice);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.invoice.delete({ where: { id } });
  return NextResponse.json({ message: '請求書が正常に削除されました。' });
}