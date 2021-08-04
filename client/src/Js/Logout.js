import '../css/logout.css';
import { Button } from 'react-bootstrap';

function Logout(props) {
    const logout = (e) => {
        e.preventDefault();
        if (props.auth) {
            localStorage.clear();
            window.location.href = '/Home';
        } else {
            alert("Not Logged In")
        }
    }
    return (
        <div className="Logout">
            <Button onClick={logout} variant="primary">Logout</Button>
        </div>
    );
}

export default Logout;