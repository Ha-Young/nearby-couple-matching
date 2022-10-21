import { useState } from 'react';
import './App.css';

const MOCK = {
  '로크': '데니스',
  '데니스': '로크',
  '피터': '로크',
  '스티븐': '리나',
  '메이슨': '스티븐',
  '리나': '메이슨',
}

function App() {
  // const AppRef = useRef(null);

  const [writeInput, setWriteInput] = useState('');
  const [targetInput, setTargetInput] = useState('');

  const [voteResult, setVoteResult] = useState({});

  const handleVoteClick = async (e) => {
    const writer =writeInput
    const targeter = targetInput

    const nextVoteResult = {
      ...voteResult,
      [writer]: targeter
    }

    setWriteInput('')
    setTargetInput('')

    setVoteResult(nextVoteResult)
  }

  const handleVoteEndClick = (e) => {
    let cnt = 0;
    let matchingTable = {}

    for (const writer of Object.keys(voteResult)) {
      const target = voteResult[writer]

      const targetOfTarget = voteResult[target]

      if (writer === targetOfTarget) {
        if (!(writer in matchingTable) && !(target in matchingTable)) {
          matchingTable = {
            ...matchingTable,
            [writer]: target,
            [target]: writer
          }

          cnt++;
        }
      }
    }

    if (cnt === 2) {
      let set = new Set()
      for (const writer of Object.keys(matchingTable)) {
        const key = writer
        const value = matchingTable[writer]
        set.add(key > value ? `${key} ${value}` : `${value} ${key}`)
      }
      const result = [ ]
      for (const pair of set) {
        const [a, b] = pair.split(' ')
        result.push(Math.random() > 0.5 ? a : b)
      }

      return alert(`투표종료 ${JSON.stringify(result)}`)
    }

    console.log(JSON.stringify(voteResult));
    alert(`매칭 실패, 매칭된 커플은 ${cnt === 0 ? '없습니다.' : `${cnt}쌍 입니다.`}`)

    setVoteResult({})
  }

  return (
    <div className="App" >
      <div className='form'>
        <div className="inputSet">
          <label className="label">투표자: </label>
          <input className='input writer' placeholder='본인 이름' onChange={(e) => {setWriteInput(e.target.value)}} value={writeInput}/>
        </div>
        <div className="inputSet">
          <label className="label">타겟: </label>
          <input className='input target' placeholder='원하는 사람의 이름' onChange={(e) => {setTargetInput(e.target.value)}} value={targetInput}/>
        </div>
        <div className="buttonSet">
          <button className='button' onClick={handleVoteClick}>투표하기</button>
          <button className='button' onClick={handleVoteEndClick}>투표종료</button>
        </div>
      </div>

    </div>
  );
}

export default App;
