import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await prisma.word.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true });
}
