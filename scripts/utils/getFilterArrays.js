export function getIngredientsArray(array) {
    return Array.from(
      new Set(
        array.flatMap((recipe) =>
          recipe.ingredients.map((ingredient) =>
            ingredient.ingredient.toLowerCase()
          )
        )
      )
    ).sort();
  }