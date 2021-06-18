import React, {useState} from 'react';

import Bar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Minimize from '@material-ui/icons/Minimize';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(() => createStyles({
	root: {
		
	},
	title: {
		flexGrow: 1,
		textAlign: "center"
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
	const [fullscreen, setFullscreen] = useState<boolean>(false);

	const min = () => {
		window.api.minimize();
	};
	const resize = () => {
		setFullscreen(!fullscreen);
		window.api.maximize();
	};
	const close = () => {
		window.api.close();
	};

	return (
		<Bar position="sticky" className={styles.root} id="appbar">
			<Toolbar variant="dense" className={styles.toolbar}>
				<Typography variant="h6" className={styles.title}>
					Money Tracker
				</Typography>
				<Button onClick={min} id="appbarbutton">
					<Minimize/>
				</Button>
				<Button onClick={resize} id="appbarbutton">
					{fullscreen ? <FullscreenExit/> : <Fullscreen/>}
				</Button>
				<Button onClick={close} id="appbarbutton">
					<Close className={styles.red}/>
				</Button>
			</Toolbar>
		</Bar>
	)
}

export default AppBar;