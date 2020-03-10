export const filterRecipes = (recipes, {vegetarian, vegan, ingredients, price}) => {
  
  const filterRecipes = recipes.filter(recipe => {
    const veganCheck = !vegan || recipe.vegan === vegan;
    const vegetarianCheck = !vegetarian || recipe.vegetarian === vegetarian;
    return veganCheck && vegetarianCheck;
  })

  return filterRecipes
}