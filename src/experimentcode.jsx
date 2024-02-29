import React, { useState, useEffect } from 'react';
import OpenAI from './OpenAI'; // Import the Axios instance
import './Chatgpt.css'; // Import CSS file for animation

function Chatgpt() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState('');
  const [loading, setLoading] = useState(false); // State for loading animation
  const [overallBand, setOverallBand] = useState(null); // State for overall band
  const [sectionalBands, setSectionalBands] = useState(null); // State for sectional bands
  const systemprompt = `As an 10 years experienced IELTS examiner, 
evaluate IELTS essays based on four criteria—Task Response, Coherence and Cohesion, 
Lexical Resource, and Grammatical Range & Accuracy—dividing each into sub-criteria scored 
between 0 to 9 (multiples of 0.5). For Task Response, assess if the essay fully addresses all task parts and 
meets the 250-word minimum. Coherence and Cohesion evaluate logical paragraph organization and appropriate use 
of cohesive devices. Lexical Resource considers the use of less common vocabulary, accurate synonyms without 
repetition, spelling accuracy, and phrasal verb usage. Grammatical Range & Accuracy look at the variety of 
complex structures, grammatical accuracy, and avoidance of word formation mistakes. Calculate the average 
score for each criterion based on its sub-criteria score, then average these main criteria scores to derive 
the essay's overall band score on a scale of 0 to 9, providing a comprehensive assessment of the essay's 
quality across key writing aspects. Offer brief but concise feedback on strengths and weaknesses, correcting 
any mistakes. Maintain alignment with official IELTS evaluation standards. Evaluate and send the response in 
json as "ieltsinfo" ex- {"ieltsinfo": {"overallBand": 9, "sectionalBand": {
  "TaskResponse": 9, "CoherenceCohesion": 9, "LexicalResource": 8.5, "GrammaticalRangeAccuracy": 9}, 
  "feedback": "This essay provides a well-developed discussion of the idea of parents giving chores to 
  their children to develop their characters and self-sufficiency. The writer effectively presents both 
  positive and negative aspects of this practice and offers a clear opinion supported by relevant reasons 
  and examples. The essay demonstrates strong coherence and cohesion, with smooth transitions between ideas. 
  Additionally, the vocabulary used is varied and precise, contributing to the overall clarity and sophistication 
  of the essay. There are no significant grammatical errors, and the sentence structures are varied and 
  appropriately complex. Overall, this essay is likely to achieve a Band 9 score in the IELTS exam.", 
  "mistakes": []}}}. Here is the Question and Essay which you have to evaluate and genrate the ieltsinfo json object for:-`;
  // Array of sample questions
  const questions = [
    "Some people believe that technological advancements have led to the breakdown of family communication. To what extent do you agree or disagree?",
    "In many countries, the gap between the rich and the poor is widening. What problems does this create? What solutions can you suggest?",
    "Some people argue that it is more important to have an enjoyable job than to earn a lot of money. Do you agree or disagree?",
    "Nowadays, more and more young people are getting involved in crime. What are the reasons for this? What solutions can you offer?"
  ];

  useEffect(() => {
    // Select a random question when the component mounts or when the questions array changes
    const randomIndex = Math.floor(Math.random() * questions.length);
    setRandomQuestion(questions[randomIndex]);
  }, [questions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    try {
      setLoading(true); // Set loading to true when submitting
      // Concatenate systemPrompt, randomQuestion, and userInput
      const prompt = `${systemprompt} ${randomQuestion}\n\n${userInput}`;

      const response = await OpenAI.post('/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.7,
      });

      // Parse the response to extract evaluation results
      const evaluationResult = JSON.parse(response.data.choices[0].message.content);

      // Extracting values from the evaluationResult object
      const overallBand = evaluationResult.ieltsinfo.overallBand;
      const sectionalBands = evaluationResult.ieltsinfo.sectionalBand;
      const feedback = evaluationResult.ieltsinfo.feedback;

      // Displaying the extracted values
      console.log("Overall Band:", overallBand);
      console.log("Sectional Bands:", sectionalBands);
      console.log("Feedback:", feedback);

      // Update states with the new response
      setOverallBand(overallBand);
      setSectionalBands(sectionalBands);
      setResponses([...responses, feedback]);
      setUserInput('');
      setLoading(false); // Set loading to false after response received
    } catch (error) {
      setLoading(false); // Set loading to false in case of error
      if (error.response && error.response.status === 429) {
        console.error('We have hit the rate limit. Please try again later.');
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };
  
  return (
    <div className="IELTSWritingTest min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-center">IELTS Writing Test Task 2</h1>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex">
            {/* Sidebar for overall band and sectional bands */}
            <div className="w-1/4 bg-gray-200 rounded-l-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Overall Band</h2>
              {overallBand && <p className="text-2xl text-center font-bold">{overallBand}</p>}
              <h2 className="text-lg font-semibold my-4">Sectional Bands</h2>
              {sectionalBands && (
                <div>
                  <p><strong>Task Response:</strong> {sectionalBands.TaskResponse}</p>
                  <p><strong>Coherence and Cohesion:</strong> {sectionalBands.CoherenceCohesion}</p>
                  <p><strong>Lexical Resource:</strong> {sectionalBands.LexicalResource}</p>
                  <p><strong>Grammatical Range & Accuracy:</strong> {sectionalBands.GrammaticalRangeAccuracy}</p>
                </div>
              )}
            </div>
            <div className="w-3/4 pl-4">
              {/* Render the random question */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedback</h2>
                {/* Display loading animation if loading is true */}
                {loading && (
                  <div className="flex items-center mb-4">
                    <div className="loader mr-2"></div>
                    <p>Analyzing...</p>
                  </div>
                )}
                {/* Display feedback */}
                {responses.map((feedback, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-200 rounded-lg shadow">
                    <p>{feedback}</p>
                  </div>
                ))}
              </div>
              {/* Essay writing area */}
              <form onSubmit={handleSubmit} className="mb-8">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Write your essay here..."
                  className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 text-gray-800 resize-none"
                />
                <button type="submit" className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white font-semibold rounded-lg mt-4">
                  Submit Essay
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chatgpt;





The bar chart illustrates the gender distribution of Olympic participants in the years 1924, 1954, and 2014, while the line graph tracks the total number of participants over the same years.

In 1924, there was a considerable difference in the number of male and female participants, with males significantly outnumbering females. By 1954, the number of participants in both categories increased, yet males continued to dominate in numbers. Fast forward to 2014, and the data shows a progressive narrowing of this gender gap, with female participation experiencing substantial growth.

The line graph underscores a continuous rise in total participants across the years. Starting from the 1920s with just over 2000 athletes, the trend ascends to reach a peak of over 10,000 by 2014, reflecting the Olympics' growing inclusivity and global appeal.

Overall, the data highlights a positive shift towards gender balance in Olympic participation and a general upsurge in athletes taking part in the Games, suggesting enhanced accessibility and a more universal reach of the Olympic spirit.




