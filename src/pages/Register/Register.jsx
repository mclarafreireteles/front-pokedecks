import "./register.style.css"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { FiUser } from "react-icons/fi";
import { FiAtSign } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";


export function Register(){

    return (
        <main className="registerContainer">
            <div className="introdction_text">
                <h1 className="Principal_text_introduction">Welcome back!</h1>
                <p className="Secondary_text_introduction">To access your pokedeck, login with your pokerecords</p>
                <Button text="Sign in" type="secondary" ></Button>
            </div>

            <div className="CreateAccount_register">
                <h1 className="Principal_text_create">Create Account</h1>
                <div className="Register_information_container">
                    <Input icon={FiUser} id="fullname" placeholder="Full name" name="fullname" type="text" />
                    <Input icon={FiAtSign} id="username" placeholder="Username" name="username" type="text" />
                    <Input icon={FiMail} id="email" placeholder="E-mail" name="email" type="email" />
                    <Input icon={FiLock} id="password" placeholder="Password" name="password" type="password" />
                </div>
                <Button text="Sign in" type="primary" ></Button>
            </div>
        </main>
    )
}