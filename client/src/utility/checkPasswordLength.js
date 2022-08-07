const CheckPasswordLength = password => {
  if (password === "") {
    return <></>;
  } else if (password && password.length < 14) {
    return <small className="textRed">Bad password</small>;
  } else if (password && password.length >= 14 && password.length <= 20) {
    return <small className=" textPrimary">Strong password</small>;
  } else {
    return <small className="textSecondary">Super strong password</small>;
  }
};

export default CheckPasswordLength;
