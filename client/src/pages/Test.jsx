import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Test() {
  const [count, setCount] = useState(1);
  const [tuple, setTuple] = useState([null, count]);

  if (tuple[1] !== count) {
    setTuple([tuple[1], count]);
  }

  let prev = tuple[0];
  let direction = count > prev ? 1 : -1;

  return (
    <>
      <div className="text-black">
        <div className="flex justify-center items-center">
          <div className="flex justify-center w-40 h-24 text-white items-center bg-gray-700 overflow-hidden relative">
            <AnimatePresence custom={direction}>
              <motion.div
                key={count}
                variants={varients}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.5 }}
                className={`h-20 w-20 ${
                  colors[Math.abs(count) % 4]
                } absolute flex justify-center items-center `}
              >
                {count}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <button onClick={() => setCount(count - 1)}>이전으로</button>
          <button onClick={() => setCount(count + 1)}>다음으로</button>
        </div>
      </div>
    </>
  );
}

let varients = {
  enter: (direction) => ({ x: direction * 100 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -100 }),
};

let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

export default Test;
