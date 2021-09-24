import React, { useState } from "react";
import Modal from "./Modal";

const Nav = () => {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className={colorChange ? "header colorChange" : "header"}>
      <div className="container">
        <div className="header-content-wrapper">
          <a href="/" className="site-logo" title="back to index">
            {/* <img
              loading="lazy"
              width="200"
              src="http://babypunks.com/img/logo-primary.png"
              alt="babypunks"
            /> */}
          </a>

          <nav>
            <ul
              className="primary-menu-menu primary-menu-indented scrollable"
              style={{ maxHeight: "460px", display: "inline-block" }}
            >
              <li className="menu-item-has-children">
                <a title="NFT" href="#">
                  NFT<span className="indicator"></span>
                </a>
                <ul
                  className="sub-menu sub-menu-right"
                  style={{ display: "none" }}
                >
                  <li className="menu-item-has-children">
                    <a title="MINT" href="#MINT" data-scroll="true">
                      MINT
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a title="story" href="#story" data-scroll="true">
                      Story
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a title="roadmap" href="#roadmap" data-scroll="true">
                      Roadmap
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a title="team" href="#team" data-scroll="true">
                      Team
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a title="buy" href="/">
                  BUY<span className="indicator"></span>
                </a>
                <ul
                  className="sub-menu sub-menu-right"
                  style={{ display: "none" }}
                >
                  <li className="menu-item-has-children">
                    <a title="mint" href="/">
                      BUY NFT
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a title="" href="/">
                      BabyPunks Coin
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a title="babypunkcoin" href="/">
                  BabyPunks Coin<span className="indicator"></span>
                </a>
                <ul
                  className="sub-menu sub-menu-right"
                  style={{ display: "none" }}
                >
                  <li className="menu-item-has-children">
                    <a title="bpmint" href="/">
                      White paper
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a title="Roadmap" href="#roadmap" data-scroll="true">
                      Roadmap
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a title="Audit" href="/">
                      Audit
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a title="BPCMarket" href="/">
                      Market
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a title="Market" href="/">
                  Market<span className="indicator"></span>
                </a>
                <ul
                  className="sub-menu sub-menu-right"
                  style={{ display: "none" }}
                >
                  <li className="menu-item-has-children">
                    <a
                      title="coinmarket"
                      target="_blank"
                      href="https://coinmarketcap.com/currencies/babypunks/"
                      rel="noreferrer"
                    >
                      Coinmarketcap
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a
                      title="coingecko"
                      target="_blank"
                      href="https://www.coingecko.com/en/coins/babypunks"
                      rel="noreferrer"
                    >
                      Coingecko
                    </a>
                  </li>
                </ul>
              </li>

              <li className="menu-item-has-children">
                <a href="/">
                  Socialmedia<span className="indicator"></span>
                </a>
                <ul
                  className="sub-menu sub-menu-right"
                  style={{ display: "none" }}
                >
                  <li className="menu-item-has-children">
                    <a
                      aria-label="Twitter"
                      className="sc-1i4jqyq-0 dgglXh sc-1gbjr5k-6 jemGW"
                      href="https://twitter.com/BabyPunksCoin"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Twitter
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a
                      aria-label="Telegram"
                      className="sc-1i4jqyq-0 dgglXh sc-1gbjr5k-6 jemGW"
                      href="https://t.me/babypunkofficial"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Telegram
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/babypunkscoin"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/BabyPunksCoin"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a
                      rel="noopener noreferrer"
                      href="https://www.reddit.com/r/babypunksofficial"
                    >
                      Reddit
                    </a>
                  </li>
                  <li className="menu-item-has-children">
                    <a
                      rel="noopener noreferrer"
                      href="http://discord.gg/babypunks"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </li>
              {/* <li className="scrollable-fix"></li> */}

              <button onClick={() => setShowModal(true)} className="mint_btn">
                <img
                  loading="lazy"
                  width="200"
                  height="80"
                  src="http://babypunks.com/img/pixel_button.png"
                  alt="babypunks"
                />
              </button>
            </ul>
          </nav>
        </div>

        <Modal onClose={() => setShowModal(false)} show={showModal} />
      </div>
    </div>
  );
};

export default Nav;
