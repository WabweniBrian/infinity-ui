"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Sparkles,
  Loader2,
  Check,
  Share,
  ChevronDown,
  Maximize2,
  Minimize2,
  Trash2,
  Edit,
  Plus,
  Clock,
  Users,
  Flame,
  BookmarkPlus,
  Bookmark,
  Printer,
  Star,
  Thermometer,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image";

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  category: string;
}

interface RecipeStep {
  id: string;
  text: string;
  time?: number;
  temperature?: number;
}

interface Recipe {
  id: string;
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  cuisine: string;
  dietaryInfo: string[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  image: string;
  saved: boolean;
  rating?: number;
}

interface DietaryPreference {
  id: string;
  name: string;
  selected: boolean;
}

interface Cuisine {
  id: string;
  name: string;
  selected: boolean;
}

const AICulinaryCreator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<
    DietaryPreference[]
  >([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [recipePrompt, setRecipePrompt] = useState<string>("");
  const [availableIngredients, setAvailableIngredients] = useState<string>("");
  const [servings, setServings] = useState<number>(4);
  const [maxPrepTime, setMaxPrepTime] = useState<number>(30);
  const [selectedTab, setSelectedTab] = useState<
    "ingredients" | "instructions" | "nutrition"
  >("ingredients");
  const [editingIngredient, setEditingIngredient] = useState<string | null>(
    null,
  );
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [openPanels, setOpenPanels] = useState<Set<string>>(
    new Set(["recipe", "generator", "saved"]),
  );

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Initialize sample data
  useEffect(() => {
    // Sample dietary preferences
    const sampleDietaryPreferences: DietaryPreference[] = [
      { id: "vegetarian", name: "Vegetarian", selected: false },
      { id: "vegan", name: "Vegan", selected: false },
      { id: "gluten-free", name: "Gluten-Free", selected: false },
      { id: "dairy-free", name: "Dairy-Free", selected: false },
      { id: "keto", name: "Keto", selected: false },
      { id: "paleo", name: "Paleo", selected: false },
      { id: "low-carb", name: "Low Carb", selected: false },
      { id: "nut-free", name: "Nut-Free", selected: false },
    ];
    setDietaryPreferences(sampleDietaryPreferences);

    // Sample cuisines
    const sampleCuisines: Cuisine[] = [
      { id: "italian", name: "Italian", selected: false },
      { id: "mexican", name: "Mexican", selected: false },
      { id: "asian", name: "Asian", selected: false },
      { id: "mediterranean", name: "Mediterranean", selected: true },
      { id: "indian", name: "Indian", selected: false },
      { id: "american", name: "American", selected: false },
      { id: "french", name: "French", selected: false },
      { id: "middle-eastern", name: "Middle Eastern", selected: false },
    ];
    setCuisines(sampleCuisines);

    // Sample saved recipes
    const sampleSavedRecipes: Recipe[] = [
      {
        id: "recipe-1",
        name: "Mediterranean Quinoa Bowl",
        description:
          "A nutritious and flavorful bowl packed with Mediterranean ingredients and protein-rich quinoa.",
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: "easy",
        cuisine: "mediterranean",
        dietaryInfo: ["vegetarian", "gluten-free"],
        ingredients: [
          {
            id: "ing-1",
            name: "Quinoa",
            amount: "1",
            unit: "cup",
            category: "grain",
          },
          {
            id: "ing-2",
            name: "Cherry Tomatoes",
            amount: "1",
            unit: "cup",
            category: "vegetable",
          },
          {
            id: "ing-3",
            name: "Cucumber",
            amount: "1",
            unit: "medium",
            category: "vegetable",
          },
          {
            id: "ing-4",
            name: "Red Onion",
            amount: "1/2",
            unit: "medium",
            category: "vegetable",
          },
          {
            id: "ing-5",
            name: "Feta Cheese",
            amount: "1/2",
            unit: "cup",
            category: "dairy",
          },
          {
            id: "ing-6",
            name: "Kalamata Olives",
            amount: "1/4",
            unit: "cup",
            category: "vegetable",
          },
          {
            id: "ing-7",
            name: "Extra Virgin Olive Oil",
            amount: "3",
            unit: "tablespoons",
            category: "oil",
          },
          {
            id: "ing-8",
            name: "Lemon Juice",
            amount: "2",
            unit: "tablespoons",
            category: "condiment",
          },
          {
            id: "ing-9",
            name: "Fresh Parsley",
            amount: "1/4",
            unit: "cup",
            category: "herb",
          },
          {
            id: "ing-10",
            name: "Salt",
            amount: "1/2",
            unit: "teaspoon",
            category: "seasoning",
          },
          {
            id: "ing-11",
            name: "Black Pepper",
            amount: "1/4",
            unit: "teaspoon",
            category: "seasoning",
          },
        ],
        steps: [
          {
            id: "step-1",
            text: "Rinse quinoa under cold water. In a medium saucepan, combine quinoa with 2 cups of water. Bring to a boil, then reduce heat to low, cover, and simmer for 15 minutes until water is absorbed.",
            time: 15,
          },
          {
            id: "step-2",
            text: "While quinoa is cooking, dice cucumber, halve cherry tomatoes, and thinly slice red onion.",
            time: 5,
          },
          {
            id: "step-3",
            text: "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper to make the dressing.",
            time: 2,
          },
          {
            id: "step-4",
            text: "Once quinoa is cooked, fluff with a fork and let cool for 5 minutes.",
            time: 5,
          },
          {
            id: "step-5",
            text: "In a large bowl, combine quinoa, tomatoes, cucumber, red onion, olives, and feta cheese.",
            time: 3,
          },
          {
            id: "step-6",
            text: "Pour dressing over the salad and toss gently to combine. Garnish with fresh parsley.",
            time: 2,
          },
          {
            id: "step-7",
            text: "Serve immediately or refrigerate for up to 3 days.",
            time: 0,
          },
        ],
        image: "/default-image.jpg",
        saved: true,
        rating: 4.5,
      },
      {
        id: "recipe-2",
        name: "Spicy Thai Basil Stir-Fry",
        description:
          "A quick and flavorful Thai-inspired stir-fry with aromatic basil and a spicy kick.",
        prepTime: 10,
        cookTime: 15,
        servings: 3,
        difficulty: "medium",
        cuisine: "asian",
        dietaryInfo: ["dairy-free"],
        ingredients: [
          {
            id: "ing-12",
            name: "Chicken Breast",
            amount: "1",
            unit: "pound",
            category: "protein",
          },
          {
            id: "ing-13",
            name: "Thai Basil",
            amount: "1",
            unit: "cup",
            category: "herb",
          },
          {
            id: "ing-14",
            name: "Bell Peppers",
            amount: "2",
            unit: "medium",
            category: "vegetable",
          },
          {
            id: "ing-15",
            name: "Garlic",
            amount: "4",
            unit: "cloves",
            category: "vegetable",
          },
          {
            id: "ing-16",
            name: "Thai Chili",
            amount: "2",
            unit: "",
            category: "vegetable",
          },
          {
            id: "ing-17",
            name: "Soy Sauce",
            amount: "3",
            unit: "tablespoons",
            category: "condiment",
          },
          {
            id: "ing-18",
            name: "Fish Sauce",
            amount: "1",
            unit: "tablespoon",
            category: "condiment",
          },
          {
            id: "ing-19",
            name: "Brown Sugar",
            amount: "1",
            unit: "tablespoon",
            category: "sweetener",
          },
          {
            id: "ing-20",
            name: "Vegetable Oil",
            amount: "2",
            unit: "tablespoons",
            category: "oil",
          },
        ],
        steps: [
          {
            id: "step-8",
            text: "Slice chicken breast into thin strips. Mince garlic and Thai chilies. Slice bell peppers into thin strips.",
            time: 10,
          },
          {
            id: "step-9",
            text: "In a small bowl, mix soy sauce, fish sauce, and brown sugar until sugar dissolves.",
            time: 2,
          },
          {
            id: "step-10",
            text: "Heat oil in a wok or large skillet over high heat. Add garlic and chilies, stir-fry for 30 seconds until fragrant.",
            time: 1,
          },
          {
            id: "step-11",
            text: "Add chicken and stir-fry for 3-4 minutes until nearly cooked through.",
            time: 4,
          },
          {
            id: "step-12",
            text: "Add bell peppers and stir-fry for another 2 minutes.",
            time: 2,
          },
          {
            id: "step-13",
            text: "Pour in the sauce mixture and stir to coat all ingredients. Cook for 1 minute.",
            time: 1,
          },
          {
            id: "step-14",
            text: "Turn off heat and stir in Thai basil leaves until wilted.",
            time: 1,
          },
          { id: "step-15", text: "Serve hot with steamed rice.", time: 0 },
        ],
        image: "/default-image.jpg",
        saved: true,
        rating: 4.8,
      },
    ];
    setSavedRecipes(sampleSavedRecipes);

    // Set initial current recipe
    setCurrentRecipe(sampleSavedRecipes[0]);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle panel expansion
  const togglePanel = (panel: string) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      if (next.has(panel)) {
        next.delete(panel);
      } else {
        next.add(panel);
      }
      return next;
    });
  };

  // Toggle dietary preference selection
  const toggleDietaryPreference = (id: string) => {
    setDietaryPreferences(
      dietaryPreferences.map((pref) => ({
        ...pref,
        selected: pref.id === id ? !pref.selected : pref.selected,
      })),
    );
  };

  // Toggle cuisine selection
  const toggleCuisine = (id: string) => {
    setCuisines(
      cuisines.map((cuisine) => ({
        ...cuisine,
        selected: cuisine.id === id ? !cuisine.selected : cuisine.selected,
      })),
    );
  };

  // Save current recipe
  const saveRecipe = () => {
    if (!currentRecipe) return;

    const recipeToSave = {
      ...currentRecipe,
      id: currentRecipe.id.startsWith("current")
        ? `recipe-${Date.now()}`
        : currentRecipe.id,
      saved: true,
    };

    // Check if recipe already exists in saved recipes
    const existingIndex = savedRecipes.findIndex(
      (r) => r.id === recipeToSave.id,
    );

    if (existingIndex >= 0) {
      // Update existing recipe
      setSavedRecipes(
        savedRecipes.map((recipe, index) =>
          index === existingIndex ? recipeToSave : recipe,
        ),
      );
    } else {
      // Add new recipe
      setSavedRecipes([recipeToSave, ...savedRecipes]);
    }

    // Update current recipe
    setCurrentRecipe({
      ...recipeToSave,
      saved: true,
    });
  };

  // Generate recipe with AI
  const generateRecipe = async () => {
    setIsGenerating(true);

    // Get selected dietary preferences
    const selectedDiets = dietaryPreferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.name);

    // Get selected cuisines
    const selectedCuisines = cuisines
      .filter((cuisine) => cuisine.selected)
      .map((cuisine) => cuisine.name);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate new recipe based on parameters
    const newIngredients: Ingredient[] = [];
    const newSteps: RecipeStep[] = [];

    // Parse available ingredients if provided
    const availableIngredientsList = availableIngredients
      .split(",")
      .map((ing) => ing.trim())
      .filter((ing) => ing.length > 0);

    // Add some ingredients based on available ingredients or generate random ones
    if (availableIngredientsList.length > 0) {
      // Use provided ingredients
      availableIngredientsList.forEach((ing, index) => {
        newIngredients.push({
          id: `ing-${Date.now()}-${index}`,
          name: ing,
          amount: Math.ceil(Math.random() * 3).toString(),
          unit: ["cup", "tablespoon", "teaspoon", "ounce", "pound"][
            Math.floor(Math.random() * 5)
          ],
          category: ["protein", "vegetable", "grain", "dairy", "herb", "spice"][
            Math.floor(Math.random() * 6)
          ],
        });
      });
    } else {
      // Generate random ingredients based on cuisine and dietary preferences
      const mediterraneanIngredients = [
        "Olive Oil",
        "Feta Cheese",
        "Tomatoes",
        "Cucumber",
        "Olives",
        "Lemon",
        "Garlic",
      ];
      const asianIngredients = [
        "Soy Sauce",
        "Ginger",
        "Garlic",
        "Rice",
        "Sesame Oil",
        "Green Onions",
      ];
      const mexicanIngredients = [
        "Avocado",
        "Lime",
        "Cilantro",
        "Beans",
        "Corn",
        "Tomatoes",
        "Jalapeño",
      ];

      let ingredientPool: string[] = [];

      if (selectedCuisines.includes("Mediterranean")) {
        ingredientPool = [...ingredientPool, ...mediterraneanIngredients];
      }
      if (selectedCuisines.includes("Asian")) {
        ingredientPool = [...ingredientPool, ...asianIngredients];
      }
      if (selectedCuisines.includes("Mexican")) {
        ingredientPool = [...ingredientPool, ...mexicanIngredients];
      }

      // If no cuisine selected, use a mix
      if (ingredientPool.length === 0) {
        ingredientPool = [
          ...mediterraneanIngredients,
          ...asianIngredients,
          ...mexicanIngredients,
        ];
      }

      // Add protein based on dietary preferences
      if (
        !selectedDiets.includes("Vegetarian") &&
        !selectedDiets.includes("Vegan")
      ) {
        ingredientPool.push("Chicken");
        ingredientPool.push("Beef");
        ingredientPool.push("Fish");
      } else {
        ingredientPool.push("Tofu");
        ingredientPool.push("Chickpeas");
        ingredientPool.push("Lentils");
      }

      // Remove dairy for vegan/dairy-free
      if (
        selectedDiets.includes("Vegan") ||
        selectedDiets.includes("Dairy-Free")
      ) {
        ingredientPool = ingredientPool.filter((ing) => ing !== "Feta Cheese");
      }

      // Generate 8-12 random ingredients
      const numIngredients = Math.floor(Math.random() * 5) + 8;
      const shuffledIngredients = [...ingredientPool].sort(
        () => 0.5 - Math.random(),
      );

      for (
        let i = 0;
        i < Math.min(numIngredients, shuffledIngredients.length);
        i++
      ) {
        newIngredients.push({
          id: `ing-${Date.now()}-${i}`,
          name: shuffledIngredients[i],
          amount: Math.ceil(Math.random() * 3).toString(),
          unit: ["cup", "tablespoon", "teaspoon", "ounce", "pound"][
            Math.floor(Math.random() * 5)
          ],
          category: ["protein", "vegetable", "grain", "dairy", "herb", "spice"][
            Math.floor(Math.random() * 6)
          ],
        });
      }
    }

    // Generate steps
    const numSteps = Math.floor(Math.random() * 3) + 5; // 5-7 steps

    for (let i = 0; i < numSteps; i++) {
      let stepText = "";

      if (i === 0) {
        // First step usually involves preparation
        stepText = "Prepare all ingredients: ";
        const prepIngredients = newIngredients
          .slice(0, 3)
          .map((ing) => ing.name.toLowerCase());
        stepText += `wash and chop ${prepIngredients.join(", ")}.`;
      } else if (i === numSteps - 1) {
        // Last step is usually serving
        stepText = "Serve hot";
        if (Math.random() > 0.5) {
          stepText += " and garnish with fresh herbs.";
        } else {
          stepText += " with your favorite side dish.";
        }
      } else {
        // Middle steps involve cooking
        const cookingVerbs = [
          "Add",
          "Mix",
          "Stir",
          "Cook",
          "Sauté",
          "Simmer",
          "Combine",
        ];
        const randomVerb =
          cookingVerbs[Math.floor(Math.random() * cookingVerbs.length)];

        const randomIngredients = newIngredients
          .slice(
            Math.floor((Math.random() * newIngredients.length) / 2),
            Math.floor((Math.random() * newIngredients.length) / 2) + 2,
          )
          .map((ing) => ing.name.toLowerCase());

        stepText = `${randomVerb} ${randomIngredients.join(" and ")} `;

        if (
          randomVerb === "Cook" ||
          randomVerb === "Sauté" ||
          randomVerb === "Simmer"
        ) {
          const cookTime = Math.floor(Math.random() * 10) + 5;
          stepText += `for ${cookTime} minutes until tender.`;
        } else {
          stepText += "until well combined.";
        }
      }

      newSteps.push({
        id: `step-${Date.now()}-${i}`,
        text: stepText,
        time: Math.floor(Math.random() * 10) + 2, // 2-12 minutes per step
      });
    }

    // Create recipe name based on ingredients and cuisine
    let recipeName = "";

    if (recipePrompt) {
      // Use the prompt as inspiration for the name
      const promptWords = recipePrompt.split(" ");
      const keyWords = promptWords
        .filter((word) => word.length > 3)
        .slice(0, 2);

      if (keyWords.length > 0) {
        recipeName = keyWords
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        if (selectedCuisines.length > 0) {
          const cuisine = selectedCuisines[0];
          recipeName += ` ${cuisine}`;
        }

        recipeName +=
          " " +
          ["Bowl", "Delight", "Special", "Fusion", "Creation"][
            Math.floor(Math.random() * 5)
          ];
      }
    }

    if (!recipeName) {
      // Generate name based on main ingredients
      const mainIngredients = newIngredients.slice(0, 2).map((ing) => ing.name);

      recipeName = mainIngredients.join(" & ");

      if (selectedCuisines.length > 0) {
        const cuisine = selectedCuisines[0];
        recipeName += ` ${cuisine}`;
      }

      recipeName +=
        " " +
        ["Bowl", "Stir-Fry", "Salad", "Delight", "Special"][
          Math.floor(Math.random() * 5)
        ];
    }

    // Calculate total prep and cook time
    const totalPrepTime = Math.min(
      maxPrepTime,
      Math.floor(Math.random() * 20) + 10,
    );
    const totalCookTime = newSteps.reduce(
      (total, step) => total + (step.time || 0),
      0,
    );

    // Create new recipe
    const newRecipe: Recipe = {
      id: `current-recipe-${Date.now()}`,
      name: recipeName,
      description:
        recipePrompt ||
        `A delicious ${selectedCuisines.join(" and ")} inspired dish perfect for any occasion.`,
      prepTime: totalPrepTime,
      cookTime: totalCookTime,
      servings: servings,
      difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as
        | "easy"
        | "medium"
        | "hard",
      cuisine:
        selectedCuisines.length > 0
          ? selectedCuisines[0].toLowerCase()
          : "fusion",
      dietaryInfo: selectedDiets.map((diet) => diet.toLowerCase()),
      ingredients: newIngredients,
      steps: newSteps,
      image: "/default-image.jpg",
      saved: false,
    };

    setCurrentRecipe(newRecipe);
    setIsGenerating(false);
  };

  // Add ingredient
  const addIngredient = () => {
    if (!currentRecipe) return;

    const newIngredient: Ingredient = {
      id: `ing-${Date.now()}`,
      name: "New Ingredient",
      amount: "1",
      unit: "cup",
      category: "other",
    };

    setCurrentRecipe({
      ...currentRecipe,
      ingredients: [...currentRecipe.ingredients, newIngredient],
    });

    setEditingIngredient(newIngredient.id);
  };

  // Remove ingredient
  const removeIngredient = (id: string) => {
    if (!currentRecipe) return;

    setCurrentRecipe({
      ...currentRecipe,
      ingredients: currentRecipe.ingredients.filter((ing) => ing.id !== id),
    });

    if (editingIngredient === id) {
      setEditingIngredient(null);
    }
  };

  // Update ingredient
  const updateIngredient = (id: string, updates: Partial<Ingredient>) => {
    if (!currentRecipe) return;

    setCurrentRecipe({
      ...currentRecipe,
      ingredients: currentRecipe.ingredients.map((ing) => {
        if (ing.id === id) {
          return { ...ing, ...updates };
        }
        return ing;
      }),
    });
  };

  // Add step
  const addStep = () => {
    if (!currentRecipe) return;

    const newStep: RecipeStep = {
      id: `step-${Date.now()}`,
      text: "New step",
      time: 5,
    };

    setCurrentRecipe({
      ...currentRecipe,
      steps: [...currentRecipe.steps, newStep],
    });

    setEditingStep(newStep.id);
  };

  // Remove step
  const removeStep = (id: string) => {
    if (!currentRecipe) return;

    setCurrentRecipe({
      ...currentRecipe,
      steps: currentRecipe.steps.filter((step) => step.id !== id),
    });

    if (editingStep === id) {
      setEditingStep(null);
    }
  };

  // Update step
  const updateStep = (id: string, updates: Partial<RecipeStep>) => {
    if (!currentRecipe) return;

    setCurrentRecipe({
      ...currentRecipe,
      steps: currentRecipe.steps.map((step) => {
        if (step.id === id) {
          return { ...step, ...updates };
        }
        return step;
      }),
    });
  };

  // Calculate total time
  const calculateTotalTime = () => {
    if (!currentRecipe) return 0;
    return currentRecipe.prepTime + currentRecipe.cookTime;
  };

  // Format time (minutes to hours and minutes)
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${mins} min`;
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900" : "min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900"}`}
    >
      <div
        className={`mx-auto overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm ${isFullscreen ? "h-screen w-full overflow-y-auto rounded-none border-0" : "max-w-4xl"}`}
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-6 dark:border-gray-700/50">
          <div
            className={`flex items-center justify-between ${isFullscreen ? "mx-auto max-w-7xl" : ""}`}
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-lg">
                <Utensils className="h-5 w-5" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-xl font-bold text-transparent dark:from-green-400 dark:to-teal-400">
                  AI Culinary Creator
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate personalized recipes with AI
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 gap-4 p-4 md:grid-cols-3 ${isFullscreen ? "mx-auto max-w-7xl px-3" : ""}`}
        >
          {/* Recipe Panel */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("recipe")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Recipe
                </h2>
                <div className="flex items-center">
                  <div className="mr-4 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveRecipe();
                      }}
                      className="flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
                    >
                      <BookmarkPlus className="mr-1 h-3 w-3" />
                      {currentRecipe?.saved ? "Saved" : "Save Recipe"}
                    </button>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                      openPanels.has("recipe") ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {openPanels.has("recipe") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {currentRecipe ? (
                      <div className="p-4">
                        {/* Recipe Header */}
                        <div className="mb-6">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={currentRecipe.name}
                                onChange={(e) =>
                                  setCurrentRecipe({
                                    ...currentRecipe,
                                    name: e.target.value,
                                  })
                                }
                                className="mb-2 w-full bg-transparent text-2xl font-bold text-gray-800 focus:outline-none dark:text-white"
                              />
                              <textarea
                                value={currentRecipe.description}
                                onChange={(e) =>
                                  setCurrentRecipe({
                                    ...currentRecipe,
                                    description: e.target.value,
                                  })
                                }
                                className="w-full resize-none bg-transparent text-gray-600 focus:outline-none dark:text-gray-300"
                                rows={3}
                              />

                              <div className="mt-4 flex flex-wrap gap-2">
                                {currentRecipe.dietaryInfo.map(
                                  (diet, index) => (
                                    <span
                                      key={index}
                                      className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    >
                                      {diet}
                                    </span>
                                  ),
                                )}
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                  {currentRecipe.cuisine
                                    .charAt(0)
                                    .toUpperCase() +
                                    currentRecipe.cuisine.slice(1)}
                                </span>
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                  {currentRecipe.difficulty
                                    .charAt(0)
                                    .toUpperCase() +
                                    currentRecipe.difficulty.slice(1)}
                                </span>
                              </div>
                            </div>

                            <div className="w-full sm:w-auto">
                              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                <Image
                                  src={
                                    currentRecipe.image || "/default-image.jpg"
                                  }
                                  alt={currentRecipe.name}
                                  width={192}
                                  height={192}
                                  className="h-48 w-full object-cover sm:w-48"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-4">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Prep: {formatTime(currentRecipe.prepTime)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Flame className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Cook: {formatTime(currentRecipe.cookTime)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Total: {formatTime(calculateTotalTime())}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                Servings:
                                <input
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={currentRecipe.servings}
                                  onChange={(e) =>
                                    setCurrentRecipe({
                                      ...currentRecipe,
                                      servings: Number.parseInt(e.target.value),
                                    })
                                  }
                                  className="ml-1 w-12 bg-transparent text-center focus:outline-none dark:text-gray-300"
                                />
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Recipe Tabs */}
                        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex sm:space-x-4">
                            <button
                              onClick={() => setSelectedTab("ingredients")}
                              className={`border-b-2 px-4 py-2 text-xs font-medium sm:text-sm ${
                                selectedTab === "ingredients"
                                  ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                              }`}
                            >
                              Ingredients
                            </button>
                            <button
                              onClick={() => setSelectedTab("instructions")}
                              className={`border-b-2 px-4 py-2 text-xs font-medium sm:text-sm ${
                                selectedTab === "instructions"
                                  ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                              }`}
                            >
                              Instructions
                            </button>
                            <button
                              onClick={() => setSelectedTab("nutrition")}
                              className={`border-b-2 px-4 py-2 text-xs font-medium sm:text-sm ${
                                selectedTab === "nutrition"
                                  ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                              }`}
                            >
                              Nutrition
                            </button>
                          </div>
                        </div>

                        {/* Tab Content */}
                        <div>
                          {/* Ingredients Tab */}
                          {selectedTab === "ingredients" && (
                            <div>
                              <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                  Ingredients
                                </h3>
                                <button
                                  onClick={addIngredient}
                                  className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
                                >
                                  <Plus className="mr-1 h-3 w-3" />
                                  Add
                                </button>
                              </div>

                              <div className="space-y-2">
                                {currentRecipe.ingredients.map((ingredient) => (
                                  <div
                                    key={ingredient.id}
                                    className={`rounded-lg border p-2 ${
                                      editingIngredient === ingredient.id
                                        ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
                                        : "border-gray-200 dark:border-gray-700"
                                    }`}
                                  >
                                    {editingIngredient === ingredient.id ? (
                                      <div className="flex flex-wrap gap-2">
                                        <div className="flex-1">
                                          <input
                                            type="text"
                                            value={ingredient.name}
                                            onChange={(e) =>
                                              updateIngredient(ingredient.id, {
                                                name: e.target.value,
                                              })
                                            }
                                            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="Ingredient name"
                                          />
                                        </div>
                                        <div className="w-20">
                                          <input
                                            type="text"
                                            value={ingredient.amount}
                                            onChange={(e) =>
                                              updateIngredient(ingredient.id, {
                                                amount: e.target.value,
                                              })
                                            }
                                            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="Amount"
                                          />
                                        </div>
                                        <div className="w-24">
                                          <input
                                            type="text"
                                            value={ingredient.unit}
                                            onChange={(e) =>
                                              updateIngredient(ingredient.id, {
                                                unit: e.target.value,
                                              })
                                            }
                                            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="Unit"
                                          />
                                        </div>
                                        <div className="flex space-x-1">
                                          <button
                                            onClick={() =>
                                              setEditingIngredient(null)
                                            }
                                            className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
                                          >
                                            <Check className="h-3 w-3" />
                                          </button>
                                          <button
                                            onClick={() =>
                                              removeIngredient(ingredient.id)
                                            }
                                            className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800/40"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                          <span className="font-medium text-gray-800 dark:text-gray-200">
                                            {ingredient.amount}{" "}
                                            {ingredient.unit}
                                          </span>
                                          <span className="ml-2 text-gray-700 dark:text-gray-300">
                                            {ingredient.name}
                                          </span>
                                        </div>
                                        <button
                                          onClick={() =>
                                            setEditingIngredient(ingredient.id)
                                          }
                                          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                        >
                                          <Edit className="h-3 w-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Instructions Tab */}
                          {selectedTab === "instructions" && (
                            <div>
                              <div className="mb-2 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                  Instructions
                                </h3>
                                <button
                                  onClick={addStep}
                                  className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
                                >
                                  <Plus className="mr-1 h-3 w-3" />
                                  Add
                                </button>
                              </div>

                              <div className="space-y-4">
                                {currentRecipe.steps.map((step, index) => (
                                  <div
                                    key={step.id}
                                    className={`rounded-lg border p-3 ${
                                      editingStep === step.id
                                        ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
                                        : "border-gray-200 dark:border-gray-700"
                                    }`}
                                  >
                                    {editingStep === step.id ? (
                                      <div className="space-y-2">
                                        <textarea
                                          value={step.text}
                                          onChange={(e) =>
                                            updateStep(step.id, {
                                              text: e.target.value,
                                            })
                                          }
                                          className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                          rows={3}
                                          placeholder="Step instructions"
                                        />
                                        <div className="flex flex-wrap gap-2">
                                          <div className="flex items-center">
                                            <label className="mr-2 text-xs text-gray-600 dark:text-gray-400">
                                              Time (min):
                                            </label>
                                            <input
                                              type="number"
                                              value={step.time || 0}
                                              onChange={(e) =>
                                                updateStep(step.id, {
                                                  time: Number.parseInt(
                                                    e.target.value,
                                                  ),
                                                })
                                              }
                                              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                              min="0"
                                            />
                                          </div>
                                          <div className="flex items-center">
                                            <label className="mr-2 text-xs text-gray-600 dark:text-gray-400">
                                              Temp (°F):
                                            </label>
                                            <input
                                              type="number"
                                              value={step.temperature || ""}
                                              onChange={(e) =>
                                                updateStep(step.id, {
                                                  temperature: Number.parseInt(
                                                    e.target.value,
                                                  ),
                                                })
                                              }
                                              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                              min="0"
                                              step="5"
                                              placeholder="N/A"
                                            />
                                          </div>
                                          <div className="ml-auto flex space-x-1">
                                            <button
                                              onClick={() =>
                                                setEditingStep(null)
                                              }
                                              className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40"
                                            >
                                              <Check className="h-3 w-3" />
                                            </button>
                                            <button
                                              onClick={() =>
                                                removeStep(step.id)
                                              }
                                              className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800/40"
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div>
                                        <div className="flex">
                                          <div className="mr-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            {index + 1}
                                          </div>
                                          <div className="flex-1 text-gray-700 dark:text-gray-300">
                                            {step.text}
                                          </div>
                                          <button
                                            onClick={() =>
                                              setEditingStep(step.id)
                                            }
                                            className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                          >
                                            <Edit className="h-3 w-3" />
                                          </button>
                                        </div>
                                        {(step.time || step.temperature) && (
                                          <div className="mt-2 flex flex-wrap gap-2 pl-9">
                                            {step.time && (
                                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {step.time} min
                                              </span>
                                            )}
                                            {step.temperature && (
                                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                <Thermometer className="mr-1 h-3 w-3" />
                                                {step.temperature}°F
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Nutrition Tab */}
                          {selectedTab === "nutrition" && (
                            <div>
                              <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                  Nutrition Facts
                                </h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  Per serving
                                </span>
                              </div>

                              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                <div className="space-y-2">
                                  <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                      Calories
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      320
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                      Total Fat
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      12g
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b border-gray-200 pb-2 pl-4 dark:border-gray-700">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Saturated Fat
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      3g
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                      Cholesterol
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      0mg
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                      Sodium
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      580mg
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                      Total Carbohydrate
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      42g
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b border-gray-200 pb-2 pl-4 dark:border-gray-700">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Dietary Fiber
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      6g
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-b border-gray-200 pb-2 pl-4 dark:border-gray-700">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      Sugars
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      8g
                                    </span>
                                  </div>
                                  <div className="flex justify-between pb-2">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                      Protein
                                    </span>
                                    <span className="text-gray-800 dark:text-gray-200">
                                      15g
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                  * Percent Daily Values are based on a 2,000
                                  calorie diet. Your daily values may be higher
                                  or lower depending on your calorie needs.
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                          <Utensils className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          No recipe selected
                        </h3>
                        <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                          Generate a new recipe or select one from your saved
                          recipes.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Generator Panel */}
          <div className="col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("generator")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Recipe Generator
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    openPanels.has("generator") ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openPanels.has("generator") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Recipe Idea (optional)
                        </label>
                        <textarea
                          value={recipePrompt}
                          onChange={(e) => setRecipePrompt(e.target.value)}
                          placeholder="Describe what kind of recipe you want, e.g., 'A quick weeknight pasta dish' or 'A healthy breakfast bowl'"
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400/50"
                          rows={3}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Available Ingredients (optional)
                        </label>
                        <textarea
                          value={availableIngredients}
                          onChange={(e) =>
                            setAvailableIngredients(e.target.value)
                          }
                          placeholder="List ingredients you have, separated by commas"
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-green-400 dark:focus:ring-green-400/50"
                          rows={2}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Dietary Preferences
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {dietaryPreferences.map((pref) => (
                            <button
                              key={pref.id}
                              onClick={() => toggleDietaryPreference(pref.id)}
                              className={`rounded-full px-3 py-1.5 text-xs ${
                                pref.selected
                                  ? "bg-gradient-to-r from-green-600 to-teal-600 text-white dark:from-green-500 dark:to-teal-500"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              }`}
                            >
                              {pref.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Cuisine Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {cuisines.map((cuisine) => (
                            <button
                              key={cuisine.id}
                              onClick={() => toggleCuisine(cuisine.id)}
                              className={`rounded-full px-3 py-1.5 text-xs ${
                                cuisine.selected
                                  ? "bg-gradient-to-r from-green-600 to-teal-600 text-white dark:from-green-500 dark:to-teal-500"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              }`}
                            >
                              {cuisine.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Servings
                        </label>
                        <div className="flex items-center">
                          <input
                            type="range"
                            min="1"
                            max="12"
                            value={servings}
                            onChange={(e) =>
                              setServings(Number.parseInt(e.target.value))
                            }
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                          />
                          <span className="ml-2 w-8 text-center text-gray-700 dark:text-gray-300">
                            {servings}
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Maximum Prep Time (minutes)
                        </label>
                        <div className="flex items-center">
                          <input
                            type="range"
                            min="5"
                            max="60"
                            step="5"
                            value={maxPrepTime}
                            onChange={(e) =>
                              setMaxPrepTime(Number.parseInt(e.target.value))
                            }
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                          />
                          <span className="ml-2 w-8 text-center text-gray-700 dark:text-gray-300">
                            {maxPrepTime}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={generateRecipe}
                        disabled={isGenerating}
                        className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-teal-600 px-4 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-green-700 hover:to-teal-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 dark:from-green-500 dark:to-teal-500 dark:hover:from-green-600 dark:hover:to-teal-600"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate Recipe
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Saved Recipes Panel */}
            <div className="mt-4 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("saved")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Saved Recipes
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    openPanels.has("saved") ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {openPanels.has("saved") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="max-h-[400px] overflow-y-auto p-4">
                      {savedRecipes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Bookmark className="h-8 w-8 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            No saved recipes
                          </h3>
                          <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
                            Save recipes to access them later.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {savedRecipes.map((recipe) => (
                            <motion.div
                              key={recipe.id}
                              whileHover={{ y: -2 }}
                              className="cursor-pointer rounded-lg border border-gray-200 p-3 transition-all duration-200 hover:border-green-300 hover:bg-green-50 dark:border-gray-700 dark:hover:border-green-700 dark:hover:bg-green-900/20"
                              onClick={() => setCurrentRecipe(recipe)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                  <Image
                                    src={recipe.image || "/default-image.jpg"}
                                    alt={recipe.name}
                                    fill
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                    {recipe.name}
                                  </h4>
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                      {recipe.cuisine.charAt(0).toUpperCase() +
                                        recipe.cuisine.slice(1)}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                      {formatTime(
                                        recipe.prepTime + recipe.cookTime,
                                      )}
                                    </span>
                                  </div>
                                  {recipe.rating && (
                                    <div className="mt-1 flex items-center">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-3 w-3 ${
                                            i < Math.floor(recipe.rating || 0)
                                              ? "fill-amber-400 text-amber-400"
                                              : i < (recipe.rating || 0)
                                                ? "fill-amber-400/50 text-amber-400/50"
                                                : "text-gray-300 dark:text-gray-600"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                        {recipe.rating.toFixed(1)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 dark:border-gray-700/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40">
                <Printer className="mr-1.5 h-4 w-4" />
                Print Recipe
              </button>
              <button className="flex items-center rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/40">
                <Share className="mr-1.5 h-4 w-4" />
                Share
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Powered by AI Culinary Creator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICulinaryCreator;
