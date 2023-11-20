import "../App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Player } from "@lottiefiles/react-lottie-player";
import { Wheel } from "react-custom-roulette";
import { Link } from "react-router-dom";
import axios from "axios";

function SpinWheel() {
  // for manage Data
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winners, setWinners] = useState([]);
  const [winArr, setwinArr] = useState([]);
  const [apiUser, setapiUser] = useState([]);

  // for hide show
  const [hideWheel, sethideWheel] = useState("block");
  const [isLitteOpen, setIsLotteOpen] = useState("hide");

  // for check Wheel spinning or not
  const [spinning, setSpinning] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);

  // for modal open close
  const [isModalOpen, setIsModalOpen] = useState(false);

  const WheelData = [""];

  // Append data In Option
  apiUser.forEach((value) => {
    WheelData.push({
      option: value.username,
    });
  });

  // User Api Fetch
  const fetch = async () => {
    try {
      const data = await axios.get("http://localhost:8080/spinApi/v1/userFind");
      setapiUser(data?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  // Close Model
  const closeModal = () => {
    setIsModalOpen(false);
    setIsLotteOpen("hide");
    sethideWheel("block");
  };

  // Reset Model
  const resetModal = () => {
    window.location.reload();
  };

  // popup modal style
  const modalStyles = {
    content: {
      position: "absolute",
      padding: "25px",
      background: "#fff",
      width: "600px",
      height: "600px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  };

  // Spin Start
  const handleSpinClick = () => {
    // call function start spin
    generateRandom();

    setIsModalOpen(false);
    setIsLotteOpen("hide");
  };

  // return winArr
  useEffect(() => {
    // after three times spin user hide spin and show winner details
    if (winArr.length > 3) {
      sethideWheel("hide");
      setIsModalOpen(true);
      setIsLotteOpen("block");
    }

    // return winArr
  }, [winArr]);

  // Genrate Random User
  const generateRandom = () => {
    const newWinners = [];

    if (!mustSpin) {
      setSpinning(true);

      // Spin Wheel and genrate one user
      while (newWinners.length < 1) {
        // get random data from object
        const randomIndex = Math.floor(Math.random() * WheelData.length);

        // genrate random index and give username
        const randomUser = WheelData[randomIndex].option;

        // check user is not add in newWinners object so add on object
        if (!newWinners.includes(randomUser)) {
          // push random user in newWiners object
          newWinners.push(randomUser);
        }

        // store randomIndex Value into sta.
        setPrizeNumber(randomIndex);

        // usering spread operator append value in old object data to new one data
        setwinArr([...winArr, randomUser]);
      }

      setMustSpin(true);

      // set winners in object
      setWinners(newWinners);

      // winner includes in onject it genrate new winner
      if (winArr.includes(newWinners) === true) {
        // if winArr have newwiner genrate user Again
        return generateRandom();
      } else {
        // return newWinners
        return newWinners;
      }
    } else {
      setMustSpin(false);
    }
  };

  return (
    <>
      <div className="SpinWheel">
        <div className={`wheel-outer-part ${hideWheel}`}>
          <div className="wheel-inner-part">
            <div className="zeal-wheel-outer">
              <img className="zeal-wheel" alt="" src="../JG.png" />
            </div>
            <img
              className="image-wheel"
              alt=""
              src="../sl_020620_27780_14.jpg"
            />
            <Wheel
              width={100}
              height={100}
              backgroundColors={["#faa444", "#d12c6e", "#3aa3ac"]}
              textColors={["#ffffff"]}
              mustStartSpinning={mustSpin}
              outerBorderColor={["#fff"]}
              radiusLineColor={["#fff"]}
              outerBorderWidth={[3]}
              radiusLineWidth={[3]}
              innerRadius={[1]}
              prizeNumber={prizeNumber}
              data={WheelData}
              onStopSpinning={() => {
                setMustSpin(false);
                sethideWheel("hide");
                generateRandom();
                setIsModalOpen(true);
                setSpinning(false);
                setIsLotteOpen("block");
              }}
            />
          </div>
        </div>
        <button
          className={`btn ${hideWheel} ${spinning ? "hide" : "block"}`}
          onClick={handleSpinClick}
        >
          <span className="btn-inr">
            <span className="txt-a">
              {spinning ? "Spining..." : "Spin And Win"}
            </span>
            <span className="txt-b">
              {spinning ? "Spining..." : "Start Spin"}
            </span>
          </span>
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          {winArr.length > 2 ? (
            <></>
          ) : (
            <div className="box box-2">
              <h3>Winner</h3>
              <ul>
                {winners.map((winner, index) => (
                  <li key={index}>{winner}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="box box-1">
            {winArr.length > 2 ? (
              <h3>😎 Winners Announced 😎</h3>
            ) : (
              <h3>Winner List</h3>
            )}
            <div id="wheelContainer">
              <ul>
                {winArr.map((winner, index) => (
                  <li key={winner}>
                    winner {index - 3} : {winner}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {winArr.length > 2 ? (
            <>
              <button className="btn btn-abs" onClick={resetModal}>
                <span className="btn-inr">
                  <span className="txt-a">Reset</span>
                  <span className="txt-b">Reset</span>
                </span>
              </button>
            </>
          ) : (
            <button className="btn btn-abs" onClick={closeModal}>
              <span className="btn-inr">
                <span className="txt-a">Spin Again</span>
                <span className="txt-b">Close</span>
              </span>
            </button>
          )}
        </Modal>
        <div className="outer-lottie-file outer-lottie-file-left">
          <Player
            className={isLitteOpen}
            autoplay
            loop
            src="../Animtion.json"
            style={{ height: "600px", width: "600px" }}
          ></Player>
        </div>
        <div className="outer-lottie-file outer-lottie-file-right">
          <Player
            className={isLitteOpen}
            autoplay
            loop
            src="../Animtion.json"
            style={{ height: "600px", width: "600px" }}
          ></Player>
        </div>
      </div>
      <Link className="ButtonCenter" to={"/add"}>
        User List
      </Link>
    </>
  );
}

export default SpinWheel;
