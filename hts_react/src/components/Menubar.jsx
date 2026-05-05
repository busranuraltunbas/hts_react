import {assets} from "../assets/assets.js"
import { useNavigate } from 'react-router-dom';
const Menubar = () =>{
    const navigate = useNavigate();
    return(
        <nav className="navbar bg-white px-5  py-4 d-flex justify-content-beetween allign-items-center">

            <div className="d-flex allign-items-center gap-2">
                <img src={assets.hero} alt="hero" width={32} height={32}/>
                <span className="fw-bold fs-4 text-dark">HTS</span>

            </div>
            <div className="btn btn-outline-dark raunded-pill px-3" onClick={()=> navigate("/login")}>
                Login <i className="bi bi-arrow-right ms-2"></i>
            </div>

        </nav>
    )
}

export default Menubar;