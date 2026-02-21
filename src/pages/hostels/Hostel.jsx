import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHostels} from '../../store/slice/hostel.slice';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import HostelCard from '../../components/HostelCard';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Hostel=() =>
{
    const dispatch=useDispatch();
    const hostels=useSelector((state) => state.hostels.hostels);
    const status=useSelector((state) => state.hostels.status);
    const mainRef=useRef(null);
    const cardsAnimated=useRef(false); // prevent card animation from running twice

    useEffect(() => {dispatch(fetchHostels());}, [dispatch]);

    /* ── HERO ANIMATIONS: run only once on mount ── */
    useEffect(() =>
    {
        const ctx=gsap.context(() =>
        {
            const heroTl=gsap.timeline({delay: 0.15});
            heroTl
                .from('.hostel-hero-title', {y: 70, opacity: 0, duration: 1, ease: 'power3.out'})
                .from('.hostel-hero-desc', {y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'}, '-=0.5')
                .from('.hostel-hero-btn', {y: 30, opacity: 0, duration: 0.7, ease: 'power3.out'}, '-=0.4')
                .from('.hostel-arc-1', {y: 120, opacity: 0, duration: 1, ease: 'back.out(1.4)'}, '-=0.8')
                .from('.hostel-arc-2', {y: 140, opacity: 0, duration: 1, ease: 'back.out(1.4)'}, '-=0.7')
                .from('.hostel-arc-3', {y: 100, opacity: 0, duration: 1, ease: 'back.out(1.4)'}, '-=0.6');
        }, mainRef);

        return () => ctx.kill(); // keep elements visible on route-change
    }, []); // ← empty deps: hero runs exactly once

    /* ── CARD ANIMATIONS: run only once after cards load ── */
    useEffect(() =>
    {
        if (status!=='succeeded'||cardsAnimated.current) return;
        cardsAnimated.current=true;

        // Small delay so React finishes rendering the cards into the DOM
        const timer=setTimeout(() =>
        {
            ScrollTrigger.refresh();
            gsap.from('.hostel-card-anim', {
                y: 60, opacity: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.hostel-grid',
                    start: 'top 86%',
                    once: true,
                },
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [status]); // ← only triggers when status changes, guarded by ref

    return (
        <main ref={mainRef} className='w-full bg-[#0d1b2a] overflow-x-hidden'>
            {/* ── Hero Section ── */}
            <section
                style={{backgroundImage: "url('/main1.png')", backgroundPosition: "center", backgroundSize: "cover"}}
                className='w-full min-h-screen flex flex-col relative overflow-hidden bg-[#0d1b2a]'
            >
                {/* Content Container */}
                <div className='flex-1 flex flex-col lg:flex-row w-full container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0'>
                    {/* Left Content */}
                    <div className='w-full lg:w-3/5 flex justify-center lg:justify-start items-center text-center lg:text-left mt-8 lg:mt-0'>
                        <div className='w-full max-w-2xl flex gap-6 sm:gap-8 flex-col items-center lg:items-start'>
                            <h1 className='hostel-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-[#f0ebd8] leading-tight'>
                                <span className="font-bold block">Premium</span>
                                <span className="block">Student</span>
                                <span className="font-bold bg-[#f0ebd8] text-[#0d1b2a] inline-block px-3 py-1 mt-2">Residences</span>
                            </h1>
                            <p className='hostel-hero-desc text-[#f0ebd8] text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed max-w-lg opacity-90'>
                                Discover design-forward residences built for your success. High-speed Wi-Fi, chef-curated meals, and a community wired for excellence.
                            </p>
                            <button onClick={() => document.querySelector('.hostel-grid')?.scrollIntoView({behavior: 'smooth'})} className='hostel-hero-btn bg-[#f0ebd8] text-[#0d1b2a] px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 text-base sm:text-lg shadow-2xl'>
                                Browse Hostels
                            </button>
                        </div>
                    </div>

                    {/* Right Decorative Arcs */}
                    <div className='w-full lg:w-2/5 flex relative items-end justify-center pb-12 lg:pb-0'>
                        <div className='relative flex items-end justify-center scale-100 sm:scale-110 lg:scale-125 xl:scale-135'>
                            <div className='hostel-arc-1 bg-[#f0ebd8] rounded-t-full z-30 p-2 h-64 w-48 sm:h-72 sm:w-52 md:h-80 md:w-60 shadow-2xl flex-shrink-0'>
                                <div className='overflow-hidden border-2 h-full w-full rounded-t-full border-[#0d1b2a]'>
                                    <img src={img5} alt="" className='h-full w-full object-cover' />
                                </div>
                            </div>
                            <div className='hostel-arc-2 bg-[#f0ebd8] rounded-t-full z-20 -ml-16 -mb-12 p-2 h-64 w-48 sm:h-72 sm:w-52 md:h-80 md:w-60 shadow-xl flex-shrink-0'>
                                <div className='overflow-hidden border-2 h-full w-full rounded-t-full border-[#0d1b2a]'>
                                    <img src={img6} alt="" className='h-full w-full object-cover object-center' />
                                </div>
                            </div>
                            <div className='hostel-arc-3 hidden md:block bg-[#f0ebd8] rounded-t-full absolute z-0 p-2 h-[26rem] w-80 lg:h-[30rem] lg:w-96 left-0 opacity-30 shadow-lg'>
                                <div className='overflow-hidden border-2 h-full w-full rounded-t-full border-[#0d1b2a]'>
                                    <img src={img7} alt="" className='h-full w-full object-cover object-center' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Hostels Grid ── */}
            <section className='hostel-grid w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8'>
                {status==='succeeded'&&hostels.map((hostel) => (
                    <div key={hostel._id} className='hostel-card-anim'>
                        <HostelCard {...hostel} />
                    </div>
                ))}
            </section>
            <Footer />
        </main>
    );
};

export default Hostel;
