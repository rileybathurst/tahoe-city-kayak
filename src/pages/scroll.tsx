// ! this is a work in progress

import React, { useState, useEffect, useRef } from 'react';
import { Link } from "gatsby"

const ScrollPage = () => {

  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {

    console.log(ref1.current);
    console.log(ref1.current.clientHeight);

    setOne(ref1.current.clientHeight);
    setTwo(ref2.current.clientHeight);
    setThree(ref3.current.clientHeight);

  }, [])

  return (
    <>
      <h1>before</h1>

      <div className="scroller">
        <nav>
          <Link to="#page-1">1</Link>
          <Link to="#page-2">2</Link>
          <Link to="#page-3">3</Link>
        </nav>
        <div className="scroll-container">
          <div className="scroll-page" id="page-1" ref={ref1}
            style={{ height: one }}
          >

            You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? Just my luck, no ice. Remind me to thank John for a lovely weekend. Life finds a way. Life finds a way. Yes, Yes, without the oops! Eventually, you do plan to have dinosaurs on your dinosaur tour, right?

            God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists.

            Remind me to thank John for a lovely weekend. Remind me to thank John for a lovely weekend. God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. Remind me to thank John for a lovely weekend. You really think you can fly that thing?

            God help us, we're in the hands of engineers. You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? God help us, we're in the hands of engineers. You know what? It is beets. I've crashed into a beet truck. Do you have any idea how long it takes those cups to decompose.

            My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings. Goodbye! God help us, we're in the hands of engineers. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore!
          </div>
          <div className="scroll-page" id="page-2" ref={ref2}
            style={{ height: two }}
          >

            God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists.

            Remind me to thank John for a lovely weekend. Remind me to thank John for a lovely weekend. God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. Remind me to thank John for a lovely weekend. You really think you can fly that thing?

            God help us, we're in the hands of engineers. You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? God help us, we're in the hands of engineers. You know what? It is beets. I've crashed into a beet truck. Do you have any idea how long it takes those cups to decompose.

            My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings. Goodbye! God help us, we're in the hands of engineers. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore!
          </div>
          <div className="scroll-page" id="page-3" ref={ref3}
            style={{ height: three }}
          >


            Remind me to thank John for a lovely weekend. Remind me to thank John for a lovely weekend. God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. Remind me to thank John for a lovely weekend. You really think you can fly that thing?

            God help us, we're in the hands of engineers. You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? God help us, we're in the hands of engineers. You know what? It is beets. I've crashed into a beet truck. Do you have any idea how long it takes those cups to decompose.

            My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings. Goodbye! God help us, we're in the hands of engineers. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore!
          </div>
        </div>

      </div>


      <h1>below</h1>

    </>
  )
}

export default ScrollPage
