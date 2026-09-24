import { Service } from '../types/service';

export const servicesData: Service[] = [
  {
    id: 'aerial-survey-mapping',
    title: 'Aerial Surveying & GIS 3D Mapping',
    category: 'Surveying',
    description:
      'High-precision aerial photogrammetry and topographical data capture for urban planning, mining, construction sites, and infrastructure development.',
    iconName: 'MapPin',
    features: [
      'High-resolution 2D orthomosaic maps',
      'Digital Surface & Elevation Models (DSM/DEM)',
      '3D point clouds and volumetric calculations',
      'GIS-ready georeferenced survey outputs',
    ],
    deliverables: ['TIFF / GeoTIFF', 'DXF / DWG CAD overlays', 'LAS Point Clouds', 'PDF Survey Reports'],
  },
  {
    id: 'infrastructure-inspection',
    title: 'Infrastructure & Solar Thermal Inspection',
    category: 'Inspection',
    description:
      'Thermal radiometric and visual inspection of solar PV panels, wind turbine blades, bridges, telecom towers, and high-voltage transmission lines.',
    iconName: 'Activity',
    features: [
      'Radiometric thermal sensor scanning',
      'Defect and hotspot identification',
      'Safe non-destructive aerial monitoring',
      'Asset condition health indexing',
    ],
    deliverables: ['Thermal Anomaly Maps', 'Defect Inspection Logs', 'High-Res RGB Imagery', 'Summary Audit Reports'],
  },
  {
    id: 'precision-agriculture',
    title: 'Precision Agriculture Drone Solutions',
    category: 'Agriculture',
    description:
      'Targeted multispectral crop health indexing, soil analysis, and automated precision liquid spraying to optimize agricultural yields and resource utilization.',
    iconName: 'Sprout',
    features: [
      'NDVI & NDRE vegetation index analytics',
      'Accurate variable-rate micro spraying',
      'Irrigation deficiency and pest hotspot detection',
      'Yield forecasting and canopy coverage analysis',
    ],
    deliverables: ['Multispectral Maps', 'Prescription Spray Maps', 'Canopy Health Reports', 'Raw Geo-Data'],
  },
  {
    id: 'cinematography-events',
    title: 'Commercial Cinematography & FPV Media',
    category: 'Media',
    description:
      'Cinematic 4K/8K aerial cinematography and dynamic FPV drone filming for industrial showcases, commercial events, documentary filmmaking, and media productions.',
    iconName: 'Video',
    features: [
      'Dual-operator gimbal stabilization systems',
      'High-speed indoor and outdoor FPV filming',
      'Live HD/4K low-latency video transmission',
      'Professional color-graded aerial footage',
    ],
    deliverables: ['ProRes / RAW Video Files', 'Edited Master Cuts', 'High-Resolution Aerial Stills'],
  },
  {
    id: 'drone-maintenance-repair',
    title: 'Drone Fleet Maintenance & Avionics Diagnostics',
    category: 'Technical Support',
    description:
      'Comprehensive hardware diagnostics, flight controller tuning, motor overhaul, firmware updates, and scheduled maintenance for commercial drone fleets.',
    iconName: 'Wrench',
    features: [
      'Sensor and IMU calibration',
      'Propulsion system and ESC testing',
      'Avionics and telemetry diagnostics',
      'Preventative maintenance and service logging',
    ],
    deliverables: ['Diagnostic Health Checklist', 'Tuning & Calibration Log', 'Certified Service Report'],
  },
];
