import './editprofilecontainer.style.css'

import { FiTrash } from 'react-icons/fi';
import { FiSave } from "react-icons/fi";


import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export function EditProfileContainer() {
    return (
        <div className="edit-profile">
            <div className="input-container">
                <div className="input-container-label">   
                    <h3 className="label-input">Username</h3>
                    <Input placeholder="Username" />
                </div>
                <div className="input-container-label">   
                    <h3 className="label-input">Full name</h3>
                    <Input placeholder="Full name" />
                </div>
                <div className="input-container-label">   
                    <h3 className="label-input">E-mail</h3>
                    <Input placeholder="E-mail" />
                </div>
                <div className="input-container-label">   
                    <h3 className="label-input">Phone number</h3>
                    <Input placeholder="Username" />
                </div>
                <div className="input-container-label">   
                    <h3 className="label-input">Date of birth</h3>
                    <Input placeholder="Username" />
                </div>
                <div className="input-container-label">   
                    <h3 className="label-input">Address</h3>
                    <Input placeholder="Username" />
                </div>
            </div>
            <div className="btn-container">
                <Button icon={FiTrash} typeColor="danger">Delete profile</Button>
                <Button icon={FiSave} typeColor="primary">Save changes</Button>
            </div>

        </div>

    )
}