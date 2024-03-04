import React, { useState, useEffect } from 'react';

const questionsList = [
  { id: 1, text: "Describe your favorite book." },
  { id: 2, text: "What is your happiest memory from your childhood?" },
  { id: 3, text: "Why is it important to have hobbies?" },
  { id: 4, text: "Describe a teacher who has greatly influenced you." },
  { id: 5, text: "What are the benefits of learning a foreign language?" },
  { id: 6, text: "Explain how technology has changed communication." },
  { id: 7, text: "What do you think the world will look like in 50 years?" },
  { id: 8, text: "How do movies or TV influence people's behavior?" },
  { id: 9, text: "Why is exercise important for health?" },
  { id: 10, text: "Describe your ideal holiday destination." },
  // Additional questions...
].map(q => ({ ...q, answer: "", played: false }));

const SpeechToText = () => {
  const [questions, setQuestions] = useState(questionsList);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [recognitionActive, setRecognitionActive] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false; // Capture a single result
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        const newQuestions = questions.map((q, idx) => 
          idx === currentQuestionIndex ? { ...q, answer: finalTranscript } : q
        );
        setQuestions(newQuestions);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setRecognitionActive(false);
        if (testStarted && currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setTestStarted(false);
        }
      };

      window.recognition = recognition;
    } else {
      alert("Your browser does not support the Web Speech API. Please use a supported browser.");
    }
  }, [testStarted, currentQuestionIndex, questions]);

  useEffect(() => {
    if (testStarted && currentQuestionIndex < questions.length) {
      const questionText = questions[currentQuestionIndex].text;
      speakQuestion(questionText);
    }
  }, [testStarted, currentQuestionIndex]);

  const speakQuestion = (questionText) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = questionText;
    msg.onend = () => {
      if (testStarted) {
        startAnswerRecording();
      }
    };
    window.speechSynthesis.speak(msg);
  };

  const startAnswerRecording = () => {
    if (!recognitionActive) {
      setIsRecording(true);
      setRecognitionActive(true);
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = true; // Keep recognition active for pauses in speech
      recognition.interimResults = true; // Capture interim results
  
      recognition.start();
  
      // Stop recognition after exactly 10 seconds
      setTimeout(() => {
        recognition.stop();
        setIsRecording(false);
        setRecognitionActive(false);
      }, 10000); // 10 seconds
  
      recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const newQuestions = questions.map((q, idx) => 
              idx === currentQuestionIndex ? { ...q, answer: event.results[i][0].transcript } : q
            );
            setQuestions(newQuestions);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        // Optional: Use interimTranscript for real-time display of speech being recognized
      };
  
      recognition.onend = () => {
        setIsRecording(false);
        setRecognitionActive(false);
        if (testStarted && currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setTestStarted(false);
        }
      };
    }
  };
  
  
  
  const handleStartTest = () => {
    setTestStarted(true);
    setCurrentQuestionIndex(0);
  };

  const handleCloseTest = () => {
    window.speechSynthesis.cancel();
    if (window.recognition && recognitionActive) {
      window.recognition.stop();
    }
    setIsRecording(false);
    setTestStarted(false);
    setCurrentQuestionIndex(0);
    setQuestions(questionsList.map(q => ({ ...q, answer: "", played: false })));
  };

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">IELTS Speaking Test</h1>
        {!testStarted && (
          <button onClick={handleStartTest} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 mb-8">
            Let's start the test
          </button>
        )}
        {testStarted && (
          <div key={questions[currentQuestionIndex].id} className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{questions[currentQuestionIndex].text}</div>
                <p className="mt-2 text-gray-500">{questions[currentQuestionIndex].answer}</p>
                {isRecording ? <p>Recording...</p> : null}
              </div>
            </div>
          </div>
        )}
        {testStarted && (
          <button onClick={handleCloseTest} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 mb-8">
            Close the Test
          </button>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;