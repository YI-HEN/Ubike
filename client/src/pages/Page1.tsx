import React, { useState } from 'react';

export default function Page1 () {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<number>(0);

    const calc = () => {
        let sum = 1;
        let num = +input;
        if (isNaN(num) || num<=0) {
            setResult(0);
            alert("請輸入正確數字")
        }
        if (num === 1) setResult(1);
        for (let i = 2; i<=num; i++){
            let j = i;
            if(i%2 !== 0){
                j *= -1;
            }
            sum += j;
        }
        setResult(sum);
    }

    return (
        <div>
            <input placeholder='請輸入數字' onChange={(e) => setInput(e.target.value)}></input>
            <button onClick={calc}>計算</button>
            <div>{result}</div>
        </div>
    )
}