// boots up the app
const apiKey = "b53e1c457e124f6c5bfda2832a61fca8";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPath = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apiKey}&langauge=en-US`,
}


function init() {
    fetchAndBuildMoviesSection(apiPath.fetchTrending, 'Trending Now');
    fetchAndBuildAllSection();
}

function fetchAndBuildAllSection() {
    fetch(apiPath.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if (Array.isArray(categories) && categories.length) {
                categories.forEach(category => {
                    fetchAndBuildMoviesSection(apiPath.fetchMoviesList(category.id), category.name);
                });

            }
            // console.table(movies);
        })
        .catch(err => console.error(err));
}

// async function fetchAndBuildAllSection() {
//     try {
//         const res = await fetch(apiPath.fetchAllCategories);
//         const resJson = await res.json();
//         const categories = resJson.genres;
//         if (Array.isArray(categories) && categories.length) {
//             categories.forEach(category => {
//                 fetchAndBuildMoviesSection(apiPath.fetchMoviesList(category.id), category);
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }

// }

function fetchAndBuildMoviesSection(fetchUrl, categoryName) {
    console.log(fetchUrl, categoryName);

    fetch(fetchUrl)                                  //  syntax for api fetch
        .then(res => res.json())
        .then(res => {
            console.table(res.results);
            const movies = res.results;
            if (Array.isArray(movies) && movies.length) {
                buildMoviesSection(movies, categoryName);
            }
        })
        .catch(err => console.error(err));
}

function buildMoviesSection(list, categoryName) {
    console.log(list, categoryName);

    const moviesContainer = document.getElementsByClassName('movieContainer')[0];
    console.log("Container: ", moviesContainer);

    const moviesListHTML = list.map(item => {
        return (
            `<img src="${imgPath}${item.backdrop_path}" class="movieItem" alt="${item.title}" />`);

    }).join('');

    console.log(moviesListHTML);

    const moviesSectionHTML = `
    <div class="movieSection">
        <h2 class="movieSectionHeading">${categoryName}<span class="exploreNudge">Explore All</span></h2>
          <div class="movieRow">  ${moviesListHTML}
          </div>
    </div>`

    console.log(moviesSectionHTML);

    

    const div = document.createElement('div');
    div.className = "moviesSection"
    div.innerHTML = moviesSectionHTML;


    //append html into movies container
    moviesContainer.append(div);

}

window.addEventListener('load', function () {
    init()
}) 