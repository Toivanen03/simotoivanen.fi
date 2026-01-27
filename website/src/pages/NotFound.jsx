import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <div className='notFound container'>
            <h2 className='mb-4 mt-4'>Hups!</h2>
            <p>Sivua ei löytynyt.</p>
            <Link to={'/'}>Palaa etusivulle</Link>
        </div>
    )
}

export default NotFound