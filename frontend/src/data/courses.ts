import { Course } from '../types/course';

export const coursesData: Course[] = [
  {
    id: 'pilot-certification',
    title: 'Certified Commercial Drone Pilot Program',
    level: 'Beginner',
    duration: '5 Days (Full-Time)',
    format: 'Classroom Theory + Flight Simulator + On-Field Flight Practice',
    description:
      'A structured foundational certification program covering aerodynamics, airspace regulations, weather analysis, pre-flight safety protocols, and dual-control hands-on flying practice.',
    modules: [
      'Basic Aerodynamics & Multirotor Principles',
      'Civil Aviation Regulations & Airspace Classes',
      'Flight Simulator Practice & Emergency Procedures',
      'Live Field Flight Operations & Logbook Maintenance',
    ],
    prerequisites: 'Minimum 18 years of age and 10th standard completion.',
  },
  {
    id: 'gis-photogrammetry',
    title: 'GIS & Aerial Photogrammetry Masterclass',
    level: 'Intermediate',
    duration: '4 Weeks (Weekend Format)',
    format: 'Lab Sessions + Field Surveys + CAD/GIS Processing',
    description:
      'Learn end-to-end aerial survey workflows: autonomous mission planning with GCPs (Ground Control Points), RTK/PPK workflows, and 3D terrain modeling in industry GIS software.',
    modules: [
      'Mission Flight Planning & Overlap Calculation',
      'Setting Ground Control Points (GCPs) & RTK/PPK GNSS',
      'Orthomosaic Stitching & Point Cloud Generation',
      'Volumetric Analysis & Contour Generation in QGIS',
    ],
    prerequisites: 'Basic computer literacy; prior drone flying exposure recommended.',
  },
  {
    id: 'fpv-cinematography',
    title: 'FPV Flying & Dynamic Cinematography',
    level: 'Intermediate',
    duration: '2 Weeks (Part-Time)',
    format: 'Acro Mode Simulator + Line-of-Sight & FPV Goggles Field Flight',
    description:
      'Master high-speed agile FPV (First Person View) flight in full manual/acro mode, tight proximity flying, cinematic camera framing, and video editing workflows.',
    modules: [
      'FPV Hardware Architecture & Radio Protocols',
      'Acro Mode Muscle Memory & Simulator Drills',
      'Proximity Flying & Smooth Cinematographic Lines',
      'Video Transmission, Goggle Setup & Post-Grading',
    ],
    prerequisites: 'Comfortable with basic line-of-sight drone navigation.',
  },
  {
    id: 'assembly-avionics',
    title: 'Drone Assembly, Avionics & Maintenance',
    level: 'Advanced',
    duration: '3 Weeks (Weekend Format)',
    format: 'Hands-on Hardware Lab + Bench Testing',
    description:
      'Practical engineering workshop on assembling custom multirotors from scratch, wiring flight controllers, configuring ESCs, tuning PID parameters, and hardware troubleshooting.',
    modules: [
      'Frame Assembly, Brushless Motors & ESC Solder Work',
      'Flight Controller Wiring (Betaflight / ArduPilot / PX4)',
      'Telemetry, GPS, Power Distribution & Fail-safe Tuning',
      'Bench Testing, PID Tuning & Diagnostics',
    ],
    prerequisites: 'Basic electronics understanding and soldering familiarity.',
  },
];
