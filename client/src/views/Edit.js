import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CardForm from '../components/CardForm';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const [card, setCard] = useState();
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    //Conditionally render the api endpoint base url 
    const BASE_URL = process.env.NODE_ENV === 'production'
        // for production 
        ? process.env.REACT_APP_SERVER_URL
        // or development environment
        : 'http://localhost:8000'
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(BASE_URL + '/api/card/' + id)
            .then(res => {
                setCard(res.data);
                setLoaded(true);
            })
    }, []);

    const updateCard = card => {
        axios.put(BASE_URL + '/api/card/' + id, card)
            .then(res => navigate('/viewall'))
                // after editing go to viewall
            .catch(err => {
                // Unpack errors into iterable array
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);});
    }

    const deleteCard = (cardId) => {
        axios.delete(BASE_URL + '/api/card/' + cardId)
            .then(res => {
                navigate(-1);
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            {loaded && (
                <>
                    <h1>{card.cardTitle}</h1>
                    <CardForm
                        // pass update fn and text to form
                        onSubmitProp={updateCard}
                        errors={errors}
                        initialTitle={card.cardTitle}
                        initialDesc={card.cardDescription}
                        inputVal='Update'
                    />
                    <button className='btn btn-dark me-2' onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle me-2" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>
                        Go Back
                    </button>
                    ||
                    <button className='btn btn-danger ms-2' onClick={() => deleteCard(card._id)}>
                        Delete  
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 ms-2" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </button>
                </>)}
        </div>
    )
}
export default Update;