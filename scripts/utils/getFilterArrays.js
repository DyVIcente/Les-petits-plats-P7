// tableau de recette => tableau trié avec les ingrédients uniques 
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
// appareils 
export function getAppliancesArray(array) {
  return Array.from(
    new Set(array.map((recipe) => recipe.appliance.toLowerCase()))
  ).sort();
}

// ustensiles 
export function getUstensilsArray(array) {
  return Array.from(
    new Set(array.flatMap((recipe) => recipe.ustensils.map((ustensil) => ustensil.toLowerCase()))
    )
  ).sort();
}
