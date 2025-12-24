import { useState , useEffect, useMemo} from "react"
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfPrint from '@/components/shared/PdfPrint';
import * as dataCards from '@/assets/CashBack.json';
import {CardFooter} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {Table,TableBody,TableCell,TableRow,} from "@/components/ui/table"
import {AlertDialog,AlertDialogAction,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { SaudiRiyalIcon } from "lucide-react"
import CountUp from '@/components/shared/CountUp'
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
import { Input } from "@/components/ui/input"

import Accordions from '@/components/shared/Accordions';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import DarkToggle from '@/components/shared/DarkMode';


export default function CashBackCalc(){
//    dataCards.bsf.cards.forEach(card =>{
//     card.Cashback.forEach(cb =>{
//         console.log(cb)
//     })
//    })
//    Object.entries(dataCards.default).forEach(([_, cards]) =>{
//     console.log(cards.cards)
//    })
  const [price,setPrice] = useState("");
  const MAX_VALUE = 1000000;
  const frasan = "الفرسان"
    const SRI = (value) =>{
    if(typeof value === "number"){
        return(
            <span className="flex items-center gap-1">
                {value}
                <SaudiRiyalIcon size={19}/>
            </span>
        )
    }
    return value || "غير معلوم";
    }
  const [selectedCard, setSelectedCard] = useState(null);
  const value = Number(price);
  const [open, setOpen] = useState(false)
  const [activeBankKey, setActiveBankKey] = useState(null);
  const [calcResult, setCalcResult] = useState(null);
  const calcResultData = useMemo(()=>{
    if(!selectedCard || !value) return null;
    const cb = selectedCard.Cashback ?? {};
    const restaurantRate = cb.Restaurants ?? 0;
    const SuperMarketsRate = cb.SuperMarkets ?? 0;
    const OnlineStoresRate = cb.OnlineStores ?? 0;
    const cap = selectedCard.cap ?? null;
    let onlinepayCap = selectedCard.onlinepayCap ?? null;
    const GasStRate = cb.GasSt ?? 0;
    const PharRate = cb.Phar ?? 0;
    let SuperMarkets = value * SuperMarketsRate;
    let restaurants = value * restaurantRate;
    let OnlineStores = value * OnlineStoresRate;
    let GasSt = value * GasStRate;
    let Phar = value * PharRate;
    let IssuanceFee = selectedCard?.IssuanceFee;
    let AnnualFee = selectedCard?.AnnualFee;
    let ProfitRate = selectedCard?.ProfitRate;
    let ForeignFee = selectedCard?.ForeignFee;
    let LocalPay = value && selectedCard?.Cashback.LocalPay ? Number((value * selectedCard.Cashback.LocalPay).toFixed(2)) : 0;
    let InterPay = value && selectedCard?.Cashback.InterPay ? Number((value * selectedCard.Cashback.InterPay).toFixed(2)) : 0;
    // const percent = selectedCard?.Tiers ?? [];
    // const percents = percent.reduce((acc, tier) => {
    //     if(value >= tier.min){
    //         return tier.percent;
    //     }
    //     return acc;
    // }, 0)
    // console.log(percents)
    if(cap){
        if(restaurants > cap){
            restaurants = cap;
        }
        if(SuperMarkets > cap){
            SuperMarkets = cap;
        }
        if(OnlineStores > onlinepayCap){
            OnlineStores = onlinepayCap;
        }
        if(GasSt > cap){
            GasSt = cap;
        }
        if(Phar > cap){
            Phar = cap;
        }
        if(LocalPay > cap){
            LocalPay = cap;
        }
        if(InterPay > cap){
            InterPay = cap;
        }
    }
    return{
        card: selectedCard,
        value,
        Restaurant: Number(restaurants.toFixed(2)),
        SuperMarkets: Number(SuperMarkets.toFixed(2)),
        OnlineStores: Number(OnlineStores.toFixed(2)),
        GasSt: Number(GasSt.toFixed(2)),
        Phar: Number(Phar.toFixed(2)),
        cap,
        LocalPay,
        InterPay,
        IssuanceFee,
        AnnualFee,
        ProfitRate,
        ForeignFee
    }  
  }, [selectedCard,value])

useEffect(() => {
  setCalcResult(calcResultData);
}, [calcResultData]);

useEffect(() => {
  setSelectedCard(null);
  setCalcResult(null);
}, [activeBankKey]);
  const activeBank = activeBankKey
  ? dataCards.default[activeBankKey]
  : null;

    const calcAllBanks = (price) =>{
        const value = Number(price);
        if(!value) return[];
        const result = [];
    Object.entries(dataCards.default).forEach(([bankKey, bankData]) => {
        bankData.cards.forEach(card =>{
            result.push({
                bank: bankData.name,
                card: card.label,
                localcal: card.localcals ? Number((value / card.localcals).toFixed(2)) : 0,
                intercal: card.intercals ? Number((value / card.intercals).toFixed(2)) : 0,
            })
        })
    })
    return result;
    }
// if (selectedCard) {
//   console.log(selectedCard.Cashback);
// }

    return(
    <>
        <Card className="w-full max-w-sm justify-center">
      <CardHeader>
              <DarkToggle/>
      </CardHeader>
       <Input type="number" className='w-30 m-auto' value={price} id="price" placeholder='ادخل المبلغ' onChange={(e)=>{const val = e.target.value;if(val === ""){setPrice("");return;}if(Number(val) <= MAX_VALUE){setPrice(val);}}} required />
      <CardContent>
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      {activeBankKey
        ? dataCards.default[activeBankKey].name
        : "اختيار بنك"}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>قائمة البنوك</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      {Object.entries(dataCards.default).filter(([_, bank]) => 
      bank.cards.some(card=> !card.label.includes(frasan))).map(([key, bank]) => (
        <DropdownMenuItem
          key={key}
          onClick={() => setActiveBankKey(key)}
          className="cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span>{bank.name}</span>
            <img src={bank.logo} className="w-5" />
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
   <br />
   {activeBank && (
        <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button
        disabled={!activeBank}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between mt-3"
        > {selectedCard ? selectedCard.label : "اختر بطاقة"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="ابحث بأسم البطاقة" className="h-9" />
          <CommandList>
            <CommandEmpty>لاتوجد بطاقة</CommandEmpty>
            <CommandGroup>
              {activeBank?.cards.filter(card => !card.label.includes(frasan)).map(card =>(
                <CommandItem
                  key={card.label}
                  value={card.label}
                  onSelect={() => {
                    setSelectedCard(card)
                    setOpen(false)
                  }}
                >
                  {card.label}
                  <img src={card.img} className="w-20 m-auto" alt="" />
                <Check
                className={cn(
                "ml-auto",
                selectedCard?.label === card.label
                ? "opacity-100"
                : "opacity-0"
                )}
                />
                </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
)}
{calcResult && (
  <>
    <br /><br />
    <CountUp from={0} to={calcResult.LocalPay ? calcResult.LocalPay : 0} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك محلي 🇸🇦<br/>
    <CountUp from={0} to={calcResult.InterPay ? calcResult.InterPay : calcResult.LocalPay} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك دولي ✈️<br />
   {calcResult.Restaurant > 0 && (
  <>
    <CountUp from={0} to={calcResult.Restaurant} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك مطاعم 🍔 <br />
  </>)}
{calcResult.SuperMarkets > 0 && (
  <>
    <CountUp from={0} to={calcResult.SuperMarkets} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك الماركت 🛒 <br />
  </>)}
{calcResult.OnlineStores > 0 && (
  <>
    <CountUp from={0} to={calcResult.OnlineStores} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك الاون لاين 🌐 <br />
  </>)}
{calcResult.GasSt > 0 && (
  <>
    <CountUp from={0} to={calcResult.GasSt} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك البنزين ⛽ <br />
  </>)}
{calcResult.Phar > 0 && (
  <>
    <CountUp from={0} to={calcResult.Phar} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك الصيدلية ⚕️ <br />
  </>)}
{calcResult.Travel > 0 && (
  <>
    <CountUp from={0} to={calcResult.Travel} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك بوكنق 🏨 <br />
  </>)}
{calcResult.Edu > 0 && (
  <>
    <CountUp from={0} to={calcResult.Edu} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك التعليم 📖 <br />
  </>)}
{calcResult.gamerspay > 0 && (
  <>
    <CountUp from={0} to={calcResult.gamerspay} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك الالعاب 🎮 <br />
  </>)}

    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="mt-2.5">عرض تفاصيل البطاقة</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selectedCard?.label}</AlertDialogTitle>
          <AlertDialogDescription>
  <Table>
      <TableBody>
          <TableRow>
      <TableCell className="font-medium">رسوم الاصدار</TableCell>    
      <TableCell className="text-right">
        {SRI(calcResult.IssuanceFee)}
      </TableCell>

      <TableCell className="font-medium">الرسوم السنوية</TableCell>
      <TableCell className="text-right">
        {SRI(calcResult.AnnualFee)}
      </TableCell>
          </TableRow>
          <TableRow>
      <TableCell className="font-medium">معدل الربح</TableCell>
      <TableCell className="text-right">
        {typeof calcResult.ProfitRate === "number"
        ? `${calcResult.ProfitRate}%`
        : calcResult.ProfitRate || ""}
      </TableCell>
      
      <TableCell className="font-medium">نسبة الدفع الدولي</TableCell>
      <TableCell className="text-right">
        {typeof calcResult.ForeignFee === "number"
        ? `${calcResult.ForeignFee}%`
        : calcResult.ForeignFee || ""}
      </TableCell>
          </TableRow>
      </TableBody>

      </Table>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>اغلاق</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <CardFooter className="flex-col gap-2 mt-2.5">
        {/* <Button type="submit" className="w-fit">
        <PDFDownloadLink
          document={<PdfPrint price={price} data={calcAllBanks(price)} />}
          fileName="alfursan-result.pdf"
        >
          {({ loading }) =>
            loading ? "جاري تجهيز الملف..." : "تحميل PDF"
          }
        </PDFDownloadLink>
         </Button> */}
      </CardFooter>
      </>)}
    <DropdownMenuSeparator className="mt-5"/>
    <Accordions/>
      </CardContent>
    </Card>

    </>
    )
}