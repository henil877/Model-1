import './App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/model_1_StaticWeb/index.html">
            Home
          </a>
        </li>

        <li>
          <Link to="/Register">Registration</Link>
        </li>

        <li>
          <Link to="/showuser">Show user</Link>
        </li>

        <li>
          <Link to="/ApiCalling">ProductList</Link>
        </li>

        <li>
          <a href="/model_1_StaticWeb/index.html">
            ShoesWeb
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;