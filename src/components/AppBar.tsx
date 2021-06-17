import React from 'react';

import Bar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Minimize from '@material-ui/icons/Minimize';
import Launch from '@material-ui/icons/Launch';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(() => createStyles({
	root: {

	},
	title: {
		flexGrow: 1
	},
	toolbar: {
		paddingRight: 0
	},
	red: {
		color: 'red'
	}
}));

function AppBar() {
	const styles = useStyles();

	return (
		<Bar position="static" className={styles.root}>
			<Toolbar variant="dense" className={styles.toolbar}>
				<Typography variant="h6" className={styles.title}>
					Money Tracker
				</Typography>
				<Button>
					<Minimize/>
				</Button>
				<Button>
					<Launch/>
				</Button>
				<Button>
					<Close className={styles.red}/>
				</Button>
			</Toolbar>
		</Bar>
	)
}

export default AppBar;