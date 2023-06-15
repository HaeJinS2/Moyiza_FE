import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    favoriteIcon: {
      color: '#F40404', // 원하는 색상으로 변경합니다.
    },
  });
  
export const HeartCheckbox = ({checked, setChecked, likeClubBtn}) => {

    const classes = useStyles();



  
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e)=>likeClubBtn(e.target.checked)}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite className={classes.favoriteIcon} />}
            name="heartCheckbox"
          />
        }

      />
    );
  };
export const HeartCmpCheckbox = ({cmtChecked, setCmtChecked, handleSubmitCmtLikeButtonClick}) => {

  



  
    return (
      <FormControlLabel
        control={
          <Checkbox
          checked={cmtChecked}
            onChange={(e)=>handleSubmitCmtLikeButtonClick(e.target.checked)}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="heartCheckbox"
          />
        }

      />
    );
  };
  
  const HeartCheckboxes = {
    HeartCheckbox,
    HeartCmpCheckbox,
  };
  
  export default HeartCheckboxes;