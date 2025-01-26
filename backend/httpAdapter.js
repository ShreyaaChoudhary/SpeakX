// const express = require('express');
// const bodyParser = require('body-parser');
//     res.json(response);
//   });
// });

// app.listen(5000, () => {
//   console.log('HTTP server running on http://localhost:5000');
// });
const axios = require('axios');

const searchQuestions = async (query) => {
  try {
    const response = await axios.post('http://localhost:5000/search', { query });
    return response.data;  
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    throw error; 
  }
};

module.exports = { searchQuestions };
