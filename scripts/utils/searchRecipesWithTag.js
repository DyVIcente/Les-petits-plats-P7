import { getAppliancesArray, getIngredientsArray, getUstensilsArray } from "./getFilterArrays.js";

//  recherche dans recipesArray pour obtenir les tableaux des ingredients etc d'une recette

export function searchRecipe(tagArray, recipesArray) {
    return recipesArray.filter((recipe) => {
        const ingredients = getIngredientsArray([recipe]);
        const appliances = getAppliancesArray([recipe]);
        const ustensils = getUstensilsArray([recipe]);
        return tagArray.every((tag) => 
        ingredients.includes(tag) || appliances.includes(tag) || ustensils.includes(tag)
        );
    });
}