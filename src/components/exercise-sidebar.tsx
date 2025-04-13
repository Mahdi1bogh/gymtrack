import { useState } from "react";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Exercise = {
  id: string;
  name: string;
};

type ExerciseCategories = {
  [key: string]: Exercise[];
};

const EXERCISE_CATEGORIES: ExerciseCategories = {
  Chest: [
    { id: "bench-press", name: "Bench Press" },
    { id: "push-ups", name: "Push-ups" },
    { id: "incline-press", name: "Incline Press" },
    { id: "decline-press", name: "Decline Press" },
    { id: "chest-flyes", name: "Chest Flyes" },
  ],
  Back: [
    { id: "deadlift", name: "Deadlift" },
    { id: "pull-ups", name: "Pull-ups" },
    { id: "lat-pulldown", name: "Lat Pulldown" },
    { id: "barbell-rows", name: "Barbell Rows" },
    { id: "face-pulls", name: "Face Pulls" },
  ],
  Legs: [
    { id: "squats", name: "Squats" },
    { id: "lunges", name: "Lunges" },
    { id: "leg-press", name: "Leg Press" },
    { id: "calf-raises", name: "Calf Raises" },
    { id: "leg-extensions", name: "Leg Extensions" },
  ],
  Shoulders: [
    { id: "shoulder-press", name: "Shoulder Press" },
    { id: "lateral-raises", name: "Lateral Raises" },
    { id: "front-raises", name: "Front Raises" },
    { id: "face-pulls", name: "Face Pulls" },
  ],
  Arms: [
    { id: "bicep-curls", name: "Bicep Curls" },
    { id: "tricep-extensions", name: "Tricep Extensions" },
    { id: "hammer-curls", name: "Hammer Curls" },
    { id: "skull-crushers", name: "Skull Crushers" },
  ],
  Core: [
    { id: "plank", name: "Plank" },
    { id: "crunches", name: "Crunches" },
    { id: "russian-twists", name: "Russian Twists" },
    { id: "leg-raises", name: "Leg Raises" },
  ],
};

export default function ExerciseSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredExercises = Object.entries(EXERCISE_CATEGORIES).reduce(
    (acc, [category, exercises]) => {
      const filtered = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as ExerciseCategories
  );

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ${
        isExpanded ? "w-80" : "w-12"
      }`}
    >
      <div className="flex justify-end mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search exercises..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {Object.entries(filteredExercises).map(
                  ([category, exercises]) => (
                    <div key={category} className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category ? null : category
                          )
                        }
                      >
                        {category}
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            selectedCategory === category ? "rotate-90" : ""
                          }`}
                        />
                      </Button>
                      {selectedCategory === category && (
                        <div className="space-y-2 pl-4">
                          {exercises.map((exercise) => (
                            <div
                              key={exercise.id}
                              draggable
                              className="p-2 bg-gray-800 rounded-lg cursor-move hover:bg-gray-700 transition-colors"
                              onDragStart={(e) => {
                                e.dataTransfer.setData(
                                  "exercise",
                                  JSON.stringify({ ...exercise, category })
                                );
                              }}
                            >
                              <div className="font-medium">{exercise.name}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
