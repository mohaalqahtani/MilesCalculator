import { useState, useEffect } from 'react';
import * as dataCards from '../assets/cards.json'
import CardSelect from './CardSelect';
import CountUp from './CountUp'

const cards = dataCards.alinma.cards;
export default function AlinmaPage({price, onCalc}){
    const [card, setCard] = useState(null);
    const value = Number(price);
    const localcal = value && card?.localcals ? Number((value / card.localcals).toFixed(2)) : 0;
    const intercal = value && card?.intercals ? Number((value / card.intercals).toFixed(2)) : 0;
        useEffect(()=>{
            if(card && value){
                onCalc({
                    card: card.label,
                    localcal,
                    intercal,
                });
            }
        },[card,value]);
    return(
        <>
        <ul className=" text-sm font-medium text-center text-body">
            <li>
            <CardSelect cards={cards} value={card} onChange={setCard}/>
                <p>{card?.label}</p>
                <img className='w-20 m-auto' src={card?.img} alt="" />
                <CountUp from={0} to={localcal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل محلي <br/>
                <CountUp from={0} to={intercal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل دولي 

            </li>
        </ul>
        </>
    )

}