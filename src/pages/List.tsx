import React from 'react';

import ListRoot from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add';

import { getMoneyList } from '../states/MoneyState';

import ListItem from '../components/ListItem';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
    paddingBottom: 72
	},
  empty: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  fab: {
    position: 'absolute',
    bottom: 82,
    right: 30,
    background: '#33e89a',
    color: "white",
    '&:hover': {
      backgroundColor: "#0dbd71",
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300],
      },
      '&$disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      textDecoration: 'none',
    }
  }
}));

function List() {
  const list = getMoneyList();
  const styles = useStyles();

  return(
    <React.Fragment>
      {
        list.length > 0 ? 
          <ListRoot className={styles.root}>
            {
              list.map((value) => 
                <ListItem key={value.date} item={value}/>
              )
            }
          </ListRoot>
        :
          <div className={styles.empty}>
            <Typography variant="body2">
              It is lonely here
            </Typography>
            <Typography variant="body2">
              Add item to the list
            </Typography>
          </div>
      }
      <Fab className={styles.fab} size="medium">
        <AddIcon/>
      </Fab>
    </React.Fragment>
  )
}

export default List;