import { parsePdfText } from "@/lib/api/(features)/upload-file";
import { formatZodError } from "@/lib/utils";
import { UPLOAD_RESUME_FILE_VALIDATION } from "@/validations/(features)/upload-file";
import { NextRequest, NextResponse } from "next/server"

const ressss = { 
        "overall_assessment": "Pass — lacks impact, professional experience, and quantifiable achievements", 
        "biggest_issues": [ 
            { "issue": "No professional work experience listed", "why_it_matters": "Hiring managers need evidence of real‑world impact, ownership, and ability to ship production software; projects alone are insufficient for mid‑to‑senior roles", "suggestion": "Add any internships, freelance contracts, or full‑time roles with dates and responsibilities, or clearly label projects as personal with measurable outcomes" 
            }, 
            { "issue": "Project descriptions are vague and lack metrics", "why_it_matters": "Without numbers (users, performance gains, revenue), you cannot demonstrate the scale or significance of your work", "suggestion": "Include concrete impact data for each project (e.g., 'served 2,000 daily active users', 'reduced page load by 30%')" }, { "issue": "Missing dates and links for projects", "why_it_matters": "Dates show recency and progression; links let reviewers verify the work. Their absence makes the resume look incomplete", "suggestion": "Add start/end months for each project and provide live URLs or GitHub repos" } ], "bullet_rewrites": [ { "original": "Developed the front-end of an health-care software named 'aegis-health' with other developers.", "improved": "Co‑designed and implemented the responsive front‑end of the Aegis Health Care platform using Next.js, TypeScript, Tailwind CSS and Firebase, collaborating with a cross‑functional team.", "reason": "Adds collaboration, specific tech stack, and design responsibility, making the contribution clearer and higher‑impact" }, { "original": "Developed a real-time messaging application with robust user authentication and enhanced security measures. Key functionalities include - secure user login, real-time message delivery, and data protection", "improved": "Built a real‑time messaging app with secure authentication and end‑to‑end encryption using React.js, Firebase and Vercel, delivering instant message delivery for registered users.", "reason": "Condenses description, highlights security focus, and names the tech stack succinctly" }, { "original": "Implemented the front-end desktop view of an e-commerce website focusing on designing user-friendly interfaces and ensuring a responsive design for optimal desktop user experience.", "improved": "Created the desktop UI for an e‑commerce site, emphasizing component architecture and responsive design with Next.js, TypeScript and Tailwind CSS.", "reason": "Emphasizes architectural work and specific technologies, removing filler language" }, { "original": "Developed responsive and user-friendly interface of a web3 project to enhance user experience without integrating blockchain Technologies.", "improved": "Engineered a responsive React interface for a Web3 project, optimizing load performance and cross‑browser compatibility while abstracting away blockchain complexity.", "reason": "Shows performance focus and clarifies the scope of work" }, { "original": "Implemented the frontend of one of the UIs for the 'urgent tukay' trend in Nigeria.", "improved": "Implemented the UI for the 'Urgent Tukay' trend, using vanilla JavaScript, HTML5 and CSS to achieve fast load times on low‑bandwidth connections.", "reason": "Specifies technologies and the performance goal, giving the bullet more weight" } ], "missing_signals": [ "Quantifiable scale or impact metrics (users, revenue, performance improvements)", "Evidence of technical leadership or mentorship", "Production deployment details (CI/CD pipelines, monitoring, scaling)", "Collaboration with product/UX teams beyond generic 'with other developers'", "Progressive responsibility or promotion timeline" ], "skills_feedback": { "strengths": [ "Modern front‑end stack: React, Next.js, TypeScript, Tailwind CSS", "Firebase experience for authentication and real‑time data", "UI/UX tooling: Figma" ], "overhyped_or_generic": [ "JavaScript, HTML, CSS (expected baseline)", "Git, GitHub (basic for any engineer)", "Postman (more backend‑oriented, not reflected in work)" ], "missing_for_seniority": [ "Backend architecture (Node.js, APIs, databases)", "Testing frameworks (Jest, Cypress, unit/integration testing)", "CI/CD, cloud platforms (AWS/GCP/Azure)", "System design, performance profiling" ], "organization_tip": "Group front‑end frameworks, language/runtime, cloud services, and tooling into separate categories for quicker scanning" }, "seniority_assessment": { "perceived_level": "Junior despite title", "what_supports_it": "Only personal projects, limited scope, no production impact, no leadership responsibilities", "what_undermines_it": "Absence of work experience, missing metrics, no evidence of system‑level thinking or mentorship", "path_to_next_level": "Obtain a full‑time engineering role or substantial freelance contract where you own a feature end‑to‑end, measure its impact, and mentor junior teammates; add measurable outcomes to your resume" }, "hire_decision": "No Hire" }

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.formData();
        const resume = body.get('resume');
        const { success, data: file, error } = UPLOAD_RESUME_FILE_VALIDATION.safeParse(resume);

        if(!success){
            return NextResponse.json({ message: formatZodError(error) }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const res = await parsePdfText(buffer)
        console.log(res)

        return NextResponse.json({message: ressss}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({message: "Internal server error"}, { status: 500 })
    }
}