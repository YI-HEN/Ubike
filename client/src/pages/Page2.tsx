import { useState } from 'react';

export default function Page2() {

    const [gift, setGift] = useState({
        "1獎": 1,
        "2獎": 1,
        "3獎": 2,
        "4獎": 5,
        "5獎": 11
    });

    const [state, setState] = useState('');

    const draw = () => {
        let randomValue = Math.random();

        if (randomValue <= 0.001 && gift['1獎'] > 0) {
            setGift(prev => ({ ...prev, "1獎": prev['1獎'] - 1 }));
            setState("抽到1號獎");
        } else if (randomValue <= 0.023 && gift['2獎'] > 0) {
            setGift(prev => ({ ...prev, "2獎": prev['2獎'] - 1 }));
            setState("抽到2號獎");
        } else if (randomValue <= 0.13 && gift['3獎'] > 0) {
            setGift(prev => ({ ...prev, "3獎": prev['3獎'] - 1 }));
            setState("抽到3號獎");
        } else if (randomValue <= 0.18 && gift['4獎'] > 0) {
            setGift(prev => ({ ...prev, "4獎": prev['4獎'] - 1 }));
            setState("抽到4號獎");
        } else if (randomValue <= 0.25 && gift['5獎'] > 0) {
            setGift(prev => ({ ...prev, "5獎": prev['5獎'] - 1 }));
            setState("抽到5號獎");
        } else {
            setState("未中獎");
        }
    }

    const trans = () => JSON.stringify(gift, null, 2);

    return (
        <div>
            <button onClick={draw}>抽獎</button>
            <div>{state},目前尚未抽取的獎勵為 {trans()}</div>
        </div>
    )
}
