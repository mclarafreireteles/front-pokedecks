import './button.style.css'

export function Button({ typeColor, icon: Icon, children, ...props }) {

    let specificClass;

    switch (typeColor) {
        case 'primary':
            specificClass = 'btn-primary';
            break;
        case 'danger':
            specificClass = 'btn-danger';
            break;
        case 'success':
            specificClass = 'btn-success';
            break;
        default:
            specificClass = 'btn-secondary';
    }

    const buttonClass = `btn ${specificClass}`;

    console.log('buttonClass', buttonClass)


    return (

        <button className={buttonClass} {...props}>
            {Icon && <Icon size={20} />}
            {children}
        </button>

    )
}