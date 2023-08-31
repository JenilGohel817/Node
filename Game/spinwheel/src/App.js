import "./App.css";
import React, { useState } from "react";
// import axios from "axios";
import Modal from "react-modal";
import Winwheel from "winwheel";

function App() {
  const users = ["Jenil", "Dipen", "Rohit", "Kano", "Nandan", "Amit"];

  const [winners, setWinners] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // const fetch = async () => {
  //   try {
  //     const fetchApi = await axios.get(
  //       "https://pokeapi.co/api/v2/pokemon/ditto"
  //     );
  //     console.log(fetchApi);
  //     // setapiUser(fetchApi);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetch();
  //   eslint-disable-next-line
  // }, []);

  const handleClick = () => {
    if (!spinning) {
      setSpinning(true);
      const newWinners = [];

      let click = 0;
      let rotate = 0;

      if (click !== 8) {
        click += 1;
        rotate = click * 45 + click * 720;
        document.querySelector(".wheel-outer").style.transition =
          "3s cubic-bezier(.33,.66,.2,1)";
      } else {
        click = 0;
        rotate = 0;
        document.querySelector(".wheel-outer").style.transition = "0s";
      }

      document.querySelector(
        ".wheel-outer"
      ).style.transform = `rotate(${rotate}deg)`;

      setTimeout(() => {
        while (newWinners.length < 3) {
          const randomIndex = Math.floor(Math.random() * users.length);
          const randomUser = users[randomIndex];
          if (!newWinners.includes(randomUser)) {
            newWinners.push(randomUser);
          }
        }

        const wheel = new Winwheel({
          outerRadius: 150,
          innerRadius: 30,
          numSegments: users.length,
          segments: users.map((data) => ({ text: data })),
          animation: {
            type: "spinToStop",
            duration: 5,
            spins: 8,
            callbackFinished: () => {
              setIsSpinning(false);
              alert(`Winner: ${users[newWinners]}`);
            },
          },
        });

        wheel.startAnimation();

        setWinners(newWinners);
        setIsModalOpen(true);
        setSpinning(false);
      }, 3000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    content: {
      width: "300px",
      margin: "auto",
      padding: "20px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div className="App">
      <div>
        <h1>Wheel Spinner</h1>
      </div>
      <div className="spin">
        <button onClick={handleClick} disabled={spinning}>
          😉
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
      <div className="wheel-outer">
        <div className="wheel-inner">
          {users.map((index) => (
            <li key={index}>
              <div className="red"></div>
              <div className="text r">{index}</div>
            </li>
          ))}
        </div>
      </div>
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
