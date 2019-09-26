import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    test: {
        width: 100,
        color: 'grey',
        borderRadius: 20,
        backgroundColor: '#f2efef',
        '&:hover': {
            backgroundColor: '#d4d4d4',
            borderColor: '#d4d4d4'
        }
    }
  }));

export default function SaveSpotButton() {
  const classes = useStyles();

  return (
    <div>
       <Button variant="contained" color="primary" className={classes.test}>Discard</Button>
    </div>
  );
}