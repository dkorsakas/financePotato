import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import goodPage from './pages/goodPage';
import understandPage from './pages/understandPage';
import inexpensivePage from './pages/inexpensivePage';
import homePage from './pages/homePage';
import Navbar from './components/navbar';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={homePage} />
                    <Route
                        exact
                        path='/understand'
                        component={understandPage}
                    />
                    <Route exact path='/good' component={goodPage} />
                    <Route path='/inexpensive' component={inexpensivePage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
