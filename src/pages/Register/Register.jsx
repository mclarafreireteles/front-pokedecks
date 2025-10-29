import "./register.style.css"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { FiUser } from "react-icons/fi";
import { FiAtSign } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { RegisterForm } from "../../components/RegisterForm";


export function Register(){

    return (
        <main className="registerContainer">
            <div className="introdction_text">
                <h1 className="Principal_text_introduction">Welcome back!</h1>
                <p className="Secondary_text_introduction">To access your pokedeck, login with your pokerecords</p>
                <Button typeColor="secondary" >Sign In</Button>
            </div>

            <div className="CreateAccount_register">
                <h1 className="Principal_text_create">Create Account</h1>
                <div className="Register_information_container">
                    <RegisterForm/>
                </div>
            </div>
        </main>
    )
}