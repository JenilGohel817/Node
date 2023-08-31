import "./App.css";
import React, { useState } from "react";
// import axios from "axios";
import Modal from "react-modal";
import { Wheel } from "react-custom-roulette";

function App() {
  const data = [
    { option: "Jenil" },
    { option: "Dipen" },
    { option: "Rohit" },
    { option: "Kano" },
    { option: "Nandan" },
    { option: "Amit" },
  ];

  // not found length
  console.log(Object.values[data.length]);

  const [winners, setWinners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    content: {
      width: "300px",
      marginTop: "auto",
      height: "200px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      setMustSpin(true);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Wheel Spinner</h1>
      </div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);

          const newWinners = [];

          while (newWinners.length < 1) {
            const randomIndex = Math.floor(
              Math.random() * Object.values(data.length)
            );

            // random not find beacuse from length
            const randomUser = Object.values(data[randomIndex]);
            console.log(randomUser);
            if (!newWinners.includes(randomUser)) {
              newWinners.push(randomUser);
            }
            setPrizeNumber(randomIndex);
          }

          setIsModalOpen(true);
          setWinners(newWinners);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <h2>Winners:</h2>
        <ul>
          {winners.map((winner, index) => (
            <li key={index}>{winner}</li>
          ))}
        </ul>
        <button onClick={closeModal}>Close</button>
      </Modal>
      <div id="wheelContainer"></div>
    </div>
  );
}

export default App;
