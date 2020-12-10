import React, { useEffect, useRef, useState } from 'react';

function RingMeter ({ column, index, modifyColumn }) {
  const meterRef = useRef();
  const calcIntervalRef = useRef();
  const [inputOpen, setInputOpen] = useState(false);
  const [scoreInputValue, setScoreInputValue] = useState(column['overall-score'] || '');

  useEffect(() => {
    setScoreInputValue(column['overall-score']);
    if (scoreInputValue) {
      calcIntervalRef.current = setInterval(async () => {
        const calculationSuccess = await calculateCircle();
        if (calculationSuccess) clearInterval(calcIntervalRef.current);
      }, 100);
    }
  }, [column['overall-score']]);

  useEffect(() => {
    if (scoreInputValue && !inputOpen) calculateCircle();
  }, [meterRef.current, inputOpen]);

  async function calculateCircle () {
    if (meterRef.current) {
      const circle = meterRef.current;
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      circle.style.stroke = column.color;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;
      const offset = circumference - (scoreInputValue * 10) / 100 * circumference;
      circle.style.strokeDashoffset = offset;
      return true;
    } else {
      return false;
    }
  }

  function getColor () {
    return column.color || '0000FF';
  }

  async function submitScore (e) {
    e.preventDefault();
    modifyColumn('modify', index, { 'overall-score': scoreInputValue });
    setInputOpen(false);
  }

  return (
    <div className='row-item centered'>
      {inputOpen || !column['overall-score']
        ? (
          <form onSubmit={(e) => submitScore(e)}>
            <input type='number' min={0} max={10} step='any' value={scoreInputValue} onChange={(e) => setScoreInputValue(e.target.value)} />
          </form>)
        : (
          <>
            <div className='score-box' onClick={() => setInputOpen(true)}>{column['overall-score']}</div>
            <svg
              className='progress-ring'
              width='50'
              height='50'
            >
              <circle
                ref={meterRef}
                className='progress-ring__circle'
                stroke={'#' + getColor()}
                strokeWidth='4'
                fill={'#' + getColor() + '30'}
                r='17'
                cx='25'
                cy='25'
              />
            </svg>
          </>)}
    </div>
  );
}

export default RingMeter;
