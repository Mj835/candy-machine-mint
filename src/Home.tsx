import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";
import Homepage from "./Homepage";

const ConnectButton = styled(WalletDialogButton)``;

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here

const MintButton = styled(Button)``; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(() => {
    (async () => {
      if (!wallet) return;

      const { candyMachine, goLiveDate, itemsRemaining } =
        await getCandyMachineState(
          wallet as anchor.Wallet,
          props.candyMachineId,
          props.connection
        );

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  }, [wallet, props.candyMachineId, props.connection]);

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  return (
    <main>
      {wallet && (
        <p>Address: {shortenAddress(wallet.publicKey.toBase58() || "")}</p>
      )}

      {wallet && <p>Balance: {(balance || 0).toLocaleString()} SOL</p>}

      <MintContainer>
        {!wallet ? (
          <>
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
                            <a
                              title="roadmap"
                              href="#roadmap"
                              data-scroll="true"
                            >
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
                            <a
                              title="Roadmap"
                              href="#roadmap"
                              data-scroll="true"
                            >
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
                      <ConnectButton>
                        <img
                          loading="lazy"
                          width="200"
                          // height="80"
                          src="http://babypunks.com/img/pixel_button.png"
                          alt="babypunks"
                        />
                      </ConnectButton>

                      {/* <button
                        // onClick={() => setShowModal(true)}
                        className="mint_btn"
                      >
                        <img
                          loading="lazy"
                          width="200"
                          height="80"
                          src="http://babypunks.com/img/pixel_button.png"
                          alt="babypunks"
                        />
                      </button> */}
                    </ul>
                  </nav>
                </div>

                {/* <Modal onClose={() => setShowModal(false)} show={showModal} /> */}
              </div>
            </div>
            <Homepage />
          </>
        ) : (
          // <button className="mint_btn">

          // </button>
          <MintButton
            disabled={isSoldOut || isMinting || !isActive}
            onClick={onMint}
            variant="contained"
          >
            {isSoldOut ? (
              "SOLD OUT"
            ) : isActive ? (
              isMinting ? (
                <CircularProgress />
              ) : (
                "MINT"
              )
            ) : (
              <Countdown
                date={startDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            )}
          </MintButton>
        )}
      </MintContainer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
