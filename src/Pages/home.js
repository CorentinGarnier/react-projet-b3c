import '../css/home.css';
import { useHistory } from 'react-router-dom';
const Home = () => {
    let history = useHistory();

    const startGame = () => {
        let path = "/game"
        history.push(path);
    }

    return (
            <div className="my-auto">
                <h1 className="mb-5 home-title">BLIND TEST GAME</h1>
                <p style={{color : "white",fontWeight : "bold"}}>Bienvenue sur le jeu du Blind Test, la règle du jeu est simple :<br/> une musique/image, la première équipe qui trouve le nom associé remporte un point !</p>
                <button className="btn-start-play" onClick={startGame}>Suivant</button>
            </div>
    )
}

export default Home;