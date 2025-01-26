import React, { useState } from 'react';
import axios from 'axios';
import './SearchBox.css';
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/search', { query });
      console.log('Search results:', data); // Check the response from backend

      if (data.results && data.results.length > 0) {
        setResults(data.results); // Update state with search results
      } else {
        setResults([]); // Empty state if no results
      }
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  };

  return (
    <>
    
      <div>
        <div className='caption'>
          <h1>SpeakX</h1>

        </div>
      </div>
      {/* <div className='cap2'>
        <h2>Question search</h2>
      </div> */}
      <div className='wrapper'>
      <div className="input-wrapper">
        <input
        placeholder="search for questions" 
        className="input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}/>
        <button onClick={handleSearch} className="Subscribe-btn">Search</button>
        
      </div>
        </div>
      
        {results.length > 0 ? (
  <div className="totalans">
    <ul>
      {results.map((result, index) => (
        <li key={index} className="ans2">
          <h3>{result.title || 'Untitled'}</h3> {/* Display title if available */}
          <p>{result.type}</p>
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
        style={{ marginRight: "8px" }}
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
  
    </>
  );

}

export default SearchBox;


/*
<div>
        <input
          type="text"
          value={query}
          className='input'
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for questions..."
        />
        <button onClick={handleSearch} className='btn'>Search</button>

        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <h3>{result.title || 'Untitled'}</h3> {/* Display title if available }
                <p>{result.type}</p>
                {/* Check if blocks exists and has a length }
                <p>{result.blocks && result.blocks.length > 0
                  ? result.blocks.map(block => block.text).join(' ') // Join blocks if available
                  : 'No blocks available'}</p> {/* Fallback message if no blocks }
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p> // Display when no results are found
        )}
      </div>

*/