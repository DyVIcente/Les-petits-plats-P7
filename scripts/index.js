import { recipesArray } from "../data/data.js";
import { getAppliancesArray, getIngredientsArray, getUstensilsArray } from "./utils/getFilterArrays.js";
import { cardRecipeFactory } from "./factories/CardRecipe.js"
import { tagsRecipe } from "./factories/TagsRecipe.js";
import { filterListItem } from "./factories/FilterListItem.js";
import { searchRecipe } from "./utils/searchRecipesWithTag.js";

const FilterContainers = document.querySelectorAll(".filter-container");
const noResultsMessage = document.getElementById("noResultsMessage");

let filteredRecipesArray = recipesArray;

let ingredientsArray = getIngredientsArray(filteredRecipesArray);
let appliancesArray = getAppliancesArray(filteredRecipesArray);
let ustensilsArray = getUstensilsArray(filteredRecipesArray);

let listArrayMapping = [
  { list: "ingredientsList", array: ingredientsArray },
  { list: "appliancesList", array: appliancesArray },
  { list: "ustensilsList", array: ustensilsArray },
];

let filterTagArray = [];

function renderRecipeCards(array) {
  const recipeCardsList = document.querySelector(".recipes");
  recipeCardsList.innerHTML = "";

  

  array.forEach((recipe) => {
    const recipeCardModel = cardRecipeFactory(recipe);
    const recipeCardDOM = recipeCardModel.getRecipeCardDOM();
    recipeCardsList.appendChild(recipeCardDOM);
  });
}

async function renderFilterListItems(id, array) {
  const filterList = document.getElementById(id);

  filterList.innerHTML = "";
  array.forEach((tag) => {
    const filterListModel = filterListItem(tag);
    const filterListItemDOM = filterListModel.getFilterListItem();

    filterList.append(filterListItemDOM);
  });

  const recipesCount = filteredRecipesArray.length;
  const recipeCountElement = document.querySelector('.recipe-count');
  recipeCountElement.textContent = recipesCount + " recettes";
}

function renderTagDiv(tag) {
  const tagContainer = document.querySelector(".tag-container");

  const tagDivModel = tagsRecipe(tag);
  const TagDivDom = tagDivModel.getTagsRecipe();

  tagContainer.append(TagDivDom);

  const tagTextContent = TagDivDom.querySelector('.tag-text').textContent;
  const tagCloseBtn = TagDivDom.querySelector('.tag-icon');

  tagCloseBtn.addEventListener('click', () => {
    filterTagArray = filterTagArray.filter((tag) => tag !== tagTextContent);
    filteredRecipesArray = searchRecipe(filterTagArray, recipesArray);

    TagDivDom.remove();
    renderAllElements();

    
  });

}

function displayFilterDropdown(element) {
  const filterContainer = element;
  const dropdownToggle = filterContainer.querySelector('.dropdown-toggle');
  const filterList = filterContainer.querySelector('.filter-list');
  const filterInput = filterContainer.querySelector('.filter-input');

  filterInput.classList.remove('hidden');

  filterContainer.classList.add('filter-dropdown');
  filterList.style.display = "grid";
  filterList.setAttribute("aria-hidden", "false");


  dropdownToggle.classList.add('dropdown-open');
}

function closeFilterDropdown(element) {
  const filterContainer = element;
  const dropdownToggle = filterContainer.querySelector('.dropdown-toggle');
  const filterList = filterContainer.querySelector('.filter-list');
  const filterInput = filterContainer.querySelector('.filter-input');

  if (!filterInput.contains(document.activeElement)) {
    filterInput.classList.add('hidden');
    filterContainer.classList.remove('filter-dropdown');
    filterList.style.display = "none";
    filterList.setAttribute("aria-hidden", "true");
    dropdownToggle.classList.remove('dropdown-open');
  }
}


async function refreshFilterArrays() {
  ingredientsArray = await getIngredientsArray(filteredRecipesArray);
  appliancesArray = await getAppliancesArray(filteredRecipesArray);
  ustensilsArray = await getUstensilsArray(filteredRecipesArray);

  listArrayMapping = [
    { list: "ingredientsList", array: ingredientsArray },
    { list: "appliancesList", array: appliancesArray },
    { list: "ustensilsList", array: ustensilsArray},
  ];
}

// render all elements avec forEach
// async function renderAllElements() {
//   await refreshFilterArrays();

//   renderRecipeCards(filteredRecipesArray);
        
//   listArrayMapping.forEach((element) => {
//     renderFilterListItems(element.list, element.array);
//   });
//   if (filteredRecipesArray.length === 0) {
//     const searchInput = document.querySelector("#searchFormInput");
//     const searchText = searchInput.value; 
  
  
//     noResultsMessage.textContent = `Aucune recette ne contient  "${searchText}". Vous pouvez chercher «
//     tarte aux pommes »,  « poisson », etc.`;
  
//     noResultsMessage.style.display = "block";
//   } else {
//     noResultsMessage.style.display = "none";
//   }
// }


// renderall element mais avec boucle for
async function renderAllElements() {
  await refreshFilterArrays();

  renderRecipeCards(filteredRecipesArray);

  for (let i = 0; i < listArrayMapping.length; i++) {
    const element = listArrayMapping[i];
    renderFilterListItems(element.list, element.array);
  }

  const searchInput = document.querySelector("#searchFormInput");
  const searchText = searchInput.value; 

  if (filteredRecipesArray.length === 0) {
   
    noResultsMessage.textContent = `Aucune recette ne contient  "${searchText}". Vous pouvez chercher « tarte aux pommes »,  « poisson », etc.`;

    noResultsMessage.style.display = "block"; 
  } else {
    noResultsMessage.style.display = "none"; 
  }
}

//  ICI CHANGE LECOUTE POUR LE BTN 
// LES EVENTS LISTENERS

// ecoute de l'input et utilisation de filter 
// const searchInput = document.querySelector("#searchFormInput");

// searchInput.addEventListener("input", () => {
//   const startTime = performance.now();
//   const searchText = searchInput.value.toLowerCase();

//   if (searchText.length < 3) {
//     filteredRecipesArray = recipesArray; 
//     console.log("Le texte doit contenir au moins 3 caractères.");
//   } else {
//     filteredRecipesArray = recipesArray.filter((recipe) => {
//       const title = recipe.name.toLowerCase();
//       const ingredients = recipe.ingredients.join(" ").toLowerCase();
//       const description = recipe.description.toLowerCase();
      
//       return title.includes(searchText) || ingredients.includes(searchText) || description.includes(searchText);
//     });

//     console.log("Recherche input principal", filteredRecipesArray);
//   }

//   renderAllElements();
//   const endTime = performance.now(); 
//    const executionTime = endTime - startTime;
//   console.log(`Le filtrage des recettes a pris ${executionTime} millisecondes.`);
// });


//  Le "x" pour effacer l'input principale
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#searchFormInput");
  const clearSearchInputButton = document.getElementById("clearSearchInput");

  function updateClearButtonVisibility() {
    if (searchInput.value.trim() !== "") {
      clearSearchInputButton.style.display = "block";
    } else {
      clearSearchInputButton.style.display = "none";
    }
  }

  searchInput.addEventListener("input", () => {
    updateClearButtonVisibility();
  });

  clearSearchInputButton.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchInputButton.style.display = "none";
    searchInput.focus();
  });

  updateClearButtonVisibility();
});


// ecoute de l'input et utilisation de boucle for
const searchInput = document.querySelector("#searchFormInput");

searchInput.addEventListener("input", () => {
  const startTime = performance.now();

  const searchText = searchInput.value.toLowerCase();

  if (searchText.length < 3) {
    filteredRecipesArray = recipesArray; 
    console.log("Le texte doit contenir au moins 3 caractères.");
  } else {
    filteredRecipesArray = [];

    for (let i = 0; i < recipesArray.length; i++) {
      const recipe = recipesArray[i];
      const title = recipe.name.toLowerCase();
      const ingredients = recipe.ingredients.join(" ").toLowerCase();
      const description = recipe.description.toLowerCase();

      if (title.includes(searchText) || ingredients.includes(searchText) || description.includes(searchText)) {
        filteredRecipesArray.push(recipe);
      }
    }

    console.log("Recherche input principal", filteredRecipesArray);
  }

  renderAllElements();

  const endTime = performance.now(); 
  const executionTime = endTime - startTime;

  console.log(`Le filtrage des recettes a pris ${executionTime} millisecondes.`);
});

FilterContainers.forEach((element) => {
  const filterContainer = element;
  const filterList = filterContainer.querySelector(".filter-list"); 
  const filterInput = filterContainer.querySelector(".filter-input");
  const filterListId = filterList.id;

  let isDropdownOpen = false;

  filterContainer.addEventListener("click", (e) => {
    e.preventDefault(); 
    renderAllElements();
    if (isDropdownOpen) { 
      closeFilterDropdown(element);
      isDropdownOpen = false; 
    } else { 
      displayFilterDropdown(element);
      isDropdownOpen = true;
    }
  });

  
    filterInput.addEventListener("input", () => {
      refreshFilterArrays();
      const { array: filterListArray } = listArrayMapping.find(
        (item) => item.list == filterListId
      );
      const filteredListArray = filterListArray.filter((item) =>
        item.toLowerCase().includes(filterInput.value.toLowerCase())
      );
  
      renderFilterListItems(filterListId, filteredListArray);
    });

  filterList.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains("filter-list-item")) {
      const filterTag = e.target.textContent;

      if (!filterTagArray.includes(filterTag)) {
        filterTagArray.push(filterTag);
        filteredRecipesArray = searchRecipe(filterTagArray, recipesArray);

        renderTagDiv(filterTag)

        closeFilterDropdown(element);
        filterInput.value = "";

        renderAllElements();
      }
    }
  });
});
renderAllElements();

