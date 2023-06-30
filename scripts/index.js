function getRecipes() {
    return fetch(('./data/data.json'))
    .then(response => response.json());
}

function displayData(recipes) {
    
 const recipesModel = recipesFactory(recipes);
 const recipePicture = recipesModel.getRecipesImg();
}