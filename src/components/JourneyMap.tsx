import React from 'react';
import {
  Factory,
  Truck,
  TrainTrack,
  Train,
  Boxes,
  Ship,
  Globe2,
  Anchor,
  Warehouse,
  CheckCircle2,
} from 'lucide-react';
import { GameStage } from '../types/game';

interface JourneyMapProps {
  currentStage: GameStage;
}

interface Step {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  stages: GameStage[];
}

const STEPS: Step[] = [
  { id: '1', label: 'Factory', icon: Factory, stages: ['intro', 'level1_factory'] },
  { id: '2', label: 'Lorry Convoy', icon: Truck, stages: ['level1_factory'] },
  { id: '3', label: 'Rail Station', icon: TrainTrack, stages: ['level2_railway'] },
  { id: '4', label: 'Freight Train', icon: Train, stages: ['level2_railway'] },
  { id: '5', label: 'Container Yard', icon: Boxes, stages: ['level3_port'] },
  { id: '6', label: 'Cargo Ship', icon: Ship, stages: ['level3_port', 'level4_ship_journey'] },
  { id: '7', label: 'Global Port', icon: Globe2, stages: ['level4_ship_journey'] },
  { id: '8', label: 'Return Ship', icon: Anchor, stages: ['level5_return_ship'] },
  { id: '9', label: 'Port Delivery', icon: Truck, stages: ['level6_godown_delivery'] },
  { id: '10', label: 'Godown', icon: Warehouse, stages: ['level6_godown_delivery', 'celebration'] },
];

export const JourneyMap: React.FC<JourneyMapProps> = ({ currentStage }) => {
  const getStageOrder = (stage: GameStage): number => {
    switch (stage) {
      case 'intro': return 0;
      case 'level1_factory': return 1;
      case 'level2_railway': return 3;
      case 'level3_port': return 5;
      case 'level4_ship_journey': return 6;
      case 'level5_return_ship': return 7;
      case 'level6_godown_delivery': return 9;
      case 'celebration': return 10;
      default: return 0;
    }
  };

  const currentOrder = getStageOrder(currentStage);

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-2.5 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-1.5 sm:gap-2">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentOrder;
          const isCurrent = step.stages.includes(currentStage) || (idx === currentOrder);
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step Pill */}
              <div
                className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10 scale-105'
                    : isCompleted
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-500 opacity-60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'animate-bounce text-amber-400' : ''}`} />
                )}
                <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
                  {step.label}
                </span>
              </div>

              {/* Connecting arrow / line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-shrink-0 w-3 sm:w-5 h-[2px] rounded-full transition-colors ${
                    idx < currentOrder ? 'bg-emerald-500/70' : 'bg-slate-700/60'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
