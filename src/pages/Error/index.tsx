import './style.css'
import { Link } from 'react-router-dom'
import { Logo } from '../../components/Logo'

export default function Error() {
    return (
        <div className='error'>
            <Logo />
            <h1>Página nao encontrada</h1>
            <p>Esta página que voce está procurando nao existe</p>
            <Link className='link' to="/"> Voltar para Home </Link>
        </div>
    )
}