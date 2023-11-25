import React, {useRef, useState } from 'react';
import './ReviewSystem.css';
const ReviewSystem = () => {

    const [reviews, setReviews] = useState([]);
    const formRef = useRef(null);

    const submitReview = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const rating = e.target.rating.value;
        const description = e.target.description.value;

        if (title && rating) {
            const newReview = { title, rating, description };
            setReviews([...reviews, newReview]);

            formRef.current.reset();
        } else {
            alert("Title and Rating are required fields");
        }
    };


    const deleteReview = (index) => {
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push("\u2605");
        }
        return stars.join('');
    };

    return (
        <div className='reviewbox'>
            <section className='reviewbox'>
                <h2>Give Review</h2>
                <form onSubmit={submitReview} className='rform' ref={formRef}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />

                    <label htmlFor="rating">Rating</label>
                    <input type="number" id="rating" name="rating" min={0} max={5} required />

                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description"></textarea>
                    <div className='buttons'>
                        <button type="submit" >Submit</button>
                        <button type="button" onClick={() => formRef.current.reset()} >Reset</button>
                    </div>
                </form>
            </section>
            <section className='reviewbox'>
                <h2> Reviews:</h2>
                <ul className='review-list'>
                    {reviews.map((review, index) => (
                        <li key={index} className='review-item'>
                            <strong> Title :{review.title}</strong> <br/>{review.description || "No description"}  <br/>Rating: {renderStars(review.rating)}

                            <button onClick={() => deleteReview(index)} className='deletebutton'>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ReviewSystem;
