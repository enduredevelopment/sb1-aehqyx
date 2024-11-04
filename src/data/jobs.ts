import { Job } from '@/types/job';

export const jobList: Job[] = [
  {
    id: 1,
    title: "Corporate Member",
    company: "amplify",
    location: "Remote (Worldwide)",
    salary: "0 - 10k ROBUX",
    department: "Executive",
    isNew: true,
    type: "Full-time",
    description: "We are looking for a new Corporate Body to join our team and help build the future of amplify. You will be working on our core areas, helping out in various events to build better entertainment.",
    requirements: [
      "Previous experience in the creative arts and entertainment industry, whether that be in real life or ROBLOX",
      "Works at amplify already (ideal)",
      "Has a passion for events",
      "Familiar with our venues",
      "Able to work in a team collaboratively"
    ],
    responsibilities: [
      "Ensure smooth functioning and coordination within the team",
      "Lead projects that align with amplify's goals in the creative arts",
      "Uphold company policies and industry standard",
      "Provide guidance and support to foster team growth",
      "Handle sensitive data responsibly and maintain confidentiality"
    ],
    applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfUDvFJANy8mzbWvX_WXGwbN7k7A9GCaw1akpKct7HG-Vutgg/viewform?usp=sf_link"
  },
  {
    id: 2,
    title: "amplifyAquatic",
    company: "amplify",
    location: "Remote (Worldwide)",
    salary: "0 - 250 ROBUX",
    department: "Venue Staff",
    isNew: false,
    type: "Full-time",
    description: "Join amplify's brand-new venue team! We're hiring aquatic and technical staff for our unique water-themed space, featuring a pool, water jets, tightropes, and more. Apply now to be part of this one-of-a-kind experience!",
    requirements: [
      "Strong swimming skills and water safety awareness",
      "Basic technical knowledge for handling aquatic equipment",
      "Ability to work flexible hours, including evenings and weekends",
      "Team-oriented with excellent communication skills",
      "Comfortable working in a dynamic, fast-paced environment"
    ],
    responsibilities: [
      "Assist with setup and maintenance of aquatic equipment, including water jets and tightropes",
      "Ensure the safety and security of all guests during water shows and activities",
      "Operate and monitor technical equipment for water-themed performances",
      "Coordinate with the team to manage event schedules and setup",
      "Provide exceptional support to performers and guests in the aquatic venue"
    ],
    applyUrl: "https://forms.gle/Yy2QB9Q5yywEgVdE9"
  },
  {
    id: 3,
    title: "amplify Staff",
    company: "amplify",
    location: "Remote (Worldwide)",
    salary: "0 - 100 ROBUX",
    department: "Staff",
    isNew: true,
    type: "Full-time",
    description: "amplify is hiring across multiple teams, offering exciting roles for passionate individuals looking to make an impact. Whether you're interested in hospitality, event management, security, streaming, media, or creative design, there's a place for you here.",
    requirements: [
      "Relevant experience or strong interest in the desired field (hospitality, event management, security, etc.)",
      "Excellent communication and teamwork skills",
      "Ability to work flexible hours, including weekends and evenings",
      "Strong problem-solving abilities and a proactive approach",
      "Attention to detail and commitment to high-quality service"
    ],
    responsibilities: [
      "Collaborate with team members to execute events, services, or projects smoothly",
      "Provide excellent customer service to enhance guest experiences",
      "Maintain a safe, organized, and professional environment",
      "Assist in preparing and setting up materials or equipment as needed",
      "Communicate effectively with supervisors and follow company protocols"
    ],
    applyUrl: "https://apply.amplifyrblx.uk/"
  }
];
export { jobList as jobs };
