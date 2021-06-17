import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import {HashRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import AppBar from './components/AppBar';

const theme = createMuiTheme({
    
});

function App() {
	  
	return (
    	<React.Fragment>
			<CssBaseline/>
			
			<AppBar/>
			<Switch>
				
			</Switch>

		</React.Fragment>
  	);
}

export function render() {
	ReactDOM.render(
		<ThemeProvider theme={theme}>
			<RecoilRoot>
				<HashRouter>
					<App />
				</HashRouter>
			</RecoilRoot>
		</ThemeProvider>
		, document.body
	);
}
