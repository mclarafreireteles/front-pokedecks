import './signin.style.css'
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

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
                    {/* <Input name value/>
                    <Input name value/> */}
                    <Button text="Sign In" type="primary" onClick={() => handleOtherPage('')} />
                </div>
                <div className="login-right-col">
                    <h2>Welcome Back!</h2>
                    <p>Enter your pokerecords and start the journey with us</p>
                    <Button text="Sign Up" type="secondary" onClick={() => handleOtherPage('/home/register')}/>
                </div>
            </div>
        </main>
    )
}