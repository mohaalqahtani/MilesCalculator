import { useState, useEffect } from 'react';
import * as dataCards from '@/assets/cards.json'
import CardSelect from '@/components/CardSelect';
import CountUp from '@/components/CountUp'

export default function SabbPage({price, onCalc}){
    const [card, setCard] = useState(null);
    const cards = dataCards.sabb.cards;
    const value = Number(price);
    const localcal = value && card?.localcals ? Number((value / card?.localcals).toFixed(2)) : 0;
    const intercal = value && card?.intercals ? Number((value / card?.intercals).toFixed(2)) : 0;
    const IssFee = card?.IssuanceFee;
    const AnnFee = card?.AnnualFee;
    const ProRate = card?.ProfitRate;
    const ForeignFee = card?.ForeignFee;
        useEffect(()=>{
            if(card && value){
                onCalc({
                    bank: "ساب",
                    card: card.label,
                    localcal,
                    intercal,
                    IssFee,
                    AnnFee,
                    ProRate,
                    ForeignFee
                });
            }
        },[card,value]);
    return(
        <>
        <ul className=" text-sm font-medium text-center text-body">
            <li>
          <CardSelect cards={cards} value={card} onChange={setCard}/>
          <br />
          <br />
                <CountUp from={0} to={localcal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل محلي 🇸🇦<br/>
                <CountUp from={0} to={intercal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل دولي ✈️
            </li>
        </ul>
        </>
    )

}