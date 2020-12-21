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

type DangerousIngredients = Map<string, string>;

function findNoAllergenInredients(
  foods: Food[],
  dangerousIngredients: DangerousIngredients
): [string[], DangerousIngredients] {
  if (foods.every((food) => food.allergens.length === 0)) {
    return [foods.map((food) => food.ingredients).flat(), dangerousIngredients];
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

    if (commonIngredients.length === 1) {
      const newFoods = foods.map((food) => {
        return {
          ingredients: food.ingredients.filter(
            (ingredient) => ingredient !== commonIngredients[0]
          ),
          allergens: food.allergens.filter((al) => al !== allergen),
        };
      });

      dangerousIngredients.set(allergen, commonIngredients[0]);

      return findNoAllergenInredients(newFoods, dangerousIngredients);
    } else {
      i++;
    }
  }
}

export const DayTwentyOne: React.FunctionComponent<
  Record<string, never>
> = () => {
  const foods = parseIngredients(ingredientList);
  const [noAllergens, dangerousIngredients] = findNoAllergenInredients(
    foods,
    new Map()
  );
  const sorted = Array.from(dangerousIngredients.keys()).sort();
  return (
    <>
      <h1>Day Twenty One; Allergen Assessment</h1>

      <p>no allergen ingedients: {noAllergens.join(", ")}</p>

      <p>count: {noAllergens.length}</p>

      <p>
        dangerous ingedients:{" "}
        {sorted.map((allergen) => dangerousIngredients.get(allergen)).join(",")}
      </p>
    </>
  );
};
