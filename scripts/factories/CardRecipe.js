function cardRecipeFactory(data) {
    const { name, image, servings, id, ingredients, time } = data;
    const picture = `assets/${image}`;

    
   
    


//  LE HEADER DE NOTRE CARD AVEC SON IMAGE ET LE TIMERE
    function cardRecipeFactoryDOM() {
        const recipeCardHeader = document.createElement('div');
        recipeCardHeader.className = 'card';
        recipeCardHeader.textContent = name;

        const img = getCardImageDOM();

        const clock = document.createElement('p');
        clock.className = 'card-timer';
        clock.textContent = time; 

        recipeCardHeader.appendChild(img);
        recipeCardHeader.appendChild(clock);    
    }

    function getCardImageDOM() {
        const img = document.createElement('img');
        img.setAttribute('src', image);
        img.setAttribute('alt', name);
        img.setAttribute('loading', 'lazy');

        return (img);
    }
     return (getCardImageDOM, cardRecipeFactoryDOM);



     function getRecipeCardDOM() {
       recipeCardIngredients = "";

        ingrediends.forEach((element) => {
            const recipeName = element.ingredient;
            const recipeQuantity = element.quantity ? element.quantity : "";
            const recipeUnit = element.unit ? element.unit : "";

           function recipeCardIngredients() {
//  INSERER LE DOM ICI POUR LA DESCRIPTION
           }


        
        })
     }
    //  CREER LE DOM POUR LA CARD EN GENERAL GENRE EN LISTE DE CARDS
}

