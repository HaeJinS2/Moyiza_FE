import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { fetchUser, setToken } from 'path/to/actions';

const Redirect = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    console.log('token', token);
    if (token) {
      dispatch(setToken(token));
      dispatch(fetchUser());
    }
    // history.replace('/');
  }, [dispatch, history, location.search]);

  return null; // or your component JSX
};

export default Redirect;
