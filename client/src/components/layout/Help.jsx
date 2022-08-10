import React from "react";
import ReadMoreReadLess from "../stripePayment/ReadMoreReadLess";

const Help = () => {
  return (
    <>
      <main>
        <div className="imgLogin"></div>

        <div className="container">
          <div className="shadow-sm p-5 mt-5 mb-5 bgCards myRounded">
            <div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  How to use PM password manager?
                </p>
                <ReadMoreReadLess>
                  Very simple, first things first you need to sign in, once done
                  you'll be redirected to your vault and you'll be ready to save
                  your web logins, generate passwords.. You can create 10 web
                  login items in free version after that you'll eed to subscribe
                  for premium account. Free version is limited with features.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">Is it secure?</p>
                <ReadMoreReadLess>
                  PM password manager is secure to use. We do not store
                  passwords or any sensiyive data in plain text in database. All
                  sensitive data is encryted with AES256 encryption standard
                  using your secret key ( master password), which we do not
                  store or have a way to know.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  How to generate a password?
                </p>
                <ReadMoreReadLess>
                  Follow the instructions below: 1. Press the setting wheel to
                  open the password generator modal 2. Set password length 3.
                  Set password strength 4. Press select to copy the password to
                  the input field or 5. To just copy to clipboard
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  How to check is it my account is compromised?
                </p>
                <ReadMoreReadLess>
                  This option is only for premium users. You can find the form
                  in the sidebar just enter the email you want to check and the
                  result will be displayed. Hopefully none. See below.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  What if I lose the master password?
                </p>
                <ReadMoreReadLess>
                  Your master password is used as a secret key to encrypt 
                  decrypt your data so even if your data is leaked it would be
                  almost useless for hackers because is encrypted. For a
                  password that is 15 characters and a mix of numbers, upper,
                  lower case and characters it would be almost impossible to
                  find the master password by brute force. So if you lose your
                  password unfortunately we’ll not be able to retrieve your
                  data. Make a good strong master password and that would be the
                  only password you need to remember.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  How to check is it my any account compromised?
                </p>
                <ReadMoreReadLess>
                  This option is only for premium users. You can find the form
                  in the sidebar just enter the email you want to check and the
                  result and will be displayed. Hopefully none. See below.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  Can I share passwords securly?
                </p>
                <ReadMoreReadLess>
                  Shortly yes, you create a note or password that you want to
                  share and click create the link. Share the link. The link will
                  be available only once after which will be deleted with all
                  information. See instructions below.
                </ReadMoreReadLess>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Help;
