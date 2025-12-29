import { useState } from 'react';
import Board from './Board';
import { buildSudoku, initArray } from '../engine/sudoku';

const emptyGrid = initArray();

export default function SudokuGame() {

  // Current visible board, calling setGrid redraws the 81 cells
  // setGrid generated automatically by React to update grid

  const [grid, setGrid] = useState(emptyGrid());

  // Correct completed board, calling setSolution doesn't affect rendering directly

  const [solution, setSolution] = useState(emptyGrid());

  // Marks which cells are fixed at start, used to disable editing

  const [given, setGiven] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );

  function generate() {
    const { puzzle, solution } = buildSudoku();
    setGrid(puzzle);
    setSolution(solution);
    setGiven(puzzle.map(row => row.map(v => v !== 0)));
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
      <Board grid={grid} given={given} onChangeCell={onChangeCell} />
      <button onClick={generate}>Generate</button>
    </>
  );
}
