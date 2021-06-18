import React, {useEffect} from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import List from '@material-ui/icons/List';
import Equalizer from '@material-ui/icons/Equalizer';

import { PageEnum, getPage, setPage } from "../states/WindowState";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.palette.secondary.main
  }
}));

function FooterNav() {
  const styles = useStyles();
  const page = getPage();
  const set = setPage();
  useEffect(() => console.log(page), [page]);

  return(
    <footer className={styles.root}>
      <Tabs 
        variant="fullWidth"
        value={page}
        onChange={
          (ev, value) => set(
            value === 0 ? PageEnum.Income : PageEnum.Overall
          )
        }
      >
        <Tab icon={<List/>} label="Income"/>
        <Tab icon={<Equalizer/>} label="Overall"/>
      </Tabs>
    </footer>

  )
}

export default FooterNav;