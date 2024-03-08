import { useState, useEffect } from 'react';
import questionList from './questionList';

const getQuestions = () => {
  const randomIndex = Math.floor(Math.random() * questionList.length);
  return questionList[randomIndex];
};

const SpeechToText = () => {
  const [parts, setParts] = useState(getQuestions());
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
    if (testStarted) {
      if (currentQuestion === 0) {
        speakIntroduction(parts[currentPart].introduction, () => {
          if (parts[currentPart].part === 2) startPreparationTimer();
          else speakQuestion(parts[currentPart].questions[currentQuestion].text);
        });
      } else {
        speakQuestion(parts[currentPart].questions[currentQuestion].text);
      }
    }
  }, [testStarted, currentQuestion, currentPart]);

  useEffect(() => {
    if (testCompleted && userName) {
      speakThankYouMessage();
    }
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

  useEffect(() => {
    if (testCompleted) {
      const allQuestionsAndAnswers = parts.map((part) => {
        const questionanswer = part.part === 2
          ? [{ question: `${part.questions[0].text} ${part.questions[0].subQuestions?.join(' ')}`, answer: part.questions[0].answer }]
          : part.questions.map((q, index) => ({
              [`question ${index + 1}`]: q.text,
              answer: q.answer,
            }));
  
        return { part: part.part, questionanswer };
      });
  
      console.log(allQuestionsAndAnswers);
    }
  }, [testCompleted]);

  const startAnswerRecording = () => {
    if (!recognitionActive) {
      setIsRecording(true);
      setRecognitionActive(true);
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      let finalTranscript = '';

      recognition.addEventListener('result', (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const newParts = [...parts];
        newParts[currentPart].questions[currentQuestion].answer = finalTranscript + interimTranscript;
        setParts(newParts);
      });

      recognition.start();
      const recordingDuration = parts[currentPart].part === 2 ? 120000 : 17000;
      setTimeout(() => {
        recognition.stop();
        setIsRecording(false);
        setRecognitionActive(false);

        console.log("Question:", parts[currentPart].questions[currentQuestion].text);
        console.log("Answer:", parts[currentPart].questions[currentQuestion].answer);

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
    setParts(getQuestions());
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
    setParts(getQuestions());
  };

  const speakThankYouMessage = () => {
    const msg = new SpeechSynthesisUtterance(`Thank you, for taking the IELTS Speaking Test. This concludes the test.`);
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