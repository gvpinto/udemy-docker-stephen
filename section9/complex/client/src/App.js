import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className='App-title'>Welcome to react</h1>
                    <Link to="/">Home</Link>
                    <Link to="/otherPage">Other Page</Link>
                </header>
                <div>
                    <Route exact path="/" component={Fib} />
                    <Route path="otherPage" component={OtherPage} />
                </div>
            </div>
        </Router >
    );
};

export default App;
