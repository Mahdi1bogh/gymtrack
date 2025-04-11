import React from "react";

type CardProps = React.ComponentPropsWithoutRef<"div">;

const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div
    className={`bg-brand-surface rounded-2xl p-4 ${className ?? ""}`}
    {...props}
  >
    {children}
  </div>
);

// Placeholder Icon
// const FilterIcon = () => <span>[F]</span>; // Removed unused icon
const ChevronDownIcon = () => <span>ˇ</span>;
const RightArrowIcon = () => <span>→</span>; // Placeholder for the arrow in the goals
const ChevronRightIcon = () => <span>〉</span>; // For View All

const activityData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 70 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 60, current: true },
  { month: "May", value: 9 }, // Assuming 9%
  { month: "Jun", value: 12 },
  { month: "Jul", value: 11 },
  { month: "Aug", value: 10 },
];

export const ActivityCard: React.FC<CardProps> = ({ className, ...props }) => (
  <Card className={className} {...props}>
    {/* Card Header */}
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-brand-text-primary">
        Activity
      </h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        {/* <FilterIcon /> */}
        {/* Optional Filter Icon */}
        <span>Monthly</span>
        <ChevronDownIcon />
      </button>
    </div>

    {/* Bar Chart Area */}
    <div className="flex justify-between items-end h-40 space-x-2">
      {activityData.map((item) => (
        <div key={item.month} className="flex flex-col items-center flex-1">
          <div className="text-xs text-brand-text-secondary mb-1">
            {item.value}%
          </div>
          <div
            className={`w-3/4 rounded-t-md ${
              item.current ? "bg-brand-text-primary" : "bg-brand-surface-light"
            }`}
            style={{ height: `${item.value}%` }}
            title={`${item.month}: ${item.value}%`}
          ></div>
          <div className="mt-2 text-xs text-brand-text-muted">{item.month}</div>
        </div>
      ))}
    </div>
  </Card>
);

// --- Overview Card ---

const overviewData = {
  totalPercent: 84,
  waterIntake: 1290,
  calories: { value: 33.5, change: +1.26 },
  protein: { value: 23.02, change: +3.43 },
  carbs: { value: 11.24, change: +2.12 },
};

// Simple SVG Circle for progress - replace with a proper chart library for animation/gradients
const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="transform -rotate-90"
    >
      {/* Background Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        strokeWidth="10"
        className="stroke-brand-surface-light"
        fill="transparent"
      />
      {/* Foreground Circle (Progress) - Simplified colors */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="stroke-brand-primary"
        fill="transparent"
        strokeLinecap="round"
      />
    </svg>
  );
};

const StatItem = ({
  label,
  value,
  change,
  colorClass,
}: {
  label: string;
  value: number;
  change: number;
  colorClass: string;
}) => (
  <div className="flex justify-between items-center text-sm">
    <div className="flex items-center">
      <span className={`w-2 h-2 rounded-full mr-2 ${colorClass}`}></span>
      <span className="text-brand-text-secondary">{label}</span>
    </div>
    <div className="text-right">
      <span className="text-brand-text-primary font-medium">{value}%</span>
      <span
        className={`ml-2 text-xs ${
          change >= 0 ? "text-brand-primary" : "text-red-500"
        }`}
      >
        {change >= 0 ? "+" : ""}
        {change}%
      </span>
    </div>
  </div>
);

export const OverviewCard: React.FC<CardProps> = ({ className, ...props }) => (
  <Card className={className} {...props}>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-text-primary">
        Overview
      </h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        <span>Monthly</span>
        <ChevronDownIcon />
      </button>
    </div>

    {/* Content */}
    <div className="flex items-center space-x-6">
      {/* Circular Chart */}
      <div className="relative">
        <CircularProgress percentage={overviewData.totalPercent} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-brand-text-primary">
            {overviewData.totalPercent}%
          </span>
          <span className="text-xs text-brand-text-secondary">
            {overviewData.waterIntake} ml
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex-1 space-y-3">
        <StatItem
          label="Calories burn"
          value={overviewData.calories.value}
          change={overviewData.calories.change}
          colorClass="bg-brand-accent"
        />
        <StatItem
          label="Protein"
          value={overviewData.protein.value}
          change={overviewData.protein.change}
          colorClass="bg-brand-primary"
        />
        <StatItem
          label="Carbs"
          value={overviewData.carbs.value}
          change={overviewData.carbs.change}
          colorClass="bg-brand-secondary"
        />
      </div>
    </div>
  </Card>
);

// --- Fitness Goal Card ---

const fitnessGoals = [
  {
    title: "Side planks",
    details: "12 sets/day",
    tag: "Bravo",
    tagColor: "bg-brand-accent text-black",
    bgColor: "bg-brand-accent/30", // Lighter accent for background
    iconColor: "text-brand-accent",
  },
  {
    title: "Rope lifting",
    details: "10 sets/day",
    tag: "Well",
    tagColor: "bg-brand-secondary text-black",
    bgColor: "bg-brand-secondary/30", // Lighter secondary for background
    iconColor: "text-brand-secondary",
  },
  // Add more goals if needed, check image for scroll
  {
    title: "ABS & ARMS", // Example from hidden part
    details: "10 minutes",
    tag: "Great",
    tagColor: "bg-red-500 text-white", // Assuming red tag
    bgColor: "bg-red-500/20",
    iconColor: "text-red-500",
  },
];

export const FitnessGoalCard: React.FC<CardProps> = ({
  className,
  ...props
}) => (
  <Card className={`${className} flex flex-col`} {...props}>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-text-primary">
        Fitness goal
      </h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        <span>Monthly</span>
        <ChevronDownIcon />
      </button>
    </div>

    {/* Goals List - Assuming horizontal scroll */}
    <div className="flex-1 flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand-surface-light scrollbar-track-transparent">
      {fitnessGoals.map((goal, index) => (
        <div
          key={index}
          className={`flex-shrink-0 w-40 h-full rounded-xl p-4 flex flex-col justify-between relative overflow-hidden ${goal.bgColor}`}
        >
          {/* Placeholder for background muscle image */}
          {/* <img src="/path-to-muscle.png" className="absolute bottom-0 right-0 w-2/3 opacity-30"/> */}
          <div>
            <h4 className="font-semibold text-brand-text-primary">
              {goal.title}
            </h4>
            <p className="text-xs text-brand-text-secondary mb-2">
              {goal.details}
            </p>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${goal.tagColor}`}
            >
              {goal.tag}
            </span>
          </div>
          <button
            className={`self-end p-1 rounded-full bg-brand-background/50 ${goal.iconColor}`}
          >
            <RightArrowIcon />
          </button>
        </div>
      ))}
    </div>
  </Card>
);

// --- Trainer Card ---

const trainers = [
  {
    name: "John Arnold",
    specialty: "Yoga expert",
    imgSrc: "https://via.placeholder.com/150/E9FF6F/000000?text=John", // Placeholder
    bgColor: "bg-gradient-to-b from-brand-accent/40 to-transparent",
    borderColor: "border-brand-accent/50",
  },
  {
    name: "Adam Smith",
    specialty: "Fitness expert",
    imgSrc: "https://via.placeholder.com/150/9BF56A/000000?text=Adam", // Placeholder
    bgColor: "bg-gradient-to-b from-brand-primary/40 to-transparent",
    borderColor: "border-brand-primary", // Active border
  },
];

export const TrainerCard: React.FC<CardProps> = ({ className, ...props }) => (
  <Card className={`${className} flex flex-col`} {...props}>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-text-primary">Trainer</h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        <span>View all</span>
        <ChevronRightIcon />
      </button>
    </div>

    {/* Trainer Profiles */}
    <div className="flex-1 grid grid-cols-2 gap-4">
      {trainers.map((trainer, index) => (
        <div
          key={index}
          className={`rounded-xl overflow-hidden relative p-4 flex flex-col justify-end border-2 ${trainer.borderColor}`}
        >
          <div className={`absolute inset-0 ${trainer.bgColor} z-0`}></div>
          {/* Background Image - positioned absolutely */}
          <img
            src={trainer.imgSrc}
            alt={trainer.name}
            className="absolute bottom-0 left-0 w-full h-auto z-0 opacity-80"
          />
          {/* Content */}
          <div className="relative z-10 text-center">
            <h4 className="font-semibold text-brand-text-primary text-sm">
              {trainer.name}
            </h4>
            <p className="text-xs text-brand-text-secondary">
              {trainer.specialty}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// Placeholder Icons
const DumbbellIcon = () => <span>[Db]</span>; // Placeholder
const ShoeIcon = () => <span>[Sh]</span>; // Placeholder
const ArrowRightIcon = () => <span>{`[->]`}</span>; // Correctly escaped arrow
const UserIcon1 = () => (
  <img
    src="https://via.placeholder.com/24/FFC107/000000?text=T"
    alt="Toren"
    className="w-6 h-6 rounded-full"
  />
); // Placeholder
const UserIcon2 = () => (
  <img
    src="https://via.placeholder.com/24/03A9F4/000000?text=A"
    alt="Ardin"
    className="w-6 h-6 rounded-full"
  />
); // Placeholder
const UserIcon3 = () => (
  <img
    src="https://via.placeholder.com/24/4CAF50/000000?text=S"
    alt="Adam"
    className="w-6 h-6 rounded-full"
  />
); // Placeholder

// --- Recommended Activity Card ---

const recommendedActivities = [
  {
    icon: DumbbellIcon,
    bgColor: "bg-brand-accent/20",
    iconColor: "text-brand-accent",
    title: "Fitness for beginners",
    time: "17 Feb, 2022 at 5.30 PM",
    assignee: UserIcon1,
  },
  {
    icon: ShoeIcon,
    bgColor: "bg-brand-secondary/20",
    iconColor: "text-brand-secondary",
    title: "Beginner to advance gym",
    time: "17 Feb, 2022 at 4.30 PM",
    assignee: UserIcon2,
  },
  {
    icon: ArrowRightIcon,
    bgColor: "bg-brand-primary/20",
    iconColor: "text-brand-primary",
    title: "Ultimate body workout",
    time: "17 Feb, 2022 at 3.30 PM",
    assignee: UserIcon3,
  },
];

export const RecommendedActivityCard: React.FC<CardProps> = ({
  className,
  ...props
}) => (
  <Card className={`${className} flex flex-col`} {...props}>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-text-primary">
        Recommend activity
      </h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        <span>Monthly</span>
        <ChevronDownIcon />
      </button>
    </div>

    {/* Activity List */}
    <div className="flex-1 space-y-4">
      {recommendedActivities.map((activity, index) => {
        const Icon = activity.icon;
        const Assignee = activity.assignee;
        return (
          <div key={index} className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              <Icon />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-text-primary">
                {activity.title}
              </p>
              <p className="text-xs text-brand-text-muted">{activity.time}</p>
            </div>
            <Assignee />
          </div>
        );
      })}
    </div>
  </Card>
);

// --- Heart Rate Card ---

// Placeholder for chart data/rendering
const HeartRateChart = () => (
  <div className="h-40 flex items-center justify-center bg-brand-surface-light/20 rounded-lg">
    <span className="text-brand-text-muted">
      [Heart Rate Line Chart Placeholder]
    </span>
    {/* Actual chart implementation (e.g., using Recharts, Chart.js) would go here */}
    {/* Example point from image */}
    <div className="absolute" style={{ bottom: "45%", left: "55%" }}>
      {" "}
      {/* Approximate position */}
      <div className="relative flex flex-col items-center">
        <span className="text-xs bg-brand-primary text-black px-1.5 py-0.5 rounded mb-1">
          70beats/m
        </span>
        <div className="w-3 h-3 bg-brand-primary rounded-full border-2 border-brand-background"></div>
      </div>
    </div>
  </div>
);

export const HeartRateCard: React.FC<CardProps> = ({ className, ...props }) => (
  <Card className={`${className} flex flex-col`} {...props}>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-text-primary">
        Heart rate
      </h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        <span>Weekly</span>
        <ChevronDownIcon />
      </button>
    </div>

    {/* Chart Area */}
    <div className="flex-1 relative">
      <HeartRateChart />
    </div>
  </Card>
);

// Placeholder Icons
const CaloriesIcon = () => <span>[C]</span>; // Placeholder
const WeightIcon = () => <span>[W]</span>; // Placeholder

// --- Output Card ---

const outputData = [
  {
    icon: CaloriesIcon,
    label: "Calory loss",
    value: ".123 gm",
    tag: "WOW",
    tagColor: "bg-brand-accent text-black",
    bgColor: "bg-brand-accent/20",
    borderColor: "border-brand-accent/50",
  },
  {
    icon: WeightIcon,
    label: "Weight loss",
    value: "1.23 kg",
    tag: "Great",
    tagColor: "bg-brand-secondary text-black",
    bgColor: "bg-brand-secondary/20",
    borderColor: "border-brand-secondary", // Active border
  },
];

export const OutputCard: React.FC<CardProps> = ({ className, ...props }) => (
  <Card className={`${className} flex flex-col`} {...props}>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-text-primary">Output</h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        <span>Monthly</span>
        <ChevronDownIcon />
      </button>
    </div>

    {/* Output Items */}
    <div className="flex-1 space-y-4">
      {outputData.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={`flex items-center space-x-4 p-3 rounded-lg border ${item.borderColor} ${item.bgColor}`}
          >
            <div className="p-2 rounded-lg bg-brand-surface">
              <Icon />
            </div>
            <div className="flex-1">
              <p className="text-sm text-brand-text-secondary">{item.label}</p>
              <p className="text-lg font-semibold text-brand-text-primary">
                {item.value}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${item.tagColor}`}
            >
              {item.tag}
            </span>
          </div>
        );
      })}
    </div>
  </Card>
);

// Placeholder Icons
const CheckIcon = () => <span>✓</span>; // Placeholder

// --- Recommended Food Card ---

const foodData = [
  {
    day: "Day one",
    title: "Veggies and Hummus",
    details: "7 days, only dinner time",
    imgSrc: "https://via.placeholder.com/60/E9FF6F/000000?text=Meal1", // Placeholder
    active: false,
  },
  {
    day: "Day two",
    title: "A bowl of salad",
    details: "12 days, only lunch time",
    imgSrc: "https://via.placeholder.com/60/9BF56A/000000?text=Meal2", // Placeholder
    active: true,
  },
  {
    day: "Day three",
    title: "Green variety foods",
    details: "13 days for breakfast",
    imgSrc: "https://via.placeholder.com/60/6FF0FF/000000?text=Meal3", // Placeholder
    active: false,
  },
  {
    day: "Day four",
    title: "A bowl of berries",
    details: "9 days for breakfast",
    imgSrc: "https://via.placeholder.com/60/FF9800/000000?text=Meal4", // Placeholder
    active: false,
  },
];

export const RecommendedFoodCard: React.FC<CardProps> = ({
  className,
  ...props
}) => (
  <Card className={`${className} flex flex-col`} {...props}>
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-text-primary">
        Recommended food
      </h3>
      <button className="flex items-center space-x-1 text-sm text-brand-text-secondary hover:text-brand-text-primary">
        <span>Monthly</span>
        <ChevronDownIcon />
      </button>
    </div>

    {/* Timeline & Food Items */}
    <div className="flex-1 relative pt-8">
      {/* Timeline Line - adjust positioning/length as needed */}
      <div className="absolute top-4 left-4 right-4 h-px bg-brand-border"></div>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand-surface-light scrollbar-track-transparent">
        {foodData.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-48 relative pb-4">
            {/* Timeline Point */}
            <div className="absolute top-[-1.2rem] left-4 transform -translate-x-1/2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.active
                    ? "bg-brand-primary text-black"
                    : "bg-brand-surface-light text-brand-text-muted"
                }`}
              >
                <CheckIcon />
              </div>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-brand-text-secondary whitespace-nowrap">
                {item.day}
              </span>
            </div>

            {/* Food Item Box */}
            <div
              className={`h-full rounded-xl p-3 flex items-center space-x-3 ${
                item.active
                  ? "bg-brand-primary/10 border border-brand-primary"
                  : "bg-brand-surface-light"
              }`}
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-brand-text-primary">
                  {item.title}
                </p>
                <p className="text-xs text-brand-text-secondary">
                  {item.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);
