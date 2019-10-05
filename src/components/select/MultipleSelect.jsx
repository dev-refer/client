import React, { useState,useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import { fetchCategory } from '../../redux/actions/category.action';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(item, categoryName, theme) {
    return {
      fontWeight:
        categoryName.indexOf(item) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function MultipleSelect(props) {

  
  // const { categoryList } = props
  
  const classes = useStyles();
  const theme = useTheme();
  const [categoryName, setCategoryName] = useState([]);
  

  useEffect(() => {
      props.getCategory()
  }, [])
  
  useEffect(() => {
    sendSelectedCategory()
  }, [categoryName])
  
  
  const sendSelectedCategory = () => {
    // console.log('masuk');
    props.categoryCallBack(categoryName)
  }

  function handleChange(event) {
    setCategoryName(event.target.value);
    // sendSelectedCategory()
    
  }

  // console.log(categoryName);
  
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Category</InputLabel>
            <Select
                multiple
                value={categoryName}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                    <div className={classes.chips}>
                        {selected.map(value => (                          
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {props.categories.categoryList?
                  props.categories.categoryList.map((item, i) => (
                  // console.log(item),
                  
                  <MenuItem key={i} value={item.name} style={getStyles(item, categoryName, theme)}>
                        {item.name}
                  </MenuItem>
                  
                )): null}
            </Select>
        </FormControl>
    )
}
const mapStateToProps = state => ({
  categories: state.category
});

const mapDispatchToProps = dispatch => {
  return {
      getCategory: () => dispatch(fetchCategory({}))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleSelect);