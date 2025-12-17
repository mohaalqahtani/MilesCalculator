import { useEffect, useState } from 'react';
import * as dataCards from '../assets/cards.json'
import CountUp from './CountUp'

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function RiyPage({price, onCalc}){
    const [open, setOpen] = useState(false)
    const [card, setCard] = useState(null);
    const cards = dataCards.riy.cards;
    const value = Number(price);
    const localcal = value && card?.localcals ? Number((value / card?.localcals).toFixed(2)) : 0;
    const intercal = value && card?.intercals ? Number((value / card?.intercals).toFixed(2)) : 0;
    useEffect(()=>{
        if(card && value){
            onCalc({
                bank: "الرياض",
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
     <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-52 justify-between"
      >
      {card ? card.label : "اختر البطاقة"}
      <ChevronsUpDown className="opacity-50" />
      </Button>

      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="ابحث بأسم البطاقة" className="h-9" />
          <CommandList>
            <CommandEmpty>لاتوجد بطاقة</CommandEmpty>
            <CommandGroup>
            {cards.map((item) => (
            <CommandItem
            key={item.label}
            value={item.label}
            onSelect={() => {
            setCard(item)
            setOpen(false)
            }}
            >
            {item.label}
            <Check
            className={cn(
            "ml-auto",
            card?.label === item.label ? "opacity-100" : "opacity-0"
            )}
            />
          </CommandItem>
          ))}

            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
                <p>{card?.label}</p>
                <img className='w-20 m-auto' src={card?.img} alt="" />
                <CountUp from={0} to={localcal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل محلي <br/>
                <CountUp from={0} to={intercal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل دولي 
            </li>
        </ul>
        </>
    )

}