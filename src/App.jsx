import {useState} from 'react';
import Player from "./component/Player.jsx"
import GameBoard from "./component/GameBoard.jsx";
import Log from "./component/Log.jsx"
import { WINNING_COMBINATIONS} from './winning-cobinations.js';
import GameOver from './component/GameOver.jsx';

const PLAYERS = {
   X : 'Player 1',
   O : 'Player 2'
  };
const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
  ];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  // there might be no latest turn(i.e - first turn) or checking whether previous turn is 'X' or not
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
     currentPlayer = 'O';
  }

  return currentPlayer;

}
 function deriveGameBoard(gameTurns){

    // creating deep copy of initialGameBoard
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;
      gameBoard[row][col] = player;
  }
      return gameBoard;
 }
function deriveWinner(gameBoard,players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSqareSymbol && firstSquareSymbol===thirdSquareSymbol){
          winner = players[firstSquareSymbol];
    }
  }
    return winner;

}
function App() {
  const [players,setPlayers] = useState(PLAYERS);
  const [gameTurns,setGameTurns] = useState([]);
  // const [activePlayer,setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns); 
  const winner = deriveWinner(gameBoard,players)
  const hasDraw = gameTurns.length === 9 && !winner;

function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{
          square:{ row : rowIndex,
                   col : colIndex },
             player : currentPlayer  },...prevTurns,];

             return updatedTurns;
    });
  }
   function handleRematch(){
      setGameTurns([]);
   }
   function handlePlayerNameChange(symbol,newName){
        setPlayers(prevPlayers=>{
           return {
            ...prevPlayers,
            // dynamically set the property using square braces 
            [symbol] : newName
           };
        });
   }
   
  return ( 
   <main>
    <div id ="game-container">
    <ol id="players" className = "highlight-player" >
    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer ==='X'} onChangeName = {handlePlayerNameChange} />  
    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer ==='O'}  onChangeName = {handlePlayerNameChange} /> 
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
      <GameBoard onSelectSquare={handleSelectSquare}  board={gameBoard} /> 
      </div>
      <Log turns={gameTurns}/>
  </main>
  );
}

export default App
