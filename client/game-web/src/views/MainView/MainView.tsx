import Header from "../../components/Header/Header";
import LastReviewsListComponent from "./LastReviewsList";

const MainView = () => (
    <>
        <Header />
        <div id="content">
            <LastReviewsListComponent />
        </div>
    </>
);

export default MainView;
