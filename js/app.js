const s = 'VIVI'
const q = 'Quinn'
const f = 'Falco'


// Function to handle scroll locking/unlocking
function lockScroll() {document.body.style.overflow = 'hidden';}
function unlockScroll() {document.body.style.overflow = '';}



// Function to handle the loader fade-out and scroll unlock
function hideLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        // Use GSAP to ensure a smooth fade-out effect on the loader
        gsap.to(loader, { 
            opacity: 0, 
            duration: 0.5, 
            ease: "power2.inOut",
            onComplete: () => {
                loader.style.visibility = 'hidden';
                loader.style.pointerEvents = 'none';
                unlockScroll();
            }
        });
    } else {unlockScroll();}
}


let smootherInstance = null; 

function killGSAP() {
    ScrollTrigger.killAll();

    if (smootherInstance) {
        smootherInstance.kill();
        smootherInstance = null; // Clear the reference
        console.log("ScrollSmoother killed.");
    }
    

    console.log("Old GSAP instance destroyed.");
}

function handleResizeOrRotate() {
    // Use a timeout to wait for the resize/rotation to settle and the window.innerWidth to update
    clearTimeout(window.resizeTimer); 
    window.resizeTimer = setTimeout(() => {
        
        // 1. Destroy the old setup
        killGSAP(); 
        
        // 2. Re-initialize the setup
        initGSAP(); 
        
        // 3. Optional: Unlock scroll if it was locked by a previous initGSAP call 
        //    (You'll need to adjust your lockScroll/unlockScroll logic to handle this)
        unlockScroll();

        console.log("GSAP reloaded based on new dimensions.");

    }, 300); // 300ms delay to ensure stable width reading
}




function initGSAP() {
    lockScroll(); 
    
    gsap.registerPlugin(Draggable,DrawSVGPlugin,ScrollTrigger,ScrollSmoother,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle)

    
    const parallaxImages = document.querySelectorAll('#story-parallax img');
    
    // Filter out images that are already complete
    const imagesToLoad = Array.from(parallaxImages).filter(img => !img.complete);

    // --- REPLACED PLACEHOLDER WITH YOUR ACTUAL IMAGE LOADING PROMISE ---
    const assetLoadPromise = Promise.all(
        imagesToLoad.map(img => {
            return new Promise(resolve => {
                // Attach load/error handlers to resolve the promise when image is ready
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve); 
            });
        })
    );
    
    assetLoadPromise.then(() => {
        startGSAP();
        hideLoader(); 
    });
}


function startGSAP() {
    if (window.matchMedia("(min-width: 821px)").matches) {
        // Desktop/Tablet Version
        startDesktopGSAP(); // Renamed your original function to reflect its purpose
    } else {
        // Mobile (Portrait) Version
        startMobileGSAP(); // Run the new, optimized mobile function
    }
}


    const blinkingTimeline = gsap.timeline({
    repeat: -1,
    yoyo: false, 
    paused: false
    });

    blinkingTimeline
    .to('#S3-LE-0', {opacity: 0.0, duration: 1.0 }, "<+=0.5")
    .to('#S3-LE-1', {opacity: 1.0, duration: 0.5 }, "<");

function startDesktopGSAP() {
        smootherInstance = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            normalizeScroll: true,
            effects: true,
        });


    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: () => "+=" + 80 * window.innerHeight,            
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
            pinType: 'transform' // Forces GPU-accelerated pinning
        }
    });

    runAnimation

    //SCENE 1 ANIMATION SECTION


    .fromTo('.dialogue-box',{x:"300vh", y:"-100vh" ,scale: 0.0}, {x:"35vw",y:"-20vh" ,scale: 1, duration: 2 })
    .to('.character-name', {text: s, duration: 5 },"<")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")
    .to('.dialogue-text',{text: "Quinnny-Que. KWEEEEEEN.", duration: 9 },"<")


    .fromTo('.site-header', { opacity: 1}, {opacity: 0, duration: 1 },0)
    

    .fromTo('#S1-BG', { y: "-550%"}, {y:"0%", duration: 21 }, 0)
    .fromTo('#S1-TOWER', { y: "-550%"}, {y:"0%", duration: 21 }, 0)
    .fromTo('#S1-FOG-2', { y: "-550%"}, {y:"15%", duration: 21.3 }, 0) 
    .fromTo('#S1-L2', { y: "-550%"}, {y:"-10%", duration: 21 }, 0) 

    .fromTo('#S1-L1', { y: "-550%"}, {y:"1%", duration: 21 }, 0)
    .fromTo('#S1-FOG-1', { y: "-550%"}, {y:"25%", duration: 21.5 }, 0) 
    .fromTo('#S1-L0', { y: "-550%"}, {y:"0%", duration: 20.5 }, 0)
    .fromTo('#S1-FOG-0', { y: "-550%"}, {y:"25%", duration: 20.8 }, 0) 

    .fromTo('#S1-FG', { y: "-550%"}, {y: "20%", duration: 20 }, 0)


    .fromTo('.Seven', 
        {backgroundImage:'url("img/Seven/sss-s1.png")' ,className:'Seven is-front',x: "400%" ,y: "1000%"}, {y: "50%", duration: 24}, "<")    

    .fromTo('.Seven', 
        {filter: "brightness(0%)"}, 
        {filter: "brightness(100%) saturate(70%) grayscale(30%)", duration: 16 }, "<+=10") 


    .to('.dialogue-box',{x:"55vw",y:"-40vh" ,scale: 1, duration: 2 },"<+=10")
    .to('.character-name', {text: s, duration: 5 })
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")
    .fromTo('#S1-QUINN-1', { opacity: 1}, {opacity: 0, duration: 3 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 0}, {opacity: 1, duration: 3 },"<")   

    .to('.Seven',{className:'Seven is-front-wave'}, "<")
    .to('.dialogue-text',{text: "Found an underground entrance, "+q+"!", duration: 9 },"<")

    .to('.dialogue-box',{x:"25vw",y:"-30vh" ,scale: 1, duration: 9 },">+=10")
    .to('.character-name', {text: q, duration: 7 },"<")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .fromTo('#S1-QUINN-0', { opacity: 0}, {opacity: 0, duration: 3 },"<")
    .fromTo('#S1-QUINN-1', { opacity: 1}, {opacity: 1, duration: 3 },"<")    
    .to('.dialogue-text',{text: "SHHHH!. lower your damn voice!", duration: 15 },"<")



    .to('.dialogue-box',{x:"55vw",y:"-40vh" ,scale: 1, duration: 2 },">+=10")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")
    .to('.character-name', {text: s, duration: 7 },"<")
    .to('.Seven',{className:'Seven is-front'},'<')
    .fromTo('#S1-QUINN-1', { opacity: 1}, {opacity: 0, duration: 3 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 0}, {opacity: 1, duration: 3 },"<")
    .to('.dialogue-text',{text: "Sowey...", duration: 5 },"<")


    .to('.dialogue-box',{x:"25vw",y:"-30vh" ,scale: 1, duration: 2 },">+=5")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.character-name', {text: q, duration: 7 },"<")
    .to('.dialogue-text',{text: "It should lead us straight to the Tower... *Sigh* Good Job "+s+".", duration: 15 },"<")

    .to('.dialogue-box',{x:"55vw",y:"-40vh" ,scale: 1, duration: 2 },">+=10")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:1,duration:1},"<")
    .to('.character-name', {text: s, duration: 7 },"<")
    .to('.dialogue-text',{text: "HeHe. You are welcome.", duration: 10 },"<")
    .to('.Seven',{className:'Seven is-front-wave'},'<')
    .to('.Seven',{className:'Seven is-front'},'<+=2')
    .to('.Seven',{className:'Seven is-side'},'<+=2')
    .to('.Seven',{className:'Seven is-back'},'<+=2')
    .to('.Seven',{scaleX:-1 ,className:'Seven is-side',duration:0},'<+=2')
    .to('.Seven',{scaleX:1 ,className:'Seven is-front',duration:0},'<+=2')
    .to('.Seven',{className:'Seven is-front-wave'},'<+=5')



    .to('.dialogue-box',{x:"25vw",y:"-30vh" ,scale: 1, duration: 2 },"+=15")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.character-name', {text: q, duration: 7 },"<")
    .to('.dialogue-text',{text: "Let's just keep moving. *QUITELY*", duration: 15 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 3 },"<")
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 3 },"<")
    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.dialogue-text', {text: "", duration: 0.5},"<")

    .to('#S1-FG', {y: "-5%", duration: 13 },"<") 

    .to('.Seven',{y: "-100%", duration: 9 }, "<") // Seven is now off-screen vertically
    
    .to('#S1-FOG-0', {y:"-15%", duration: 11.5 }, "<")
    .to('#S1-L0', {y:"-50%", duration: 11 }, "<")

    .to('#S1-L1', {y:"-35%", duration: 11 }, "<")
    .to('#S1-FOG-1', {y:"-15%", duration: 10.5 }, "<")

    .to('#S1-L2', {y:"-60%", duration: 10 }, "<")
    .to('#S1-FOG-2', {y:"-30%", duration: 8.5 }, "<")
    .to('#S1-TOWER', {y:"-40%", duration: 8 }, "<")
    .to('#S1-BG', {y:"-50%", duration: 8 },"<")

    .to('#S1-FG', {y: "-100%", duration: 12 }) 
    .to('#S1-FOG-0', {y:"-100%", duration: 7 }, "<")
    .to('#S1-L0', {y:"-100%", duration: 7 }, "<")
    .to('#S1-L1', {y:"-100%", duration: 7 }, "<")
    .to('#S1-FOG-1', {y:"-100%", duration: 7 }, "<")
    .to('#S1-L2', {y:"-100%", duration: 7 }, "<")
    .to('#S1-FOG-2', {y:"-100%", duration: 7 }, "<")
    .to('#S1-TOWER', {y:"-100%", duration: 7 }, "<")
    .to('#S1-BG', {y:"-100%", duration: 7 },"<")
    .set('.Seven', {x: "400%", y: "1000%", backgroundImage: 'url("img/Seven/sss-s1.png")',className: 'Seven is-front',filter: "brightness(0%)",}, "<")


//SCENE 2 ANIMATION SECTION
.fromTo('#S2-FG', {filter: "brightness(0%) saturate(0%)", y:"250%"}, {filter: "brightness(100%) saturate(80%)",y:"-40%", duration: 21 },"<")
.fromTo('#S2-L0', {filter: "brightness(0%) saturate(0%)", y:"200%"}, {filter: "brightness(100%) saturate(60%)",y:"-30%", duration: 13 },"<+=2")
.fromTo('#S2-L1', {filter: "brightness(0%) saturate(0%)", y:"150%"}, {filter: "brightness(100%) saturate(40%)",y:"-15%", duration: 11 },"<")
.fromTo('#S2-L2', {filter: "brightness(0%) saturate(0%)", y:"100%"}, {filter: "brightness(100%) saturate(30%)",y:"-5%", duration: 10 },"<")
.fromTo('#S2-BG', {opacity:0.0,y:"30%"}, {opacity:1.0, y:"-30%", duration: 21 },"<")
.fromTo('#S2-LW', {scale:0.9,opacity:0.0, x:"50vw" ,y:"-315%"}, {opacity:1.0,y:"0%", duration: 20.5 },"<")


//Scene 2 Ending
.to('#S2-FG', {filter: "brightness(5%) saturate(100%)" ,y:"-100%", duration: 25 })
.to('#S2-L0', {filter: "brightness(5%) saturate(100%)",y:"-100%", duration: 23 },"<")
.to('#S2-L1', {filter: "brightness(5%) saturate(100%)",y:"-100%", duration: 22 },"<")
.to('#S2-L2', {filter: "brightness(5%) saturate(100%)",y:"-100%", duration: 21 },"<")
.to('#S2-BG', {opacity:0.0,y:"-100%", duration: 20 },"<")
.to('#S2-LW', {opacity:0.3,y:"100%", duration: 40 },"<")



//SCENE 3 (with S2-LW) ANIMATION SECTION
.fromTo('#S3-L0', {opacity:0.0}, {opacity:1.0,y:"-10%", duration: 1 },"<")
.fromTo('#S3-BG', {opacity:0.0,y:"0%"}, {opacity:1.0, duration: 20 },"<")
.call(() => blinkingTimeline.play(), [], "<")

.to('.dialogue-box', {x:"50vw",y:"-50vh" ,scale: 1, duration: 2 },"<")
.to('.character-name', {text: s, duration: 3 },"<")
.to('#chara-quinn', {opacity:0,duration:1},"<")
.to('#chara-seven', {opacity:1,duration:1},"<")
.fromTo('.dialogue-text',{text:""} ,{text: "🎶 Take oOOOOn me (TAKE ON ME) Take mEEEeeEe on (TAKE ON ME) 🎶", duration: 22 },"<")

.fromTo('#S3-LE-0', {scale: 0.6,y:"-90%",x:"5%"}, {y:"-30%", duration: 60 },"<")
.fromTo('#S3-LE-1', {scale: 0.6,opacity:0.0,y:"-90%",x:"5%"}, {y:"-30%", duration: 60 },"<")

.to('#S3-BG', {y:"-20%" ,duration: 80 },"<")
.to('#S3-L0', {y:"-30%",duration: 80 },"<")


.to('.dialogue-box',{x:"0vw",y:"-55vh", duration: 10 },"<+=25")
.to('.character-name', {text: q, duration: 3 },"<")
.to('#chara-quinn', {opacity:1,duration:1},"<")
.to('#chara-seven', {opacity:0,duration:1},"<")
.to('.dialogue-text',{text: '"*Sigh* Damn you Louis."', duration: 10 },"<")


.to('.dialogue-box',{x:"0vw",y:"-70vh", duration: 10 },"<+20")
.to('.character-name', {text: s, duration: 3 },"<")
.to('#chara-quinn', {opacity:0,duration:1},"<")
.to('#chara-seven', {opacity:1,duration:1},"<")
.to('.dialogue-text',{text: "🎶 I'LL BEEE GOOONE, IN A DAY OR TWOOOOOOOOOOOOOOOO 🎶", duration: 15 },"<")


.to('.dialogue-box',{x:"0vw",y:"-80vh", duration: 15 },"<+=25")
.to('.character-name', {text: q, duration: 3 },"<")
.to('#chara-quinn', {opacity:1,duration:1},"<")
.to('#chara-seven', {opacity:0,duration:1},"<")
.to('.dialogue-text',{text: '*GOD DAMMIT, V. SHUT UP!', duration: 16 },"<")


.to('#S2-LW', {opacity:0.5,y:"10%",duration: 5},"+=10")

.to('.dialogue-box', {x:"-55vw",y:"-40vh", duration: 2 },"<")
.to('.dialogue-text', {text: "", duration: 10 },"<")

.to('#S3-LE-0', {y:"-75%",duration: 8 },"<")
.to('#S3-LE-1', {y:"-75%",duration: 8 },"<")
.fromTo('#S3-FG-0', {y:"200%"}, {y:"45%", duration: 10 },"<")
.fromTo('#S3-FG-1', {y:"200%"}, {y:"20%", duration: 12 },"<")
.to('#S2-LW', {scaleY:0.0, opacity:0.0,y:"-5%",duration: 2},"<+=10")
.to('#S3-BG', {y:"-30%" ,duration: 8 },"<")
.to('#S3-L0', {y:"-50%",duration: 8 },"<")
.fromTo('#S3-LS',{opacity:0.0},{opacity:1.0,duration:5},'<')



.call(() => blinkingTimeline.paused(), [], "<")

//Scene 3 Ending
.to('#S3-FG-0', {y:"-30%", duration: 16 })
.to('#S3-FG-1', {y:"-50%", duration: 13 },"<")
.to('#S3-L0', {y:"-100%", duration: 16 },"<")
.to('#S3-LE-0', {y:"-125%", duration: 16 },"<")
.to('#S3-LE-1', {y:"-125%", duration: 16 },"<")
.to('#S3-BG', {y:"-100%", duration: 16 },"<")



//SCENE 2 ANIMATION SECTION
.fromTo('#S2-FG', {filter: "brightness(0%) saturate(0%)", y:"250%"}, {filter: "brightness(100%) saturate(80%)",y:"-40%", duration: 21 },"<")
.fromTo('#S2-L0', {filter: "brightness(0%) saturate(0%)", y:"200%"}, {filter: "brightness(100%) saturate(60%)",y:"-30%", duration: 13 },"<+=2")
.fromTo('#S2-L1', {filter: "brightness(0%) saturate(0%)", y:"150%"}, {filter: "brightness(100%) saturate(40%)",y:"-15%", duration: 11 },"<")
.fromTo('#S2-L2', {filter: "brightness(0%) saturate(0%)", y:"100%"}, {filter: "brightness(100%) saturate(30%)",y:"-5%", duration: 10 },"<")
.fromTo('#S2-BG', {opacity:0.0,y:"30%"}, {opacity:1.0, y:"-30%", duration: 21 },"<")


//Scene 2 Ending
.to('#S2-FG', {filter: "brightness(25%) saturate(7%)" ,y:"-90%", duration: 25 })
.to('#S2-L0', {filter: "brightness(25%) saturate(7%)",y:"-72%", duration: 23 },"<")
.to('#S2-L1', {filter: "brightness(25%) saturate(7%)",y:"-73%", duration: 22 },"<")
.to('#S2-L2', {filter: "brightness(25%) saturate(7%)",y:"-75%", duration: 21 },"<")
.to('#S2-BG', {filter: "brightness(25%) saturate(7%)",opacity:0.0,y:"-60%", duration: 20 },"<")

//Scene 4 Ending

.fromTo('#S4-FG',{scale:2.5,y:'150%',x:'75%'},{y:'15%',duration: 15},'<')

.fromTo('.Quinn-lantern',{scale: 2.3,y:'30%',x:'-80%', opacity:0.0},{x:'-75%',opacity:0.5,duration: 20})

.set('.Seven', {x: "400%", y: "1000%", backgroundImage: 'url("img/Seven/sss-s4.png")',scaleX:-1,className: 'Seven is-side',filter: "brightness(100%)",}, "<")
.fromTo('.Seven',{x: "-100%",y:'45%'},{x:'100%',y: "50%", duration: 34}, "<")  

.to('.dialogue-box',{x:"50vw",y:"-85vh", duration: 15 },"<")
.to('.character-name', {text: s, duration: 3 },"<")
.to('#chara-quinn', {opacity:0,duration:1},"<")
.to('#chara-seven', {opacity:1,duration:1},"<")
.to('.dialogue-text',{text: "Is this part of the adventure Quinn? Is there some kind of prize in that tower?", duration: 40 },"<")


.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{opacity: 0.7,x:'-70%',duration: 10})

.to('.Seven',{className:'Seven is-front',scaleX:1,duration:0},"<")

.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')

.to('.Quinn-lantern',{opacity: 1.0,x:'-65%',duration: 2})
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-60%',duration: 5})
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')


.to('.dialogue-box',{x:"50vw",y:"-85vh", duration: 5 },"<")
.to('.character-name', {text: q, duration: 3 },"<")
.to('#chara-quinn', {opacity:1,duration:1},"<")
.to('#chara-seven', {opacity:0,duration:1},"<")
.to('.dialogue-text',{text: "Yeah... sure.", duration: 5 },"<")


.to('.Quinn-lantern',{x:'-55%',duration: 2},"<+=6")
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-50%',duration: 5},"<+=3")
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')

.to('.Quinn-lantern',{x:'-45%',duration: 2},"<+=6")
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-40%',duration: 5},"<+=3")
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')
.to('#S4-FG',{x:'73%',duration: 3},"<")


.to('.dialogue-box',{x:"50vw",y:"-85vh", duration: 5 },"<")
.to('.character-name', {text: s, duration: 3 },"<")
.to('#chara-quinn', {opacity:0,duration:1},"<")
.to('#chara-seven', {opacity:1,duration:1},"<")
.to('.dialogue-text',{text:"Will there be bad guys?! I want to try this move Father Louis programmed me with.",duration:25},"<")


.to('.Quinn-lantern',{x:'-35%',duration: 2},"<+=6")
.to('#S4-FG',{x:'70%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-33%',duration: 5},"<+=3")
.to('#S4-FG',{x:'66%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')

.to('.Quinn-lantern',{x:'-30%',duration: 2},"<+=6")
.to('#S4-FG',{x:'63%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-28%',duration: 5},"<+=3")
.to('#S4-FG',{x:'59%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')



.to('.Quinn-lantern',{x:'-27%',duration: 2},"<+=6")
.to('#S4-FG',{x:'57%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-24%',duration: 5},"<+=3")
.to('#S4-FG',{x:'55%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')

.to('.Quinn-lantern',{x:'-23%',duration: 2},"<+=6")
.to('#S4-FG',{x:'53%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'-20%',duration: 5},"<+=3")
.to('#S4-FG',{x:'49%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')


.to('.dialogue-box',{x:"50vw",y:"-85vh", duration: 5 },"<")
.to('.character-name', {text: q, duration: 3 },"<")
.to('#chara-quinn', {opacity:1,duration:1},"<")
.to('#chara-seven', {opacity:0,duration:1},"<")
.to('.dialogue-text',{text:"Why not try it on "+f+"?",duration:5},"<")


.to('.Quinn-lantern',{x:'-19%',duration: 2},"<+=6")
.to('#S4-FG',{x:'45%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-17%',duration: 5},"<+=3")
.to('#S4-FG',{x:'42%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn b'},'<') 
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')
.to('.Seven',{className:'Seven is-side'},"<")


.to('.Quinn-lantern',{x:'-16%',duration: 2},"<+=6")
.to('#S4-FG',{x:'38%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')


.to('.dialogue-box',{x:"30vw",y:"-85vh", duration: 25 },"<")
.to('.character-name', {text: s, duration: 3 },"<")
.to('#chara-quinn', {opacity:0,duration:1},"<")
.to('#chara-seven', {opacity:1,duration:1},"<")
.to('.dialogue-text',{text:"Apparently he's my son...",duration:5},"<")


.to('.Quinn-lantern',{x:'-13%',duration: 5},"<+=3")
.to('#S4-FG',{x:'34%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'-11%',duration: 2},"<+=6")
.to('#S4-FG',{x:'29%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'-8%',duration: 5},"<+=3")
.to('#S4-FG',{x:'25%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')



.to('.Quinn-lantern',{x:'-6%',duration: 2},"<+=6")
.to('#S4-FG',{x:'22%',duration: 3},"<")

.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'0%',duration: 5},"<+=3")
.to('#S4-FG',{x:'17%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn d'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'5%',duration: 2},"<+=6")
.to('#S4-FG',{x:'13%',duration: 3},"<")

.set('.Quinn',{className: 'Quinn a'},'<') 
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{x:'12%',duration: 5},"<+=3")
.to('#S4-FG',{x:'6%',duration: 3},"<")
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.dialogue-box',{x:"70vw",y:"-85vh", duration: 25 },"<")
.to('.character-name', {text: s, duration: 3 },"<")
.to('#chara-quinn', {opacity:0,duration:1},"<")
.to('#chara-seven', {opacity:1,duration:1},"<")
.to('.dialogue-text',{text:"I don't like being called... daddy while I beat the shit out of him.",duration:5},"<")
.to('.Seven',{x:'680%',duration: 70},"<")


.to('.Quinn-lantern',{x:'18%',duration: 2},"<+=6")
.set('.Quinn',{className: 'Quinn c'},'<') 
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'25%',duration: 5},"<+=3")
.set('.Quinn',{className: 'Quinn d'},'<') 
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'30%',duration: 2},"<+=6")
.set('.Quinn',{className: 'Quinn a'},'<') 

.to('.Quinn-lantern',{x:'40%',duration: 5},"<+=3")
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.Quinn-lantern',{x:'51%',duration: 2},"<+=6")

.set('.Quinn',{className: 'Quinn c'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern a'},'<')

.to('.Quinn-lantern',{x:'55%',duration: 5},"<+=3")

.set('.Quinn',{className: 'Quinn d'},'<') 
.set('.Quinn-lantern',{className: 'Quinn-lantern b'},'<')

.to('.Quinn-lantern',{x:'64%',duration: 2},"<+=6")

.set('.Quinn',{className: 'Quinn a'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern c'},'<')

.to('.Quinn-lantern',{opacity:0.0,x:'70%',duration: 5},"<+=3")
.set('.Quinn',{className: 'Quinn b'},'<')
.set('.Quinn-lantern',{className: 'Quinn-lantern d'},'<')


.to('.dialogue-box',{x:"100vw",y:"-85vh", duration: 15 },"<")
.to('#S4-FG',{y:'-100%',duration: 25})
.to('#S2-FG', {y:"-100%", duration: 15 },"<")
.to('#S2-L0', {y:"-100%", duration: 13 },"<")
.to('#S2-L1', {y:"-100%", duration: 12 },"<")
.to('#S2-L2', {y:"-100%", duration: 11 },"<")
.to('#S2-BG', {opacity:0.0,y:"-100%", duration: 10 },"<")









    //All scene Ending
    .to('.site-header',{opacity: 1, duration: 4 },"<")
};





function startMobileGSAP() {

    smootherInstance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.0,
        normalizeScroll: true,
        effects: true,
    });


    let runAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#story-parallax",
            start: "top top",
            end: "+=9000vh", 
            scrub: 1, 
            pin: true,
            anticipatePin: 1,
            pinType: 'transform' // Forces GPU-accelerated pinning
        }
    });

    runAnimation

    //SCENE 1 ANIMATION SECTION
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

    .call(SevenchangeSequence, ['is-front'])
    .call(SevenchangeSequence, ['is-front-wave'])
    .to('.dialogue-text',{text: "All clear QUIINNNN!", duration: 2 },"<")

    .to('.dialogue-box',{x:"2vw",y:"-30vh" ,scale: 1, duration: 2 },"+=5")
    .to('.character-name', {text: q, duration: 3 },"<")
    .to('#chara-quinn',{opacity:1,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")

    .to('.dialogue-text', {text: "Then Let's keep moving.", duration: 4 },"<")
    .fromTo('#S1-QUINN-0', { opacity: 1}, {opacity: 0, duration: 1 })
    .fromTo('#S1-QUINN-1', { opacity: 0}, {opacity: 1, duration: 1 },"<")

    //Scene 1 Ending

    .to('.dialogue-box',{scale: 0, duration: 7 },"+=5")
    .to('#chara-quinn',{opacity:0,duration:1},"<")
    .to('#chara-seven',{opacity:0,duration:1},"<")
    .to('.dialogue-text', {text: "", duration: 0.5},"<")

    //Scene 1 Ending

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



    //All scene Ending
    .to('.site-header',{opacity: 1, duration: 4 })

};


//Fullscreen Functions ------------------------------------------------------
const fullscreenToggle = document.getElementById('fullscreenToggle');
fullscreenToggle.addEventListener('click', () =>{
    if (!document.fullscreenElement){document.documentElement.requestFullscreen()}
    else{document.exitFullscreen()}
    updateButtonText();
});

function updateButtonText() {
    // document.fullscreenElement is the standard property to check the current state
    if (document.fullscreenElement){fullscreenToggle.textContent = "Go Fullscreen (F11)";}
    else {fullscreenToggle.textContent = "Exit Fullscreen (F11)";}
}

//------------------------------------------------------------------------------



window.addEventListener("DOMContentLoaded", () => {
    initGSAP();
    
    // Listen for desktop window resize
    window.addEventListener('resize', handleResizeOrRotate); 
    
    // Listen for mobile orientation change
    window.addEventListener('orientationchange', handleResizeOrRotate); 
});