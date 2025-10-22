'./profilepic.style.css'

export function ProfilePic({ user }){
    if (!user) {
        return null;
    }

    const { name, imageUrl } = user;

    const getInitials = (nameString) => {
        if (!nameString) return '?'; 

        const nameParts = nameString.trim().split(' ');
        const firstInitial = nameParts[0] ? nameParts[0][0] : '';
        const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';

        return (firstInitial + lastInitial).toUpperCase();
    };

    return (
        <div className="profile-pic">
        {imageUrl ? (
            <img 
                src={imageUrl} 
                alt={`Perfil de ${name || 'usuário'}`} 
                className="profile-pic-image"
            />
            ) : (
            <span className="profile-pic-initials">
                {getInitials(name)}
            </span>
        )}
    </div>
    )
}