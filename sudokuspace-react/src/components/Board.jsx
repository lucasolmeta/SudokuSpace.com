export default function Board({ grid, given, status, onChangeCell }) {
    return (
      <div className="container">
        <div className="board">
          {[0,1,2].map(br => [0,1,2].map(bc => ( 
            <div className="box" key={`${br}-${bc}`}>
                {[0,1,2].map(lr =>[0,1,2].map(lc => {
                  const r = br * 3 + lr;
                  const c = bc * 3 + lc;

                  const st = status?.[r]?.[c];

                  return (
                    <input
                      className={`cell ${given?.[r]?.[c] ? 'given' : ''} ${st || ''}`}
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
  