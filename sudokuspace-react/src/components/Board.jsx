export default function Board({ grid, given, onChangeCell }) {
    return (
      <div className="container">
        <div className="board">
          {[0,1,2].map(br => [0,1,2].map(bc => ( 
            <div className="box" key={`${br}-${bc}`}>
                {[0,1,2].map(lr =>[0,1,2].map(lc => {
                  const r = br * 3 + lr;
                  const c = bc * 3 + lc;
                  return (
                  <input
                    className="cell"
                    maxLength={1}
                    key={`${r}-${c}`}
                    value={grid[r][c] || ''}
                    readOnly={given?.[r]?.[c]}
                    onChange={e => onChangeCell(r, c, e.target.value)}
                  />
                  );
                  })
                )}
            </div>
            ))
          )}
        </div>
      </div>
    );
  }
  