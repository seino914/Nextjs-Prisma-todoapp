import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  const { completed }: { completed: boolean } = await req.json();
  // リクエストのidを元にcompletedを反転させる
  const res = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !completed,
    },
  });
  return Response.json(res);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  //リクエストのidを元に削除
  const res = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return Response.json(res);
}
