function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();




var tl = gsap.timeline();

tl.from("#page1 h1",{
    top:"-40%",
    duration:2,
    opacity:0
})
tl.from("#page1 .image-container",{
    scale:0.5,
    duration:1,
})
tl.from("#page1 #nav",{
    opacity:0,
    top:"-40%"
})


                                                        //text effect for one h1

// let firsth1 = document.querySelector("#page2 #firsth1");

// let splittedText = firsth1.textContent.split("")
// let clutter = "";
// splittedText.forEach(function(elem){
//     clutter += `<span>${elem}</span>`
// })

// firsth1.innerHTML=clutter;


// gsap.to("#page2 h1 span",{
//     color:"#F7F7EE",
//     stagger:0.1,
//     scrollTrigger:{
//         trigger:"#page2 #firsth1",
//         scroller:"body",
//         markers:true,
//         start:"top 50%",
//         end:"top 10%",
//         scrub:true
//     }
// })



                                                        //for all h1s

var allH1 = document.querySelectorAll("#page2 h1");


function textSplittingIntoSpanAndStoring(){
    allH1.forEach(function(elem){
        let h1Text = elem.textContent;
        let splittedText = h1Text.split("");
        let clutter = "";
        splittedText.forEach(function(ch){
            clutter += `<span>${ch}</span>`
        })
        elem.innerHTML = clutter
    
    })
}

textSplittingIntoSpanAndStoring();



gsap.to("#page2 h1 span",{
    color:"#E2E3C4",
    stagger:0.3,
    scrollTrigger:{
        trigger:"#page2 #firsth1",
        scroller:"#main",
        // markers:true,
        start:"top 50%",
        end:"top -10%",
        scrub:2
    }
})




//cursor animation

document.querySelector("#page3").addEventListener("mousemove",function(dets){
gsap.to("#page3 #circle",{
    x:dets.x+"px",
    y:dets.y+"px"
})
})