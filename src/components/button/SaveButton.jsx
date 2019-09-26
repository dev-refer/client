import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    test: {
        width: 100,   
        borderRadius: 20,
        backgroundColor: '#fd6a02',
        '&:hover': {
            backgroundColor: '#E7670D',
            borderColor: '#E7670D'
        }
    }
  }));

export default function SaveSpotButton() {
  const classes = useStyles();

  return (
    <div>
       <Button variant="contained" color="primary" className={classes.test}>Save</Button>
    </div>
  );
}