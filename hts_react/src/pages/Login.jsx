import {assets} from "../assets/assets.js"
import { Link } from 'react-router-dom';
const Login = () => {
    return(
        <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
            style={{background: "linear-gradient(90deg, #605af9, #8268f9)", border: "none"}}>

            <div style={{position: "absolute", top: "20px", left: "30px", display: "flex", alignItems: "center"}}>
                <Link to="/" style={{
                    alignItems: "center",
                    fontWeight: "bold",
                    fonSize: "24px",
                    textDecoration: "none",
                }}>

                    <img src={assets.react} alt="react" height={32} width={32} />
                    <span className="fw-bold fs-4 text-light">HTC</span>               
                </Link>
            </div>
            <div className="card p-4" style={{maxWidth: "400px", width:"100%"}}>
                <h2 className="text-center mb-4">
                    Login
                </h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input 
                            type="text" 
                            id="email"
                            className="form-control"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            className="form-control"
                            placeholder="************"
                            required
                        />
                    </div>
                </form>

            </div>
                
        </div>  
        
        
    )
}

export default Login;
