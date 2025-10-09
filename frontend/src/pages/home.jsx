import { useState, useEffect } from "react";
import "./home.css";
//import background from "./assets/footballfield.jpg"

function HomePage () {

    return (
    <>
    <div>
       <h1 className="titles">Welcome to Fantasy Football 2025 Edition</h1>
        </div>
        <h2 className="titles">MY SITE</h2>
    <p className="paragraph">
        This is where I experiment with rankings and updates on my fantasy teams from week one to the finals!
    </p>
    <h2 className="titles">PLAYERS</h2>
        <p className="paragraph">
            These are where you can find players and see who is on each team
        </p>
    <h2 className="titles">RANKINGS</h2>
        <p className="paragraph">
            This is where I have everyone ranked based on my team strength
        </p>
    <h2 className="titles">TEAMS</h2>
        <p className="paragraph">
            The teams of players will be posted here with updates
        </p>
    <h2 className="titles">POSITIONS</h2>
    <p className="paragraph">
        This is where you can find what position each player plays
    </p>
    </>
    )
}

export default HomePage;
