import './button.style.css'

export function Button({ typeColor, children, ...props }){

    const buttonClass = `btn ${typeColor === 'primary' ? 'btn-primary' : 'btn-secondary'}`;

    return (

        <button className={buttonClass} {...props}>
            {children}
        </button>

    )
}