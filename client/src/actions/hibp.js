import { setAlert } from "./alert";

// Get hibp
export const hibp = async email => {
  try {

    const response = await fetch(`https://pure-thicket-59769.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`, {
        headers: {
          "hibp-api-key": `${process.env.REACT_APP_HIBP_API_KEY}`        }
    });
    const data = await response.json();

    return data;

  } catch (err) {
    if(err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      }
  }
};
