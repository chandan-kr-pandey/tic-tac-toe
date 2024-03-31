export default function GameOver({winner,onRematch}){
    return(
        <div id ="game-over">
            <h2>Game Over !</h2>
            {winner && <p>{winner} Won !</p>}
            {!winner && <p>It's a DRAW !</p>}
            <p>
                <button onClick={onRematch}>REMATCH !</button>
            </p>
        </div>
    );
}