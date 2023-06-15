import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export const HeartCheckbox = ({checked, setChecked, likeClubBtn}) => {

  



  
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e)=>likeClubBtn(e.target.checked)}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
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