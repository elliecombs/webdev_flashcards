import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CardList = (props) => {
    const navigate = useNavigate();
    const [showDescription, setShowDescription] = useState(false);

    const flipCard = (e) => {
        setShowDescription(showDescription => !showDescription);
    }

    const editCard = (cardId) => {
        navigate('/edit/' + cardId)
    }

    return (
        <div className="cardContainer container">
            {props.card.map((card, i) =>
                <div className="card" key={i} onClick={(e) => { flipCard() }}>
                    {showDescription ?
                    <div className="description">| Description | <br/> {card.cardDescription}</div> //true
                        :
                    <div className="title">| Title | <br/> {card.cardTitle}</div> //false (starts false by default)
                    }
                    <br />
                    <button onClick={(e) => { editCard(card._id)}} className="btn btn-secondary">
                        Edit
                    </button>
                </div>
            )}
        </div>
    )
}

export default CardList;