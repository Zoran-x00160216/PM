import axios from "axios";
import { setAlert } from "./alert";



// call API to send a email warning to user
export const sendEmaiConformationPayment = email => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const body = JSON.stringify({ email });

    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/email/sendEmaiConformationPayment`, 
    body,
    config);

    (res.status === 200 && dispatch(setAlert("Email Sent", "mySuccess")));

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }
  }
};