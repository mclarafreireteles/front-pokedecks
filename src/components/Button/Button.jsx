export function Button({ text, type, onClick }){

    const buttonClass = `btn ${type === 'primary' ? 'btn-primary' : 'btn-secondary'}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {text}
        </button>
    )
}