export const categories = [

  {
    name: "Supplements",
    icon: "Pill",
    subcategories: [
      {
        name: "Protein",
        types: ["Whey Isolate", "Whey Concentrate", "Casein", "Plant-Based", "Mass Gainers"]
      },
      {
        name: "Pre-workout",
        types: ["Stimulant", "Non-Stimulant", "Energy & Focus", "Pump Formulas"]
      },
      {
        name: "Amino Acids",
        types: ["BCAAs", "EAAs", "L-Citrulline", "Beta-Alanine", "L-Carnitine"]
      },
      {
        name: "Performance",
        types: ["Creatine", "Beta-Alanine", "Caffeine", "Testosterone Support"]
      },
      {
        name: "Health & Wellness",
        types: ["Multivitamins", "Fish Oil", "Joint Support", "Immune Support"]
      }
    ]
  },
  {
    name: "Equipment",
    icon: "Dumbbell",
    subcategories: [
      {
        name: "Free Weights",
        types: ["Dumbbells", "Barbells", "Weight Plates", "Kettlebells", "Specialty Bars"]
      },
      {
        name: "Machines",
        types: ["Power Racks", "Cable Machines", "Smith Machines", "Benches"]
      },
      {
        name: "Accessories",
        types: ["Resistance Bands", "Foam Rollers", "Weight Belts", "Straps & Wraps"]
      },
      {
        name: "Cardio Equipment",
        types: ["Treadmills", "Exercise Bikes", "Rowing Machines", "Ellipticals"]
      },
      {
        name: "Recovery Tools",
        types: ["Massage Guns", "Compression Gear", "Ice/Heat Therapy", "Mobility Tools"]
      }
    ]
  },
  {
    name: "Apparel",
    icon: "Shirt",
    subcategories: [
      {
        name: "Men's Wear",
        types: ["T-Shirts", "Tank Tops", "Shorts", "Hoodies", "Compression Wear"]
      },
      {
        name: "Women's Wear",
        types: ["Sports Bras", "Leggings", "Shorts", "Tank Tops", "Crop Tops"]
      },
      {
        name: "Footwear",
        types: ["Training Shoes", "Lifting Shoes", "Running Shoes", "Slides"]
      },
      {
        name: "Accessories",
        types: ["Gym Bags", "Towels", "Headwear", "Socks", "Gloves"]
      }
    ]
  },
  {
    name: "Nutrition",
    icon: "Apple",
    subcategories: [
      {
        name: "Meal Plans",
        types: ["Bulking", "Cutting", "Maintenance", "Competition Prep"]
      },
      {
        name: "Healthy Snacks",
        types: ["Protein Bars", "Energy Bars", "Protein Cookies", "Trail Mix"]
      },
      {
        name: "Beverages",
        types: ["Energy Drinks", "Protein Shakes", "BCAAs Drinks", "Hydration"]
      },
      {
        name: "Coaching",
        types: ["Nutrition Plans", "Meal Prep Guides", "Supplement Guides"]
      }
    ]
  }
];

export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  seller: {
    name: string;
    rating: number;
    reviews: number;
  };
  variants?: {
    type: string;
    options: string[];
  }[];
};

export const products: Product[] = [
  {
    id: "whey-iso-1",
    name: "Elite Whey Isolate Pro",
    category: "Supplements",
    subcategory: "Protein",
    type: "Whey Isolate",
    price: 59.99,
    rating: 4.8,
    reviews: 1250,
    stock: 50,
    images: ["/products/whey-1.PNG", "/products/whey-2.PNG"],
    description: "Premium whey isolate with 27g protein per serving and zero sugar.",
    features: [
      "27g protein per serving",
      "Zero sugar",
      "Fast-absorbing formula",
      "Enzyme-enhanced for better digestion",
      "30 servings per container"
    ],
    specs: {
      "Serving Size": "30g",
      "Protein per Serving": "27g",
      "Calories": "110",
      "Sugar": "0g",
      "BCAA Content": "5.5g"
    },
    seller: {
      name: "Pro Nutrition",
      rating: 4.9,
      reviews: 15000
    },
    variants: [
      {
        type: "Flavor",
        options: ["Chocolate", "Vanilla", "Strawberry", "Cookie & Cream"]
      },
      {
        type: "Size",
        options: ["2lb", "5lb", "10lb"]
      }
    ]
  },
  {
    id: "belt-pro-1",
    name: "Elite Power Lifting Belt",
    category: "Equipment",
    subcategory: "Accessories",
    type: "Weight Belts",
    price: 89.99,
    rating: 4.9,
    reviews: 850,
    stock: 25,
    images: ["/products/probelt-1.jpg", "/products/probelt-2.jpg"],
    description: "Professional-grade leather belt for maximum support during heavy lifts.",
    features: [
      "Genuine leather construction",
      "Double-prong buckle",
      "10mm thickness",
      "Reinforced stitching",
      "Competition approved"
    ],
    specs: {
      "Material": "Full-grain leather",
      "Width": "4 inches",
      "Thickness": "10mm",
      "Buckle": "Double-prong steel",
      "Certification": "IPF Approved"
    },
    seller: {
      name: "Strength Essentials",
      rating: 4.8,
      reviews: 12000
    },
    variants: [
      {
        type: "Size",
        options: ["S", "M", "L", "XL", "XXL"]
      },
      {
        type: "Color",
        options: ["Black", "Brown", "Natural"]
      }
    ]
  },
  {
    id: "pre-pump-1",
    name: "Ultimate Pre-Workout Plus",
    category: "Supplements",
    subcategory: "Pre-workout",
    type: "Stimulant",
    price: 44.99,
    rating: 4.7,
    reviews: 980,
    stock: 75,
    images: ["/products/pre-work.jpg",],
    description: "High-energy pre-workout formula with advanced pump complex and focus enhancers.",
    features: [
      "300mg caffeine per serving",
      "L-Citrulline for pump",
      "Beta-alanine for endurance",
      "Focus and mood enhancers",
      "40 servings per container"
    ],
    specs: {
      "Serving Size": "12g",
      "Caffeine": "300mg",
      "L-Citrulline": "6g",
      "Beta-Alanine": "3.2g",
      "Taurine": "1g"
    },
    seller: {
      name: "Xtreme Supplements",
      rating: 4.6,
      reviews: 8500
    },
    variants: [
      {
        type: "Flavor",
        options: ["Blue Raspberry", "Fruit Punch", "Watermelon", "Grape"]
      }
    ]
  },
  {
    id: "rack-pro-1",
    name: "Commercial Power Rack Elite",
    category: "Equipment",
    subcategory: "Machines",
    type: "Power Racks",
    price: 1299.99,
    rating: 4.9,
    reviews: 320,
    stock: 8,
    images: ["/products/rack-1.jpg", "/products/rack-2.jpg"],
    description: "Commercial-grade power rack with multiple attachments and safety features.",
    features: [
      "11-gauge steel construction",
      "1000lb weight capacity",
      "Integrated pull-up bars",
      "Safety spotter arms included",
      "Multiple J-cup positions"
    ],
    specs: {
      "Height": "90 inches",
      "Width": "48 inches",
      "Depth": "48 inches",
      "Weight Capacity": "1000 lbs",
      "Material": "11-gauge steel"
    },
    seller: {
      name: "Pro Fitness Equipment",
      rating: 4.9,
      reviews: 5600
    },
    variants: [
      {
        type: "Color",
        options: ["Matte Black", "Red", "Blue"]
      }
    ]
  },
  // {
  //   id: "leggings-1",
  //   name: "Performance Compression Leggings",
  //   category: "Apparel",
  //   subcategory: "Women's Wear",
  //   type: "Leggings",
  //   price: 68.99,
  //   rating: 4.8,
  //   reviews: 2100,
  //   stock: 150,
  //   images: ["/products/leggings-1.jpg", "/products/leggings-2.jpg"],
  //   description: "High-performance compression leggings with moisture-wicking technology.",
  //   features: [
  //     "4-way stretch fabric",
  //     "High-waisted design",
  //     "Squat-proof material",
  //     "Hidden waistband pocket",
  //     "Seamless construction"
  //   ],
  //   specs: {
  //     "Material": "75% Nylon, 25% Spandex",
  //     "Rise": "High-rise",
  //     "Length": "Full length",
  //     "Compression": "Medium",
  //     "Care": "Machine wash cold"
  //   },
  //   seller: {
  //     name: "FitFashion",
  //     rating: 4.7,
  //     reviews: 18500
  //   },
  //   variants: [
  //     {
  //       type: "Size",
  //       options: ["XS", "S", "M", "L", "XL"]
  //     },
  //     {
  //       type: "Color",
  //       options: ["Black", "Navy", "Burgundy", "Forest Green"]
  //     }
  //   ]
  // },
  {
    id: "protein-bar-1",
    name: "Protein Power Bar Pack",
    category: "Nutrition",
    subcategory: "Healthy Snacks",
    type: "Protein Bars",
    price: 29.99,
    rating: 4.6,
    reviews: 3200,
    stock: 200,
    images: ["/products/bar-1.jpg", "/products/bar-2.jpg"],
    description: "High-protein, low-sugar bars perfect for on-the-go nutrition.",
    features: [
      "20g protein per bar",
      "Only 2g sugar",
      "Gluten-free",
      "No artificial sweeteners",
      "12 bars per box"
    ],
    specs: {
      "Serving Size": "60g",
      "Protein": "20g",
      "Sugar": "2g",
      "Fiber": "12g",
      "Calories": "220"
    },
    seller: {
      name: "Clean Eats Co",
      rating: 4.8,
      reviews: 9800
    },
    variants: [
      {
        type: "Flavor",
        options: ["Chocolate Chip", "Peanut Butter", "Cookie Dough", "Mint Chocolate"]
      },
      {
        type: "Pack Size",
        options: ["12 Pack", "24 Pack", "36 Pack"]
      }
    ]
  },
  {
    id: "massage-gun-1",
    name: "Pro Recovery Massage Gun",
    category: "Equipment",
    subcategory: "Recovery Tools",
    type: "Massage Guns",
    price: 199.99,
    rating: 4.8,
    reviews: 750,
    stock: 45,
    images: ["/products/massage-1.jpg"],
    description: "Professional-grade percussion massage device for optimal muscle recovery.",
    features: [
      "6 speed settings",
      "4 hour battery life",
      "Quiet operation (<45dB)",
      "6 attachment heads",
      "Travel case included"
    ],
    specs: {
      "Speed Range": "1200-3200 RPM",
      "Battery": "2500mAh",
      "Weight": "2.2 lbs",
      "Noise Level": "<45dB",
      "Force": "Up to 60 lbs"
    },
    seller: {
      name: "Recovery Tech",
      rating: 4.7,
      reviews: 4200
    },
    variants: [
      {
        type: "Color",
        options: ["Black", "Silver", "Rose Gold"]
      }
    ]
  }
];

export type FilterOptions = {
  price: {
    min: number;
    max: number;
  };
  rating: number;
  inStock: boolean;
  sortBy: "price-asc" | "price-desc" | "rating" | "newest";
}; 