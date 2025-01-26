const connectDB = require('../db/mongo');

async function SearchQuestions(call, callback) {
  const query = call.request.query;

  try {
    const db = await connectDB();
    const results = await db.collection('questions')
      .find({ title: { $regex: query, $options: 'i' } })
      .toArray();

    const formattedResults = results.map((result) => ({
      id: result._id.toString(),
      type: result.type,
      title: result.title,
    }));

    callback(null, { results: formattedResults });
  } catch (error) {
    console.error('Error fetching questions:', error.message);
    callback(error);
  }
}

module.exports = { SearchQuestions };
