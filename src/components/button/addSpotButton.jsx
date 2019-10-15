import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    test: {
      borderRadius: 20,
      backgroundColor: '#fd6a02',
      '&:hover': {
        backgroundColor: '#E7670D',
        borderColor: '#E7670D'
      }
    }
  }));

export default function AddSpotButton(props) {
  const classes = useStyles();


  
  // const AddSpot = () => {
  //   props.b.push('/add-spot');
  // }

  return (
    <div>
       <Button onClick={props.x} variant="contained" color="primary" className={classes.test}>{props.label}</Button>
    </div>
  );
}