import React, { useState } from 'react';
import { Heart, Star, ArrowRight, Check, X, Sparkles } from 'lucide-react';

export default function ApologyJourney() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = React.useRef(null);
  const clickSfxRef = React.useRef(null);

  // Your personal apology messages
  const apologySteps = [
    {
      title: "I've been thinking...",
      text: "I couldn't sleep because my heart is heavy.please khlitili seen 🥺 its ok.I just felt so bad letting you go to bed upset without asking about your day or how you’re doing. It hurts me to know you fell asleep feeling that way. 😔",
      emoji: "💭",
      buttonText: "Keep reading...my beautiful girl",
      animation: "hearts"
    },
    {
      title: "I'm Truly Sorry baby",
      text: "I know I can be difficult sometimes,not dima thou hhh and I'm sorry for how I acted. and wlh i love you so much. o i do not like no one but you.please You deserve the world. i promise mn hade nhar i do my best to make you feel safe and happy, not upset. 💕",
      emoji: "🌹",
      buttonText: "I have more to say...",
      animation: "sparkles"
    },
    {
      title: "You're My Everything",
      text: "Even when we're mad, you're still the person I want to talk to the most. I love you more kter maktkhyeli,please i know you are sick and hate myself i can not do anything to help you but my heart is always with u hope tewli mzyan.❤️",
      emoji: "✨",
      buttonText: "The final truth...",
      animation: "stars"
    }
  ];

  React.useEffect(() => {
    if (audioRef.current && !isMusicPlaying && !showWelcome) {
      audioRef.current.volume = 0.2;
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => console.log("Audio autoplay blocked"));
    }
  }, [showWelcome]);

  const startMusic = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.volume = 0.2;
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(e => console.log("Music play failed:", e));
    }
  };

  const nextStep = () => {
    if (currentStep < apologySteps.length) {
      setCurrentStep(currentStep + 1);
    }
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
    card: {
      maxWidth: '600px',
      width: '100%',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '40px',
      padding: '40px',
      boxShadow: '0 25px 50px rgba(255,105,180,0.3)',
      border: '4px solid white',
      textAlign: 'center',
      zIndex: 10
    },
    title: { fontSize: '42px', fontWeight: '900', color: '#ff69b4', marginBottom: '20px' },
    text: { fontSize: '20px', color: '#666', lineHeight: '1.6', marginBottom: '30px', fontWeight: '500' },
    button: {
      background: 'linear-gradient(135deg, #ffc0cb, #ff69b4)',
      color: 'white',
      fontWeight: '700',
      fontSize: '20px',
      padding: '15px 40px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(255,105,180,0.3)',
      transition: 'all 0.3s ease'
    },
    floatingElement: { position: 'absolute', animation: 'fall 5s linear infinite', pointerEvents: 'none' }
  };

  const AnimatedBackground = ({ type }) => {
    return [...Array(20)].map((_, i) => (
      <div key={i} style={{
        ...styles.floatingElement,
        left: `${Math.random() * 100}%`,
        top: '-10%',
        animationDelay: `${Math.random() * 5}s`,
        fontSize: '30px'
      }}>
        {type === 'hearts' ? '❤️' : '✨'}
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <audio ref={audioRef} loop><source src="/song.mp3" type="audio/mpeg" /></audio>
      
      {showWelcome ? (
        <div style={styles.card}>
          <div style={{fontSize: '80px', marginBottom: '20px'}}>🥹🌸</div>
          <h1 style={styles.title}>For Hind</h1>
          <p style={styles.text}>I couldn't sleep bla ma ngoul lik sorry. Please love read this when you wake up. I love you so much ❤️</p>
          <button style={styles.button} onClick={() => { setShowWelcome(false); startMusic(); }}>
            Open this... 🍄
          </button>
        </div>
      ) : currentStep < apologySteps.length ? (
        <div style={styles.card}>
          <AnimatedBackground type={apologySteps[currentStep].animation} />
          <div style={{fontSize: '60px', marginBottom: '20px'}}>{apologySteps[currentStep].emoji}</div>
          <h2 style={styles.title}>{apologySteps[currentStep].title}</h2>
          <p style={styles.text}>{apologySteps[currentStep].text}</p>
          <button style={styles.button} onClick={nextStep}>
            {apologySteps[currentStep].buttonText}
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <AnimatedBackground type="hearts" />
          <Heart size={80} color="#ff69b4" fill="#ff69b4" style={{margin: '0 auto 20px', animate: 'pulse 1s infinite'}} />
          <h2 style={styles.title}>Myyy Love</h2>
          <p style={styles.text}>
            I'm waiting for you to wake up so I can hear your voice.  
            I love you so much and I'm sorry for everything. ❤️
          </p>
          <div style={{background: '#fff0f3', padding: '20px', borderRadius: '20px', border: '2px dashed #ff69b4'}}>
             <span style={{fontSize: '24px', fontWeight: 'bold', color: '#ff69b4'}}>I LOVE YOUUUUUU HIND💕</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}