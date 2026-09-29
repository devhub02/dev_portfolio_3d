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

export interface Project {
  category: string;
  name: string;
  images: [string, string, string];
}

const img = (id: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F${id}.png&w=1280&q=85`;

export const projects: Project[] = [
  {
    category: 'Product',
    name: 'TripG',
    images: [
      img('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db'),
      img('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8'),
      img('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327'),
    ],
  },
  {
    category: 'Personal',
    name: 'Mechanical Design Studies',
    images: [
      img('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f'),
      img('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1'),
      img('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea'),
    ],
  },
  {
    category: 'Personal',
    name: 'React Native App Concepts',
    images: [
      img('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f'),
      img('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b'),
      img('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee'),
    ],
  },
];

export const marqueeImages = [
  'hero-space-voyage-preview-eECLH3Yc',
  'hero-codenest-preview-Cgppc2qV',
  'hero-vex-ventures-preview-BczMFIiw',
  'hero-stellar-ai-v2-preview-DjvxjG3C',
  'hero-asme-preview-B_nGDnTP',
  'hero-transform-data-preview-Cx5OU29N',
  'hero-vitara-preview-Cjz2QYyU',
  'hero-terra-preview-BFjrCr7T',
  'hero-skyelite-preview-DHaZIgUv',
  'hero-aethera-preview-DknSlcTa',
  'hero-designpro-preview-D8c5_een',
  'hero-stellar-ai-preview-D3HL6bw1',
  'hero-xportfolio-preview-D4A8maiC',
  'hero-orbit-web3-preview-BXt4OttD',
  'hero-nexora-preview-cx5HmUgo',
  'hero-evr-ventures-preview-DZxeVFEX',
  'hero-planet-orbit-preview-DWAP8Z1P',
  'hero-new-era-preview-CocuDUm9',
  'hero-wealth-preview-B70idl_u',
  'hero-luminex-preview-CxOP7ce6',
  'hero-celestia-preview-0yO3jXO8',
].map((n) => `https://motionsites.ai/assets/${n}.gif`);
