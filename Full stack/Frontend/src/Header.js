import './App.css';
import { Link } from 'react-router-dom';
import Register from './Pages/Registration';
import ApiCalling from './ApiCalling';


function Header(){

    return(
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Register">Registration</Link></li>
                <li><Link to="/ApiCalling">ProductList</Link></li>
            </ul>
        </nav>
    )

}
export default Header;