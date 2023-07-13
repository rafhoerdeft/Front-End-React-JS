import React from 'react'
import axios from "axios";

const deleteProduct = async (productId) => {
    try {
        await axios.delete(`http://localhost:8000/products/${productId}`);
        // getProducts();
    } catch (error) {
        console.log(error);
    }
}

const CardProduct = ({ product }) => {
    return (
        <div className="column is-one-quarter" key={product.id}>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={product.url} alt={"image" + product.id} />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={product.url} alt={"image" + product.id} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{product.name}</p>
                        </div>
                    </div>
                </div>

                <footer className="card-footer">
                    <a className="card-footer-item">Edit</a>
                    <a className="card-footer-item" onClick={() => deleteProduct(product.id)}>Delete</a>
                </footer>
            </div>
        </div>
    )
}

export default CardProduct