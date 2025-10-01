import { Routes, Route } from "react-router-dom";
import Header from "./pages/header.jsx";
import Footer from "./pages/footer.jsx";
import HomePage from "./pages/home.jsx";
import Players from "./pages/players.jsx";
import Rankings from "./pages/rankings.jsx";
import Teams from "./pages/teams.jsx";
import Positions from "./pages/positions.jsx";

function App () {
    return (
        <>
        <header>
            <Header />
        </header>
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/players" element={<Players />} />
                <Route path="/rankings" element={<Rankings />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/positions" element={<Positions />} />
            </Routes>
        </main>
        <footer>
            <Footer />
        </footer>
        </>
    )
}
export default App;
