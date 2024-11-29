export type Plan = {
    name: string;
    amount: number;
    description: string;
    hidden?: boolean;
}

const PLANS: Plan[] = [
    {
        name: "FREE",
        amount: 0,
        description: "Limited features"
    },
    {
        name: "ENTRY",
        amount: 9.99,
        description: "Limited features"
    },
    {
        name: "BASIC",
        amount: 14.99,
        description: "More features",
        hidden: true
    },
    {
        name: "ADVANCED",
        amount: 19.99,
        description: "Access to all features, AI analysis, unlimited workspaces with unlimited collaborators",
        hidden: true
    },
]

export function getAvailablePlans(): Plan[] {
    return PLANS.filter((plan) => !plan.hidden);
}

export function getPlans(): Plan[] {
    return PLANS;
}

export function getDefaultPlan(): Plan {
    return PLANS[0];
}

export function getRecommandedPlan(): Plan {
    return PLANS[1];
} 