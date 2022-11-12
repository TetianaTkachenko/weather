import React from 'react'
import style from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <nav className={style.header}>
            <div className={style.logoBox}>
                <NavLink to='/' className={style.header_brand}>
                    Weather
                </NavLink>
            </div>
        </nav>

    )
}

export default Header;
