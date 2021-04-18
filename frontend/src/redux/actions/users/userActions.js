import axios from '../../../axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from '../books/actionTypes';





const registerUserAction = (name, email, password) => {

  return async dispatch => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('/register', { name, email, password }, config)



      // dispatch({
      //   type: USER_REGISTER_SUCCESS,
      //   payload: data.user,
      // });

      // localStorage.setItem('userAuthData', JSON.stringify(data));
      // localStorage.setItem('token', JSON.stringify(data.token));


      if (!data.error) {

        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data.user,
        });
        //Save the user into localstorage
        localStorage.setItem('userAuthData', JSON.stringify(data));
        localStorage.setItem('token', data.token);

      } else {
        // console.log("data error",data.error)
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: data.error,
        });
      }


    } catch (error) {
      console.log(error)
    }
  }
}


const loginUserAction = (email, password) => {
  return async dispatch => {
    try {

      dispatch({
        type: USER_LOGIN_REQUEST
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('/login', { email, password }, config)

      if (!data.error) {
        // console.log("data success",data.user)
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data.user,

        });
        //Save the user into localstorage
        localStorage.setItem('userAuthData', JSON.stringify(data));
        localStorage.setItem('token', data.token);
      } else {
        // console.log("data error",data.error)
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: data.error,
        });
      }


    } catch (error) {
      console.log(error)
    }
  }
}


const logoutUserAction = () => {
  return async dispatch => {
    try {
      localStorage.removeItem('userAuthData');
      localStorage.removeItem('token');
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      });

    } catch (error) {

    }
  }
}

const getUserProfileAction = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin

    try {
      dispatch({
        type: USER_PROFILE_REQUEST
      })
      const config = {
        headers: {
          //  authorization: `Bearer ${userInfo.token}`
          //  'authorization': 'Bearer '+localStorage.getItem('token')

          'Content-Type': 'application/json'
        }
      }
      // const { data } = await axios.get('/profile', {
      //   id: userInfo._id
      // })

      const result = await fetch(`https://bookkeeping01.herokuapp.com/profile/${userInfo._id}`, {
        method: "get",
        headers: {
          //  authorization: `Bearer ${userInfo.token}`
          //  'authorization': 'Bearer '+localStorage.getItem('token')

          'Content-Type': 'application/json'
        },

      })

      const data = await result.json()

      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data.user
      })
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message
      })
    }
  }
}

export { registerUserAction, loginUserAction, logoutUserAction, getUserProfileAction }