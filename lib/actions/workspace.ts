"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { CREATE_WORKSPACE } from "../validation/workspace";
import { PLAN, Workspace } from "@prisma/client";
import prisma from "../prisma";

export type CreateWorkspace = { name: string; plan: string };

export async function createWorkspace(payload: CreateWorkspace): Promise<Error | Workspace> {
    const parser = CREATE_WORKSPACE.safeParse(payload);
    if(!parser.success) {
        return parser.error;
    }

    const session = await auth()
    if(!session?.user || !session.user.email) redirect("/sign-in");

    return await prisma.workspace.create({
        data: {
            name: parser.data.name,
            owner: {
                connect: {
                    email: session.user.email
                }
            },
            plan: parser.data.plan as PLAN,
        }
    })
}