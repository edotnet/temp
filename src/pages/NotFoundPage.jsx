import { useNavigate } from "react-router-dom";
import './notFoundPage.css';
import snow from '../assets/img/snow_404_big.png';

export const NotFoundPage = () => {
    let navigate = useNavigate();

    function handleClick() {
        navigate("/login", { replace: true });
    }

    return(
        <div style={{height: '100%'}}>
            <div className="notfoundPage">
                <div className="notfound">
                    <h1 className='title'>404: Page Not Found</h1>
                    <p className='desc'>We can't find the page you're looking for.</p>
                    <button onClick={handleClick} type='button'>CLICK HERE TO GO BACK HOME</button>
                    <img src={snow} alt="snow"/>
                </div>
            </div>
        </div>
    )
}
