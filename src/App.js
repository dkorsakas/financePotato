import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GoodPastPage from './pages/goodPastPage';
import GoodFuturePage from './pages/goodFuturePage';
import understandPage from './pages/understandPage';
import inexpensivePage from './pages/inexpensivePage';
import homePage from './pages/homePage';
import shareholderPage from './pages/shareholderPage';
import ReportPage from './pages/reportPage';
import CheatingPage from './pages/cheatingPage';
import CalculationsPage from './pages/calculationsPage';
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
                            <Route
                                exact
                                path='/goodpast'
                                component={GoodPastPage}
                            />
                            <Route
                                exact
                                path='/goodfuture'
                                component={GoodFuturePage}
                            />
                            <Route
                                exact
                                path='/shareholder'
                                component={shareholderPage}
                            />
                            <Route
                                path='/inexpensive'
                                component={inexpensivePage}
                            />
                            <Route
                                path='/calculations'
                                component={CalculationsPage}
                            />
                            <Route path='/cheating' component={CheatingPage} />
                            <Route path='/report' component={ReportPage} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </div>
    );
}

//git push -u origin master
//var canDrive = age > 16 ? 'yes' : 'no';
//5V9EKID7NGJJH1I2
export default App;
