import '../css/Home.css';
import Rankings from "./Rankings"
function Home() {

    return (
        <div className="Home">
        <div className="Welcome">
            <h1>International Happiness Report</h1>
            <h2>
                The World Happiness Report is a landmark survey of the state of global happiness 
                that ranks 156 countries by how happy their citizens perceive themselves to be. 
            </h2>
        </div>
        <Rankings />
        </div>
    );
}

export default Home;
