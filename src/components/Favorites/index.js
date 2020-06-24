import React from 'react';
import Film from '../Film';


const Favorites = (props) => {
    const { favoriteFilms, handleClick } = props;

    return (
        <section className = 'favorites-wrapper'>
            <h1 className = 'favorites-header'>My Favorites</h1>
            {favoriteFilms.map((item, index) => 
                <Film
                    key = {`fave-${item}-${index}`}
                    title = {item}
                    handleClick = {handleClick}
                    isFavorite = {true}
                    section = 'fave'
                >
                </Film>
            )}
        </section>
    );
}

export default Favorites;