import "./Register.style.css"
import { Button } from "../../components/Button/Button"
import { useNavigate, Link} from 'react-router-dom';

export function Register(){

    return (
        <main className="registerContainer">
            <div className="introdction_text">
                <h1 className="Principal_text_introduction">Welcome Back!</h1>
                <p className="Secondary_text_introduction">To access your pokedeck, login with your pokerecords</p>
                <Button text="Sing in" type="secondary" ></Button>
            </div>

            <div className="CreateAccount_register">
                <h1 className="Principal_text_create"> Create Account </h1>
                    <div className="Register_information_container">
                        <div className="Register_information">
                            <input type="text" id="full_name" name="full-name" autoComplete="Full name" placeholder="Full_name"/>
                        </div>
                        <div className="Register_information">
                            <input type="text" id="username" name="username" autoComplete="username" placeholder="Username"/>
                        </div>
                        <div className="Register_information">
                            <input type="email" id="email" name="email" autoComplete="email" placeholder="Email" />
                        </div>
                        <div className="Register_information">
                            <input type="password" id="password" name="password" autoComplete="current-password" required placeholder="Passsword"/>
                        </div>
                        


                    

                   


                    </div>
                     
                 
                 <Button text="Sing in" type="primary" ></Button>
            </div>
        </main>
    )
}