export function cardRecipeFactory(data) {
    const { name, image, servings, id, ingredients, time, description } = data;
    const picture = `assets/${image}`;

    // LE HEADER DE NOTRE CARD AVEC SON IMAGE ET LE TIMER
    function getCardRecipeHeaderDOM() {
        const recipeCardHeader = `
        <div class="card-image">
            <img src="${picture}" alt="">
            <p class="card-timer">
                ${time}min
            </p>
        </div>
        `;
        return recipeCardHeader;
    }

    // LE CONTENU DESCRIPTIF DE LA CARD
    function getRecipeCardDescriptionDOM() {
        let recipeCardIngredients = "";

        ingredients.forEach((element) => {
            const recipeName = element.ingredient;
            const recipeQuantity = element.quantity ? element.quantity : "";
            const recipeUnit = element.unit ? element.unit : "";

            recipeCardIngredients += `
            <li class="">
                <p class="ingredient-list">${recipeName}</p>
                <p class="ingredient-unit">${recipeQuantity} ${recipeUnit}</p>
            </li>
            `;
        });

        const recipeCardDescription = `
        <div class="card-content-ingredient">
            <h2>${name}</h2>
            <h3>recette</h3>
            <p>${description}</p>
            <h3>ingrédients</h3>
            <ul>
                ${recipeCardIngredients}
            </ul>
        </div>
        `;

        return recipeCardDescription;
    }

    function getRecipeCardDOM() {
        const listItem = document.createElement("li");
        listItem.className = ""; 

        const recipeCard = document.createElement("div");
        recipeCard.className = "card-content"; 

        recipeCard.innerHTML += getCardRecipeHeaderDOM();
        recipeCard.innerHTML += getRecipeCardDescriptionDOM();

        listItem.append(recipeCard);

        return listItem;
    }

    return { getRecipeCardDOM };
}
