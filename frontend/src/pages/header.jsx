import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
    return (
        <div className="nav-container" id="navContainer">
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/players" className="nav-link">Players</Link>
                    <Link to="/rankings" className="nav-link">Rankings</Link>
                    <Link to="/teams" className="nav-link">Teams</Link>
                    <Link to="/positions" className="nav-link">Positions</Link>
                </div>
            </div>
        </div>

    );
}
