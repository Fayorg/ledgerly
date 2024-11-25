const TESTIMONIALS = [
    {
        name: "Emily R.",
        title: "Freelancer",
        quote: "Ledgerly has completely changed how I manage my income and expenses. I love the intuitive interface and how easy it is to set up budgets. It's like having a personal accountant in my pocket!"
    },
    {
        name: "James T.",
        title: "College Student",
        quote: "Being on a tight budget, I needed a tool to track my spending. Ledgerly helps me see where my money goes and stick to my goals. It's a lifesaver for students!"
    },
    {
        name: "Sophia L.",
        title: "Small Business Owner",
        quote: "As a business owner, tracking finances can get overwhelming. Ledgerly simplifies everything—reports, expenses, income—it’s all in one place. I can finally focus on growing my business."
    },
    {
        name: "Hannah K.",
        title: "Tech Enthusiast",
        quote: "I’ve tried many finance apps, but Ledgerly stands out for its seamless design and insightful analytics. Managing money has never been this stress-free!"
    },
]

export function getTestimonials() {
    return TESTIMONIALS;
}

export function getTestimonial() {
    return TESTIMONIALS[Math.floor(Math.random() * TESTIMONIALS.length)];
}