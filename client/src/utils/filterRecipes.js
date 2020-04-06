export const filterRecipes = (recipes, {vegetarian, vegan, ingredients, maxPrice, search}) => {
  
  const filterRecipes = recipes.filter(recipe => {
    const veganCheck = !vegan || recipe.vegan === vegan;
    const vegetarianCheck = !vegetarian || recipe.vegetarian === vegetarian;
    const titleSearchCheck = search ? recipe.title.toLowerCase().includes(search.toLowerCase()) :  true;
    const desciptionSearchCheck = search ? recipe.description.toLowerCase().includes(search.toLowerCase()) :  true;
    const ingredientsSearchCheck = search ? recipe.ingredients.some(x => x.includes(search.toLowerCase())) :  true;
    const removeIngredientCheck = ingredients.length !== 0 ?  (recipe.ingredients.some(ingredient => ingredients.indexOf(ingredient) !== -1) ? false : true) : true;
    const priceCheck = maxPrice ? recipe.costPerMeal < maxPrice : true;
    const searchCheck = titleSearchCheck || desciptionSearchCheck || ingredientsSearchCheck;
    return veganCheck && vegetarianCheck && searchCheck && removeIngredientCheck && priceCheck;
  })
  return filterRecipes
}