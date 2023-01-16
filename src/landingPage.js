import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div className="container landingpage">
        <div className="row">
          <div className="col col-lg-4 col-xl-3 landing-title">
            <h1>Save Money & Save the Earth</h1>
            <p>
              DawGo is aimed at providing a united, convenient, safe, and
              efficient second-hand trading platform for students. At the same
              time, we call on students to pay attention to the sustainable
              development of the environment and make their own contribution to
              environmental protection. We've considered features such as
              building a web application facing college students where they
              could form their own communities and trade their used goods. We
              believe that each individual step could make a difference for the
              sustainability of the community.
            </p>
            <Link className="btn btn-dark btn-lg started" to="/home">
              Get Started
            </Link>
          </div>
          <div className="col col-lg-12 col-xl slide-img"></div>
        </div>
      </div>

      <section className="text-center det-ails">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="landingIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-postcard-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 8h2V6h-2v2Z" />
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm8.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5ZM2.5 7a.5.5 0 0 0 0 1H6a.5.5 0 0 0 0-1H2.5ZM2 9.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5Zm8-4v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z" />
                  </svg>
                </div>
                <h2 className="landingPage-subtitle">Post Item</h2>
                <p>
                  Users can post an item for sell by clicking the plus sign in
                  the nav bar. Then they will need to enter some required
                  information, such as description of the product, price, and an
                  image before posting.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="landingIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-bag-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                  </svg>
                </div>
                <h2>Add to Wishlist</h2>
                <p>
                  Users can add their favorite products to the Wishlist by
                  clicking the add button next to each item so their favorite
                  items are all stored into one place for later reference.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features mx-auto mb-0 mb-lg-3">
                <div className="landingIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-wallet-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                    <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
                  </svg>
                </div>
                <h2>Purchase Item</h2>
                <p>
                  Users can search for items through keywords. The system will
                  push the product that best matches the user through the user's
                  keywords, and buyers can also look for the items within the
                  range of their wills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
