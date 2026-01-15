import './register.style.css';
import { Button } from '../../components/Button/Button';
import { RegisterForm } from '../../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();

  const handleOtherPage = (url) => {
    navigate(url);
  };

  return (
    <main className="registerContainer">
      <div className="introdction_text">
        <h1 className="Principal_text_introduction">Welcome back!</h1>
        <p className="Secondary_text_introduction">
          To access your pokedeck, login with your pokerecords
        </p>
        <Button typeColor="secondary" onClick={() => handleOtherPage('/login')}>
          Sign In
        </Button>
      </div>

      <div className="CreateAccount_register">
        <h1 className="Principal_text_create">Create Account</h1>
        <div className="Register_information_container">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
