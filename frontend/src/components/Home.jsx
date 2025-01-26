import React, { useEffect, useState , useRef} from 'react';
import './Home.css';
import { motion, useMotionValue, animate, useTransform } from 'framer-motion';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

// import Home2 from './Home2';
const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

function Home() {
  const blockRef = useRef(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/search', { query });
      console.log('Search results:', data); 

      if (data.results && data.results.length > 0) {
        setResults(data.results); 
      } else {
        setResults([]); 
      }
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  };
  const [currentPage, setCurrentPage] = useState(1); 
  const resultsPerPage = 2; 
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useTransform(color, (value) => `radial-gradient(125% 125% at 50% 100%, #020617 50%, ${value})`);

  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, [color]);
  const scrollToBlock = () => {
    if (blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 2000, 
      once: true, 
    });
  }, []);
  const Cursor =  () => {
  
    const { useEffect, useState } = React;
    const [position, setPosition] = useState({x: 0, y: 0});
     
        useEffect(() => {
            addEventListeners();
            return () => removeEventListeners();
        }, []);
     
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove);
        };
     
        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove);
        };
     
        const onMouseMove = (e) => {
            setPosition({x: e.pageX, y: e.pageY});         
        };    
   
   console.log(position.x)
     
         return (
           <div>
             <div style={{
                transform: `translate(${position.x}px, ${position.y}px)`}} className="cursor"></div>
             <div style={{
                transform: `translate(${position.x}px, ${position.y}px)`}} className="cursor-follower"></div>
           </div>
         )
     
 }
 
  return (
    <>
    <Cursor/>
      <motion.section
        style={{
          backgroundImage: backgroundImage,
          overflow: "hidden",

        }}
        className="home-section"
      >
        <div className='caption'>
          <h1>SpeakX<br></br><span><p>FULL STACK ASSNGMENT - LPU</p></span></h1>

        </div>
        <div className="btn">
          <button onClick={scrollToBlock}>
            Get Started
          </button>
        </div>
        <svg class="arrows">
          <path class="a1" d="M0 0 L30 32 L60 0"></path>
          <path class="a2" d="M0 20 L30 52 L60 20"></path>
          <path class="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>
        {/* <motion.button
          style={{
            border: border,
            boxShadow: boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
        </motion.button> */}
      </motion.section>
      
      <div ref={blockRef}  className="block">
      <div className="content" data-aos="fade-down">
        <p>SEARCH <span>QUESTION</span></p>
      </div>
        <div className='wrapper'>
          <div className="input-wrapper">
            <input
              placeholder="search for questions"
              className="input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch} className="Subscribe-btn"><FaSearch /></button>

          </div>
        </div>
        
         {results.length > 0 ? (
        <div className="totalans">
          <div className="pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
            <FaCaretLeft />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FaCaretRight />

            </button>
          </div>
          <ul>
            {currentResults.map((result, index) => (
              <li key={index} className="ans2">
                <p className='ptype'>Type : {result.type}</p>
                <h3>{result.title || 'Untitled'}</h3>
              </li>
            ))}
          </ul>

        </div>
      ) : (
        <div className="ans">
          <div className="no-results">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="38px"
              height="38px"
              style={{ marginRight: '8px' }}
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>No results found</p>
          </div>
        </div>
      )}
      <div className="footer">made by shreya choudhary</div>
      </div>
    </>
  );
}

export default Home;
