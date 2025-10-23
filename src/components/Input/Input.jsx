import './input.style.css'

export function Input({ type, id, name, placeholder, icon: Icon }){
    return (
        <div className="container_input">
            {Icon && <Icon size={24} />}
            <input className="input_information" type={type} id={id} name={name} autoComplete="Full name" placeholder={placeholder}/>
        </div>
    )
}