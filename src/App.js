import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import goodPage from './pages/goodPage';
import understandPage from './pages/understandPage';
import inexpensivePage from './pages/inexpensivePage';
import homePage from './pages/homePage';
import Navbar from './components/navbar';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <div className='App'>
            <Provider store={store}>
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
                        <Route
                            path='/inexpensive'
                            component={inexpensivePage}
                        />
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

//git push -u origin master

export default App;
