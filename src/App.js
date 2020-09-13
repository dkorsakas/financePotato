import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import goodPage from './pages/goodPage';
import understandPage from './pages/understandPage';
import inexpensivePage from './pages/inexpensivePage';
import homePage from './pages/homePage';
import ReportPage from './pages/reportPage';
import Navbar from './components/navbar';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

function App() {
    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
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
                            <Route path='/report' component={ReportPage} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </div>
    );
}

//git push -u origin master

export default App;
