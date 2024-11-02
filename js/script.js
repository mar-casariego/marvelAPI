document.addEventListener("DOMContentLoaded", () => {
  const movieList = document.getElementById("movie-list");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

// Función para obtener y filtrar las películas según el término de búsqueda
async function fetchAndFilterMovies() {
  try {
      const response = await fetch("https://www.swapi.tech/api/films");
      const data = await response.json();
      const movies = data.result;

      // Filtra las películas según el término de búsqueda
      const searchText = searchInput.value.toLowerCase();
      const filteredMovies = movies.filter(movie =>
          movie.properties.title.toLowerCase().includes(searchText)
      );

      // Muestra solo las películas que coinciden con la búsqueda
      displayMovies(filteredMovies);
  } catch (error) {
      console.error("Error al obtener las películas:", error);
      movieList.innerHTML = "<p>Error al cargar las películas.</p>";
  }
}

// Función para mostrar las películas en el DOM
function displayMovies(movies) {
  movieList.innerHTML = ""; // Limpiar la lista de películas

  if (movies.length === 0) {
      movieList.innerHTML = "<p>No se encontraron películas con ese título.</p>";
      return;
  }

  movies.forEach(movie => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
          <h2>${movie.properties.title}</h2>
          <p><strong>Director:</strong> ${movie.properties.director}</p>
          <p><strong>Fecha de estreno:</strong> ${movie.properties.release_date}</p>
          <p><strong>Sinopsis:</strong> ${movie.properties.opening_crawl}</p>
      `;
      movieList.appendChild(movieElement);
  });
}

// Ejecutar la función de búsqueda al hacer clic en el botón
searchButton.addEventListener("click", fetchAndFilterMovies);
});