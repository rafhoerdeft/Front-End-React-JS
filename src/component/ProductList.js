import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
    // index 1 = State name -- ex: product
    // index 2 = name function to setState -- ex: setProduct
    // in useState() filled initial value -- ex: "" / [] / 0
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
    }

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/products/${productId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column">
                    <Link to="/add" className="button is-primary">
                        <span className="icon is-small"><i className="fas fa-plus"></i></span>
                        <span>Add New Item</span>
                    </Link>
                </div>
            </div>
            <div className="columns is-multiline">
                {products.map((product) => (
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
                                <Link to={`edit/${product.id}`} className="card-footer-item">Edit</Link>
                                <a className="card-footer-item" onClick={() => deleteProduct(product.id)}>Delete</a>
                            </footer>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList