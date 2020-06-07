import React from 'react';
import './styles.css';


const Film = (props) => {
    const { title, handleClick, isFavorite, section } = props;
    
    return (
        <div className = {`${section} film-card`}>
            <h3>{title}</h3>
            <div
                className = {`heart-icon${isFavorite ? ' red' : ''}`}
                onClick = {handleClick}
                id = {`${section}-${title}`}
            >
                {isFavorite && <i className="fas fa-heart"></i>}
                {!isFavorite && <i className="far fa-heart"></i>}
            </div>
        </div>
    );
}

export default Film;