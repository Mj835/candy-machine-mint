import React from "react";
import Collection from "./components/Collection";
import Nav from "./components/Nav";

const Homepage = () => {
  return (
    <div className="main-content-wrapper backgroundGradient">
      {/* <Nav /> */}

      <section className="main-section medium-padding120 responsive-align-center">
        <div className="container">
          <div className="row">
            <div
              class="col-lg-6 col-md-6 col-lg-offset-0 col-sm-6 col-xs-6 ihdgua-0 bDorMw"
              style={{ textAlign: "center" }}
            >
              <img
                loading="lazy"
                src="http://babypunks.com/img/logo-primary.png"
                style={{ borderRadius: "16px" }}
                alt="header"
              />
            </div>
            <div class="row" id="MINT">
              <div class="col-lg-7 col-md-12 col-lg-offset-0 col-sm-12 col-xs-12">
                <div style={{ marginBottom: "130px", textAlign: "center" }}>
                  <h3>10,000 unique BabyPunks live on Solana</h3>

                  <p>
                    BabyPunks is a limited NFT collection on the Solana
                    blockchain. Supply is capped at 10,000. Your BabyPunks allow
                    you to earn 5% royalties paid in SOL tokens from every buy &
                    sell for life.
                  </p>

                  <p>
                    All BabyPunks are programmatically generated to include
                    numerous traits and rarity. Adopting a BabyPunk also gives
                    you access to features within our BabyPunk Arcade which will
                    feature a series of old school classic games similar to
                    Tetris, Flappy Bird, and more.
                  </p>

                  <p>
                    All BabyPunks will be revealed shortly after being minted
                    along with activating special community features based on
                    the roadmap.
                  </p>
                </div>
              </div>
              <div class="col-lg-5 col-md-12 col-lg-offset-0 col-sm-12 col-xs-12">
                <div class="widget w-distribution-ends">
                  <img
                    loading="lazy"
                    id="random"
                    src="http://babypunks.com/img/random/2.png"
                    alt="random nft"
                  />

                  <img
                    src="http://babypunks.com/img/pixel_button.png"
                    alt="mint"
                    style={{
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Collection />
    </div>
  );
};

export default Homepage;
