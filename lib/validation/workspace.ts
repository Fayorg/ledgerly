import { z } from "zod";
import { getAvailablePlans } from "../plans";

export const INIT_WORKSPACE = z
    .object({
        name: z.string().max(64, { message: "Workspace name cannot be longer than 64 caracters" }),
        plan: z.enum(getAvailablePlans().map(plan => plan.name) as [string, ...string[]] as readonly [string, ...string[]], { message: "Selected plan isn't available" })
    });

export const CREATE_WORKSPACE = z
    .object({
        name: z.string().max(64, { message: "Workspace name cannot be longer than 64 caracters" }),
        plan: z.enum(getAvailablePlans().map(plan => plan.name) as [string, ...string[]] as readonly [string, ...string[]], { message: "Selected plan isn't available" })
    });