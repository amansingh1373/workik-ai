import './LoginComponent.css';
import logo from './assets/refresh.svg';
import './vscode';


const Login:React.FC = () => {
    const signinHandler = () => {
        console.log('Signin clicked');
        vscode.postMessage({command: 'signin', url: 'https://workik.com/login'});
    }
    return ( 
        <div className="container">
            <div className="imagewrapper">
                <img src={logo} alt="image" />
            </div>
            <div className="text-wrapper">
                <h1>Welcome to Workik AI</h1>
            </div>
            <div className="text-wrapper">
                <p className="desc">
                    Create a new account or login to your
                    existing account to start creating
                    projects with Workik
                </p>
            </div>
            <div className="button-container">
                <div className="button-wrapper">
                    <button className="button-style" onClick={signinHandler}>Sign In</button>
                </div>
            </div>
        </div>
    );
}
 
export default Login;