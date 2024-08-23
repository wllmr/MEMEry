import { GameOfMEMEry } from "./game";

export function App() {
  const game = new GameOfMEMEry();

  return (
    <main>
      <div></div>
      <div className="flex flex-col gap-10">
        {game.getMatrix.map((col, x) => (
          <div className="flex gap-10">
            {col.map((box, y) => (
              <button>
                {x}
                {y}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div />
    </main>
  );
}
