function setAnimationScroll() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2.0,
        effects: true,
    });

    const parallaxImages = document.querySelectorAll('#story-parallax img');
    Promise.all(
        Array.from(parallaxImages).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve);
            });
        })
    ).then(() => {
        initParallaxAnimation();
    });
}

function initParallaxAnimation() {
    if (window.matchMedia("(min-width: 769px)").matches) {
    ScrollTrigger.normalizeScroll(true);
    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: "+=4000", 
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
        }
    });

    runAnimation

    //SCENE 1 ANIMATION SECTION
    .fromTo('.site-header', { opacity: 1}, {opacity: 0, duration: 1 },0)
    

    .fromTo('#S1-FG', { y: "-250%"}, {y: "20%", duration: 4 }, 0)
    .fromTo('#S1-FOG-0', { y: "-250%"}, {y:"25%", duration: 3.7 }, 0) 
    .fromTo('#S1-L0', { y: "-250%"}, {y:"0%", duration: 3.7 }, 0) 

    .fromTo('#S1-L1', { y: "-250%"}, {y:"1%", duration: 3.5 }, 0)

    .fromTo('#S1-FOG-1', { y: "-250%"}, {y:"15%", duration: 3.5 }, 0) 

    .fromTo('#S1-L2', { y: "-250%"}, {y:"-10%", duration: 3.2 }, 0) 
    .fromTo('#S1-FOG-2', { y: "-250%"}, {y:"30%", duration: 3.2 }, 0)
    .fromTo('#S1-TOWER', { y: "-1000%"}, {y:"0%", duration: 2 }, 0)
    .fromTo('#S1-BG', { y: "-260%"}, {y:"0%", duration: 3 }, 0)

    .fromTo('.Seven', {x: "500%" ,y: "1000%"}, {y: "100%", duration: 4 }, 6)

    .fromTo('.Seven', 
        { filter: "brightness(0%) hue-rotate(340deg) saturate(70%) grayscale(30%)" }, 
        { filter: "brightness(90%) hue-rotate(340deg) saturate(70%) grayscale(30%)", duration: 10 }, 
        "<")    
    .fromTo('.dialogue-box',{x:"400%" ,scale: 0.0}, {x:"200%",y:"-400%" ,scale: 1, duration: 2 })
    .to('.character-name', {text: "SEVEN", duration: 2 })
    .call(changeSequence, ['is-front'])
    .call(changeSequence, ['is-front-wave'])
    .to('.dialogue-text', {text: "All clear QUIINNNN!", duration: 2 })


    .to('.dialogue-box',{x:"8%",y:"-100%" ,scale: 1, duration: 2 },"+=5")
    .to('.character-name', {text: "QUINN", duration: 2 },"<")
    .to('.dialogue-text', {text: "Then Let's keep moving.", duration: 2 })
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 1 })
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 1 },"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 2 },"+=5")
    .to('#S1-FG', {y: "10%", duration: 2 },"<")
    
    .to('#S1-FOG-0', {y:"15%", duration: 1.7 }, "<")
    .to('#S1-L0', {y:"-5%", duration: 1.7 }, "<")

    .to('#S1-L1', {y:"-4%", duration: 2 }, "<")
    .to('#S1-FOG-1', {y:"-4%", duration: 2 }, "<")

    .to('#S1-L2', {y:"-20%", duration: 1.2 }, "<")
    .to('#S1-FOG-2', {y:"10%", duration: 1.2 }, "<")

    .to('#S1-TOWER', {y:"-20%", duration: 1 }, "<")
    .to('#S1-BG', {y:"-10%", duration: 2 }, "<")





    .to('.dialogue-box',{scale: 0.0, duration: 1 },9)









        //SCENE 2 ANIMATION SECTION
}}

setAnimationScroll();

document.querySelector('.copyright-year').textContent = new Date().getFullYear();

const sevenElement = document.querySelector('.Seven');

function changeSequence(newClass) {
    sevenElement.className = sevenElement.className.replace(/\bis-\w*\b/g, ''); 
    
    sevenElement.classList.add(newClass);
    console.log(newClass)
}
changeSequence('is-front')
