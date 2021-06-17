import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import {HashRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import AppBar from './components/AppBar';
import FooterNav from './components/FooterNav';

const theme = createMuiTheme({
    palette: {
			primary: {
				main: '#ffeb3b',
				light: '#ffff72',
				dark: '#c8b900'
			},
			secondary: {
				main: '#f9a825',
				light: '#ffd95a',
				dark: '#c17900'
			}
		}
});

function App() {
	  
	return (
    	<React.Fragment>
			<CssBaseline/>
			
			<AppBar/>
			<Switch>
				
			</Switch>
			<FooterNav/>
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
