"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) return;

    return await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        phone: user.phoneNumbers[0]?.phoneNumber,
      },
      create: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        phone: user.phoneNumbers[0]?.phoneNumber,
      },
    });
  } catch (error) {
    console.log("Error in syncUser server action", error);
  }
}
