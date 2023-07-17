import React from 'react'
import { useAuth } from '../../middleware/AuthProvider'

const Navbar = () => {
    const { name, logout } = useAuth()

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/product" className="navbar-item">
                            Home
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <span className="mr-5">Hello, {name}</span>
                            <div className="buttons">
                                <button onClick={logout} className="button is-light">
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar