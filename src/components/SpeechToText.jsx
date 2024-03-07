import { useState, useEffect } from 'react';

const questionsList = [
  {
    "part": 1,
    "introduction": "Let's begin with Part 1. In this part, I'll ask you some questions about your hometown.",
    "questions": [
      {"id": 1, "text": "Where is your hometown?"},
      {"id": 2, "text": "What do you like about it?"},
      {"id": 3, "text": "What do you not like about it?"},
      {"id": 4, "text": "How important is your hometown to you?"},
      {"id": 5, "text": "Do you think you will continue to live in your hometown?"},
      {"id": 6, "text": "Let’s move on to talk about accommodation. Tell me about the kind of accommodation you live in?"},
      {"id": 7, "text": "Does the place you live in have many amenities?"},
      {"id": 8, "text": "Is there anything you would like to change about the place you live in?"},
      {"id": 9, "text": "Do you plan to live there for a long time?"}
    ]
  },
  {
    "part": 2,
    "introduction": "Moving on to Part 2. Here is the part 2. You have a minute to prepare your answer. You can take some notes. Here is your question. So, take a minute to make some notes, and you will have up to 2 minutes to talk about the topic.",
    "questions": [
      {
        "id": 6,
        "text": "Describe an advertisement that persuaded you to buy a product. You should say",
        "subQuestions": [
          "What advertisement it was",
          "Was it shown on TV, radio, or newspaper",
          "What was good about that advertisement",
          "Explain why you think that advertisement made the product seem attractive."
        ]
      }
    ]
  },
  {
    "part": 3,
    "introduction": "Ok, we can move on to part 3. We will discuss some related questions",
    "questions": [
      {"id": 1, "text": "What are popular types of advertising in today’s world?"},
      {"id": 2, "text": "What type of media advertising do you like most?"},
      {"id": 3, "text": "Do you think advertising influences what people buy?"},
      {"id": 4, "text": "What factors should be taken into account when making advertisements?"},
      {"id": 5, "text": "Is advertising really necessary in modern society?"},
      {"id": 6, "text": "Let’s move on from types of advertising to the impact of advertising on children. How does advertising influence children?"},
      {"id": 7, "text": "Is there any advertising that can be harmful to children?"}
    ]
  }
].map(part => ({ ...part, questions: part.questions.map(q => ({ ...q, answer: "", played: false })) }));


const SpeechToText = () => {
  const [parts, setParts] = useState(questionsList);
  const [currentPart, setCurrentPart] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [recognitionActive, setRecognitionActive] = useState(false);
  const [userName, setUserName] = useState('');
  const [recordingName, setRecordingName] = useState(false);
  const [preparationTime, setPreparationTime] = useState(60);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    if (testStarted && currentQuestion === 0) {
      speakIntroduction(parts[currentPart].introduction, () => {
        if (parts[currentPart].part === 2) startPreparationTimer();
        else speakQuestion(parts[currentPart].questions[currentQuestion].text);
      });
    } else if (testStarted && parts[currentPart].part !== 2) {
      speakQuestion(parts[currentPart].questions[currentQuestion].text);
    }
  }, [testStarted, currentQuestion, currentPart]);

  useEffect(() => {
    if (testCompleted) speakThankYouMessage();
  }, [testCompleted, userName]);

  const speakIntroduction = (introduction, callback) => {
    const introMsg = new SpeechSynthesisUtterance(introduction);
    introMsg.onend = callback;
    window.speechSynthesis.speak(introMsg);
  };

  const speakQuestion = (questionText) => {
    const msg = new SpeechSynthesisUtterance(questionText);
    msg.onend = () => testStarted && startAnswerRecording();
    window.speechSynthesis.speak(msg);
  };

  const startAnswerRecording = () => {
    if (!recognitionActive) {
      setIsRecording(true);
      setRecognitionActive(true);
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.start();
      const recordingDuration = parts[currentPart].part === 2 ? 120000 : 17000;
      setTimeout(() => {
        recognition.stop();
        setIsRecording(false);
        setRecognitionActive(false);
        if (currentQuestion < parts[currentPart].questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else if (currentPart < parts.length - 1) {
          setCurrentPart(prev => prev + 1);
          setCurrentQuestion(0);
        } else {
          setTestStarted(false);
          setTestCompleted(true);
        }
      }, recordingDuration);

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const newParts = [...parts];
            newParts[currentPart].questions[currentQuestion].answer = event.results[i][0].transcript;
            setParts(newParts);
            console.log("Question:", newParts[currentPart].questions[currentQuestion].text);
            console.log("Answer:", newParts[currentPart].questions[currentQuestion].answer);
          }
        }
      };
    }
  };

  const startPreparationTimer = () => {
    const timer = setInterval(() => setPreparationTime(prev => prev - 1), 1000);
    setTimeout(() => {
      clearInterval(timer);
      startAnswerRecording();
    }, 60000);
  };

  const speakNamePrompt = () => {
    const msg = new SpeechSynthesisUtterance("Welcome to the Speaking section of the IELTS examination. My name is Brandon Coli and I will be your examiner for this part of the test and for your information, this test will be recorded. May I know your full name please?");
    msg.onend = startNameRecording;
    window.speechSynthesis.speak(msg);
  };

  const startNameRecording = () => {
    setRecordingName(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.start();
    const stopRecordingTimeout = setTimeout(() => {
      recognition.stop();
      setRecordingName(false);
      startTest();
    }, 5000);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserName(transcript);
      console.log(`User Name: ${transcript}`);
      recognition.stop();
      clearTimeout(stopRecordingTimeout);
      setRecordingName(false);
      startTest();
    };
  };

  const startTest = () => {
    setTestStarted(true);
    setCurrentPart(0);
    setCurrentQuestion(0);
    setParts(questionsList.map(part => ({ ...part, questions: part.questions.map(q => ({ ...q, answer: "", played: false })) })));
  };

  const handleStartTest = () => {
    if (!isTestStarted && !recordingName) {
      speakNamePrompt();
      setIsTestStarted(true);
    }
  };

  const handleCloseTest = () => {
    window.speechSynthesis.cancel();
    if (window.recognition && recognitionActive) window.recognition.stop();
    setIsRecording(false);
    setTestStarted(false);
    setIsTestStarted(false);
    setTestCompleted(false);
    setCurrentPart(0);
    setCurrentQuestion(0);
    setParts(questionsList.map(part => ({ ...part, questions: part.questions.map(q => ({ ...q, answer: '', played: false })) })));
  };

  const speakThankYouMessage = () => {
    const msg = new SpeechSynthesisUtterance(`Thank you, ${userName}, for taking the IELTS Speaking Test. This concludes the test.`);
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">IELTS Speaking Test</h1>
        {!isTestStarted && !recordingName && (
          <button
            onClick={handleStartTest}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 mb-8"
            disabled={isTestStarted}
          >
            Start Test
          </button>
        )}
        {recordingName && <p>Listening for your name...</p>}
        {testStarted && (
          <div key={parts[currentPart].questions[currentQuestion].id} className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Part {currentPart + 1}</div>
                <div className="mt-2">
                  <p>{parts[currentPart].questions[currentQuestion].text}</p>
                  {parts[currentPart].questions[currentQuestion].subQuestions && (
                    <ul className="list-disc list-inside pl-0 mt-2">
                      {parts[currentPart].questions[currentQuestion].subQuestions.map((subQuestion, index) => (
                        <li key={index}>{subQuestion}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {parts[currentPart].part === 2 && <p className="mt-2">Preparation Time: {preparationTime} seconds</p>}
                <p className="mt-2 text-gray-500">{parts[currentPart].questions[currentQuestion].answer}</p>
                {isRecording && <p>Recording...</p>}
              </div>
            </div>
          </div>
        )}
        {isTestStarted && (
          <button
            onClick={handleCloseTest}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 mb-8"
          >
            Close the Test
          </button>
        )}
        {testCompleted && <p>Thank you for taking the test.</p>}
      </div>
    </div>
  );
};

export default SpeechToText;