import React, {useState} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { setMoneyList } from '../states/MoneyState';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
    
	},
  date: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

type AddWindowProp = {
  activate: boolean;
  onClose: () => void
}

function AddWindow({activate, onClose}: AddWindowProp) {
  const styles = useStyles();
  const setMoney = setMoneyList();
  const [increase, setIncrease] = useState<boolean>(true);
  const [value, setValue] = useState<number>(0);
  const date = () => {
    const cur = new Date();
    return `${cur.getDate()}/${cur.getMonth()}/${cur.getFullYear()}`;
  }
  return(
    <Dialog open={activate} onClose={onClose}>
      <DialogTitle>Add To The List</DialogTitle>
      <DialogContent>
        <form>
          <div>
            <IconButton onClick={() => setIncrease(!increase)}>
              {increase ? <AddIcon/> : <RemoveIcon/>}
            </IconButton>
            <TextField 
              label="Value"
              variant="outlined"
              value={`${value}`} 
              onChange={(ev) => {
                const res = parseInt(ev.target.value) > 0 ? parseInt(ev.target.value) : 0;
                setValue(res);
              }}
            />
          </div>
          <DialogContentText className={styles.date}>
            {date()}
          </DialogContentText>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setMoney({
            date: date(),
            value: value,
            type: increase ? 'increase' : 'decrease'
          })
          onClose();
        }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddWindow;