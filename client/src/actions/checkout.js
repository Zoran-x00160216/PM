import axios from "axios";

export const checkOut = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const data = {
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 }
      ]
    };
    const res = await axios.post(
      "http://localhost:5000/api/createPaymentIntent",
      data,
      config
    );

    console.log("action", res);

    return res.data.url;
  } catch (error) {
    console.log(error);
  }

  //   fetch("http://localhost:5000/api/stripeCheckout", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       items: [
  //         { id: 1, quantity: 3 },
  //         { id: 2, quantity: 1 }
  //       ]
  //     })
  //   })
  //     .then(res => {
  //       if (res.ok) return res.json();
  //       return res.json().then(json => Promise.reject(json));
  //     })
  //     .then(({ url }) => {
  //       window.location = url;
  //     })
  //     .catch(e => {
  //       console.error(e.error);
  //     });
};
