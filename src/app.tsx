import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { memes } from "./memes";

export type Card = { key: string; path: string };

const DEFAULT_CARDS: Card[] = [
  ...[
    ...Object.entries(memes).map(([key, path]) => ({
      key: `${key}?1_1`,
      path,
    })),
    ...Object.entries(memes).map(([key, path]) => ({
      key: `${key}?1_2`,
      path,
    })),
  ],
  ...[
    ...Object.entries(memes).map(([key, path]) => ({
      key: `${key}?2_1`,
      path,
    })),
    ...Object.entries(memes).map(([key, path]) => ({
      key: `${key}?2_2`,
      path,
    })),
  ],
];

const FLIP_CARD_DURATION = 0.4;

export function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [tempKeys, setTempKeys] = useState<string[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const timer = useRef<NodeJS.Timeout>();

  const reset = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = undefined;

    setSelectedCards([]);
    setTempKeys([]);
    setSeconds(0);

    setTimeout(() => {
      setCards(() => [...DEFAULT_CARDS.sort(() => Math.random() - 0.5)]);
    }, FLIP_CARD_DURATION * 1000);
  }, [setCards, setSelectedCards, setSeconds]);

  useEffect(() => {
    reset();
  }, [reset]);

  const startTimer = useCallback(() => {
    timer.current = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  }, [setSeconds]);

  return (
    <main className="w-full h-full py-3 px-3 sm:px-10 md:px-20 lg:px-24 xl:px-28">
      <div className="grid grid-cols-10 gap-2 md:gap-3 lg:gap-4">
        {cards.map((card, index) => {
          const isSelected =
            selectedCards.includes(card.key) || tempKeys?.includes(card.key);

          const Button = (
            <div className="relative w-full aspect-square transition-transform duration-300 hover:scale-105">
              <motion.button
                className="relative w-full aspect-square"
                onClick={() => {
                  if (isSelected) {
                    return;
                  }

                  if (tempKeys?.length === 2) {
                    return;
                  }

                  if (typeof timer.current === "undefined") {
                    startTimer();
                  }

                  // First selection in the attempt
                  if (tempKeys.length === 0) {
                    setTempKeys([card.key]);
                    return;
                  }

                  if (matchCards(tempKeys[0], card.key)) {
                    // Stop timer when all has been selected
                    if (selectedCards.length + 2 === DEFAULT_CARDS.length) {
                      clearTimeout(timer.current);
                    }

                    setSelectedCards([...selectedCards, ...tempKeys, card.key]);
                    setTempKeys([]);
                    return;
                  }

                  setTempKeys([...tempKeys, card.key]);

                  // Delay flipping so cards can be viewed
                  setTimeout(() => {
                    setTempKeys([]);
                  }, FLIP_CARD_DURATION * 1000 * 2);
                }}
                transition={{ ease: "linear", duration: FLIP_CARD_DURATION }}
                initial={{ rotateY: 180 }}
                animate={{ rotateY: isSelected ? 0 : 180 }}
              >
                <motion.div
                  className={cx(
                    "w-full aspect-square p-2",
                    "shadow-sm hover:shadow-xl transition-shadow duration-200",
                    {
                      "bg-cyan-500": card.key.includes("?1"),
                      "bg-green-500": card.key.includes("?2"),
                    }
                  )}
                  transition={{
                    ease: "linear",
                    duration: 0,
                    delay: FLIP_CARD_DURATION / 2,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSelected ? 1 : 0 }}
                >
                  <img alt={card.key} src={card.path} />
                </motion.div>
                <motion.div
                  className={cx(
                    "absolute top-0 w-full aspect-square p-2",
                    "shadow-sm hover:shadow-2xl transition-shadow duration-300",
                    "bg-orange-700"
                  )}
                  transition={{
                    ease: "linear",
                    duration: 0,
                    delay: FLIP_CARD_DURATION / 2,
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isSelected ? 0 : 1 }}
                />
              </motion.button>
            </div>
          );

          // Center the info box
          if (index === 24) {
            return (
              <Fragment key={card.key}>
                <div className="col-span-2 row-span-2 justify-center items-center flex flex-col gap-0 sm:gap-1 md:gap-2 lg:gap-3">
                  <h4 className="text-sm lg:text-md font-bold uppercase">
                    {(seconds - (seconds % 60)) / 60 < 10
                      ? `0${(seconds - (seconds % 60)) / 60}`
                      : (seconds - (seconds % 60)) / 60}
                    :{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
                  </h4>
                  <h1 className="font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                    MEMEry
                  </h1>
                  <button
                    className={cx(
                      "transition duration-200 rounded-lg px-2.5 py-0.5 text-sm",
                      "bg-gradient-to-r from-orange-700	to-red-700 text-white",
                      "hover:scale-105 shadow-sm hover:shadow-xl active:shadow-sm active:scale-100"
                    )}
                    onClick={reset}
                  >
                    Reset
                  </button>
                </div>
                {Button}
              </Fragment>
            );
          }
          return <Fragment key={card.key}>{Button}</Fragment>;
        })}
      </div>
    </main>
  );
}

const matchCards = (key1: string, key2: string): boolean =>
  key1 !== key2 &&
  key1.substring(0, key1.length - 2) === key2.substring(0, key2.length - 2);
