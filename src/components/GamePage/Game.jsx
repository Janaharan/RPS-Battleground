import React, { useEffect, useState } from "react";
import "./Game.css";
import { Link } from "react-router-dom";

const Game = () => {
  // Run the computer move function once when the component mounts
  useEffect(() => {
    computer();
  }, []);

  // State variables to track player move, computer move, result, and other game stats
  const [playerMove, setPlayerMove] = useState("");
  const [computerMove, setComputerMove] = useState("");
  const [result, setResult] = useState(null);
  const [count, setCount] = useState(0);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalWinner, setFinalWinner] = useState("");

  // Function to randomly generate a computer move
  const computer = () => {
    const random = Math.floor(Math.random() * 3) + 1;
    const moves = ["rock", "paper", "scissor"];
    setComputerMove(moves[random - 1]);
  };

  // Function to set the player's move and trigger a new computer move
  const player = (value) => {
    if (!gameOver) { // Check if the game is over before allowing new moves
      setPlayerMove(value);
      computer(); // Generate a new computer move for each player move
    }
  };

  // Effect to trigger the game logic whenever the playerMove or computerMove changes
  useEffect(() => {
    if (playerMove && !gameOver) {
      game(); // Determine the result of the game
      setCount((prev) => prev + 1); // Increment the game count
    }
  }, [playerMove, computerMove]);

  // Effect to check if the game should end after 10 rounds
  useEffect(() => {
    if (count >= 10) {
      determineWinner(); // Determine the overall winner after 10 rounds
      setGameOver(true); // Set the game over state to true
    }
  }, [count]);

  // Function to determine the result of each round and update the win counts
  const game = () => {
    let outcome = "";
    if (playerMove === computerMove) {
      outcome = "Tie!"; // If both moves are the same, it's a tie
    } else if (
      (playerMove === "rock" && computerMove === "scissor") ||
      (playerMove === "paper" && computerMove === "rock") ||
      (playerMove === "scissor" && computerMove === "paper")
    ) {
      outcome = "You Win!";
      setPlayerWins((prev) => prev + 1); // Increment player wins if the player wins
    } else {
      outcome = "You Lose!";
      setComputerWins((prev) => prev + 1); // Increment computer wins if the player loses
    }
    setResult(outcome); // Set the result of the current round
  };

  // Function to determine the overall winner after 10 rounds
  const determineWinner = () => {
    if (playerWins > computerWins) {
      setFinalWinner("Player Wins the Game!"); // Player wins if they have more wins
    } else if (computerWins > playerWins) {
      setFinalWinner("Computer Wins the Game!"); // Computer wins if it has more wins
    } else {
      setFinalWinner("The Game is a Tie!"); // It's a tie if both have the same number of wins
    }
  };

  // Function to reset the game state and start a new game
  const resetGame = () => {
    setPlayerMove("");
    setComputerMove("");
    setResult(null);
    setCount(0);
    setPlayerWins(0);
    setComputerWins(0);
    setGameOver(false);
    setFinalWinner("");
  };

  return (
    // wrappers is the main container for the game
    <div className="wrappers">

      {/* Navbar containing: Home link, heading, and Restart button */}
      <div className="navBar">
        <Link to={"/"}>
          <button className="home">Home</button> {/* Home button */}
        </Link>
        <h1 className="heading">RPS-Arena</h1>  {/* Game heading */}
        <button className="restart" onClick={resetGame}> {/* Restart button */}
          Restart
        </button>
      </div>

      {/* Display the final winner message if the game is over */}
      {gameOver ? (
        <h1 className="finalWinner">{finalWinner}</h1>
      ) : (
        <>
          {/* Display the result of each round */}
          {result && <h1 className="result-txt">Result: {result}</h1>}
          
          {/* Display the current game count */}
          <h3 className="countText">Game count: {count}</h3>

          {/* Picks is the container for player and computer picks */}
          <div className="picks">

            {/* Show the versus image when both moves are available */}
            {playerMove && computerMove && (
              <img className="vs" src="././src/assets/vs.png" alt="vs" />
            )}

            {/* Player's pick section */}
            <div className="playerPick">
              <h1>Player</h1>
              <div className="img-container" onClick={() => player("rock")}>
                <img src="././src/assets/rock.png" alt="Rock" />
                <h3>Rock</h3>
              </div>
              <div className="img-container" onClick={() => player("paper")}>
                <img src="././src/assets/paper.png" alt="Paper" />
                <h3>Paper</h3>
              </div>
              <div className="img-container" onClick={() => player("scissor")}>
                <img src="././src/assets/scissor.png" alt="Scissor" />
                <h3>Scissor</h3>
              </div>
              <h2>Player Wins: {playerWins}</h2> {/* Display player's win count */}
            </div>

            {/* Display player's and computer's moves result if available */}
            {playerMove && computerMove && (
              <>
                <div className="playerResult"> {/* Player's move result */}
                  <div className="contain">
                    <img src={`././src/assets/${playerMove}.png`} alt={playerMove} />
                  </div>
                  <div>
                    <h2>{playerMove}</h2>
                    <h3>Your Move</h3>
                  </div>
                </div>

                <div className="computerResult"> {/* Computer's move result */}
                  <div className="contain">
                    <img src={`././src/assets/${computerMove}.png`} alt={computerMove} />
                  </div>
                  <div>
                    <h2>{computerMove}</h2>
                    <h3>Computer Move</h3>
                  </div>
                </div>
              </>
            )}

            {/* Computer's pick section */}
            <div className="computerPick">
              <h1>Computer</h1>
              <div className="img-container2">
                <img src="././src/assets/rock.png" alt="Rock" />
                <h3>Rock</h3>
              </div>
              <div className="img-container2">
                <img src="././src/assets/paper.png" alt="Paper" />
                <h3>Paper</h3>
              </div>
              <div className="img-container2">
                <img src="././src/assets/scissor.png" alt="Scissor" />
                <h3>Scissor</h3>
              </div>
              <h2>Computer Wins: {computerWins}</h2> {/* Display computer's win count */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
