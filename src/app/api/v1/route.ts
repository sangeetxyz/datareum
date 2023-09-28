import { convertBigIntsToInts } from "@/utils/helpers";
import { InputObject, PatientBC, PatientDB, userData } from "@/types/types";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { getPatientsDataFromBc } from "@/utils/handlers";
import { decryptList } from "@/utils/crypt";

const prisma = new PrismaClient();

export async function GET(request: Request, response: Response) {
  const dataFromDb = await prisma.patient.findMany();
  const dataFromBc = await getPatientsDataFromBc();
  const a = combineDataAndSecretKeys(dataFromDb, dataFromBc);
  const b = decryptList(a);
  return NextResponse.json(b);
}

function combineDataAndSecretKeys(
  dataFromDb: PatientDB[],
  dataFromBc: PatientBC[],
): InputObject[] {
  const combinedObjects: InputObject[] = [];
  for (const dbObj of dataFromDb) {
    const matchingSecretKeyObj = dataFromBc.find(
      (bcObj) => bcObj.identifier === dbObj.identifier,
    );

    if (matchingSecretKeyObj) {
      console.log("matched");
      const combinedObj: InputObject = {
        identifier: dbObj.identifier,
        secretKey: matchingSecretKeyObj.secretKey,
        data: dbObj.data,
        // Add other attributes here
      };
      combinedObjects.push(combinedObj);
    }
  }

  return combinedObjects;
}

export async function POST(request: Request, response: Response) {}

export async function DELETE(request: Request) {}

export async function PUT(request: Request) {}
