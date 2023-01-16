import { getDatabase, ref, push as firebasePush } from "firebase/database";
import React, { useState } from "react";
import { DEFAULT_USER_INFO } from "./data";

/**
 * @param props.handleAlertChange: the function to set alert condition
 */
export default function Support(props) {
  const [showContent1, setShowContent1] = useState(false);
  const handleClick1 = (event) => {
    if (showContent1) {
      setShowContent1(false);
    } else {
      setShowContent1(true);
    }
  };

  const [showContent2, setShowContent2] = useState(false);
  const handleClick2 = (event) => {
    if (showContent2) {
      setShowContent2(false);
    } else {
      setShowContent2(true);
    }
  };

  const [showContent3, setShowContent3] = useState(false);
  const handleClick3 = (event) => {
    if (showContent3) {
      setShowContent3(false);
    } else {
      setShowContent3(true);
    }
  };

  const [showContent4, setShowContent4] = useState(false);
  const handleClick4 = (event) => {
    if (showContent4) {
      setShowContent4(false);
    } else {
      setShowContent4(true);
    }
  };

  const [message, setMessage] = useState({
    name: undefined,
    email: undefined,
    subject: undefined,
    message: undefined,
    userId: DEFAULT_USER_INFO.userId
  });

  const handleMessageChange = (field, event) => {
    const newMessage = { ...message };
    newMessage[field] = event.target.value;
    if (props.user){
      newMessage.userId = props.user.uid;
    }
    setMessage(newMessage);
  };
  const handleSubmitMessage = () => {
    const db = getDatabase();
    const messageRef = ref(db, "supportMessages");
    if (
      message.name === undefined ||
      message.email === undefined ||
      !message.email.includes("@") ||
      message.subject === undefined ||
      message.message === undefined
    ) {
      props.handleAlertChange([2, "Send message"]);
    } else {
      firebasePush(messageRef, message);
      props.handleAlertChange([1, "Send message"]);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="font-weight-bold text-center">
          Need help? We are here for you
        </h1>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="container shadow p-3 mb-5 rounded">
            <form
              id="contactForm"
              className="contact-form shake"
              data-toggle="validator"
            >
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className="col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-form-label"
                >
                  Name
                </label>
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="controls">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Name"
                      onChange={(event) => handleMessageChange("name", event)}
                      required
                      data-error="Please enter your name"
                    ></input>
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="email"
                  className="col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="controls">
                    <input
                      type="email"
                      className="email form-control"
                      id="email"
                      placeholder="Email Address"
                      onChange={(event) => handleMessageChange("email", event)}
                      required
                      data-error="Please enter your email"
                    ></input>
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="msg_subject"
                  className="col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-form-label"
                >
                  Subject
                </label>
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="controls">
                    <input
                      type="text"
                      id="msg_subject"
                      className="form-control"
                      placeholder="Subject"
                      onChange={(event) =>
                        handleMessageChange("subject", event)
                      }
                      required
                      data-error="Please enter your message subject"
                    ></input>
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="message"
                  className="col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-form-label"
                >
                  Message
                </label>
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <div className="controls">
                    <textarea
                      id="message"
                      rows="7"
                      placeholder="Message"
                      className="form-control"
                      onChange={(event) =>
                        handleMessageChange("message", event)
                      }
                      required
                      data-error="Write your message"
                    ></textarea>
                    <div className="help-block with-errors"></div>
                  </div>
                </div>
              </div>

              <div className="row my-auto">
                <button
                  type="submit"
                  id="submit"
                  className="btn btn-outline-success form-btn"
                  onClick={() => handleSubmitMessage()}
                >
                  Send Message
                </button>
                <div id="msgSubmit" className="h3 text-center hidden"></div>
                <div className="clearfix"></div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-sm-6 shadow p-3 mb-5 rounded text-dark">
          <h2>Contact us</h2>
          <p>Email: Dawgo@gmail.com</p>
          <p>Address: U-district</p>
          <p>Phone: 206-000-0000</p>
        </div>
      </div>

      <h1 className="faq-heading">Frequently Asked Questions</h1>

      <section className="faq-container">
        <div className="faq-one">
          <h2 className="faq-title" onClick={handleClick1}>
            What are the shipping options?
          </h2>
          {showContent1 && (
            <div className="faq-content">
              <p>
                Buyers may contact the sellers using their posted contact to
                decide shipping options. Ideally most buyers would meet the
                sellers in person at a secure place on campus.
              </p>
            </div>
          )}
        </div>
        <hr className="hr-line"></hr>

        <div className="faq-two">
          <h2 className="faq-title" onClick={handleClick2}>
            What is the return policy?
          </h2>
          {showContent2 && (
            <div className="faq-content">
              <p>
                Once a transcation is complete, only the seller has the right to
                decide whether if an item is returnable or not.
              </p>
            </div>
          )}
        </div>
        <hr className="hr-line"></hr>

        <div className="faq-three">
          <h2 className="faq-title" onClick={handleClick3}>
            How do I know if a post is real?
          </h2>
          {showContent3 && (
            <div className="faq-content">
              <p>
                In order to ensure the safety of transactions, we will use the
                real-name certification system to ensure that all users are UW
                students in the future.
                <br /> <br />
                However, you should be vigilant while trading on any kind of
                online platform.
              </p>
            </div>
          )}
        </div>
        <hr className="hr-line"></hr>

        <div className="faq-four">
          <h2 className="faq-title" onClick={handleClick4}>
            What do I do if I'm unhappy with the item I received?
          </h2>
          {showContent4 && (
            <div className="faq-content">
              <p>
                If an item you purchased is not in the condition that the seller
                described, you may contact the seller to ask for a refund or
                report the seller to us. We will undergo further investigation
                to ensure total satisfaction for all parties.
              </p>
            </div>
          )}
        </div>
        <hr className="hr-line"></hr>
      </section>
    </div>
  );
}
