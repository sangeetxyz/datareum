import { convertBigIntsToInts } from "@/utils/helpers";
import { userData } from "@/types/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, response: Response) {
  const userData = await prisma.user.findMany();
  console.log(userData);
  if (userData) {
    return NextResponse.json(convertBigIntsToInts(userData));
  }
  return NextResponse.json({});
}

export async function POST(request: Request, response: Response) {
  const body: userData = await request.json();
  console.log(body);
  const userData: userData = {
    name: body.name,
    org: body.org,
    email: body.email,
    phone: body.phone,
    isGod: body.isGod,
    isOrgVerified: body.isOrgVerified,
    isEmailVerified: body.isEmailVerified,
    isPhoneVerified: body.isPhoneVerified,
    canContribute: body.canContribute,
    canDownload: body.canDownload,
    token: body.token,
    fireUid: body.fireUid,
    isTac: body.isTac,
  };
  const res = await prisma.user.create({
    data: userData,
  });

  return NextResponse.json({ status: "file uploade" });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  console.log(body);
  const user = await prisma.user.findFirst({
    where: {
      id: body.id,
    },
  });
  if (user) {
    const res = await prisma.user.delete({
      where: {
        id: body.id,
      },
    });
  } else {
    return NextResponse.json({ status: "no user" });
    throw Error("No User Found");
  }
  return NextResponse.json({ status: "deleted" });
}

export async function PUT(request: Request) {
  const body = await request.json();
  console.log(body);
  const user = await prisma.user.findFirst({
    where: {
      phone: body.phone,
    },
  });
  if (user) {
    const res = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: body.name,
        org: body.org,
        email: body.email,
        phone: body.phone,
        isOrgVerified: body.isOrgVerified,
        isEmailVerified: body.isEmailVerified,
        isPhoneVerified: body.isPhoneVerified,
        canContribute: body.canContribute,
        canDownload: body.canDownload,
        token: body.token,
        proUrl: body.proUrl,
        fireUid: body.fireUid,
        isTac: body.isTac,
        isGod: body.isGod,
      },
    });
  } else {
    return NextResponse.json({ status: "no user" });
    throw Error("No User Found");
  }
  return NextResponse.json({ status: "deleted" });
}
