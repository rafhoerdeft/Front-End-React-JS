import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from '../middleware/AuthProvider';
import ReactPaginate from 'react-paginate';

const ProductList = () => {
    // index 1 = State name -- ex: product
    // index 2 = name function to setState -- ex: setProduct
    // in useState() filled initial value -- ex: "" / [] / 0
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [msg, setMsg] = useState("");
    const query = useRef("");

    const { token, axiosJWT, refreshToken } = useAuth();

    useEffect(() => {
        refreshToken()
        // getProducts()
        getProductsPaging()
    }, [token, axiosJWT, page, keyword]); // useEffect akan run apabila ada perubahan pada token atau axiosJWT

    // const getProducts = async () => {
    //     // menggunakan axiosJWT pada middleware krn perlu token utk mengakses
    //     const response = await axiosJWT.get("http://localhost:8000/products", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     setProducts(response.data);
    // }

    const getProductsPaging = async () => {
        // menggunakan axiosJWT pada middleware krn perlu token utk mengakses
        const response = await axiosJWT.get(`http://localhost:8000/products/paging?search=${keyword}&page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProducts(response.data.result);
        setPage(response.data.page);
        setLimit(response.data.limit);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    }

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // getProducts();
            getProductsPaging();
        } catch (error) {
            console.log(error);
        }
    }

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query.current.value);
    }

    const changePage = ({ selected }) => {
        setPage(selected);
    }

    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-one-quarter">
                    <Link to="/product/add" className="button is-primary">
                        <span className="icon is-small"><i className="fas fa-plus"></i></span>
                        <span>Add New Item</span>
                    </Link>
                </div>
                <div className="column">
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input type="text" className="input" placeholder="Cari produk" ref={query} />
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-info">
                                    <span className="icon is-small"><i className="fas fa-search"></i></span>
                                    <span>Cari</span>
                                </button>
                            </div>
                        </div>
                    </form>
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

            <p>Total Data: {rows} Page: {rows ? page + 1 : 0} of {pages}</p>

            <nav
                className="pagination is-centered py-5"
                role="navigation"
                aria-label="pagination"
                key={rows}
            >
                <ReactPaginate
                    previousLabel={"< Prev"}
                    nextLabel={"Next >"}
                    pageCount={Math.min(10, pages)} // dibatasi maksimal 10 pages jika lebih dari 10
                    onPageChange={changePage}
                    containerClassName={"pagination-list"}
                    pageLinkClassName={"pagination-link"}
                    previousLinkClassName={"pagination-previous"}
                    nextLinkClassName={"pagination-next"}
                    activeLinkClassName={"pagination-link is-current"}
                    disabledLinkClassName={"pagination-link is-disabled"}
                />
            </nav>

        </div>
    )
}

export default ProductList