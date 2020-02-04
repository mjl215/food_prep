import React from 'react';

import SimpleMap from '../map/SimpleMap';
import Recipe from '../recipe/recipeGrid/RecipeDisplay';


export default function LandingPage() {

    return (
        <div>
            <SimpleMap />
            <p>Landing Page</p>
            <Recipe />
        </div>
    )
}
