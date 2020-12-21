import React from "react";
import { ingredientList } from "./DayTwentyOne/ingredientList";

interface Food {
  ingredients: string[];
  allergens: string[];
}

function parseIngredients(ingredientList: string): Food[] {
  return ingredientList.split("\n").map((line) => {
    const [ingredientString, allergenString] = line.split(" (contains ");
    return {
      ingredients: ingredientString.split(" "),
      allergens: allergenString.slice(0, allergenString.length - 1).split(", "),
    };
  });
}

function findNoAllergenInredients(foods: Food[]): string[] {
  if (foods.every((food) => food.allergens.length === 0)) {
    return foods.map((food) => food.ingredients).flat();
  }
  let i = 0;
  while (true) {
    const allergen = foods.map((food) => food.allergens).flat()[i];
    const foodsWithAllergen = foods.filter((food) =>
      food.allergens.includes(allergen)
    );
    const commonIngredients = foodsWithAllergen[0].ingredients.filter(
      (ingredient) =>
        foodsWithAllergen.every((food) => food.ingredients.includes(ingredient))
    );
    console.log({ commonIngredients, allergen });

    if (commonIngredients.length === 1) {
      const newFoods = foods.map((food) => {
        return {
          ingredients: food.ingredients.filter(
            (ingredient) => ingredient !== commonIngredients[0]
          ),
          allergens: food.allergens.filter((al) => al !== allergen),
        };
      });

      return findNoAllergenInredients(newFoods);
    } else {
      i++;
    }
  }
}

export const DayTwentyOne: React.FunctionComponent<
  Record<string, never>
> = () => {
  const foods = parseIngredients(ingredientList);
  const noAllergens = findNoAllergenInredients(foods);
  return (
    <>
      <h1>Day Twenty One; Allergen Assessment</h1>

      <p>
        no allergen ingedients: {noAllergens.join(", ")} - count:{" "}
        {noAllergens.length}
      </p>
    </>
  );
};
