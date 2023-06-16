import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function SlideWrapper({ children }) {
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
          <div className="flex justify-center w-full h-96 text-black items-center overflow-hidden relative">
            <AnimatePresence custom={direction}>
              <motion.div
                key={count}
                variants={varients}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.5 }}
                className={`h-[200px] absolute flex justify-center items-center w-full `}
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full">
                  {children}
                </div>
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
  enter: (direction) => ({ x: direction * 600 }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction * -600 }),
};

// let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

export default SlideWrapper;
