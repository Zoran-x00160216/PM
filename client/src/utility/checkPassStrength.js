const scorePassword = pass => {
  let score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    let letters = new Object();
    for (let i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 10 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
    }

    let variationCount = 0;
    for (let check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 6;

    return parseInt(score);
};

const checkPassStrength = pass => {
  let score = scorePassword(pass);
  if (score > 80) {
  const strengthColor = ["strong", "textSecondary"] 
      return strengthColor;
  } 
  if (score > 60){
    const strengthColor = ["good", "textPrimary"] 
        return strengthColor;
    } 
  if (score >= 20){
    const strengthColor = ["weak", "textRed"] 
        return strengthColor;
    } 

  return "";
}


export default checkPassStrength;
