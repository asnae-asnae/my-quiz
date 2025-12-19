import React, { useState } from 'react';
import { Heart, Star, ArrowRight, Check, X } from 'lucide-react';

export default function  QuizAboutMe() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showWrongMessage, setShowWrongMessage] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = React.useRef(null);
  const correctSfxRef = React.useRef(null);
  const wrongSfxRef = React.useRef(null);
  const clickSfxRef = React.useRef(null);

  React.useEffect(() => {
    if (audioRef.current && !isMusicPlaying && !showWelcome) {
      audioRef.current.volume = 0.2;
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => console.log("Audio autoplay blocked"));
    }
  }, [showWelcome]);

  const playSound = (ref) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.volume = 0.4;
      ref.current.play().catch(e => console.log("Sound effect failed:", e));
    }
  };

  const startMusic = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.volume = 0.2;
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => console.log("Music play failed:", e));
    }
  };

  const questions = [
    {
      question: "When is my birthday? 🎂",
      options: ["October 10", "October 15", "November 20", "December 5"],
      correct: 0,
      emoji: "🎉",
      correctMessage: "My birthday was easy but still... just remembering it makes me so happy! I'm so thankful I have you in my life 💕",
      animation: "balloons"
    },
    {
      question: "What is my favorite color? 🎨",
      options: ["Pink", "Grey", "Blue", "Purple"],
      correct: 1,
      emoji: "💖",
      correctMessage: "I know you love pink but I love it on you... and I really love YOU. Not like a silly love, but for real. I wanna live and die with you 💕",
      animation: "hearts"
    },
    {
      question: "What is my favorite food? 🥗",
      options: ["Pizza", "Pasta", "Salad", "Burgers"],
      correct: 2,
      emoji: "😋",
      correctMessage: "bravo 3lik Hahhh love, I am so proud of you And whatever happens,wakha tedi 13.5 its ok hhhh. I will always be with you and support you no matter what 💕",
      animation: "stars"
    },
    {
      question: "What do I love doing the most? ⭐",
      options: ["Reading", "Gaming", "Volleyball", "Dancing"],
      correct: 2,
      emoji: "🏐",
      correctMessage: "I love cute sports like easy ones, but I love doing too many things with YOU! Everything is better when we're together 💕",
      animation: "sparkles"
    },
    {
      question: "What is my dream destination? ✈️",
      options: ["Japan", "Paris", "New York", "Dubai"],
      correct: 0,
      emoji: "🗾",
      correctMessage: "I love Japan and Thailand too, Italy... I love every place that has nature and beaches and museums! I wanna travel the world with you. I really love you 💕",
      animation: "travel"
    }
  ];

  const handleAnswer = (index) => {
    playSound(clickSfxRef);
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    
    if (isCorrect) {
      playSound(correctSfxRef);
      setShowCorrectMessage(true);
      setScore(score + 1);
      
      setAnswers([...answers, {
        question: questions[currentQuestion].question,
        correct: true,
        selected: selectedAnswer,
        correctAnswer: questions[currentQuestion].correct
      }]);
    } else {
      playSound(wrongSfxRef);
      setShowWrongMessage(true);
      setAnswers([...answers, {
        question: questions[currentQuestion].question,
        correct: false,
        selected: selectedAnswer,
        correctAnswer: questions[currentQuestion].correct
      }]);
    }
  };

  const continueToNext = () => {
    playSound(clickSfxRef);
    setShowCorrectMessage(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const continueAfterWrong = () => {
    playSound(clickSfxRef);
    setShowWrongMessage(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    playSound(clickSfxRef);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowCorrectMessage(false);
    setShowWrongMessage(false);
    setAnswers([]);
    setShowWelcome(true);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffc0cb 0%, #ffb6c1 50%, #ff69b4 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif"
    },
    welcomeContent: {
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    },
    heartContainer: {
      display: 'inline-block',
      background: 'white',
      borderRadius: '50%',
      padding: '40px',
      boxShadow: '0 25px 50px rgba(255,105,180,0.3)',
      marginBottom: '40px',
      animation: 'bounce 2s ease-in-out infinite'
    },
    title: {
      fontSize: '72px',
      fontWeight: '900',
      color: 'white',
      marginBottom: '20px',
      textShadow: '0 4px 10px rgba(255,105,180,0.4)',
      animation: 'fadeInDown 0.8s ease-out'
    },
    description: {
      fontSize: '20px',
      color: 'rgba(255,255,255,0.95)',
      marginBottom: '50px',
      fontWeight: '500'
    },
    startButton: {
      background: 'white',
      color: '#ff69b4',
      fontWeight: '700',
      fontSize: '24px',
      padding: '20px 60px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(255,105,180,0.4)',
      transition: 'all 0.3s ease',
      animation: 'bounce 2s ease-in-out infinite'
    },
    quizCard: {
      maxWidth: '600px',
      width: '100%',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '40px',
      padding: '50px',
      boxShadow: '0 25px 50px rgba(255,105,180,0.3)',
      border: '4px solid white'
    },
    progressBar: {
      width: '100%',
      height: '12px',
      background: 'rgba(255,182,193,0.3)',
      borderRadius: '20px',
      marginBottom: '40px',
      overflow: 'hidden'
    },
    progress: {
      height: '100%',
      background: 'linear-gradient(90deg, #ffc0cb, #ff69b4)',
      borderRadius: '20px',
      transition: 'width 0.5s ease'
    },
    questionNumber: {
      fontSize: '18px',
      color: '#ff69b4',
      fontWeight: '700',
      marginBottom: '15px'
    },
    question: {
      fontSize: '32px',
      fontWeight: '900',
      color: '#ff69b4',
      marginBottom: '40px',
      textAlign: 'center'
    },
    optionButton: {
      width: '100%',
      padding: '20px',
      marginBottom: '15px',
      border: '3px solid #ffb6c1',
      borderRadius: '20px',
      background: 'white',
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left'
    },
    nextButton: {
      width: '100%',
      padding: '20px',
      marginTop: '30px',
      border: 'none',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #ffc0cb, #ff69b4)',
      fontSize: '20px',
      fontWeight: '700',
      color: 'white',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(255,105,180,0.3)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    messageCard: {
      maxWidth: '700px',
      width: '100%',
      background: 'rgba(255,255,255,0.98)',
      borderRadius: '40px',
      padding: '60px',
      boxShadow: '0 25px 50px rgba(255,105,180,0.4)',
      border: '4px solid white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    messageEmoji: {
      fontSize: '120px',
      marginBottom: '30px',
      animation: 'bounce 1s ease-in-out infinite'
    },
    messageText: {
      fontSize: '24px',
      color: '#ff69b4',
      lineHeight: '1.8',
      marginBottom: '40px',
      fontWeight: '600',
      padding: '30px',
      background: 'rgba(255,192,203,0.2)',
      borderRadius: '25px'
    },
    continueButton: {
      padding: '18px 50px',
      border: 'none',
      borderRadius: '25px',
      background: 'linear-gradient(135deg, #ffc0cb, #ff69b4)',
      fontSize: '20px',
      fontWeight: '700',
      color: 'white',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(255,105,180,0.3)',
      transition: 'all 0.3s ease'
    },
    resultCard: {
      maxWidth: '700px',
      width: '100%',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '40px',
      padding: '60px',
      boxShadow: '0 25px 50px rgba(255,105,180,0.3)',
      border: '4px solid white',
      textAlign: 'center'
    },
    resultEmoji: {
      fontSize: '100px',
      marginBottom: '20px',
      animation: 'bounce 1s ease-in-out infinite'
    },
    resultTitle: {
      fontSize: '48px',
      fontWeight: '900',
      color: '#ff69b4',
      marginBottom: '20px'
    },
    resultScore: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#ff69b4',
      marginBottom: '30px'
    },
    warmMessage: {
      fontSize: '20px',
      color: '#666',
      lineHeight: '1.8',
      marginBottom: '40px',
      padding: '30px',
      background: 'rgba(255,182,193,0.2)',
      borderRadius: '20px',
      fontWeight: '500'
    },
    reviewItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '15px',
      background: 'rgba(255,182,193,0.1)',
      textAlign: 'left'
    },
    restartButton: {
      padding: '18px 40px',
      border: 'none',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #ffc0cb, #ff69b4)',
      fontSize: '18px',
      fontWeight: '700',
      color: 'white',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(255,105,180,0.3)',
      transition: 'all 0.3s ease'
    },
    floatingElement: {
      position: 'absolute',
      animation: 'float 4s ease-in-out infinite',
      pointerEvents: 'none'
    },
    musicToggle: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      border: '3px solid #ff69b4',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '28px',
      boxShadow: '0 5px 15px rgba(255,105,180,0.3)',
      transition: 'all 0.3s ease',
      zIndex: 1000
    }
  };

  const AnimatedBackground = ({ type }) => {
    const elements = [...Array(30)].map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 3 + Math.random() * 2;
      
      return (
        <div
          key={i}
          style={{
            ...styles.floatingElement,
            left: `${left}%`,
            top: '-10%',
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            animationName: 'fall'
          }}
        >
          {type === 'balloons' && <span style={{fontSize: '40px'}}>🎈</span>}
          {type === 'hearts' && <span style={{fontSize: '35px'}}>💕</span>}
          {type === 'stars' && <span style={{fontSize: '30px'}}>⭐</span>}
          {type === 'sparkles' && <span style={{fontSize: '35px'}}>✨</span>}
          {type === 'travel' && <span style={{fontSize: '35px'}}>✈️</span>}
        </div>
      );
    });

    return <>{elements}</>;
  };

  const FloatingElement = ({ delay, duration }) => (
    <div
      style={{
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.3
      }}
    >
      {Math.random() > 0.7 ? '🐱' : Math.random() > 0.5 ? <Heart size={30} color="white" /> : <Star size={25} color="white" />}
    </div>
  );

  return (
    <>
      {/* Audio elements - Always rendered */}
      <audio ref={audioRef} loop>
        <source src="/song.mp3" type="audio/mpeg" />
      </audio>
      {/* Music Toggle Button */}
      <button
        style={styles.musicToggle}
        onClick={() => {
          if (audioRef.current) {
            if (isMusicPlaying) {
              audioRef.current.pause();
              setIsMusicPlaying(false);
            } else {
              startMusic();
            }
          }
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        title={isMusicPlaying ? "Pause Music" : "Play Music"}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>

      {showWelcome && (
        <div style={styles.container}>
          {[...Array(25)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.3} duration={5 + Math.random() * 5} />
          ))}

          <div style={styles.welcomeContent}>
            <div style={styles.heartContainer}>
              <span style={{fontSize: '80px'}}>🐱</span>
            </div>
            <h2 style={styles.title}>khodelak</h2>
            <h1 style={styles.title}>Quiz About Me</h1>
            
            <p style={styles.description}>
              Let's see how well you know me ✨
            </p>

            <button 
              style={styles.startButton}
              onClick={() => {
                playSound(clickSfxRef);
                startMusic();
                setShowWelcome(false);
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Start Quiz! 🎯
            </button>
          </div>

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-30px) rotate(10deg); }
            }
          `}</style>
        </div>
      )}

      {showCorrectMessage && (
        <div style={styles.container}>
          <AnimatedBackground type={questions[currentQuestion].animation} />
          
          <div style={styles.messageCard}>
            <div style={styles.messageEmoji}>
              {questions[currentQuestion].animation === 'balloons' && '🎈🎉🎈'}
              {questions[currentQuestion].animation === 'hearts' && '💕💖💕'}
              {questions[currentQuestion].animation === 'stars' && '⭐✨⭐'}
              {questions[currentQuestion].animation === 'sparkles' && '✨💫✨'}
              {questions[currentQuestion].animation === 'travel' && '✈️🗾✈️'}
            </div>

            <h2 style={{fontSize: '42px', fontWeight: '900', color: '#ff69b4', marginBottom: '30px'}}>
              Correct! 🎉
            </h2>

            <div style={styles.messageText}>
              {questions[currentQuestion].correctMessage}
            </div>

            <div style={{fontSize: '60px', marginBottom: '30px'}}>
              🐱 😺 🐱
            </div>

            <button
              style={styles.continueButton}
              onClick={continueToNext}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              {currentQuestion === questions.length - 1 ? 'See Final Results 💕' : 'Next Question →'}
            </button>
          </div>

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-15px) scale(1.1); }
            }
            @keyframes fall {
              0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(110vh) rotate(360deg); opacity: 0.5; }
            }
          `}</style>
        </div>
      )}

      {showWrongMessage && (
        <div style={styles.container}>
          {[...Array(15)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.2} duration={4 + Math.random() * 4} />
          ))}
          
          <div style={styles.messageCard}>
            <div style={styles.messageEmoji}>
              😢💔😢
            </div>

            <h2 style={{fontSize: '42px', fontWeight: '900', color: '#ff69b4', marginBottom: '30px'}}>
              Oops! Not quite right 💕
            </h2>

            <div style={styles.messageText}>
              The correct answer was: <strong>{questions[currentQuestion].options[questions[currentQuestion].correct]}</strong>
              <br/><br/>
              But that's okay! We're still learning about each other, and every moment together helps us grow closer! 🐱💕
            </div>

            <button
              style={styles.continueButton}
              onClick={continueAfterWrong}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              {currentQuestion === questions.length - 1 ? 'See Final Results 💕' : 'Next Question →'}
            </button>
          </div>

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-15px) scale(1.1); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-30px) rotate(10deg); }
            }
          `}</style>
        </div>
      )}

      {showResult && !showWelcome && !showCorrectMessage && !showWrongMessage && (
        <div style={styles.container}>
          {[...Array(30)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.2} duration={4 + Math.random() * 4} />
          ))}

          <div style={styles.resultCard}>
            <div style={styles.resultEmoji}>
              {score === questions.length ? '🎉🐱🎉' : score >= questions.length * 0.6 ? '💕🐱💕' : '🌸🐱🌸'}
            </div>
            
            <h1 style={styles.resultTitle}>
              {score === questions.length ? 'Perfect ' : score >= questions.length * 0.6 ? 'Great Job' : 'Thanks for trying'}
            </h1>
            
            <p style={styles.resultScore}>
              You got {score} out of {questions.length} correct!
            </p>

            <div style={styles.warmMessage}>
              {score === questions.length ? (
                <>
                  <strong style={{fontSize: '28px', color: '#ff69b4'}}>you did it baby 💖</strong>
                  <br/><br/>
                  You know me better than anyone else. Every answer was perfect, just like l3mer dyali. 
                  Thank you for being so special and for always understanding me. m easy to understand asln hhh jk.
                  You make every day worth living,i mean it. and 
                  I'm so lucky to have you in my life.sooo thankful to have you love ✨
                  <br/><br/>
                  <strong style={{fontSize: '26px', color: '#ff69b4'}}>I'm always loving you more and more 💕</strong>
                  <br/><br/>
                  <span style={{fontSize: '28px', fontWeight: '900'}}>💕 I LOVE YOU SO MUCH HIND! 🐱💕</span>
                </>
              ) : score >= questions.length * 0.6 ? (
                <>
                  <strong style={{fontSize: '28px', color: '#ff69b4'}}>you did good baby💕 </strong>
                  <br/><br/>
                  You know me so well! I love how you remember these things about me. 
                  Every moment we share together is precious. Thank you for being such an amazing person 
                  and for making me smile every day. i love you baby💕
                  <br/><br/>
                  <strong style={{fontSize: '26px', color: '#ff69b4'}}>I'm always loving you more and more 💕</strong>
                  <br/><br/>
                  <span style={{fontSize: '26px', fontWeight: '900'}}>🐱 I LOVE YOU SO MUCH HIND! 💕</span>
                </>
              ) : (
                <>
                  <strong style={{fontSize: '28px', color: '#ff69b4'}}>That's Okay love 🌸</strong>
                  <br/><br/>
                  Ti malkii hhhh but What matters most is that we're learning more about each other every day! 
                  I appreciate you taking the time to do this quiz. Every moment with you is special, 
                  and I'm so grateful for you! Let's make more memories together! 💖
                  <br/><br/>
                  <strong style={{fontSize: '26px', color: '#ff69b4'}}>I'm always loving you more and more 💕</strong>
                  <br/><br/>
                  <span style={{fontSize: '26px', fontWeight: '900'}}>🐱 I LOVE YOU SO MUCH HIND! 💕</span>
                </>
              )}
            </div>

            <div style={{marginBottom: '30px'}}>
              <h3 style={{fontSize: '20px', fontWeight: '700', color: '#ff69b4', marginBottom: '20px'}}>
                Your Answers:
              </h3>
              {answers.map((answer, index) => (
                <div key={index} style={styles.reviewItem}>
                  <div style={{
                    padding: '8px',
                    borderRadius: '50%',
                    background: answer.correct ? '#d4edda' : '#f8d7da'
                  }}>
                    {answer.correct ? 
                      <Check size={20} color="#28a745" /> : 
                      <X size={20} color="#dc3545" />
                    }
                  </div>
                  <span style={{flex: 1, fontSize: '16px', color: '#333'}}>
                    {answer.question.replace(/[🎂🎨🥗⭐✈️🏐]/g, '')}
                  </span>
                </div>
              ))}
            </div>

            <button
              style={styles.restartButton}
              onClick={restartQuiz}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Try Again 🔄
            </button>
          </div>

          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-30px) rotate(10deg); }
            }
          `}</style>
        </div>
      )}

      {!showWelcome && !showCorrectMessage && !showWrongMessage && !showResult && (
        <div style={styles.container}>
          {[...Array(15)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.4} duration={6 + Math.random() * 4} />
          ))}

          <div style={styles.quizCard}>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progress,
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`
                }}
              />
            </div>

            <p style={styles.questionNumber}>
              Question {currentQuestion + 1} of {questions.length}
            </p>

            <h2 style={styles.question}>
              {questions[currentQuestion].emoji} {questions[currentQuestion].question}
            </h2>

            <div>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.optionButton,
                    background: selectedAnswer === index ? 'linear-gradient(135deg, #ffc0cb, #ffb6c1)' : 'white',
                    color: selectedAnswer === index ? 'white' : '#333',
                    borderColor: selectedAnswer === index ? '#ff69b4' : '#ffb6c1',
                    transform: selectedAnswer === index ? 'scale(1.02)' : 'scale(1)',
                    fontWeight: selectedAnswer === index ? '700' : '600'
                  }}
                  onClick={() => handleAnswer(index)}
                  onMouseOver={(e) => {
                    if (selectedAnswer !== index) {
                      e.target.style.background = 'rgba(255,182,193,0.2)';
                      e.target.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (selectedAnswer !== index) {
                      e.target.style.background = 'white';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              style={{
                ...styles.nextButton,
                opacity: selectedAnswer === null ? 0.5 : 1,
                cursor: selectedAnswer === null ? 'not-allowed' : 'pointer'
              }}
              onClick={handleNext}
              disabled={selectedAnswer === null}
              onMouseOver={(e) => {
                if (selectedAnswer !== null) {
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Submit Answer
              <ArrowRight size={24} />
            </button>
          </div>

          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-30px) rotate(10deg); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}