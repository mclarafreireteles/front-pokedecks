import './signin.style.css'
import { Button } from "../../components/Button/Button";
import { Input } from '../../components/Input/Input';
import { useNavigate } from "react-router-dom";

import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

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
                        <Input icon={FiMail} id="email" placeholder="E-mail" name="email" type="email" />
                        <Input icon={FiLock} id="password" placeholder="Password" name="password" type="password" />
                    </div>
                    <Button text="Sign In" type="primary" onClick={() => handleOtherPage('')} />
                </div>
                <div className="login-right-col">
                    <h1 className="Principal_text_introduction">Hello, Trainer!</h1>
                    <p className="Secondary_text_introduction">Enter your pokerecords and start the journey with us</p>
                    <Button text="Sign Up" type="secondary" onClick={() => handleOtherPage('/home/register')}/>
                </div>
            </div>
        </main>
    )
}