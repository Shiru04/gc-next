export type Review = {
  name: string;
  source: "Yelp" | "Google" | "Angi" | "Porch" | "HomeAdvisor";
  rating: number; // 1..5
  date: string; // keep as display text
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Bryant Pham",
    source: "Yelp",
    rating: 5,
    date: "7/26/23",
    text: "We chose GC Heating & Cooling to install a new heat pump system. The technician was knowledgeable, courteous, and took time to answer our questions. The crew was on time and the job went smoothly.",
  },
  {
    name: "Verified Customer",
    source: "Google",
    rating: 5,
    date: "8/20/22",
    text: "Truly appreciate the friendliness, professionalism, kindness, and honesty throughout the entire process. Great communication each step of the way.",
  },
];

export const REVIEW_BADGES = [
  { label: "Angi", rating: 4.8, count: 566 },
  { label: "Yelp", rating: 4.6, count: 71 },
  { label: "Google", rating: 4.8, count: 52 },
  { label: "Chamber of Commerce", rating: 4.9, count: 48 },
  { label: "Porch", rating: 4.7, count: 703 },
];
