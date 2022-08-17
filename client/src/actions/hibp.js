
// Get hibp
export const hibp = async email => {
  try {

    const response = await fetch(`https://pure-thicket-59769.herokuapp.com/https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`, {
        headers: {
            "hibp-api-key": "a36626ca66e04bd1b8e11158e89d5788"
        }
    });
    const data = await response.json();

    return data;

  } catch (err) {
    if(err) {
    console.log(err)
      }
  }
};
