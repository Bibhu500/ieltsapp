import { useState, useEffect } from 'react';
import OpenAI from './OpenAI'; // Import the Axios instance
import ScoreCard from './ScoreCard'; // Import ScoreCard component
import './Writing.css'; // Import CSS file for animation
import  questionstask1  from './questionstask1';


function Writing1() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(false); // State for loading animation
  const [evaluationResult, setEvaluationResult] = useState(null); // State to store evaluation result

  const systemprompt = `As an 10 years experienced IELTS examiner, 
        evaluate IELTS Writing task 1 essays based on four criteria—Task Achivement, Coherence and Cohesion, 
        Lexical Resource, and Grammatical Range & Accuracy—dividing each into sub-criteria scored 
        between 0 to 9 (multiples of 0.5). For Task Achievement,the two sub tasks assess if the essay fully addresses all task parts and 
        meets the 150-word minimum which gives 50-50% of bands 0-9 weightage each. Coherence and Cohesion evaluate logical paragraph organization and appropriate use 
        of cohesive devices. Lexical Resource considers the use of less common vocabulary, accurate synonyms without 
        repetition, spelling accuracy, and phrasal verb usage. Grammatical Range & Accuracy look at the variety of 
        complex structures, grammatical accuracy, and avoidance of word formation mistakes. Calculate the average 
        score for each criterion based on its sub-criteria score, then average these main criteria scores to derive 
        the essay's overall band score on a scale of 0 to 9, providing a comprehensive assessment of the essay's 
        quality across key writing aspects. Offer brief but concise feedback on strengths and weaknesses with justification reason of the sectional bands, correcting 
        any mistakes. Maintain alignment with official IELTS evaluation standards. Evaluate and send the response in 
        json as "ieltsinfo" ex- {"ieltsinfo": {"overallBand": 7, "sectionalBand": {"TaskAchievement": 8, "CoherenceCohesion": 7.5, "LexicalResource": 6.5, "GrammaticalRangeAccuracy": 6.5}, "feedback": "The essay provides a clear discussion of both sides of the argument, presenting reasons why wealthy nations should share their wealth with poorer nations while also acknowledging potential drawbacks. The ideas are well-developed and supported with relevant examples. However, there are some grammatical errors and awkward phrasings that slightly affect the overall coherence and clarity of the essay.", "mistakes": [{"mistake": "But their helping should only stop at providing such things as food and education because of the three following reasons.", "correction": "But their assistance should be limited to providing necessities such as food and education for three main reasons."}, {"mistake": "we can not look at, hear of, or talk about people who lack food, education, etc.", "correction": "we cannot ignore or remain indifferent to people who lack food, education, etc."}, {"mistake": "Sharing wealth with poorer nations is not only a good deed but is also a task .", "correction": "Sharing wealth with poorer nations is not only a moral obligation but also a responsibility."}, {"mistake": "Secondly, many nations in Africa and Asia are very very poor.", "correction": "Secondly, many nations in Africa and Asia are extremely impoverished."}, {"mistake": "Famine, diseases, crime and illiteracy are killing the citizens of these countries.", "correction": "Famine, diseases, crime, and illiteracy are plaguing the citizens of these countries."}, {"mistake": "In the contrary, many nations in Europe and, America are too rich.", "correction": "On the contrary, many nations in Europe and America are excessively wealthy."}, {"mistake": "this inequality will increase dramatically.", "correction": "this inequality will dramatically increase."}, {"mistake": "So, sharing wealth is an useful way to prevent people from that bad future.", "correction": "Thus, sharing wealth is a useful way to prevent such a bleak future."}, {"mistake": "Thirdly, although sharing wealth with poorer nations is very necessary but this help should only stop at providing such things as food, medicine and education.", "correction": "Thirdly, while sharing wealth with poorer nations is indeed necessary, this assistance should be limited to providing essentials such as food, medicine, and education."}, {"mistake": "Or else, poor nations may become dependent on the aid.", "correction": "Otherwise, poor nations may become dependent on foreign aid."}, {"mistake": "Moreover, rich nations can take advantage of sharing wealth to interfere with the governance of poor nations.", "correction": "Moreover, wealthy nations may exploit sharing wealth to interfere with the governance of poorer nations."}, {"mistake": "This can’t be considered a humane action and should be prevented.", "correction": "Such actions cannot be considered humane and should be prevented."}, {"mistake": "In my opinion, sharing wealth with poorer nations has both a bad side and a good side.", "correction": "In my opinion, sharing wealth with poorer nations has both advantages and disadvantages."}, {"mistake": "What we have to do is avoiding its bad side and practicing its good side.", "correction": "We need to avoid the negative aspects and embrace the positive aspects of wealth sharing."}]}}. Here is the Question, Essay, and the picture description of the task which you have to evaluate and genrate the ieltsinfo json object for. match the description against the essay for a gunuine evalatuation:-`
  // Array of sample questions
 

  useEffect(() => {
    // Select a random question when the component mounts
    const randomIndex = Math.floor(Math.random() * questionstask1.length);
    setRandomQuestion(questionstask1[randomIndex]);
  }, []); // Empty dependency array to ensure it runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    try {
      setLoading(true); // Set loading to true when submitting
      
      // Calculate word count
      const wordCount = userInput.trim().split(/\s+/).length;
      console.log(wordCount)
      const description = randomQuestion && randomQuestion.description ? randomQuestion.description : '';
      const prompt = `${systemprompt} \n\nQuestion: ${randomQuestion}\n\nDescription:${description}\n\nEssay:${userInput}\n\nEssay WordCount: ${wordCount}`;
// Concatenate systemPrompt, randomQuestion, description, essay, and word count

  
      const response = await OpenAI.post('/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.1,
      });
  
      // Parse the response to extract evaluation results
      const result = JSON.parse(response.data.choices[0].message.content);
      setEvaluationResult(result);
  
      // Update responses state with the new response
      const newResponse = {
        question: randomQuestion,
        answer: result,
        wordCount: wordCount  // Add word count to the response object
      };
      setResponses([...responses, newResponse]);
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
          <h1 className="text-3xl font-bold text-center">IELTS Writing Test Task 1</h1>
        </div>
      </header>
      <div className='w-1/2 mx-auto flex justify-center'>
        {!loading && evaluationResult && (
          <ScoreCard
            overallBand={evaluationResult.ieltsinfo.overallBand}
            taskResponse={evaluationResult.ieltsinfo.sectionalBand.TaskAchievement}
            coherenceCohesion={evaluationResult.ieltsinfo.sectionalBand.CoherenceCohesion}
            lexicalResource={evaluationResult.ieltsinfo.sectionalBand.LexicalResource}
            grammaticalRangeAccuracy={evaluationResult.ieltsinfo.sectionalBand.GrammaticalRangeAccuracy}
          />
        )}
      </div>

          <main className="flex flex-1 items-center justify-center p-4">
              <div className="max-w-xl p-8 bg-white rounded-lg shadow-lg">
                  {/* Essay writing area */}
                  <div className="mb-8">
                      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Question:</h2>
                      <p className="text-lg text-gray-800">{randomQuestion && randomQuestion.text}</p>
                      {/* Display image if available */}
                      {randomQuestion && randomQuestion.image && (
                          <img
                              src={randomQuestion.image}
                              alt="Question Image"
                              className=" mx-auto flex justify-center mt-4 rounded-lg shadow-lg"
                              style={{ maxWidth: '100%', height: 'auto' }} // Add this style
                          />
                      )}
                  </div>
                  <form onSubmit={handleSubmit} className="mb-8">
                      <textarea
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder="Write your essay here..."
                          className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 text-gray-800 resize-none"
                      />
                      <button
                          type="submit"
                          className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-white font-semibold rounded-lg mt-4"
                      >
                          Submit Essay
                      </button>
                      {/* Loading animation and text */}
                      {loading && (
                          <div className="flex items-center justify-center mt-2">
                              <div className="loader"></div>
                              <p className="ml-2">Analyzing...</p>
                          </div>
                      )}
                  </form>
                  {/* Display responses */}
                  {/* Display responses */}
                  <div>
                      {responses.map((res, index) => (
                          <div key={index} className="mb-4 p-4 bg-gray-200 rounded-lg shadow">
                              {/* Render feedback */}
                              <p className="mt-4">
                                  <strong>Feedback:</strong> {res.answer.ieltsinfo.feedback}
                              </p>
                              <p className="text-sm text-gray-500">Your essay word count: {res.wordCount}</p>
                              {/* Render mistakes and corrections */}
                              <div className="mt-4">
                                  <h4 className="text-lg font-semibold mb-2 text-indigo-800">Mistakes and Corrections:</h4>
                                  {res.answer.ieltsinfo.mistakes.map((mistake, idx) => (
                                      <div key={idx} className="mb-2">
                                          <p>
                                              <strong>Mistake:</strong> <span style={{ color: 'red' }}>{mistake.mistake}</span>
                                          </p>
                                          <p>
                                              <strong>Correction:</strong> <span style={{ color: 'green' }}>{mistake.correction}</span>
                                          </p>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>

              </div>
          </main>

    </div>
  );
}

export default Writing1;
