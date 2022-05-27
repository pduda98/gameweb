import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "modules/Header/Header";
import LastReviewsListComponent from "views/ReviewsView/LastReviewsList";
import GamesListComponent from "views/GamesView/GamesList";

const App = () => (
    <BrowserRouter>
        <Header />
        <div id="content">
            <Routes>
                <Route path="/games" element={<GamesListComponent />}/>
                <Route path="/developers" element={<LastReviewsListComponent />}/>
                <Route path="/genres" element={<GamesListComponent />}/>
                <Route path="/" element={<LastReviewsListComponent />} />
            </Routes>
        </div>
    </BrowserRouter>
);

export default App;