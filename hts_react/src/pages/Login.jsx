import {assets} from "../assets/assets.js"
import { Link, useNavigate} from 'react-router-dom';
import {useState, useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


import { AppContext } from "../context/AppContext";

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoding] = useState(false);
    const {backendUrl} = useContext(AppContext);
    const navigate = useNavigate();
    
    

    const onSubmitHandler = async (e) =>{
        e.prevenDefault();
        axios.defaults.withCredentials = true;
        setLoding(true);
        try{
            if(isCreateAccount){
                //register API
                const response = await axios.post(`${backendUrl}/register`, {name, email, password})
                if(response.status === 201){
                    navigate("/");
                    toast.success("Hesap başarıyla oluşturuldu.");
                }else{
                    toast.error("E-posta zaten mevcut.");
                }
            }else{
                //login API
            }
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            setLoding(false);
        }

    }

    return(
        <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
            style={{background: "linear-gradient(90deg, #605af9, #8268f9)", border: "none"}}>

            <div style={{position: "absolute", top: "20px", left: "30px", display: "flex", alignItems: "center"}}>
                
                <Link to="/" style={{
                    display: "flex",
                    gap: 5,
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
                    {isCreateAccount ? "Create Account" :  "Login"}
                </h2>
                <form onSubmit =  {onSubmitHandler}>
                    {
                        isCreateAccount && (
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    id="fullName"
                                    className="form-control"
                                    placeholder="Enter fulname"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                        )


                    }

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Id</label>
                        <input 
                            type="text" 
                            id="email"
                            className="form-control"
                            placeholder="Enter email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <Link to="/reset-password" className="text-decoration-none">
                            Forgot pasword?
                        </Link>

                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled = {loading}>  
                        { loading ?  "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p className="mb-0"></p>
                    {isCreateAccount ?

                        (
                            <>
                                Bu hesap daha önce oluşturulmuş.{" "}
                                <span 
                                    onClick={() => setIsCreateAccount(false)}
                                    className="text-decoration-underline" style={{cursor: "pointer"}}>
                                    Buradan giriş yapınız.
                                </span>
                            </>
                        ):(
                            <>
                                Hesabınız yok.{" "}
                                <span 
                                    onClick={() => setIsCreateAccount(true)}
                                    className="text-decoration-underline" style={{cursor: "pointer"}}>
                                    Üye olun.
                                </span>
                            </>
                        )
                    
                    }
                </div>

            </div>
                
        </div>  
        
        
    )
}

export default Login;
