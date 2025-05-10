import React, { useEffect, useState, useRef, useCallback } from 'react';

interface LightningEffectProps {
  className?: string;
}

// Function to generate a random point at a given distance with angle variation
const getRandomPoint = (x: number, y: number, distance: number, angleVariation: number) => {
  const baseAngle = Math.random() * Math.PI * 2;
  const angle = baseAngle + (Math.random() * angleVariation - angleVariation / 2);
  return {
    x: x + Math.cos(angle) * distance,
    y: y + Math.sin(angle) * distance
  };
};

// Function to generate a lightning branch
const generateLightningPath = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  displacementFactor: number,
  roughness: number,
  branchProbability = 0.03,
  maxBranchCount = 2,
  branchCount = 0,
  isMainBranch = true
): string => {
  // If the segment is too small, return a direct line
  if (Math.abs(startX - endX) < 10 && Math.abs(startY - endY) < 10) {
    return `L${endX} ${endY}`;
  }

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  // Add some randomness to displacement
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const displacement = (Math.random() - 0.5) * displacementFactor * distance;
  
  // Calculate the perpendicular angle to the line
  const angle = Math.atan2(endY - startY, endX - startX) + Math.PI / 2;
  
  // Apply displacement
  const newMidX = midX + displacement * Math.cos(angle);
  const newMidY = midY + displacement * Math.sin(angle);
  
  // Recursively generate the path segments
  const pathStart: string = generateLightningPath(
    startX, 
    startY, 
    newMidX, 
    newMidY, 
    displacementFactor * roughness, 
    roughness,
    branchProbability,
    maxBranchCount,
    branchCount,
    isMainBranch
  );
  
  let branchPath = '';
  
  // Add branches with decreasing probability as we go deeper
  if (branchCount < maxBranchCount && Math.random() < branchProbability && distance > 50) {
    const branchEndPoint = getRandomPoint(
      newMidX,
      newMidY,
      distance * 0.7,
      Math.PI / 4
    );
    
    branchPath = `M${newMidX} ${newMidY} ` + 
      generateLightningPath(
        newMidX,
        newMidY,
        branchEndPoint.x,
        branchEndPoint.y,
        displacementFactor,
        roughness,
        branchProbability * 0.5,
        maxBranchCount,
        branchCount + 1,
        false
      );
  }
  
  const pathEnd: string = generateLightningPath(
    newMidX,
    newMidY,
    endX,
    endY,
    displacementFactor * roughness,
    roughness,
    branchProbability,
    maxBranchCount,
    branchCount,
    isMainBranch
  );
  
  return `${pathStart} L${newMidX} ${newMidY} ${pathEnd}${branchPath}`;
};

const LightningEffect: React.FC<LightningEffectProps> = ({ className }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [lightningPaths, setLightningPaths] = useState<string[]>([]);
  const [animationPhase, setAnimationPhase] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Generate lightning paths for specific animation phase
  const generateLightningPaths = (phase: number = 0) => {
    const paths: string[] = [];
    
    // Calculate how far along the diagonal we've traveled (0 to 1)
    const progressFactor = Math.min(1, phase / 4); // Divide animation into 5 phases
    
    // Main primary lightning bolt - the centerpiece of the animation
    const mainStartX = 0; // Always start from top-left
    const mainStartY = 0; 
    
    // Calculate the endpoints based on animation phase
    // As phase increases, the lightning extends further along the diagonal
    const mainEndX = 20 + progressFactor * 80; // Progress from left (20) to right (100)
    const mainEndY = 20 + progressFactor * 380; // Progress from top (20) to bottom (400)
    
    // Main lightning path
    const mainPath = 'M' + mainStartX + ' ' + mainStartY + ' ' + 
                generateLightningPath(
                  mainStartX, 
                  mainStartY, 
                  mainEndX, 
                  mainEndY, 
                  0.8, // increased displacement for jagged appearance
                  0.7, // roughness
                  0.35, // higher branch probability
                  5     // more branches for dramatic effect
                );
    paths.push(mainPath);
    
    // Secondary bolts that follow the main bolt
    const secondaryCount = 2 + Math.floor(Math.random() * 2); // 2-3 secondary bolts
    
    for (let i = 0; i < secondaryCount; i++) {
      // Start near the main path with variation
      const offsetX = (Math.random() - 0.5) * 15;
      const offsetY = (Math.random() - 0.5) * 15;
      const segmentPoint = Math.random() * progressFactor; // Point along the main diagonal
      
      const startX = 5 + segmentPoint * 70 + offsetX;
      const startY = 5 + segmentPoint * 350 + offsetY;
      
      // End at a point further along the diagonal
      const endSegment = segmentPoint + (Math.random() * 0.3); // Extend 0-30% further
      const endX = 5 + endSegment * 70 + (Math.random() - 0.5) * 20; 
      const endY = 5 + endSegment * 350 + (Math.random() - 0.5) * 20;
      
      if (endX <= mainEndX && endY <= mainEndY) { // Only show if within current animation phase
        const path = 'M' + startX + ' ' + startY + ' ' + 
                    generateLightningPath(
                      startX, 
                      startY, 
                      endX, 
                      endY, 
                      0.6, // displacement factor
                      0.8, // roughness
                      0.2, // branch probability
                      3    // max branches
                    );
        paths.push(path);
      }
    }
    
    // Branching bolts that shoot out from the main lightning
    const branchCount = Math.min(6, 2 + Math.floor(progressFactor * 5)); // More branches as we progress
    
    for (let i = 0; i < branchCount; i++) {
      // Start somewhere along our current diagonal progress
      const segmentPoint = Math.random() * progressFactor;
      const startX = 5 + segmentPoint * 70;
      const startY = 5 + segmentPoint * 350;
      
      // Branch in random directions, but favor the diagonal direction
      const branchAngle = Math.random() * Math.PI * (Math.random() > 0.7 ? 2 : 0.5); 
      const branchLength = 15 + Math.random() * 30;
      
      const endX = startX + Math.cos(branchAngle) * branchLength;
      const endY = startY + Math.sin(branchAngle) * branchLength;
      
      const path = 'M' + startX + ' ' + startY + ' ' + 
                  generateLightningPath(
                    startX, 
                    startY, 
                    endX, 
                    endY, 
                    0.7, // higher displacement for chaotic branches
                    0.9, // more roughness
                    0.1, // lower branch probability for branches
                    2    // fewer sub-branches
                  );
      paths.push(path);
    }
    
    return paths;
  };
  
  // Animation function that progresses the lightning strike
  const animateLightningStrike = useCallback(() => {
    // Reset animation state
    setAnimationPhase(0);
    let phase = 0;
    
    // Clear any existing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Function that will be called on each animation frame
    const animateFrame = () => {
      // Generate paths for current phase
      setLightningPaths(generateLightningPaths(phase));
      
      // Show lightning
      setIsFlashing(true);
      
      // Increase phase for next frame
      phase += 1;
      setAnimationPhase(phase);
      
      // Continue animation until we reach the end
      if (phase <= 4) {
        // Continue animation
        animationRef.current = requestAnimationFrame(() => setTimeout(animateFrame, 50)); // Speed of lightning progression
      } else {
        // End of animation sequence
        // Add flicker effect at the end
        setTimeout(() => setIsFlashing(false), 60);
        setTimeout(() => setIsFlashing(true), 90);
        setTimeout(() => setIsFlashing(false), 140);
        setTimeout(() => setIsFlashing(true), 160);
        setTimeout(() => setIsFlashing(false), 300);
      }
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animateFrame);
  }, []);
  
  useEffect(() => {
    // Random time between lightning strikes (between 4 and 8 seconds)
    const getRandomInterval = () => Math.floor(Math.random() * 4000) + 4000;
    
    // Start the lightning strike animation
    const triggerLightningStrike = () => {
      animateLightningStrike();
      
      // Schedule the next lightning strike
      setTimeout(triggerLightningStrike, getRandomInterval());
    };
    
    // Initial delay before first lightning
    const timeout = setTimeout(triggerLightningStrike, 1000);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateLightningStrike]); // Add the dependency

  return (
    <div className={`lightning-effect-container w-full h-full absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}>
      <svg 
        className="absolute inset-0 w-full h-full z-10"
        viewBox="0 0 100 400"
        style={{ 
          opacity: isFlashing ? 1 : 0, 
          transform: 'scaleX(1.05) scaleY(1.05)',
          transition: 'opacity 0.05s ease-in'
        }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="intense-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>
        </defs>
        
        {lightningPaths.map((path, index) => (
          <g key={index}>
            {/* Outer intense glow - deep purple */}
            <path
              d={path}
              stroke="rgba(126, 34, 206, 0.8)" // Deep purple color
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#intense-glow)"
              style={{ opacity: 0.6 }}
            />
            
            {/* Mid-outer glow - purple hue */}
            <path
              d={path}
              stroke="rgba(147, 51, 234, 0.8)" // Purple color
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{ opacity: 0.75 }}
            />
            
            {/* Middle glow - lighter purple */}
            <path
              d={path}
              stroke="rgba(167, 139, 250, 0.9)" // Lighter purple
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{ opacity: 0.9 }}
            />
            
            {/* Core - white with purple tint */}
            <path
              d={path}
              stroke="rgba(245, 243, 255, 1)" // Bright white with very slight purple tint
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
      
      {/* Background flash - more intense purple flash with animation */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundColor: `rgba(147, 51, 234, ${0.15 + (animationPhase * 0.05)})`,
          opacity: isFlashing ? 1 : 0,
          transition: 'opacity 0.05s ease-in, background-color 0.05s ease-in',
          // Add radial gradient from top-left to enhance the effect
          backgroundImage: 'radial-gradient(circle at top left, rgba(168, 85, 247, 0.4), transparent 80%)',
        }}
      />
      
      {/* Extra flash effect at the strike point - appears at animation start */}
      {animationPhase <= 2 && (
        <div 
          className="absolute z-5"
          style={{ 
            top: '0%',
            left: '0%',
            width: '40%',
            height: '40%',
            background: 'radial-gradient(circle at top left, rgba(245, 208, 254, 0.9), transparent 80%)',
            opacity: isFlashing ? (1 - animationPhase * 0.3) : 0,
            transition: 'opacity 0.05s ease-in'
          }}
        />
      )}
    </div>
  );
};

export { LightningEffect };
export default LightningEffect;
