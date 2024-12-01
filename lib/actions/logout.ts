"use server";

import { redirect } from "next/navigation";
import { signOut } from "../auth";

export async function logout() {
    await signOut();
    redirect("/sign-in");
}