import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ interest: "", style: "" });
  const [loading, setLoading] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const questions = [
    {
      q: "What area excites you most?",
      options: ["Technology", "Business", "Public Service", "Creative Arts"],
      key: "interest"
    },
    {
      q: "A critical bug appears before a deadline. What is your move?",
      options: [
        { text: "Fix it immediately, regardless of time.", style: "Technical" },
        { text: "Notify the team and assess the impact.", style: "Leadership" },
        { text: "Find a creative workaround.", style: "Creative" }
      ],
      key: "style"
    }
  ];

  // Shuffle options whenever the step changes
  useEffect(() => {
    const currentOptions = questions[step].options;
    const shuffled = [...currentOptions].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, [step]);

  // Force clean state on mount
  useEffect(() => {
    localStorage.removeItem("quizResults");
    localStorage.removeItem("careerRecommendation");
  }, []);

  const handleSelect = (key, value, styleValue) => {
    const newAnswers = { 
      ...answers, 
      [key]: value,
      style: styleValue || value 
    };
    
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finalizeQuiz(newAnswers);
    }
  };

  const finalizeQuiz = (finalAnswers) => {
    setLoading(true);
    localStorage.setItem("quizResults", JSON.stringify(finalAnswers));
    // Small delay to let the UI breathe
    setTimeout(() => navigate("/results"), 800);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-[#0f172a]">
      <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>
      <h2 className="text-2xl font-bold animate-pulse">Analyzing your professional profile...</h2>
    </div>
  );

  return (
    <div className="p-10 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
      <h2 className="text-4xl font-extrabold mb-10 text-white leading-tight">{questions[step].q}</h2>
      <div className="grid gap-4">
        {shuffledOptions.map((opt, i) => {
          const text = opt.text || opt;
          const style = opt.style || opt;
          return (
            <button 
              key={i} 
              onClick={() => handleSelect(questions[step].key, text, style)} 
              className="p-6 bg-[#1e293b] hover:bg-indigo-600 border border-gray-700 text-white rounded-xl transition-all text-left shadow-lg"
            >
              {text}
            </button>
          );
        })}
      </div>
      <p className="text-gray-500 mt-8 text-sm">Step {step + 1} of {questions.length}</p>
    </div>
  );
}