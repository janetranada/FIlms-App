import React from 'react';
import Film from '../Film';


const FilmsContainer = (props) => {
    const { filmList, faveFilms, handleClick } = props;

    return (
        <section id="all-films-wrapper">
            <div>
                <h1 className = 'all-films-header'>All Films</h1>
            </div>
            {filmList.map((film, index) => 
                <Film 
                    key = {film.title + '-'+ index} 
                    title = {film.title}
                    handleClick = {handleClick}
                    isFavorite = {faveFilms.includes(film.title)}            
                    section = 'all'
                >
                </Film>
            )}
        </section>
    );
}

export default FilmsContainer;