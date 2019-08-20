import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';

function SpinnerLoader({ classes, className, withOverlay = true, loading }) {
  if (withOverlay === true) {
    return (
      <div className={classNames(classes.container, className)}>
        <CircularProgress className={classes.progress} color="secondary" />
      </div>
    );
  }

  return (
    <div
      className={classNames(classes.loader, {
        [classes.hideContent]: !loading
      })}
    >
      <CircularProgress color="secondary" />
    </div>
  );
}

const styles = (theme) => {
  return {
    container: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: theme.zIndex.modal + 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00000047'
    },
    loader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: 400
    },
    hideContent: {
      display: 'none'
    }
  };
};
export default withStyles(styles)(SpinnerLoader);
