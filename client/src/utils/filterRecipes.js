export const filterRecipes = (recipes, {vegetarian, vegan, ingredients, price, search}) => {
  
  const filterRecipes = recipes.filter(recipe => {
    const veganCheck = !vegan || recipe.vegan === vegan;
    const vegetarianCheck = !vegetarian || recipe.vegetarian === vegetarian;
    const titleSearchCheck = search ? recipe.title.toLowerCase().includes(search.toLowerCase()) :  true;
    const desciptionSearchCheck = search ? recipe.description.toLowerCase().includes(search.toLowerCase()) :  true;
    const ingredientsSearchCheck = search ? recipe.ingredients.includes(search.toLowerCase()) :  true;
    console.log(recipe.ingredients);
    const searchCheck = titleSearchCheck || desciptionSearchCheck;
    
    return veganCheck && vegetarianCheck && searchCheck;
  })

  return filterRecipes
}