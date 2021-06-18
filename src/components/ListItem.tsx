import React, {useState} from 'react';

import List from '@material-ui/core/List';
import ListItemRoot from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import { MoneyList } from '../states/MoneyState';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
    paddingLeft: theme.spacing(4)
	},
	red: {
		color: 'red'
	},
  green: {
    color: 'green'
  }
}));

const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
type ListItemProps = {
  item: MoneyList
}
function ListItem({item}: ListItemProps) {
  const styles = useStyles();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const rawDate = item.date.split('/');

  return(
    <React.Fragment>
      <ListItemRoot 
        button 
        onClick={() => setCollapsed(!collapsed)}
      >
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary={`${months[parseInt(rawDate[0])]} ${rawDate[1]}`} />
        {collapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItemRoot>
      <Collapse in={collapsed} unmountOnExit>
        <List dense className={styles.root}>
          {
            item.value.map((value, index) => 
              <ListItemRoot key={index}>
                <ListItemIcon>
                  {value.type === "increase" ?
                    <ArrowUpward className={styles.green}/>
                    :
                    <ArrowDownward className={styles.red}/>
                  }
                </ListItemIcon>
                <ListItemText primary={value.value} secondary={value.date}/>
              </ListItemRoot>
            )
          }
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default ListItem;