import { recipesArray } from "../data/data.js";
import { getIngredientsArray } from "./utils/getFilterArrays.js";
import { cardRecipeFactory } from "./factories/CardRecipe.js"

let filteredRecipesArray = recipesArray;

let ingredientsArray = getIngredientsArray(filteredRecipesArray)

function renderRecipeCards(filteredRecipesArray) {
    const recipeCardsList = document.querySelector(".recipes");

    recipeCardsList.innerHTML = "";

    filteredRecipesArray.forEach((recipe) => {
        const recipeCardModel = cardRecipeFactory(recipe);
        const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
        recipeCardsList.appendChild(recipeCardDOM);
    })
}
renderRecipeCards(filteredRecipesArray);

