import './editprofilecontainer.style.css'

import { useState, useEffect } from 'react';

import * as userService from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';

import { FiTrash } from 'react-icons/fi';
import { FiSave } from "react-icons/fi";


import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export function EditProfileContainer() {

    const { logout } = useAuth();

    const [formData, setFormData] = useState({
        id:"",
        username: "",
        name: "", 
        email: "",
        phoneNumber: "", 
        birthDate: "", 
        address: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await userService.getUserProfile();
                setFormData(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await userService.updateUserProfile(formData.id, formData);
            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error(error);
            setError(error.message);
            alert("Erro ao salvar perfil: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.")) {
            setIsLoading(true);
            setError(null);

            try {
                await userService.deleteUserProfile(formData.id);
                alert("Perfil excluído com sucesso.");
                logout();
            } catch (error) {
                console.error(error);
                setError(error.message);
                alert("Erro ao excluir perfil: " + error.message);
                setIsLoading(false);
            }
        }
    };

    if (isLoading) {
        return <div>Carregando perfil</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>; //TODO: melhorar estilização desse erro
    }

    return (
        <form action="">
            <div className="input-container">
                <div className="input-container-label">
                    <h3 className="label-input">Username</h3>
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        readOnly={true}
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">Full name</h3>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name"
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">E-mail</h3>
                    <Input
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={true}
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">Phone number</h3>
                    <Input
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">Date of birth</h3>
                    <Input
                        placeholder="Date of Birth"
                        value={formData.birthDate}
                        name="birthDate"
                        type="date"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container-label">
                    <h3 className="label-input">Address</h3>
                    <Input
                        placeholder="Address"
                        value={formData.address}
                        name="address"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="btn-container">
                <Button
                    icon={FiTrash}
                    typeColor="danger"
                    type="button"
                    onClick={handleDelete}
                >
                    Delete profile
                </Button>
                <Button
                    icon={FiSave}
                    typeColor="primary"
                    type="submit"
                    onClick={handleSave}
                >
                    Save changes
                </Button>
            </div>
        </form>
    )
}