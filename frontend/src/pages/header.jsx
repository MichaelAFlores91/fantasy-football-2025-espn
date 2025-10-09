import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import player from "../assets/footballplayer.jpg"
import ranking from "../assets/rankingpic.jpg"
import teams from "../assets/groupofpeople.jpg"
import positions from "../assets/nflplayers.webp"

export default function Header() {
    return (
        <div className="nav-container" id="navContainer">
            <div className="header">
                <div className="left-section">
                    <Link to="/" className="nav-link home-link">Home</Link>
                    <Link to="/players" className="nav-link players-link">Players</Link>
                    <Link to="/rankings" className="nav-link rankings-link">Rankings</Link>
                    <Link to="/teams" className="nav-link teams-link">Teams</Link>
                    <Link to="/positions" className="nav-link positions-link">Positions</Link>
                </div>
            </div>
        </div>

    );
}
