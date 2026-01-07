import { getDocumentProxy, extractText } from "unpdf";

const cleanResumeText = (text: string) => {
  return text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}


export const parsePdfText = async (buffer: Buffer) => {
  const uint8 = new Uint8Array(buffer);
  const pdf = await getDocumentProxy(uint8);
  const { text, totalPages } = await extractText(pdf, { mergePages: true });
  console.log(text, totalPages)
  return cleanResumeText(text);
}


export const ExtractResumeStructure = async () => {
    try {
        
    } catch (error) {
        
    }
}



export const RESUME_PARSER_PROMPT = `
You are an accurate, strict resume parser for software developer resumes.

Your ONLY task is to extract information EXACTLY as it appears — never add, invent, rephrase, improve, or summarize content.

Rules:
- Preserve original wording verbatim for bullets, role titles, company names, school names, and degree names.
- Do NOT interpret, combine, or rewrite anything.
- If information is missing or unclear, use empty string "" or empty array [].
- Extract from explicit sections only — do not infer.
- Dates: Use exact format as written (e.g., "January 2023", "01/2023", "2023 – Present"). Use "Present" for current roles/education.
- Skills: Only include explicit skills/technologies listed (usually in a "Skills", "Technologies", or "Tools" section). Make a flat array of unique strings. Do not extract from bullets unless in a clearly labeled skills list.

Output ONLY valid JSON matching this exact structure:

{
  "name": "",
  "email": "",
  "phone": "",
  "linkedin": "",
  "location": "",
  "summary": "",
  "experience": [
    {
      "company": "",
      "role": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "bullets": []  // string array, original bullet text only
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",  // can be multi-line bullet or paragraph
      "technologies": [],  // flat array of tech mentioned in this project
      "link": ""  // GitHub or live URL if present
    }
  ],
  "skills": [],  // flat array of strings, e.g. ["React", "TypeScript", "Node.js"]
  "education": [
    {
      "school": "",
      "degree": "",
      "field": "",
      "start_date": "",
      "end_date": "",
      "gpa": ""
    }
  ]
}

Extraction Guidelines:
- Name: Usually the largest text at the top.
- Contact: Look for email, phone, LinkedIn/GitHub URLs in header.
- Summary: Only if there's a clear "Summary", "Profile", or "Objective" section — copy verbatim.
- Experience: Group by company/role blocks. Assign bullets only to the most recent role above them.
- Projects: Only from dedicated "Projects", "Personal Projects", or "Side Projects" section — not from job bullets.
- Education: Include school, degree, field of study, dates, and GPA if listed.

Return ONLY the JSON. No explanations, no markdown, no extra text.
`;

// import { Groq } from 'groq-sdk';

// const groq = new Groq();

// const chatCompletion = await groq.chat.completions.create({
//   "messages": [
//     {
//       "role": "system",
//       "content": "You are a resume parser.\n\nYour task is to extract structured information from a software developer resume.\n\nRules:\n- Do NOT add or invent information\n- Do NOT improve or rewrite content\n- Preserve original wording\n- If a field is missing, use an empty string or empty array\n- Group bullet points under the correct role\n- Skills should be a flat list\n- Projects that are not job experience go under \"projects\"\n\nReturn valid JSON only.\n"
//     },
//     {
//       "role": "user",
//       "content": "Timothy Akanbi knbtimothy@gmail.com | Timothy Akanbi | Timothy Akanbi | Timothy Akanbi SKILLS Languages: JavaScript, TypeScript, HTML, CSS. Frameworks: React.js, Next.js, Tailwind CSS. Tools: Firebase, Git, GitHub, Postman, Figma. PROJECTS Aegis Health Care Link June 2024 Developed the front-end of an health-care software named \\'aegis-health\\' with other developers. Technologies: Next.js, TypeScript, Firebase, Tailwind CSS, Vercel. TextIt Link December 2023 Developed a real-time messaging application with robust user authentication and enhanced security measures. Key functionalities include - secure user login, real-time message delivery, and data protection Technologies: React.js, Firebase, CSS, Vercel Nox (E-commerce App) Link March 2024 Implemented the front-end desktop view of an e-commerce website focusing on designing user-friendly interfaces and ensuring a responsive design for optimal desktop user experience. Technologies: Next.js, TypeScript, Tailwind CSS, Vercel Web3 Frontend Link February 2024 Developed responsive and user-friendly interface of a web3 project to enhance user experience without integrating blockchain Technologies. Technologies: React, Javascript, Vercel Dawn of Sapa Link December 2023 Implemented the frontend of one of the UIs for the \\'urgent tukay\\' trend in Nigeria. Technologies: Javascript, CSS, HTML EDUCATION B. ENG in Agricultural and Bio Resources Engineering Federal University of Technology, Minna, Niger State, NIG. January 2020 - September 2025"
//     },
//     {
//       "role": "assistant",
//       "content": "```json\n{\n  \"name\": \"Timothy Akanbi\",\n  \"email\": \"knbtimothy@gmail.com\",\n  \"phone\": \"\",\n  \"summary\": \"\",\n  \"skills\": [\n    \"JavaScript\",\n    \"TypeScript\",\n    \"HTML\",\n    \"CSS\",\n    \"React.js\",\n    \"Next.js\",\n    \"Tailwind CSS\",\n    \"Firebase\",\n    \"Git\",\n    \"GitHub\",\n    \"Postman\",\n    \"Figma\"\n  ],\n  \"education\": [\n    {\n      \"degree\": \"B. ENG in Agricultural and Bio Resources Engineering\",\n      \"institution\": \"Federal University of Technology, Minna, Niger State, NIG.\",\n      \"startDate\": \"January 2020\",\n      \"endDate\": \"September 2025\"\n    }\n  ],\n  \"experience\": [],\n  \"projects\": [\n    {\n      \"name\": \"Aegis Health Care\",\n      \"date\": \"June 2024\",\n      \"description\": \"Developed the front-end of an health-care software named 'aegis-health' with other developers.\",\n      \"technologies\": [\n        \"Next.js\",\n        \"TypeScript\",\n        \"Firebase\",\n        \"Tailwind CSS\",\n        \"Vercel\"\n      ],\n      \"link\": \"\"\n    },\n    {\n      \"name\": \"TextIt\",\n      \"date\": \"December 2023\",\n      \"description\": \"Developed a real-time messaging application with robust user authentication and enhanced security measures. Key functionalities include - secure user login, real-time message delivery, and data protection.\",\n      \"technologies\": [\n        \"React.js\",\n        \"Firebase\",\n        \"CSS\",\n        \"Vercel\"\n      ],\n      \"link\": \"\"\n    },\n    {\n      \"name\": \"Nox (E-commerce App)\",\n      \"date\": \"March 2024\",\n      \"description\": \"Implemented the front-end desktop view of an e-commerce website focusing on designing user-friendly interfaces and ensuring a responsive design for optimal desktop user experience.\",\n      \"technologies\": [\n        \"Next.js\",\n        \"TypeScript\",\n        \"Tailwind CSS\",\n        \"Vercel\"\n      ],\n      \"link\": \"\"\n    },\n    {\n      \"name\": \"Web3 Frontend\",\n      \"date\": \"February 2024\",\n      \"description\": \"Developed responsive and user-friendly interface of a web3 project to enhance user experience without integrating blockchain Technologies.\",\n      \"technologies\": [\n        \"React\",\n        \"Javascript\",\n        \"Vercel\"\n      ],\n      \"link\": \"\"\n    },\n    {\n      \"name\": \"Dawn of Sapa\",\n      \"date\": \"December 2023\",\n      \"description\": \"Implemented the frontend of one of the UIs for the 'urgent tukay' trend in Nigeria.\",\n      \"technologies\": [\n        \"Javascript\",\n        \"CSS\",\n        \"HTML\"\n      ],\n      \"link\": \"\"\n    }\n  ]\n}\n```"
//     },
//     {
//       "role": "user",
//       "content": ""
//     }
//   ],
//   "model": "openai/gpt-oss-120b",
//   "temperature": 1,
//   "max_completion_tokens": 8192,
//   "top_p": 1,
//   "stream": true,
//   "reasoning_effort": "medium",
//   "stop": null
// });

// for await (const chunk of chatCompletion) {
//   process.stdout.write(chunk.choices[0]?.delta?.content || '');
// }

