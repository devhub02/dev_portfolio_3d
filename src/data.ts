export const profile = {
  firstName: 'Devendra',
  fullName: 'Devendra Kumar',
  email: 'devhub9084@gmail.com',
  location: 'Gaya, India',
};

export const heroTagline =
  'a 3d creator & mechanical engineer driven by crafting striking and unforgettable products';

export const aboutText =
  "Mechanical engineer from Gaya, India, combining CAD and SolidWorks 3D modeling with UI/UX, React and app development. I'm currently building TripG, a technology-driven travel product, and i love turning bold ideas into real products. Let's build something incredible together!";

export const services = [
  {
    name: '3D Modeling',
    description:
      'Detailed SolidWorks and CAD models of parts, products, and assemblies, tailored to your needs, ideal for prototyping, visualization, and manufacturing.',
  },
  {
    name: 'Mechanical Design',
    description:
      'Mechanical design, CAD drafting, and engineering analysis that take a concept through product development with sound technical reasoning.',
  },
  {
    name: 'Web & App Development',
    description:
      'Modern websites and mobile apps built with React, React Native, JavaScript, and Python, from system design through to delivery.',
  },
  {
    name: 'UI/UX Design',
    description:
      'Clean, modern, user-focused interfaces with attention to layout, typography, and the full experience of a digital product.',
  },
  {
    name: 'Video & Content',
    description:
      'Content development, video production, and editing with Adobe software to tell your story and present your brand at its best.',
  },
];

export const skillGroups = [
  {
    title: 'Mechanical Engineering',
    skills: ['Mechanical Design', 'CAD Drafting', 'SolidWorks 3D Modeling', 'Computer-Aided Design (CAD)', 'Engineering Analysis', 'Product Development'],
  },
  {
    title: 'Programming & Development',
    skills: ['Python', 'JavaScript', 'React', 'React Native', 'HTML & CSS', 'MATLAB'],
  },
  {
    title: 'Software & Product Design',
    skills: ['UI/UX Design', 'System Design', 'Mobile Application Development', 'Microsoft Excel', 'Software Applications'],
  },
  {
    title: 'Project & Business',
    skills: ['Project Management', 'Technical Analysis', 'Startup & Business Model Development'],
  },
  {
    title: 'Creative & Digital',
    skills: ['Adobe Software', 'Content Development', 'Video Production & Editing'],
  },
];

export const marqueeSkills = skillGroups.flatMap((g) => g.skills);

export interface Project {
  category: string;
  name: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
}

export const projects: Project[] = [
  {
    category: 'Startup / Product',
    name: 'TripG',
    period: '09/2026 – Present',
    role: 'Mechanical Engineer & Product Development',
    summary:
      'A technology-driven travel product based in Gaya, built from product vision through to development.',
    highlights: [
      'Product vision and development',
      'Startup vision and business model',
      'Product planning, UI/UX and technical analysis',
      'Software development',
    ],
  },
];
