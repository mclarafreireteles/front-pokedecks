import './signin.style.css'
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { LoginForm } from '../../components/LoginForm';



export function Login(){
    const navigate = useNavigate();

    const handleOtherPage = (url) => {
        navigate(url);
    };

    return (
        <main>
            <div className="login-container">
                <div className="login-left-col">
                    <h2 className='login-title'>Sign In to Pokedecks</h2>
                    <div className="Register_information_container">
                        <LoginForm />
                    </div>
                </div>
                <div className="login-right-col">
                    <h1 className="Principal_text_introduction">Hello, Trainer!</h1>
                    <p className="Secondary_text_introduction">Enter your pokerecords and start the journey with us</p>
                    <Button typeColor="secondary" onClick={() => handleOtherPage('/home/register')}>Register</Button>
                </div>
            </div>
        </main>
    )
}