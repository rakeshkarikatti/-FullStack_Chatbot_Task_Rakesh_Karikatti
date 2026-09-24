export interface ChatbotIntent {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  response: string;
  action?: {
    label: string;
    target: string;
    prefill?: {
      userType?: 'Student' | 'Customer' | 'Other';
      interest?: string;
    };
  };
}

export const CHATBOT_INTENTS: ChatbotIntent[] = [
  {
    id: 'services',
    category: 'Services',
    keywords: [
      'service',
      'services',
      'what services',
      'what do you offer',
      'what do you provide',
      'drone services',
      'drone solutions',
      'aerial survey',
      'inspection',
      'mapping',
      'photography',
      'videography',
      'surveillance',
      'agriculture drone',
    ],
    question: 'What services does DroneTV provide?',
    response:
      'DroneTV provides specialized end-to-end commercial drone solutions, including:\n\n' +
      '• **Aerial Surveying & GIS 3D Mapping** — High-precision topographic surveys & point clouds\n' +
      '• **Infrastructure & Solar Thermal Inspection** — Thermal anomaly & defect detection\n' +
      '• **Precision Agriculture Drone Spraying** — Crop health monitoring & multispectral analysis\n' +
      '• **Cinematography & Live FPV Broadcasting** — 4K/8K aerial visuals for media & events\n' +
      '• **Drone Repair, Calibration & Maintenance** — Fleet diagnostics & hardware tuning\n\n' +
      'Would you like to explore a specific service or request a custom quotation?',
    action: {
      label: 'Explore Services',
      target: '/services',
      prefill: {
        userType: 'Customer',
        interest: 'Commercial Drone Services',
      },
    },
  },
  {
    id: 'courses',
    category: 'Courses & Training',
    keywords: [
      'course',
      'courses',
      'training',
      'what courses',
      'what training',
      'pilot training',
      'learn drone',
      'curriculum',
      'classes',
      'certification',
      'dgca',
      'drone academy',
      'workshop',
    ],
    question: 'What courses / training are available?',
    response:
      'DroneTV offers comprehensive professional training programs for aspiring pilots and industry specialists:\n\n' +
      '• **Certified Commercial Drone Pilot Program** — Flight fundamentals, regulations & live flight training\n' +
      '• **GIS & Aerial Photogrammetry Masterclass** — 2D Orthomosaics, 3D mesh modeling & LiDAR processing\n' +
      '• **FPV Racing & Aerial Cinematography** — Acro mode maneuvers, gimbal control & dynamic filming\n' +
      '• **Drone Assembly, Maintenance & Avionics** — Hardware building, ESC/FC calibration & troubleshooting\n\n' +
      'All courses include structured hands-on simulator sessions and live field practice.',
    action: {
      label: 'View All Courses',
      target: '/courses',
      prefill: {
        userType: 'Student',
        interest: 'Drone Pilot Certification Program',
      },
    },
  },
  {
    id: 'contact',
    category: 'Contact',
    keywords: [
      'contact',
      'how to contact',
      'phone',
      'email',
      'reach',
      'location',
      'address',
      'call',
      'office',
      'get in touch',
      'support email',
    ],
    question: 'How can I contact DroneTV?',
    response:
      'You can reach the DroneTV support team through the following channels:\n\n' +
      '• **Email:** support@dronetv.in\n' +
      '• **Phone:** +91 98765 43210 (Mon–Sat, 9:00 AM – 6:00 PM IST)\n' +
      '• **Online Form:** Submit an enquiry via our Contact page for priority responses within 24 hours.\n\n' +
      'Our team is happy to assist with service consultations, course admissions, and technical queries.',
    action: {
      label: 'Open Contact Form',
      target: '/contact',
    },
  },
  {
    id: 'registration',
    category: 'Registration',
    keywords: [
      'register',
      'registration',
      'how to register',
      'how can i register',
      'enroll',
      'enrollment',
      'sign up',
      'join course',
      'apply',
      'admission',
    ],
    question: 'How can I register?',
    response:
      'Registering for DroneTV courses or booking a service is simple and quick:\n\n' +
      '1. Navigate to the **Contact / Enquiry** page or click the button below.\n' +
      '2. Select your user type (**Student** or **Customer**).\n' +
      '3. Choose your desired course or service of interest.\n' +
      '4. Enter your contact details and submit the form.\n\n' +
      'Our admissions coordinator will contact you with batch schedules, syllabus details, and payment instructions.',
    action: {
      label: 'Register Now',
      target: '/contact',
      prefill: {
        userType: 'Student',
        interest: 'Course Registration',
      },
    },
  },
  {
    id: 'service-interest',
    category: 'Service Interest',
    keywords: [
      'interested in a service',
      'interested in service',
      'i want a service',
      'hire drone',
      'book service',
      'quotation',
      'price quote',
      'commercial pilot hire',
      'drone inspection quote',
    ],
    question: 'I am interested in a service.',
    response:
      "I'd be happy to help you with our drone services!\n\n" +
      'Whether you need infrastructure inspection, precision agricultural spraying, or 3D GIS mapping, our technical team will tailor a solution to your requirements.\n\n' +
      'Please submit your details through our enquiry form, and our engineering team will get back to you with a comprehensive scope and quote.',
    action: {
      label: 'Send Service Enquiry',
      target: '/contact',
      prefill: {
        userType: 'Customer',
        interest: 'Commercial Drone Services',
      },
    },
  },
  {
    id: 'student',
    category: 'Student Support',
    keywords: [
      'student',
      'i am a student',
      'i am student',
      'college student',
      'fresh graduate',
      'beginner',
      'career in drones',
      'student discount',
      'internship',
      'start learning',
    ],
    question: 'I am a student.',
    response:
      'Welcome! We offer specialized guidance and structured training pathways for students:\n\n' +
      '• Hands-on flight simulator sessions and flight field labs\n' +
      '• Guidance on DGCA pilot certification pathways\n' +
      '• Technical workshops on drone assembly and autonomous flight programming\n' +
      '• Project guidance for engineering and technology students\n\n' +
      'Submit an enquiry to connect with our academic mentors!',
    action: {
      label: 'Submit Student Enquiry',
      target: '/contact',
      prefill: {
        userType: 'Student',
        interest: 'Student Training & Guidance',
      },
    },
  },
  {
    id: 'human-support',
    category: 'Human Assistance',
    keywords: [
      'speak to someone',
      'speak with someone',
      'talk to human',
      'talk to person',
      'human agent',
      'representative',
      'call me',
      'agent',
      'customer care',
      'support agent',
      'real person',
    ],
    question: 'I want to speak with someone.',
    response:
      'Our team is ready to speak with you directly!\n\n' +
      'You can reach us during business hours at **+91 98765 43210** or send an email to **support@dronetv.in**.\n\n' +
      'Alternatively, leave your details in our enquiry form and specify your preferred time, and a team member will call you back.',
    action: {
      label: 'Request a Callback',
      target: '/contact',
      prefill: {
        userType: 'Other',
        interest: 'Callback Request',
      },
    },
  },
];

export const CHATBOT_FALLBACK_RESPONSE =
  "I'm sorry, I don't have information about that yet.\n\n" +
  'I can help you with:\n' +
  '• Services\n' +
  '• Courses / Training\n' +
  '• Registration\n' +
  '• Contact Details\n' +
  '• Enquiries & Quotes\n' +
  '• Speaking with someone\n\n' +
  'You can also send an enquiry directly through our Contact page.';

/**
 * Normalize and clean user input for matching
 */
export function normalizeMessage(msg: string): string {
  return msg
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Match a normalized user message against predefined intents
 */
export function matchPredefinedIntent(rawMessage: string): ChatbotIntent | null {
  const clean = normalizeMessage(rawMessage);
  if (!clean) return null;

  // 1. Check exact question or category matches
  for (const intent of CHATBOT_INTENTS) {
    if (normalizeMessage(intent.question) === clean) {
      return intent;
    }
  }

  // 2. Check keyword phrase containment (sorted by longest keyword first)
  for (const intent of CHATBOT_INTENTS) {
    const sortedKeywords = [...intent.keywords].sort((a, b) => b.length - a.length);
    for (const kw of sortedKeywords) {
      const normalizedKw = normalizeMessage(kw);
      if (normalizedKw && (clean.includes(normalizedKw) || clean === normalizedKw)) {
        return intent;
      }
    }
  }

  // 3. Word-token overlap score
  const inputWords = clean.split(' ').filter((w) => w.length > 2);
  let bestMatch: ChatbotIntent | null = null;
  let highestScore = 0;

  for (const intent of CHATBOT_INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      const kwWords = normalizeMessage(kw).split(' ');
      for (const word of inputWords) {
        if (kwWords.includes(word)) {
          score += 1;
        }
      }
    }

    if (score > highestScore && score >= 2) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  return bestMatch;
}
