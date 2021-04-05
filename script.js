
// gsap.set('p', {
//      opacity: 0
//  })


//  const tl = gsap.timeline({
//    scrollTrigger: {
//        trigger: "p",
//        start: "+=30 80%",
//        end: "+=200 40%",
//        scrub: true,
//         markers: true,
//         toggleActions: "play reverse play reverse",
//      }
//  });

//  tl
//      .to('p', { opacity: 1, duration: 0.5 })
//      .to('p', { opacity: 0, duration: 0.5 }, 0.5);


// function setupSplits() {
  
//     var tlSplitBurrowing = gsap.timeline(), 
//         SplitBurrowing = new SplitText(".p", {type:"words,chars"}), 
//         chars = SplitBurrowing.chars; //an array of all the divs that wrap each character
    
    
//     tlSplitBurrowing.from(chars, {
//       duration: 0.8,
//       opacity:0,
//       y:10,
//       ease:"circ.out",
//       stagger: 0.02,
//     scrollTrigger: {
//         trigger: ".p",
//     //markers:true,
//         start: "top 75%",
//        end: "bottom center",
//         scrub:1
//       }
//     //,   onComplete: () => {SplitBurrowing.revert()}
//     }, "+=0");
    
//     // window.addEventListener('resize', function() {
//       // SplitBurrowing.revert();
//     // });
      
//     };

// ScrollTrigger.addEventListener("refresh", setupSplits);
// setupSplits();
// gsap.set('.img', {xPercent:-50});









var rotate = gsap.timeline({
  scrollTrigger:{
    trigger: "#wrap",
    pin: true,
    scrub:0.75,
    start: 'top top',
    end:'+=5700',
    scroller: "#scrollElement"
  }
});
rotate.set(".img", {  x: "50%",
y: "-50%"
});

rotate.to('.img', {
  duration:1,
  rotation:360*5,
  ease:'none',
})