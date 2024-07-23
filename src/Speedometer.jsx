
import React, { useState } from 'react';
import './css/speed.css';

const CircularSpeedometer = () => {
  const [speed, setSpeed] = useState(0);

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const gapAngle = 90;
  const effectiveCircumference = circumference * (360 - gapAngle) / 360; 


  const offset = (speed / 200) * effectiveCircumference;

  const majorTickInterval = 20;
  const minorTickInterval = 2;

  const renderTicks = () => {
    let ticks = [];
    const startAngle = 135; 

    for (let i = 0; i <= 200; i += minorTickInterval) {
      const isMajorTick = i % majorTickInterval === 0;
      const angle = startAngle + (i / 200) * (360 - gapAngle); 
      const length = isMajorTick ? 10 : 5;
      const x1 = 125 + (radius - 20) * Math.cos((angle * Math.PI) / 180);
      const y1 = 125 + (radius - 20) * Math.sin((angle * Math.PI) / 180);
      const x2 = 125 + (radius - 20 + length) * Math.cos((angle * Math.PI) / 180);
      const y2 = 125 + (radius - 20 + length) * Math.sin((angle * Math.PI) / 180);

      ticks.push(
        <line
          key={i}
          className={`tick ${isMajorTick ? 'major' : ''}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
        />
      );

      if (isMajorTick) {
        const xText = 125 + (radius - 30) * Math.cos((angle * Math.PI) / 180);
        const yText = 125 + (radius - 30) * Math.sin((angle * Math.PI) / 180);
        ticks.push(
          <text
            key={`text-${i}`}
            className="tick-label"
            x={xText}
            y={yText}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${angle + 90}, ${xText}, ${yText})`}
          >
            {i}
          </text>
        );
      }
    }
    return ticks;
  };

  return (
    <div className="speedometer-container">
      <h1>Speedometer</h1>
      <svg
        className="speedometer"
        width="250"
        height="250"
        viewBox="0 0 250 250"
      >
        <circle
          className="speedometer-bg"
          cx="125"
          cy="125"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth="20"
          fill="none"
          strokeDasharray={effectiveCircumference}
          strokeDashoffset={effectiveCircumference}
          strokeLinecap="round"
          transform={`rotate(${gapAngle / 2 - 45}, 125, 125)`} 
        />
        <circle
          className="speedometer-fg"
          cx="125"
          cy="125"
          r={radius}
          stroke="#00ff00"
          strokeWidth="20"
          fill="none"
          strokeDasharray={effectiveCircumference}
          strokeDashoffset={effectiveCircumference - offset}
          strokeLinecap="round"
          transform={`rotate(${gapAngle / 2 - 45}, 125, 125)`} 
        />
        {renderTicks()}
        <text
          className="speed-text"
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
        >{`${speed} km/h`}</text>
      </svg>
      <div>
        <input
          type="range"
          min="0"
          max="200"
          value={speed}
          onChange={handleSpeedChange}
          style={{ width: '80%' }}
        />
      </div>
    </div>
  );
};

export default CircularSpeedometer;
