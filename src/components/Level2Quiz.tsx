import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Compass,
  MapPin,
  Trophy,
} from 'lucide-react';
import { QUIZ_QUESTIONS, BADGE_DEFINITIONS, QuizScore } from '../data/portQuizQuestions';
import { Level2Visualizer } from './Level2Visualizer';
import { CharacterGuide } from './CharacterGuide';
import { sound } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level2QuizProps {
  quizScore: QuizScore;
  onUpdateScore: (newScore: QuizScore) => void;
  onCompleteAll: () => void;
  onExitToMenu: () => void;
}

export const Level2Quiz: React.FC<Level2QuizProps> = ({
  quizScore,
  onUpdateScore,
  onCompleteAll,
  onExitToMenu,
}) => {
  const [currentIdx, setCurrentIdx] = useState(quizScore.currentQuestionIndex || 0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptsOnCurrent, setAttemptsOnCurrent] = useState(0);

  // Badge unlock banner modal state
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<{
    id: string;
    title: string;
    label: string;
    icon: string;
    mission: number;
  } | null>(null);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const isLastQuestion = currentIdx === QUIZ_QUESTIONS.length - 1;

  // Category progress
  const questionsInCurrentCat = QUIZ_QUESTIONS.filter((q) => q.category === currentQ.category);
  const currentCatIndex = questionsInCurrentCat.findIndex((q) => q.id === currentQ.id) + 1;

  const handleSelectOption = (letter: 'A' | 'B' | 'C') => {
    if (isCorrect) return; // Prevent clicking after right answer
    sound.playClick();
    setSelectedOption(letter);

    const isAnswerRight = letter === currentQ.correctAnswer;

    if (isAnswerRight) {
      setIsCorrect(true);
      setIsAnswered(true);
      sound.playSuccessFanfare();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      // Update quiz score state (only award point once)
      const prevAnswered = quizScore.answeredQuestions[currentQ.id];
      const alreadyScored = prevAnswered?.answered;

      let newScore = quizScore.score;
      if (!alreadyScored) {
        newScore += 1;
      }

      const updatedAnsweredQuestions = {
        ...quizScore.answeredQuestions,
        [currentQ.id]: {
          answered: true,
          correctOnFirstTry: attemptsOnCurrent === 0,
          attempts: attemptsOnCurrent + 1,
        },
      };

      // Check if this answer completes a 5-question mission
      const isMissionEnd = currentQ.id % 5 === 0;
      let newBadges = [...quizScore.unlockedBadges];

      if (isMissionEnd) {
        const badgeDef = BADGE_DEFINITIONS.find((b) => b.id === currentQ.category);
        if (badgeDef && !newBadges.includes(badgeDef.id)) {
          newBadges.push(badgeDef.id);
          setNewlyUnlockedBadge(badgeDef);
          sound.playCoinSound();
        }
      }

      onUpdateScore({
        score: newScore,
        answeredQuestions: updatedAnsweredQuestions,
        currentQuestionIndex: currentIdx,
        unlockedBadges: newBadges,
      });
    } else {
      setIsAnswered(true);
      setIsCorrect(false);
      setAttemptsOnCurrent((prev) => prev + 1);
      setShowHint(true);
      sound.playHintSound();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (newlyUnlockedBadge) {
      setNewlyUnlockedBadge(null);
    }

    if (isLastQuestion) {
      onCompleteAll();
      return;
    }

    const nextIdx = currentIdx + 1;
    setCurrentIdx(nextIdx);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setAttemptsOnCurrent(0);

    onUpdateScore({
      ...quizScore,
      currentQuestionIndex: nextIdx,
    });
  };

  const getMissionThemeColors = () => {
    switch (currentQ.category) {
      case 'know_your_port':
        return 'from-blue-600 via-sky-600 to-indigo-700 text-blue-100';
      case 'science':
        return 'from-purple-600 via-indigo-600 to-sky-600 text-purple-100';
      case 'maths':
        return 'from-amber-600 via-orange-600 to-yellow-600 text-amber-100';
      case 'green_port':
        return 'from-emerald-600 via-teal-600 to-green-700 text-emerald-100';
      case 'safety':
        return 'from-rose-600 via-red-600 to-orange-700 text-rose-100';
      case 'captain_challenge':
        return 'from-yellow-500 via-amber-600 to-cyan-600 text-yellow-100';
      default:
        return 'from-slate-700 to-slate-900 text-slate-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Category & Checkpoint Header Banner */}
      <div
        className={`bg-gradient-to-r ${getMissionThemeColors()} rounded-3xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
                MISSION {currentQ.missionNumber} · {currentQ.categoryTitle}
              </span>
              <span className="text-xs font-bold text-amber-300">
                Checkpoint {currentCatIndex} of {questionsInCurrentCat.length}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mt-2 font-heading">
              {currentQ.checkpointTitle}
            </h2>

            <div className="flex items-center gap-2 text-xs font-bold mt-1 opacity-90">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location: {currentQ.location}</span>
            </div>
          </div>

          {/* Overall Quiz Score Status */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950/70 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">
                Port Quiz Score
              </span>
              <span className="text-2xl font-black text-white font-heading">
                {quizScore.score} / 30
              </span>
            </div>

            <div className="bg-slate-950/70 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] uppercase font-bold text-cyan-300 block">
                Question
              </span>
              <span className="text-2xl font-black text-white font-heading">
                {currentQ.id} / 30
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Raj or Captain Buddy Character Speech */}
      <CharacterGuide
        message={
          isCorrect
            ? `Excellent choice! ${currentQ.explanation}`
            : attemptsOnCurrent > 0
            ? "Good thinking! Let's examine the port clues carefully. Would you like a helpful hint?"
            : currentQ.question
        }
        mood={isCorrect ? 'celebrating' : attemptsOnCurrent > 0 ? 'thinking' : 'explaining'}
        hint={currentQ.hint}
        showHint={showHint}
        onToggleHint={() => setShowHint(!showHint)}
      />

      {/* Main Interactive Question Card */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Visual Demonstration Scene */}
        <div className="mb-6">
          <Level2Visualizer
            question={currentQ}
            isCorrect={isCorrect}
            selectedAnswer={selectedOption}
          />
        </div>

        {/* Question Prompt */}
        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700 mb-6 text-center">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block mb-1">
            Question {currentQ.id}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
            {currentQ.question}
          </h3>
        </div>

        {/* Multiple Choice Options (A, B, C exactly from PDF) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {currentQ.options.map((opt) => {
            const isThisSelected = selectedOption === opt.letter;
            const isThisCorrect = opt.letter === currentQ.correctAnswer;

            let buttonStyle = 'bg-slate-900/80 border-slate-700 hover:border-cyan-400 hover:bg-slate-700/60 text-white';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20';
              } else if (isThisSelected) {
                buttonStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 animate-shake';
              }
            }

            return (
              <button
                key={opt.letter}
                onClick={() => handleSelectOption(opt.letter)}
                className={`p-5 rounded-2xl border-2 text-left font-bold transition-all cursor-pointer flex flex-col justify-between gap-3 min-h-[110px] active:scale-[0.98] ${buttonStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center font-black text-sm text-amber-300 font-heading">
                    {opt.letter}
                  </span>

                  {isAnswered && isThisCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {isAnswered && isThisSelected && !isThisCorrect && (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                  )}
                </div>

                <span className="text-sm sm:text-base font-extrabold text-slate-100">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {isCorrect && (
          <div className="bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-slate-900 rounded-2xl p-5 border-2 border-emerald-400 text-center animate-in fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs font-black uppercase text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Correct Decision! +1 Point Awarded
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentQ.explanation}
              </p>
            </div>

            <button
              onClick={handleNextQuestion}
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl font-heading active:scale-95 transition cursor-pointer"
            >
              <span>{isLastQuestion ? 'COMPLETE FINAL CHALLENGE' : 'NEXT CHECKPOINT'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Bottom Navigation & Exit */}
        <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={() => {
              sound.playClick();
              onExitToMenu();
            }}
            className="hover:text-white transition cursor-pointer font-bold flex items-center gap-1"
          >
            <span>← Back to Main Dashboard</span>
          </button>

          <span className="font-bold text-amber-300">
            Progress: {currentIdx + 1} of 30 Questions Answered
          </span>
        </div>
      </div>

      {/* Badge Unlock Celebration Modal */}
      {newlyUnlockedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border-4 border-amber-400 p-6 text-center text-white shadow-2xl relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 flex items-center justify-center text-5xl mx-auto mb-4 shadow-xl shadow-amber-400/20 animate-bounce">
              {newlyUnlockedBadge.icon}
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block">
              MISSION {newlyUnlockedBadge.mission} COMPLETE!
            </span>

            <h3 className="text-2xl sm:text-3xl font-black font-heading mt-1 text-white">
              {newlyUnlockedBadge.title} BADGE UNLOCKED!
            </h3>

            <p className="text-sm text-slate-300 mt-2">
              Congratulations! You've mastered all five checkpoints in this mission and earned the official {newlyUnlockedBadge.label}!
            </p>

            <button
              onClick={() => {
                sound.playClick();
                setNewlyUnlockedBadge(null);
              }}
              className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-slate-950 font-black text-base shadow-xl font-heading hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              COLLECT BADGE & CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
