import React from 'react';

interface Props {
  type: string;
  name: string;
  customImageUri?: string;
  className?: string;
  isTimerActive?: boolean;
}

export const ExerciseIllustration: React.FC<Props> = ({
  type,
  name,
  customImageUri,
  className = 'w-full h-48',
  isTimerActive = false
}) => {
  if (customImageUri) {
    return (
      <div className={`relative overflow-hidden rounded-lg border border-pink-500/40 bg-black/60 flex items-center justify-center ${className}`}>
        <img
          src={customImageUri}
          alt={name}
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 border border-cyan-400 text-[10px] text-cyan-400 font-mono">
          USER_MEDIA
        </div>
      </div>
    );
  }

  // Neon Cyberpunk SVG Wireframe
  return (
    <div className={`relative overflow-hidden rounded-lg border border-pink-500/30 bg-gradient-to-b from-[#110524] to-[#070212] flex items-center justify-center p-3 select-none ${className}`}>
      {/* Background synthwave grid */}
      <div className="absolute inset-0 synthwave-grid opacity-25 pointer-events-none" />

      {/* Hologram scan line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse pointer-events-none" />

      <svg
        viewBox="0 0 240 160"
        className="w-full h-full max-h-48 drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff007f" />
            <stop offset="50%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#b026ff" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Target Joint Highlights & Biomechanics Wireframes */}
        {renderIllustrationSvg(type, isTimerActive)}
      </svg>

      {/* Exercise badge watermark */}
      <div className="absolute bottom-2 left-2 text-[10px] font-mono tracking-widest text-cyan-400/80 bg-black/60 px-1.5 py-0.5 rounded border border-cyan-500/20">
        SYS_HOLO: {type.toUpperCase()}
      </div>

      {isTimerActive && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 bg-pink-500/20 border border-pink-500 text-[10px] text-pink-400 font-mono animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500" /> ACTIVE
        </div>
      )}
    </div>
  );
};

function renderIllustrationSvg(type: string, isTimerActive: boolean) {
  switch (type) {
    case 'calves_standing':
    case 'bent_knee_calves':
    case 'toe_raises':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          {/* Ground */}
          <line x1="30" y1="140" x2="210" y2="140" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4 4" />
          {/* Body */}
          <circle cx="120" cy="30" r="10" stroke="#00f0ff" />
          <line x1="120" y1="40" x2="120" y2="85" />
          {/* Arms */}
          <line x1="120" y1="52" x2="95" y2="75" />
          <line x1="120" y1="52" x2="145" y2="75" />
          {/* Legs on toes */}
          <line x1="120" y1="85" x2="105" y2="115" />
          <line x1="105" y1="115" x2="108" y2="136" />
          <line x1="120" y1="85" x2="135" y2="115" />
          <line x1="135" y1="115" x2="132" y2="136" />
          {/* Calves target pulse indicator */}
          <circle cx="106" cy="120" r="6" fill="#ff007f" fillOpacity="0.4" stroke="#ff007f" strokeWidth="2" />
          <circle cx="134" cy="120" r="6" fill="#ff007f" fillOpacity="0.4" stroke="#ff007f" strokeWidth="2" />
          {/* Lift arrow */}
          <path d="M120 128 L120 105 M115 110 L120 105 L125 110" stroke="#ffe600" strokeWidth="2.5" />
        </g>
      );

    case 'squats':
    case 'wall_sit':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          {type === 'wall_sit' && (
            <line x1="80" y1="20" x2="80" y2="140" stroke="#ff007f" strokeWidth="4" strokeDasharray="6 3" />
          )}
          <line x1="40" y1="140" x2="200" y2="140" stroke="#00f0ff" strokeWidth="2" />
          {/* Head & Torso */}
          <circle cx={type === 'wall_sit' ? '95' : '105'} cy="45" r="9" stroke="#00f0ff" />
          <line x1={type === 'wall_sit' ? '95' : '105'} y1="55" x2={type === 'wall_sit' ? '98' : '115'} y2="90" />
          {/* Thigh (horizontal-ish) */}
          <line x1={type === 'wall_sit' ? '98' : '115'} y1="90" x2="145" y2="92" stroke="#ff007f" strokeWidth="4" />
          {/* Shin */}
          <line x1="145" y1="92" x2="145" y2="140" />
          {/* Foot */}
          <line x1="145" y1="140" x2="165" y2="140" />
          {/* Extended arms */}
          <line x1={type === 'wall_sit' ? '97' : '110'} y1="65" x2="155" y2="65" stroke="#ffe600" />
          {/* Knee Joint Glow */}
          <circle cx="145" cy="92" r="7" fill="#00f0ff" fillOpacity="0.5" stroke="#00f0ff" />
        </g>
      );

    case 'glute_bridge':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <line x1="30" y1="130" x2="210" y2="130" stroke="#00f0ff" strokeWidth="2" />
          {/* Head on ground */}
          <circle cx="65" cy="120" r="8" stroke="#00f0ff" />
          {/* Upper torso & elevated bridge pelvis */}
          <line x1="75" y1="125" x2="125" y2="85" stroke="#00f0ff" strokeWidth="3.5" />
          {/* Thigh to knee */}
          <line x1="125" y1="85" x2="165" y2="88" stroke="#ff007f" strokeWidth="4" />
          {/* Shins to floor */}
          <line x1="165" y1="88" x2="165" y2="130" />
          {/* Feet */}
          <line x1="165" y1="130" x2="185" y2="130" />
          {/* Glute target vector */}
          <circle cx="125" cy="85" r="8" fill="#ff007f" fillOpacity="0.5" stroke="#ff007f" />
          <path d="M125 110 L125 72 M120 78 L125 72 L130 78" stroke="#ffe600" strokeWidth="2" />
        </g>
      );

    case 'lunges':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <line x1="30" y1="140" x2="210" y2="140" stroke="#00f0ff" strokeWidth="2" />
          {/* Support pole */}
          <line x1="60" y1="40" x2="60" y2="140" stroke="#00f0ff" strokeWidth="2" strokeDasharray="3 3" />
          {/* Torso */}
          <circle cx="110" cy="40" r="9" stroke="#00f0ff" />
          <line x1="110" y1="50" x2="110" y2="90" />
          {/* Support arm reaching pole */}
          <line x1="110" y1="60" x2="60" y2="60" stroke="#ffe600" />
          {/* Front leg (90 deg) */}
          <line x1="110" y1="90" x2="140" y2="95" stroke="#ff007f" />
          <line x1="140" y1="95" x2="140" y2="140" stroke="#ff007f" />
          {/* Back leg (lunged back) */}
          <line x1="110" y1="90" x2="85" y2="115" />
          <line x1="85" y1="115" x2="80" y2="138" />
          <circle cx="140" cy="95" r="6" fill="#00f0ff" fillOpacity="0.4" stroke="#00f0ff" />
        </g>
      );

    case 'fist':
    case 'finger_spread':
    case 'isometric_grip':
    case 'finger_opposition':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          {/* Forearm */}
          <line x1="70" y1="130" x2="110" y2="90" stroke="#00f0ff" strokeWidth="4" />
          {/* Wrist joint */}
          <circle cx="110" cy="90" r="7" fill="#ff007f" fillOpacity="0.4" stroke="#ff007f" />
          {/* Palm base */}
          <path d="M110 90 L135 65 L155 75 L130 100 Z" fill="#110524" stroke="#00f0ff" strokeWidth="2.5" />
          {/* Fingers */}
          {type === 'finger_spread' ? (
            <>
              <line x1="140" y1="65" x2="155" y2="40" stroke="#ffe600" strokeWidth="3" />
              <line x1="145" y1="68" x2="170" y2="48" stroke="#ffe600" strokeWidth="3" />
              <line x1="150" y1="72" x2="178" y2="60" stroke="#ffe600" strokeWidth="3" />
              <line x1="152" y1="76" x2="180" y2="78" stroke="#ffe600" strokeWidth="3" />
              <line x1="125" y1="78" x2="140" y2="95" stroke="#ffe600" strokeWidth="3" />
            </>
          ) : (
            <>
              {/* Clenched cyber fist */}
              <circle cx="150" cy="70" r="18" fill="#ff007f" fillOpacity="0.25" stroke="#ff007f" strokeWidth="3" />
              <path d="M138 65 Q150 55 162 65 Q155 82 140 75 Z" fill="#00f0ff" fillOpacity="0.3" stroke="#00f0ff" />
              {/* Power lines radiating */}
              <circle cx="150" cy="70" r="26" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
            </>
          )}
        </g>
      );

    case 'wrist_flexion':
    case 'wrist_extension':
    case 'wrist_circles':
    case 'pronation':
    case 'supination':
    case 'towel_wring':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          {/* Arm resting on desk */}
          <line x1="40" y1="100" x2="130" y2="100" stroke="#00f0ff" strokeWidth="5" />
          {/* Table surface */}
          <line x1="30" y1="105" x2="135" y2="105" stroke="#475569" strokeWidth="2" />
          {/* Wrist Joint Target */}
          <circle cx="130" cy="100" r="8" fill="#ff007f" fillOpacity="0.5" stroke="#ff007f" strokeWidth="2.5" />
          {/* Hand flexing up or down */}
          <line x1="130" y1="100" x2="165" y2="70" stroke="#ffe600" strokeWidth="4" />
          <circle cx="165" cy="70" r="6" stroke="#ffe600" />
          {/* Rotation arc indicator */}
          <path d="M145 115 A 25 25 0 0 0 170 85" stroke="#ff007f" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M168 83 L173 87 L167 92" fill="#ff007f" />
        </g>
      );

    case 'cat_cow':
    case 'thoracic':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <line x1="30" y1="130" x2="210" y2="130" stroke="#00f0ff" strokeWidth="2" />
          {/* Hands and knees on floor */}
          <line x1="75" y1="130" x2="75" y2="95" />
          <line x1="165" y1="130" x2="165" y2="95" />
          {/* Spine curved */}
          <path d="M75 95 Q120 60 165 95" stroke="#ff007f" strokeWidth="4" />
          {/* Head */}
          <circle cx="180" cy="98" r="8" stroke="#00f0ff" />
          {/* Spine Vertebrae dots */}
          <circle cx="95" cy="80" r="3" fill="#00f0ff" />
          <circle cx="120" cy="72" r="3" fill="#ffe600" />
          <circle cx="145" cy="80" r="3" fill="#00f0ff" />
        </g>
      );

    case 'shoulder_circles':
    case 'wall_slides':
    case 'head_tilts':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <circle cx="120" cy="45" r="10" stroke="#00f0ff" />
          <line x1="120" y1="55" x2="120" y2="115" stroke="#00f0ff" />
          {/* Shoulder girdle */}
          <line x1="90" y1="70" x2="150" y2="70" stroke="#ff007f" strokeWidth="4" />
          {/* Arms W-pose / slides */}
          <path d="M90 70 L70 95 L65 65" stroke="#ffe600" strokeWidth="3" />
          <path d="M150 70 L170 95 L175 65" stroke="#ffe600" strokeWidth="3" />
          {/* Shoulder rotation circular arrows */}
          <circle cx="90" cy="70" r="10" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="150" cy="70" r="10" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>
      );

    case 'breathing':
    case 'movement_breathing':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          {/* Seated meditator / breather silhouette */}
          <circle cx="120" cy="40" r="10" stroke="#00f0ff" />
          <line x1="120" y1="50" x2="120" y2="95" stroke="#00f0ff" />
          {/* Crossed legs */}
          <path d="M90 120 Q120 125 150 120" stroke="#00f0ff" strokeWidth="3" />
          {/* Expandable lung / diaphragm pulse rings */}
          <circle cx="120" cy="75" r={isTimerActive ? '25' : '18'} stroke="#ff007f" strokeWidth="2.5" fill="#ff007f" fillOpacity="0.2">
            <animate attributeName="r" values="16;26;16" dur="4s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.1;0.35;0.1" dur="4s" repeatCount="indefinite" />
          </circle>
          {/* Inhale/Exhale energy particles */}
          <circle cx="120" cy="75" r="4" fill="#00f0ff" />
          <path d="M100 50 Q120 30 140 50" stroke="#ffe600" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>
      );

    case 'march':
    case 'side_steps':
    case 'alternating_knees':
    case 'calm_walk':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <line x1="30" y1="140" x2="210" y2="140" stroke="#00f0ff" strokeWidth="2" />
          {/* Running / marching figure */}
          <circle cx="120" cy="35" r="9" stroke="#00f0ff" />
          <line x1="120" y1="45" x2="118" y2="85" />
          {/* High knee leg */}
          <line x1="118" y1="85" x2="145" y2="85" stroke="#ff007f" strokeWidth="4" />
          <line x1="145" y1="85" x2="145" y2="115" stroke="#ff007f" strokeWidth="3.5" />
          {/* Supporting straight leg */}
          <line x1="118" y1="85" x2="105" y2="140" stroke="#00f0ff" />
          {/* Opposing pumping arms */}
          <line x1="120" y1="55" x2="95" y2="75" stroke="#ffe600" />
          <line x1="120" y1="55" x2="145" y2="60" stroke="#ffe600" />
          {/* Knee marker */}
          <circle cx="145" cy="85" r="6" fill="#ffe600" fillOpacity="0.6" stroke="#ffe600" />
        </g>
      );

    case 'rest':
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <line x1="30" y1="120" x2="210" y2="120" stroke="#00f0ff" strokeWidth="2" />
          {/* Reclined / Resting figure */}
          <circle cx="65" cy="105" r="8" stroke="#00f0ff" />
          <line x1="73" y1="110" x2="160" y2="112" stroke="#00f0ff" strokeWidth="4" />
          <line x1="160" y1="112" x2="185" y2="118" stroke="#00f0ff" />
          {/* Supercompensation Shield */}
          <circle cx="120" cy="75" r="30" stroke="#ff007f" strokeWidth="2" strokeDasharray="4 4">
            <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="120" y="80" textAnchor="middle" fill="#00f0ff" fontSize="14" fontFamily="Orbitron" fontWeight="bold">
            ZZZ
          </text>
        </g>
      );

    default:
      // Universal cybernetic exercise schematic
      return (
        <g stroke="url(#neonGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)">
          <circle cx="120" cy="40" r="10" stroke="#00f0ff" />
          <line x1="120" y1="50" x2="120" y2="95" />
          <line x1="120" y1="65" x2="90" y2="85" stroke="#ffe600" />
          <line x1="120" y1="65" x2="150" y2="85" stroke="#ffe600" />
          <line x1="120" y1="95" x2="100" y2="140" stroke="#ff007f" />
          <line x1="120" y1="95" x2="140" y2="140" stroke="#ff007f" />
          <circle cx="120" cy="75" r="5" fill="#00f0ff" />
        </g>
      );
  }
}
