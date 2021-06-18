import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { getMoneyOverall, getIncome } from '../states/MoneyState';

import OverallChart from '../components/OverallChart';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
    
	},
  income: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  moneyIcon: {
    color: theme.palette.secondary.main,
    ...theme.typography.h2
  }
}));

function Overall() {
  const income = getIncome();
  const overall = getMoneyOverall();
  const styles = useStyles();

  return(
    <React.Fragment>
      <Grid container>
        <Grid 
          container 
          item 
          className={styles.income} 
          justify="center"
          alignItems="center"
        >
          <AttachMoneyIcon className={styles.moneyIcon}/>
          <Typography variant="h5">
            Income : {`${income}`}
          </Typography>
        </Grid>
        <OverallChart value={overall}/>
      </Grid>
    </React.Fragment>
  )
}

export default Overall;