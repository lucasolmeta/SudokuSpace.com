import { useState } from 'react';
import { buildSudoku, initArray } from '../engine/generation.js';
import Board from './Board.jsx';

const emptyGrid = initArray();

export default function SudokuGame() {

  // Current visible board, calling setGrid redraws the 81 cells
  // setGrid generated automatically by React to update grid

  const [grid, setGrid] = useState(initArray());

  // Correct completed board, calling setSolution doesn't affect rendering directly

  const [solution, setSolution] = useState(initArray());

  // Marks which cells are fixed at start, used to disable editing

  const [given, setGiven] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );

  // Marks which cells are empty

  const emptyStatus = () => Array.from({ length: 9 }, () => Array(9).fill(''));
  const [status, setStatus] = useState(emptyStatus());

  function generate() {
    const { puzzle, solution } = buildSudoku();
    setGrid(puzzle);
    setSolution(solution);
    setGiven(puzzle.map(row => row.map(v => v !== 0)));
  }

  function check() {
    setStatus(prev => {
      const next = prev.map(row => row.slice());
  
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (given[r][c]) continue;
          if (grid[r][c] === 0) continue;
  
          next[r][c] = (grid[r][c] === solution[r][c]) ? 'correct' : 'wrong';
        }
      }
      return next;
    });
  }

  function onChangeCell(r, c, raw) {
    const v = raw.replace(/[^1-9]/g, '');
    setGrid(g => {
      const next = g.map(row => row.slice());
      next[r][c] = v === '' ? 0 : Number(v);
      return next;
    });
  }

  return (
    <>
      <Board grid={grid} given={given} status={status} onChangeCell={onChangeCell} />
      
      <div className="container">
        <button onClick={generate}>Generate</button>
        <button onClick={check}>Check</button>
      </div>
    </>
  );
}
