import { convertBigIntsToInts } from "@/utils/helpers";
import { PatientDB, userData } from "@/types/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, response: Response) {
  const userData = await prisma.patient.findMany();
  console.log(userData);
  return NextResponse.json(convertBigIntsToInts(userData));
}

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const res = await prisma.patient.createMany({
    data: body.data,
    skipDuplicates: true,
  });
  return NextResponse.json({ status: "file uploade" });
}

export async function DELETE(request: Request) {}

export async function PUT(request: Request) {}
