import React from "react";
import ReadMoreReadLess from "../stripePayment/ReadMoreReadLess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
                  What if I loose master password?
                </p>
                <ReadMoreReadLess>
                  By providing your payment information and confirming this
                  payment, you authorise (A) PM and Stripe, our payment service
                  provider and/or PPRO, its local service provider, to send
                  instructions to your bank to debit your account and (B) your
                  bank to debit your account in accordance with those
                  instructions. As part of your rights, you are entitled to a
                  refund from your bank under the terms and conditions of your
                  agreement with your bank. A refund must be claimed within 8
                  weeks starting from the date on which your account was
                  debited. Your rights are explained in a statement that you can
                  obtain from your bank. You agree to receive notifications for
                  future debits up to 2 days before they occur.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  What if I loose master password?
                </p>
                <ReadMoreReadLess>
                  By providing your payment information and confirming this
                  payment, you authorise (A) PM and Stripe, our payment service
                  provider and/or PPRO, its local service provider, to send
                  instructions to your bank to debit your account and (B) your
                  bank to debit your account in accordance with those
                  instructions. As part of your rights, you are entitled to a
                  refund from your bank under the terms and conditions of your
                  agreement with your bank. A refund must be claimed within 8
                  weeks starting from the date on which your account was
                  debited. Your rights are explained in a statement that you can
                  obtain from your bank. You agree to receive notifications for
                  future debits up to 2 days before they occur.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  How to generate password?
                </p>
                <ReadMoreReadLess>
                  By providing your payment information and confirming this
                  payment, you authorise (A) PM and Stripe, our payment service
                  provider and/or PPRO, its local service provider, to send
                  instructions to your bank to debit your account and (B) your
                  bank to debit your account in accordance with those
                  instructions. As part of your rights, you are entitled to a
                  refund from your bank under the terms and conditions of your
                  agreement with your bank. A refund must be claimed within 8
                  weeks starting from the date on which your account was
                  debited. Your rights are explained in a statement that you can
                  obtain from your bank. You agree to receive notifications for
                  future debits up to 2 days before they occur.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  How to check is it my any account compromised?
                </p>
                <ReadMoreReadLess>
                  By providing your payment information and confirming this
                  payment, you authorise (A) PM and Stripe, our payment service
                  provider and/or PPRO, its local service provider, to send
                  instructions to your bank to debit your account and (B) your
                  bank to debit your account in accordance with those
                  instructions. As part of your rights, you are entitled to a
                  refund from your bank under the terms and conditions of your
                  agreement with your bank. A refund must be claimed within 8
                  weeks starting from the date on which your account was
                  debited. Your rights are explained in a statement that you can
                  obtain from your bank. You agree to receive notifications for
                  future debits up to 2 days before they occur.
                </ReadMoreReadLess>
              </div>
              <div>
                <p className="fw-bold mb-3 border-bottom">
                  Can I share passwords securly?
                </p>
                <ReadMoreReadLess>
                  By providing your payment information and confirming this
                  payment, you authorise (A) PM and Stripe, our payment service
                  provider and/or PPRO, its local service provider, to send
                  instructions to your bank to debit your account and (B) your
                  bank to debit your account in accordance with those
                  instructions. As part of your rights, you are entitled to a
                  refund from your bank under the terms and conditions of your
                  agreement with your bank. A refund must be claimed within 8
                  weeks starting from the date on which your account was
                  debited. Your rights are explained in a statement that you can
                  obtain from your bank. You agree to receive notifications for
                  future debits up to 2 days before they occur.
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
