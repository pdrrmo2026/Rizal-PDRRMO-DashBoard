import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Image, ExternalLink, Download, Search, MapPin, X, ChevronLeft, ChevronRight, Map as MapIcon } from 'lucide-react';

interface Poster {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
}

const POSTERS: Poster[] = [
  {
    "id": "agricultural-areas",
    "title": "Agricultural Areas",
    "description": "Rizal Map_Agricultural Areas.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Agricultural Areas.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "annual-population-growth-rate",
    "title": "Annual Population Growth Rate",
    "description": "Rizal Map_Annual Population Growth Rate.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Annual Population Growth Rate.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "areas-for-prime-agricultural-land",
    "title": "Areas for Prime Agricultural L...",
    "description": "Rizal Map_Areas for Prime Agricultural Land.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Areas for Prime Agricultural Land.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "built-up-areas",
    "title": "Built-Up Areas",
    "description": "Rizal Map_Built-Up Areas.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Built-Up Areas.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "critical-point-facilities-exposure-to-flood",
    "title": "Critical Point Facilities Expo...",
    "description": "Rizal Map_Critical Point Facilities Exposure to Flood.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Critical Point Facilities Exposure to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "critical-point-facilities-exposure-to-rain-induced-landslide",
    "title": "Critical Point Facilities Expo...",
    "description": "Rizal Map_Critical Point Facilities Exposure to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Critical Point Facilities Exposure to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "critical-point-facilities-risk-to-flood",
    "title": "Critical Point Facilities Risk...",
    "description": "Rizal Map_Critical Point Facilities Risk to Flood.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Critical Point Facilities Risk to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "critical-point-facilities-risk-to-rain-induced-landslide",
    "title": "Critical Point Facilities Risk...",
    "description": "Rizal Map_Critical Point Facilities Risk to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Critical Point Facilities Risk to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "critical-transport-systems-exposed-to-flood",
    "title": "Critical Transport Systems Exp...",
    "description": "Rizal Map_Critical Transport Systems Exposed to Flood.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Critical Transport Systems Exposed to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "critical-transport-systems-exposed-to-rain-induced-landslide",
    "title": "Critical Transport Systems Exp...",
    "description": "Rizal Map_Critical Transport Systems Exposed to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Critical Transport Systems Exposed to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "eq-induced-landslide-hazard",
    "title": "EQ-Induced Landslide Hazard",
    "description": "Rizal Map_EQ-Induced Landslide Hazard.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_EQ-Induced Landslide Hazard.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "erosion-areas",
    "title": "Erosion Areas",
    "description": "Rizal Map_Erosion Areas.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Erosion Areas.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "existing-land-use-and-areas-exposed-at-high-risk-level-hazard",
    "title": "Existing Land Use and Areas Ex...",
    "description": "Rizal Map_Existing Land Use and Areas Exposed at High Risk Level Hazard.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Existing Land Use and Areas Exposed at High Risk Level Hazard.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "existing-land-use",
    "title": "Existing Land Use",
    "description": "Rizal Map_Existing Land Use.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Existing Land Use.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "external-linkages-and-internal-circulation-routes-proposed-",
    "title": "External Linkages and Internal...",
    "description": "Rizal Map_External Linkages and Internal Circulation Routes (Proposed).jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_External Linkages and Internal Circulation Routes (Proposed).jpg"
    ],
    "category": "Map"
  },
  {
    "id": "faults",
    "title": "Faults",
    "description": "Rizal Map_Faults.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Faults.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "flood-hazard",
    "title": "Flood Hazard",
    "description": "Rizal Map_Flood Hazard.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Flood Hazard.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "geologic-classification",
    "title": "Geologic Classification",
    "description": "Rizal Map_Geologic Classification.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Geologic Classification.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "ground-shaking-hazard",
    "title": "Ground Shaking Hazard",
    "description": "Rizal Map_Ground Shaking Hazard.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Ground Shaking Hazard.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "initial-settlements-growth-and-protection-land",
    "title": "Initial Settlements Growth and...",
    "description": "Rizal Map_Initial Settlements Growth and Protection Land.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Initial Settlements Growth and Protection Land.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "initial-settlements-growth",
    "title": "Initial Settlements Growth",
    "description": "Rizal Map_Initial Settlements Growth.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Initial Settlements Growth.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "landslide-hazard",
    "title": "Landslide Hazard",
    "description": "Rizal Map_Landslide Hazard.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Landslide Hazard.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "level-network-of-settlements-2020",
    "title": "Level Network of Settlements 2...",
    "description": "Rizal Map_Level Network of Settlements 2020.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Level Network of Settlements 2020.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "lifeline-utilities-exposure-to-flood",
    "title": "Lifeline Utilities Exposure to...",
    "description": "Rizal Map_Lifeline Utilities Exposure to Flood.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Lifeline Utilities Exposure to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "lifeline-utilities-exposure-to-rain-induced-landslide",
    "title": "Lifeline Utilities Exposure to...",
    "description": "Rizal Map_Lifeline Utilities Exposure to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Lifeline Utilities Exposure to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "liquefaction-hazard",
    "title": "Liquefaction Hazard",
    "description": "Rizal Map_Liquefaction Hazard.jpg",
    "images": [
      "/public_maps1/maps/Rizal Map_Liquefaction Hazard.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "loc-of-agricultural-fishery-industries-and-key-support-infra",
    "title": "Loc of Agricultural, Fishery I...",
    "description": "Rizal Map_Loc of Agricultural, Fishery Industries and Key Support Infra.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Loc of Agricultural, Fishery Industries and Key Support Infra.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-drainage-facilities-priority-areas-and-proposed-drainage-related-ppas-exposed-to-flood",
    "title": "Location of Drainage Facilitie...",
    "description": "Rizal Map_Location of Drainage Facilities, Priority Areas and Proposed Drainage Related PPAs Exposed to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Drainage Facilities, Priority Areas and Proposed Drainage Related PPAs Exposed to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-drainage-facilities-priority-areas-and-proposed-drainage-related-ppas",
    "title": "Location of Drainage Facilitie...",
    "description": "Rizal Map_Location of Drainage Facilities, Priority Areas and Proposed Drainage Related PPAs.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Drainage Facilities, Priority Areas and Proposed Drainage Related PPAs.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-education-facilities-exposed-to-flood",
    "title": "Location of Education Faciliti...",
    "description": "Rizal Map_Location of Education Facilities Exposed to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Education Facilities Exposed to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-education-facilities-exposed-to-rain-induced-landslide",
    "title": "Location of Education Faciliti...",
    "description": "Rizal Map_Location of Education Facilities Exposed to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Education Facilities Exposed to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-education-facilities",
    "title": "Location of Education Faciliti...",
    "description": "Rizal Map_Location of Education Facilities.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Education Facilities.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-government-hospitals",
    "title": "Location of Government Hospita...",
    "description": "Rizal Map_Location of Government Hospitals.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Government Hospitals.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-housing-facilities-priority-areas-and-proposed-housing-related-ppas-exposed-to-flood",
    "title": "Location of Housing Facilities...",
    "description": "Rizal Map_Location of Housing Facilities Priority Areas and Proposed Housing-related PPAs Exposed to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Housing Facilities Priority Areas and Proposed Housing-related PPAs Exposed to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-housing-facilities-priority-areas-and-proposed-housing-related-ppas",
    "title": "Location of Housing Facilities...",
    "description": "Rizal Map_Location of Housing Facilities Priority Areas and Proposed Housing-related PPAs.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Housing Facilities Priority Areas and Proposed Housing-related PPAs.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-security-facilities-priority-areas-and-proposed-security-related-ppas-exposed-to-flood",
    "title": "Location of Security Facilitie...",
    "description": "Rizal Map_Location of Security Facilities, Priority Areas and Proposed Security Related PPAs Exposed to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Security Facilities, Priority Areas and Proposed Security Related PPAs Exposed to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-security-facilities-priority-areas-and-proposed-security-related-ppas-exposed-to-rain-induced-landslide",
    "title": "Location of Security Facilitie...",
    "description": "Rizal Map_Location of Security Facilities, Priority Areas and Proposed Security Related PPAs Exposed to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Security Facilities, Priority Areas and Proposed Security Related PPAs Exposed to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-security-facilities-priority-areas-and-proposed-security-related-ppas",
    "title": "Location of Security Facilitie...",
    "description": "Rizal Map_Location of Security Facilities, Priority Areas and Proposed Security Related PPAs.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Security Facilities, Priority Areas and Proposed Security Related PPAs.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-solid-waste-facilities-priority-areas-and-proposed-solid-waste-related-ppas-exposed-to-flood",
    "title": "Location of Solid Waste Facili...",
    "description": "Rizal Map_Location of Solid Waste Facilities, Priority Areas and Proposed Solid Waste Related PPAS Exposed to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Solid Waste Facilities, Priority Areas and Proposed Solid Waste Related PPAS Exposed to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-solid-waste-facilities-priority-areas-and-proposed-solid-waste-related-ppas-exposed-to-rain-induced-landslide",
    "title": "Location of Solid Waste Facili...",
    "description": "Rizal Map_Location of Solid Waste Facilities, Priority Areas and Proposed Solid Waste Related PPAS Exposed to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Solid Waste Facilities, Priority Areas and Proposed Solid Waste Related PPAS Exposed to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-solid-waste-facilities",
    "title": "Location of Solid Waste Facili...",
    "description": "Rizal Map_Location of Solid Waste Facilities.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Solid Waste Facilities.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-tourism-and-key-support-infrastructure",
    "title": "Location of Tourism and Key Su...",
    "description": "Rizal Map_Location of Tourism and Key Support Infrastructure.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Tourism and Key Support Infrastructure.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-transport-systems",
    "title": "Location of Transport Systems",
    "description": "Rizal Map_Location of Transport Systems.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Location of Transport Systems.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "mineral-resources",
    "title": "Mineral Resources",
    "description": "Rizal Map_Mineral Resources.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Mineral Resources.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "natural-resource-based-production-area-risk-to-flood",
    "title": "Natural Resource Based Product...",
    "description": "Rizal Map_Natural Resource Based Production Area Risk to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Natural Resource Based Production Area Risk to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "natural-resource-based-production-area-risk-to-rain-induced-landslide",
    "title": "Natural Resource Based Product...",
    "description": "Rizal Map_Natural Resource Based Production Area Risk to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Natural Resource Based Production Area Risk to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "natural-resource-based-production-exposure-to-flood",
    "title": "Natural Resource Based Product...",
    "description": "Rizal Map_Natural Resource Based Production Exposure to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Natural Resource Based Production Exposure to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "natural-resource-based-production-exposure-to-rain-induced-landslide",
    "title": "Natural Resource Based Product...",
    "description": "Rizal Map_Natural Resource Based Production Exposure to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Natural Resource Based Production Exposure to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "overall-physical-framework-and-areas-exposed-at-high-risk-level-hazard-map",
    "title": "Overall Physical Framework and...",
    "description": "Rizal Map_Overall Physical Framework and Areas Exposed at High Risk Level Hazard Map.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Overall Physical Framework and Areas Exposed at High Risk Level Hazard Map.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "overall-physical-framework",
    "title": "Overall Physical Framework",
    "description": "Rizal Map_Overall Physical Framework.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Overall Physical Framework.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "population-2020",
    "title": "Population 2020",
    "description": "Rizal Map_Population 2020.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Population 2020.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "population-density-2015",
    "title": "Population Density 2015",
    "description": "Rizal Map_Population Density 2015.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Population Density 2015.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "population-density-2020",
    "title": "Population Density 2020",
    "description": "Rizal Map_Population Density 2020.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Population Density 2020.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "population-exposure-to-flood",
    "title": "Population Exposure to Flood",
    "description": "Rizal Map_Population Exposure to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Population Exposure to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "population-exposure-to-rain-induced-landslide",
    "title": "Population Exposure to Rain In...",
    "description": "Rizal Map_Population Exposure to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Population Exposure to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "population-risk-to-flood",
    "title": "Population Risk to Flood",
    "description": "Rizal Map_Population Risk to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Population Risk to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "production-framework",
    "title": "Production Framework",
    "description": "Rizal Map_Production Framework.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Production Framework.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "protection-framework",
    "title": "Protection Framework",
    "description": "Rizal Map_Protection Framework.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Protection Framework.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "settlements-framework",
    "title": "Settlements Framework",
    "description": "Rizal Map_Settlements Framework.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Settlements Framework.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "slope",
    "title": "Slope",
    "description": "Rizal Map_Slope.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Slope.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "transport-infrastructure-framework",
    "title": "Transport Infrastructure Frame...",
    "description": "Rizal Map_Transport Infrastructure Framework.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Transport Infrastructure Framework.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "urban-use-exposure-to-flood",
    "title": "Urban Use Exposure to Flood",
    "description": "Rizal Map_Urban Use Exposure to Flood.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Urban Use Exposure to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "urban-use-exposure-to-rain-induced-landslide",
    "title": "Urban Use Exposure to Rain Ind...",
    "description": "Rizal Map_Urban Use Exposure to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Urban Use Exposure to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "watershed",
    "title": "Watershed",
    "description": "Rizal Map_Watershed.jpg",
    "images": [
      "/public_maps2/maps_2/Rizal Map_Watershed.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-housing-facilities-priority-areas-and-proposed-housing-related-ppas-exposed-to-rain-induced-landslide",
    "title": "Location of Housing Facilities...",
    "description": "Rizal Map_Location of Housing Facilities, Priority Areas and Proposed Housing-related PPAs Exposed to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps3/maps_3/Rizal Map_Location of Housing Facilities, Priority Areas and Proposed Housing-related PPAs Exposed to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-industries-and-key-support-infrastructures",
    "title": "Location of Industries and Key...",
    "description": "Rizal Map_Location of Industries and Key Support Infrastructures.jpg",
    "images": [
      "/public_maps3/maps_3/Rizal Map_Location of Industries and Key Support Infrastructures.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-mining-and-key-support-infrastructure",
    "title": "Location of Mining and Key Sup...",
    "description": "Rizal Map_Location of Mining and Key Support Infrastructure.jpg",
    "images": [
      "/public_maps3/maps_3/Rizal Map_Location of Mining and Key Support Infrastructure.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-power-facilities-exposed-to-flood",
    "title": "Location of Power Facilities E...",
    "description": "Rizal Map_Location of Power Facilities Exposed to Flood.jpg",
    "images": [
      "/public_maps3/maps_3/Rizal Map_Location of Power Facilities Exposed to Flood.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-power-facilities-exposed-to-rain-induced-landslide",
    "title": "Location of Power Facilities E...",
    "description": "Rizal Map_Location of Power Facilities Exposed to Rain Induced Landslide.jpg",
    "images": [
      "/public_maps3/maps_3/Rizal Map_Location of Power Facilities Exposed to Rain Induced Landslide.jpg"
    ],
    "category": "Map"
  },
  {
    "id": "location-of-power-facilities",
    "title": "Location of Power Facilities",
    "description": "Rizal Map_Location of Power Facilities.jpg",
    "images": [
      "/public_maps3/maps_3/Rizal Map_Location of Power Facilities.jpg"
    ],
    "category": "Map"
  }
];

export default function HazardMaps({ renderTabs }: { renderTabs?: React.ReactNode }) {
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (selectedPoster) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedPoster.images.length);
    }
  }, [selectedPoster]);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (selectedPoster) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedPoster.images.length) % selectedPoster.images.length);
    }
  }, [selectedPoster]);

  // Handle body scroll lock
  useEffect(() => {
    if (selectedPoster) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPoster]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPoster) return;
      if (e.key === 'Escape') setSelectedPoster(null);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPoster, handleNext, handlePrev]);

  const openModal = (poster: Poster) => {
    setSelectedPoster(poster);
    setCurrentImageIndex(0);
  };

  return (
    <section className="bg-gradient-to-br from-indigo-950/40 via-gray-900 to-slate-900 border border-indigo-700/40 rounded-xl p-3 sm:p-4 md:p-5 shadow-xl">
      {renderTabs && <div className="mb-4">{renderTabs}</div>}

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
        <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-800 flex items-center justify-center text-white shadow-lg shrink-0">
            <MapIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
              Maps
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
              Comprehensive maps for public awareness.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1 hover:bg-indigo-500/25 transition-colors">
            <Search className="w-2.5 h-2.5" /> View All
          </button>
        </div>
      </div>

      {/* Posters grid - 5+ per row on large screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {POSTERS.map((poster) => (
          <article
            key={poster.id}
            onClick={() => openModal(poster)}
            className="bg-gray-950/60 border border-slate-700/50 rounded-lg overflow-hidden flex flex-col group hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
          >
            {/* Image container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
              <img
                src={poster.images[0]}
                alt={poster.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-60" />

              <div className="absolute top-1.5 left-1.5">
                <span className="px-1.5 py-0.5 rounded bg-indigo-600/80 backdrop-blur-sm text-[8px] font-bold text-white uppercase tracking-wider">
                  {poster.category}
                </span>
              </div>

              <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-1.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors shadow-lg">
                  <Download className="w-3 h-3" />
                </button>
                <button className="p-1.5 rounded-full bg-indigo-600/80 backdrop-blur-md text-white hover:bg-indigo-700 transition-colors shadow-lg">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-2 sm:p-2.5 flex-1 flex flex-col">
              <h3 className="font-bold text-white text-[11px] sm:text-xs mb-0.5 group-hover:text-indigo-300 transition-colors line-clamp-1" title={poster.title}>
                {poster.title}
              </h3>
              <p className="text-[10px] text-gray-500 leading-tight line-clamp-2 mb-2 flex-1" title={poster.description}>
                {poster.description}
              </p>
              <div className="flex items-center gap-1 text-[9px] text-gray-600">
                <MapPin className="w-2.5 h-2.5" /> PDRRMO
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-[9px] text-gray-600 text-center pt-3 mt-4 border-t border-slate-800">
        Rizal PDRRMO Official Maps
      </div>

      {/* Full Resolution Modal Viewer */}
      {selectedPoster && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-gray-950/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedPoster(null)}
        >
          {/* Navigation Arrows */}
          {selectedPoster.images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-[10000] border border-white/10 hidden sm:flex"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-[10000] border border-white/10 hidden sm:flex"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Modal Content */}
          <div
            className="relative max-w-full max-h-full flex flex-col items-center animate-in zoom-in-95 duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-white/10">
              {/* Close Button on Image */}
              <button
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors z-[10010] border border-white/20 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPoster(null);
                }}
                title="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <img
                key={selectedPoster.images[currentImageIndex]}
                src={selectedPoster.images[currentImageIndex]}
                alt={`${selectedPoster.title} - Page ${currentImageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-500"
              />

              {/* Bottom bar in modal */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm sm:text-lg truncate">{selectedPoster.title}</h3>
                    <p className="text-gray-300 text-[10px] sm:text-xs">
                      Page {currentImageIndex + 1} of {selectedPoster.images.length} · {selectedPoster.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Mobile Navigation */}
                    <div className="flex sm:hidden items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10 mr-2">
                      <button onClick={handlePrev} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-4 h-4" /></button>
                      <button onClick={handleNext} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <a
                      href={selectedPoster.images[currentImageIndex]}
                      download
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] sm:text-xs font-semibold transition-colors shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">Download</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
