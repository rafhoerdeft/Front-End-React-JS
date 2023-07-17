import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../middleware/AuthProvider';

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("No file uploaded");
    const [preview, setPreview] = useState("");
    const {axiosJWT} = useAuth();
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setFileName(image.name);
        setPreview(URL.createObjectURL(image));
    }

    const saveProduct = async (e) => {
        e.preventDefault(); // agar saat submit tidak reload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);

        try {
            await axiosJWT.post("http://localhost:8000/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate("/product"); // redirect to home
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     const fileInput = document.querySelector('#file-upload input[type=file]');
    //     fileInput.onchange = () => {
    //         if (fileInput.files.length > 0) {
    //             const fileName = document.querySelector('#file-upload .file-name');
    //             fileName.textContent = fileInput.files[0].name;
    //         }
    //     }
    // }, [])

    return (
        <div className="columns is-centered mt-5">
            <div className="column is-half">
                <form onSubmit={saveProduct}>
                    <div className="field">
                        <label className="label">Product Name</label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Product Name"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="" className="label">Image</label>
                        <div className="control">
                            <div id="file-upload" className="file has-name is-fullwidth">
                                <label className="file-label">
                                    <input
                                        className="file-input"
                                        type="file"
                                        name="image"
                                        onChange={loadImage}
                                    />
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span className="file-name">
                                        {fileName}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {
                        preview ?
                            (
                                <figure className="image is-128x128">
                                    <img src={preview} alt="Preview image" />
                                </figure>
                            )
                            : ("")
                    }

                    <div className="columns">
                        <div className="column is-one-fifth">
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-fullwidth is-success">
                                        <span className="icon is-small">
                                            <i className="fas fa-check"></i>
                                        </span>
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="column is-one-fifth">
                            <div className="field">
                                <div className="control">
                                    <Link to="/product" className="button is-fullwidth is-link">
                                        <span className="icon is-small">
                                            <i className="fas fa-arrow-left"></i>
                                        </span>
                                        <span>Back</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct