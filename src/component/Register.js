import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import Delay from "../helper/Delay";
import { DotLoaderOverlay } from "react-spinner-overlay";
import SweetAlert2 from 'react-sweetalert2';

function Register() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confPassword = useRef();
    const [errorMsg, setErrorMsg] = useState('');
    const [listErrorName, setListErrorName] = useState([]);
    const [listErrorEmail, setListErrorEmail] = useState([]);
    const [listErrorPassword, setListErrorPassword] = useState([]);
    const [listErrorConfPassword, setListErrorConfPassword] = useState([]);
    const [loading, setLoading] = useState(false);
    const [swalProp, setSwalProp] = useState({});

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault(); // agar tidak reload
        try {
            setLoading(true);
            await axios.post('http://localhost:8000/users', {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                confPassword: confPassword.current.value
            });
            await Delay(1000);
            setLoading(false);
            setSwalProp({
                show: true,
                icon: 'success',
                text: 'Registrasi user berhasil'
            });
        } catch (error) {
            if (error.response) {
                setLoading(false);
                const objError = error.response.data.errors;

                // mengolompokan error berdasarkan path/field input
                const groupedError = objError.reduce((acc, item) => {
                    const { path } = item; // mengambil key path dalam item
                    if (!acc[path]) { // cek apakah group berdasarkan path belum ada
                        acc[path] = []; // buat array berdasarkan value path
                    }
                    acc[path].push(item); // tambahkan item yang sesuai dengan path yg sama
                    return acc;
                }, []); // dibuat nilai awal adalah array

                setListErrorName((groupedError?.name) ? groupedError.name : []);
                setListErrorEmail((groupedError?.email) ? groupedError.email : []);
                setListErrorPassword((groupedError?.password) ? groupedError.password : []);
                setListErrorConfPassword((groupedError?.confPassword) ? groupedError.confPassword : []);
                setErrorMsg('Gagal register!');

                $('#alrt').fadeTo(3000, 500).slideUp(500);
            }
        }
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">

            <DotLoaderOverlay loading={loading} color="#36d7b7" size="15px" between="10px" />

            <SweetAlert2
                {...swalProp}
                didClose={() => {
                    navigate("/") // untuk redirect 
                }}
            />

            <div className="hero-body" >
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={register} className="box">
                                <p className="has-text-centered message is-danger has-text-danger" id='alrt'>
                                    {errorMsg}
                                </p>
                                <div className="field mt-5">
                                    <label className="label ">Name</label>
                                    <div className="controls">
                                        <input type="text" className={(listErrorName.length !== 0) ? "input is-danger" : "input"} placeholder="Name" ref={name} />
                                    </div>
                                    <div className="content help is-danger">
                                        <ul className="ml-3">
                                            {
                                                listErrorName.map((error, index) => (
                                                    <li key={index}>
                                                        {error.msg}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className={(listErrorEmail.length !== 0) ? "input is-danger" : "input"} placeholder="Email" ref={email} />
                                    </div>
                                    <div className="content help is-danger">
                                        <ul className="ml-3">
                                            {
                                                listErrorEmail.map((error, index) => (
                                                    <li key={index}>
                                                        {error.msg}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className={(listErrorPassword.length !== 0) ? "input is-danger" : "input"} placeholder="********" ref={password} />
                                    </div>
                                    <div className="content help is-danger">
                                        <ul className="ml-3">
                                            {
                                                listErrorPassword.map((error, index) => (
                                                    <li key={index}>
                                                        {error.msg}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className={(listErrorConfPassword.length !== 0) ? "input is-danger" : "input"} placeholder="********" ref={confPassword} />
                                    </div>
                                    <div className="content help is-danger">
                                        <ul className="ml-3">
                                            {
                                                listErrorConfPassword.map((error, index) => (
                                                    <li key={index}>
                                                        {error.msg}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="field mt-5"><button className="button is-success is-fullwidth">Register</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Register