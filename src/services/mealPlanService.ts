import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

interface Meal {
  name: string;
  calories: number;
  bodyType: string;
  language: string;
}

interface UserProfile {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel:
    | 'sedentary'
    | 'lightlyActive'
    | 'moderatelyActive'
    | 'veryActive'
    | 'superActive';
  goal: 'weightLoss' | 'maintenance' | 'weightGain';
}

export interface MealPlan {
  date: string;
  meals: {
    name: string;
    foods: { name: string; calories: number }[];
  }[];
}

const addMealToDatabase = async (meal: Meal) => {
  try {
    await addDoc(collection(db, 'meals'), meal);
  } catch (error) {
    console.error('Error adding meal to database:', error);
  }
};

export const populateDatabase = async () => {
  const meals: Meal[] = [
    // Ectomorph meals
    {
      name: 'Oatmeal with banana and almonds',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Avena con plátano y almendras',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Whole grain pancakes with blueberries',
      calories: 400,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Panqueques integrales con arándanos',
      calories: 400,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Grilled chicken with quinoa and veggies',
      calories: 550,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Pollo a la parrilla con quinoa y verduras',
      calories: 550,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Baked salmon with sweet potato',
      calories: 600,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Salmón al horno con batata',
      calories: 600,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Greek yogurt with honey and granola',
      calories: 300,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Yogur griego con miel y granola',
      calories: 300,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Turkey sandwich with avocado',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Sándwich de pavo con aguacate',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Tuna salad wrap with whole grain tortilla',
      calories: 400,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Wrap de ensalada de atún con tortilla integral',
      calories: 400,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Lentil soup with whole grain bread',
      calories: 350,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Sopa de lentejas con pan integral',
      calories: 350,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Veggie stir-fry with tofu and brown rice',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Salteado de verduras con tofu y arroz integral',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Scrambled eggs with whole grain toast',
      calories: 350,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Huevos revueltos con tostada integral',
      calories: 350,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Chickpea curry with basmati rice',
      calories: 500,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Curry de garbanzos con arroz basmati',
      calories: 500,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Whole wheat pasta with tomato sauce',
      calories: 550,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Pasta integral con salsa de tomate',
      calories: 550,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Grilled shrimp with couscous',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Camarones a la parrilla con cuscús',
      calories: 450,
      bodyType: 'ectomorph',
      language: 'spanish',
    },
    {
      name: 'Black beans with rice and salsa',
      calories: 400,
      bodyType: 'ectomorph',
      language: 'english',
    },
    {
      name: 'Frijoles negros con arroz y salsa',
      calories: 400,
      bodyType: 'ectomorph',
      language: 'spanish',
    },

    // Mesomorph meals
    {
      name: 'Scrambled eggs with avocado and toast',
      calories: 500,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Huevos revueltos con aguacate y tostada',
      calories: 500,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Turkey sandwich on whole grain bread',
      calories: 450,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Sándwich de pavo en pan integral',
      calories: 450,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Grilled chicken with roasted vegetables',
      calories: 550,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Pollo a la parrilla con verduras asadas',
      calories: 550,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Salmon with quinoa and asparagus',
      calories: 600,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Salmón con quinoa y espárragos',
      calories: 600,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Beef stir-fry with brown rice',
      calories: 550,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Salteado de carne con arroz integral',
      calories: 550,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Chicken salad with olive oil dressing',
      calories: 400,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Ensalada de pollo con aderezo de aceite de oliva',
      calories: 400,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Cottage cheese with fruit',
      calories: 250,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Queso cottage con fruta',
      calories: 250,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Grilled steak with mashed potatoes',
      calories: 650,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Filete a la parrilla con puré de papas',
      calories: 650,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Turkey meatballs with whole wheat pasta',
      calories: 600,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Albóndigas de pavo con pasta integral',
      calories: 600,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Egg and veggie breakfast burrito',
      calories: 450,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Burrito de desayuno con huevo y verduras',
      calories: 450,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Chicken breast with sweet potatoes',
      calories: 500,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Pechuga de pollo con batatas',
      calories: 500,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Turkey burger with avocado',
      calories: 500,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Hamburguesa de pavo con aguacate',
      calories: 500,
      bodyType: 'mesomorph',
      language: 'spanish',
    },
    {
      name: 'Shrimp stir-fry with veggies',
      calories: 450,
      bodyType: 'mesomorph',
      language: 'english',
    },
    {
      name: 'Salteado de camarones con verduras',
      calories: 450,
      bodyType: 'mesomorph',
      language: 'spanish',
    },

    // Endomorph meals
    {
      name: 'Spinach omelet with turkey bacon',
      calories: 350,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Tortilla de espinacas con tocino de pavo',
      calories: 350,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Grilled chicken with sautéed spinach',
      calories: 400,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Pollo a la parrilla con espinacas salteadas',
      calories: 400,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Lean steak with cauliflower mash',
      calories: 500,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Filete magro con puré de coliflor',
      calories: 500,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Scrambled eggs with avocado',
      calories: 350,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Huevos revueltos con aguacate',
      calories: 350,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Chicken salad with olive oil',
      calories: 400,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Ensalada de pollo con aceite de oliva',
      calories: 400,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Grilled salmon with asparagus',
      calories: 550,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Salmón a la parrilla con espárragos',
      calories: 550,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Turkey sausage with sautéed mushrooms',
      calories: 350,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Salchicha de pavo con champiñones salteados',
      calories: 350,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Chicken thighs with roasted vegetables',
      calories: 500,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Muslos de pollo con verduras asadas',
      calories: 500,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Ground beef with zucchini noodles',
      calories: 450,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Carne molida con fideos de calabacín',
      calories: 450,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Chicken breast with roasted veggies',
      calories: 400,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Pechuga de pollo con verduras asadas',
      calories: 400,
      bodyType: 'endomorph',
      language: 'spanish',
    },
    {
      name: 'Baked cod with roasted veggies',
      calories: 450,
      bodyType: 'endomorph',
      language: 'english',
    },
    {
      name: 'Bacalao al horno con verduras asadas',
      calories: 450,
      bodyType: 'endomorph',
      language: 'spanish',
    },
  ];

  for (const meal of meals) {
    await addMealToDatabase(meal);
  }
};

export const generateMealPlan = async (
  userProfile: UserProfile
): Promise<MealPlan[]> => {
  const { bodyType, language } = determineBodyTypeAndLanguage(userProfile);
  const dailyCalories = calculateDailyCalories(userProfile);
  const mealPlan: MealPlan[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dailyMeals = await generateDailyMeals(
      bodyType,
      language,
      dailyCalories
    );
    mealPlan.push({
      date: date.toISOString().split('T')[0],
      meals: dailyMeals,
    });
  }

  return mealPlan;
};

const determineBodyTypeAndLanguage = (
  userProfile: UserProfile
): { bodyType: string; language: string } => {
  return { bodyType: 'mesomorph', language: 'english' }; // Adjust this logic as needed
};

const calculateDailyCalories = (userProfile: UserProfile): number => {
  return 2000; // Simplified for example
};

const generateDailyMeals = async (
  bodyType: string,
  language: string,
  dailyCalories: number
) => {
  const mealsQuery = query(
    collection(db, 'meals'),
    where('bodyType', '==', bodyType),
    where('language', '==', language)
  );
  const mealsSnapshot = await getDocs(mealsQuery);
  const meals = mealsSnapshot.docs.map((doc) => doc.data() as Meal);

  return [
    {
      name: 'Breakfast',
      foods: [{ name: meals[0].name, calories: meals[0].calories }],
    },
    {
      name: 'Lunch',
      foods: [{ name: meals[1].name, calories: meals[1].calories }],
    },
    {
      name: 'Dinner',
      foods: [{ name: meals[2].name, calories: meals[2].calories }],
    },
    {
      name: 'Snack',
      foods: [{ name: meals[3].name, calories: meals[3].calories }],
    },
  ];
};
