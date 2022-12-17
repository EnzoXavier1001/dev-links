
import { FiTrash2 } from 'react-icons/fi'

type LinksProps = {
    bg: string;
    color: string;
    name: string;
    handleDeleteLink: () => void;
}

export default function Links({ bg, color, name, handleDeleteLink}: LinksProps) {
    return (
        <article 
        className="list animate-pop"
        style={{backgroundColor: bg, color: color}}
        >
            <p>{name}</p>
            <div>
                <button className='btn-delete' onClick={() => handleDeleteLink()}>
                    <FiTrash2 size={18} color="#fff"/>
                </button>
            </div>
        </article>
    )
              
}