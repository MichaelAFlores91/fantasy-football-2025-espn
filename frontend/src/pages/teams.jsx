import { useState, useEffect } from "react";
import "./teams.css";
import { getTeams } from "../../api";

export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getTheTeams() {
            try {
                const fetchedTeams = await getTeams();
                if (fetchedTeams instanceof Error) {
                    setError(fetchedTeams);
                    return;
                }
                setTeams(fetchedTeams);
            } catch (err) {
                setError(err);
            }
        }
        getTheTeams();
    }, []);

    if (error) {
        return <h1>{error.message}</h1>;
    }

    console.log("Fetched teams:", teams);

    const teamElements = teams.map((team) => (
        <h2 key={team.id}>
            NAME: [{team.team_name}] OWNER: [{team.user_id}] ID: [{team.id}]
        </h2>
    ));

    return (
        <div className="team-list">
            <h1>Teams</h1>
            <div className="teams">{teamElements}</div>
        </div>
    );
}
