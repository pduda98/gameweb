import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "modules/Header/Header";
import LastReviewsListComponent from "views/ReviewsView/LastReviewsList";
import GamesList from "views/GamesView/GamesList";
import Game from "views/GameView/Game";
import Developer from "views/DeveloperView/Developer";
import DevelopersListView from "views/DevelopersView/DevelopersList";
import GenresListView from "views/GenresView/GenresListView";
import LogIn from "views/LogInView/LogIn";
import SearchView from "views/SearchView/SearchView";

const App = () => (
    <BrowserRouter>
        <Header />
        <div id="content">
            <Routes>
                <Route path="/games" element={<GamesList />}/>
                <Route path="/games/:id" element={<Game />}/>
                <Route path="/developers" element={<DevelopersListView />}/>
                <Route path="/developers/:id" element={<Developer />}/>
                <Route path="/genres" element={<GenresListView />}/>
                <Route path="/login" element={<LogIn />}/>
                <Route path="/" element={<LastReviewsListComponent />} />
                <Route path="search/:searchString" element={<SearchView />} />
            </Routes>
        </div>
    </BrowserRouter>
);

export default App;