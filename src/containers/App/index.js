import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import AppLayout from '../AppLayout';
import { routes } from '../../routes';
import initStore from '../../initStore';
import NotFound from '../../pages/NotFound';

import './styles.less';

const { store, history } = initStore();

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppLayout>
                <Switch>
                    {routes}
                    <Route component={NotFound} />
                </Switch>
            </AppLayout>
        </ConnectedRouter>
    </Provider>
);

export default App;
