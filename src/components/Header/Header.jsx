import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to = "/register">Register</Link>
            <Link to = "/login">LogIn</Link>
        </div>
    );
};

export default Header;