document.addEventListener('DOMContentLoaded', () => {
    fetchData('pizza');
});

async function fetchData(query) {
    const container = document.querySelector('.card-container');
    container.innerHTML = '<p>Loading recipes...</p>';

    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const data = await res.json();
        showCards(data.recipes);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `<p style="color:red">Error fetching recipes.</p>`;
    }
}

function showCards(recipes) {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    if (!recipes || recipes.length === 0) {
        container.innerHTML = '<p style="color:red">No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
      <img src="${recipe.image_url}" alt="${recipe.title}">
      <h3>${recipe.publisher}</h3>
      <p>${recipe.title}</p>
      <div class="buttons">
        <button class="source">Source</button>
        <button class="details">Details</button>
      </div>
    `;

        card.querySelector('.source').addEventListener('click', () => {
            window.open(recipe.source_url, '_blank');
        });

        card.querySelector('.details').addEventListener('click', () => {
            const detailsUrl = `https://forkify-api.herokuapp.com/api/get?rId=${recipe.recipe_id}`;
            window.open(detailsUrl, '_blank');
        });

        container.appendChild(card);
    });
}
