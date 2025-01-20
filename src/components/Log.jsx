export default function Log( {turns} ) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}

// In this Project in One area we r updating Ui state for different components through one Ui State
// Learn How to make state useeful for multiple Components 
