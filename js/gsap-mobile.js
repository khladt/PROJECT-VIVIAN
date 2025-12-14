import { setSmootherInstance } from './utils.js';

export function startMobileGSAP(s, q, f) {
    const smootherInstance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        normalizeScroll: true,
        effects: true,
    });
    
    setSmootherInstance(smootherInstance);

    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: "+=9000vh", 
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
            pinType: 'transform'
        }
    });

    runAnimation

    .set('.Seven',{className:'Seven is-front',duration:0},"<")
    .to('#chara-quinn',{opacity:0},"<")
    .to('#chara-seven',{opacity:0},"<")

    .fromTo('.site-header', { opacity: 1}, {opacity: 0, duration: 1 },0)
    

    .fromTo('#S1-BG', {scale:2,x:"-0.5%" ,y: "-550%"}, {y:"50%", duration: 11 }, 0)
    .fromTo('#S1-TOWER', {scale:2, y: "-550%"}, {y:"47%", duration: 11 }, 0)
    .fromTo('#S1-FOG-2', {scaleY:2, y: "-550%"}, {y:"65%", duration: 11.3 }, 0) 
    .fromTo('#S1-L2', {scale:1.5,x:"23%" ,y: "-550%"}, {y:"10%", duration: 11 }, 0) 

    .fromTo('#S1-L1', {scale:1.8, y: "-500%"}, {y:"50%", duration: 11 }, 0)
    .fromTo('#S1-FOG-1', {scale:3 ,y: "-550%"}, {y:"120%", duration: 11.5 }, 0) 
    .fromTo('#S1-L0', {scaleY:3 ,y: "-550%"}, {y:"95%", duration: 11 }, 0)
    .fromTo('#S1-FOG-0', {scale:3, y: "-550%"}, {y:"135%", duration: 10.5 }, 0) 


    .fromTo('#S1-QUINN-0', {y: "-550%"},{y: "5.5%"}, 0)
    .fromTo('#S1-QUINN-1', {y: "-550%"},{y: "5.5%"}, 0)
    .fromTo('#S1-FG', {scale:1.7 ,x:"30%",y: "-550%"}, {y: "80%", duration: 10 }, 0)


    .fromTo('.Seven', 
        {scale:1.8 ,x: "400%" ,y: "1000%"}, {y: "250%", duration: 4, duration: 10 }, "<")    

    .fromTo('.Seven', 
        {filter: "brightness(0%) hue-rotate(40deg)"}, 
        {filter: "brightness(90%) hue-rotate(340deg) saturate(70%) grayscale(30%)", duration: 6 }, 5) 


    .fromTo('.dialogue-box',{x:"200vw", y:"-85vh" ,scale: 0.0}, {x:"30vw",y:"-60vh" ,scale: 1, duration: 2 })
    .to('.character-name', {text: s, duration: 2 })
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")

    .set('.Seven',{className:'Seven is-front-wave',duration:0},"<")
    .to('.dialogue-text',{text: "All clear QUIINNNN!", duration: 2 },"<")

    .to('.dialogue-box',{x:"2vw",y:"-30vh" ,scale: 1, duration: 2 },"+=5")
    .to('.character-name', {text: q, duration: 3 },"<")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")

    .to('.dialogue-text', {text: "Then Let's keep moving.", duration: 4 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 1 })
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 1 },"<")

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.dialogue-text', {text: "", duration: 0.5},"<")


    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")

    .to('#S1-FG', {y: "-30%", duration: 7 },"<") 
    .to('.Seven',{y: "-50%", duration: 4 }, "<")
    .to('#S1-FOG-0', {y:"-15%", duration: 5.5 }, "<")
    .to('#S1-L0', {y:"-50%", duration: 5 }, "<")

    .to('#S1-L1', {y:"-75%", duration: 4.5 }, "<")
    .to('#S1-FOG-1', {y:"-48%", duration: 4 }, "<")

    .to('#S1-L2', {y:"-80%", duration: 3.5 }, "<")
    .to('#S1-FOG-2', {y:"-30%", duration: 3.5 }, "<")
    .to('#S1-TOWER', {y:"-40%", duration: 3 }, "<")
    .to('#S1-BG', {y:"-35%", duration: 3 }, "<")


    .to('.site-header',{opacity: 1, duration: 4 })

    return smootherInstance;
};