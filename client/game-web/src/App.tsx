import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "modules/Header/Header";
import LastReviewsListComponent from "views/ReviewsView/LastReviewsList";
import GamesList from "views/GamesView/GamesList";
import Game from "views/GameView/Game";

const App = () => (
    <BrowserRouter>
        <Header />
        <div id="content">
            <Routes>
                <Route path="/games" element={<GamesList />}/>
                <Route path="/games/:id" element={<Game />}/>
                <Route path="/developers" element={<LastReviewsListComponent />}/>
                <Route path="/genres" element={<GamesList />}/>
                <Route path="/" element={<LastReviewsListComponent />} />
            </Routes>
        </div>
    </BrowserRouter>
);

export default App;