import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Favorites from './components/Favorites';
import FilmsContainer from './components/FilmsContainer';
import { getFilms } from './lib/api';

function App() {
  const [filmList, setFilmList] = useState([]);
  const [hasFavorite, setHasFavorite] = useState(false);
  const [favoriteFilms, setFavoriteFilms] = useState([]);
  const [hasError, setHasError] = useState(false);

  const fetchFilmsFromApi = async () => {
    const filmApiUrl = 'https://swapi.dev/api/films/';

    try {
      const response = await getFilms(filmApiUrl);
      const filmsFromApi= response.data.results;
      setFilmList(filmsFromApi);
    } catch (err) {
      setHasError(true);
    }
  }

  const fetchFavoritesFromLocalStorage = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteFilmList'));

    if (storedFavorites && storedFavorites.length > 0) {
      setHasFavorite(true);
      setFavoriteFilms(storedFavorites);
    }
  }

  const saveToLocalStorage = (itemClicked) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteFilmList')) || [];
    storedFavorites.push(itemClicked);
    localStorage.setItem('favoriteFilmList', JSON.stringify(storedFavorites));
    setHasFavorite(true);
    setFavoriteFilms(prevFavorites => {
      return [...prevFavorites, itemClicked]
    })
  }

  const deleteFromLocalStorage = (itemClicked) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteFilmList'));
    const filteredFavorites = storedFavorites.filter( storedItem => storedItem !== itemClicked);
    localStorage.setItem('favoriteFilmList', JSON.stringify(filteredFavorites));
    setFavoriteFilms(filteredFavorites);

    if(filteredFavorites.length === 0) {
      setHasFavorite(false);
    }
  }

  const handleHeartClick = (event) => {
    const clickedItemId = event.currentTarget.id;
    const clickedItemContainer = document.getElementById(clickedItemId);
    const clickedItemName = clickedItemId.split('-')[1];

    if (clickedItemContainer.classList.contains('red')) {
      deleteFromLocalStorage(clickedItemName);
    } else {
      saveToLocalStorage(clickedItemName);
    }

    clickedItemContainer.classList.toggle('red');
  }

  useEffect(() => {
    fetchFilmsFromApi();
    fetchFavoritesFromLocalStorage();
  }, [])

  
  return (
    <div className="App">
      <Header></Header>

      {hasError && 
          <>
            <p className = 'error-msg'>An ERROR has occurred.</p>
            <p className = 'error-msg'>Please try again later.</p>
          </>
      }

      {!hasError && hasFavorite && 
          <Favorites
              favoriteFilms = {favoriteFilms}
              handleClick = {handleHeartClick}
          >
          </Favorites>
      }

      {!hasError && 
          <FilmsContainer
              filmList = {filmList}
              faveFilms = {favoriteFilms}
              handleClick = {handleHeartClick}
          >
          </FilmsContainer>
      }
      
    </div>
  );
}

export default App;
