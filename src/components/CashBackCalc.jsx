import { useState , useEffect, useMemo} from "react"
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfPrint from '@/components/shared/PdfPrint';
import * as dataCards from '@/assets/CashBack.json';
import {CardFooter} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {Table,TableBody,TableCell,TableRow,} from "@/components/ui/table"
import {AlertDialog,AlertDialogAction,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { SaudiRiyalIcon,AlertCircleIcon, CheckCircle2Icon, PopcornIcon,ChevronDownIcon } from "lucide-react"
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
export function AlertDemo() {
  return (
    <div className="grid w-fit max-w-xl items-start gap-4 text-right">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>للعلم</AlertTitle>
        <AlertDescription>
          الحد بالكاش باك شهري يتجدد كل شهر
        </AlertDescription>
      </Alert>

    </div>
  )
}



export default function CashBackCalc(){
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
    return value || "غير محدود";
    }
    
  const [selectedCard, setSelectedCard] = useState(null);
  const value = Number(price);
  const [open, setOpen] = useState(false)
  const [activeBankKey, setActiveBankKey] = useState(null);
  const [calcResult, setCalcResult] = useState(null);
  const rules = selectedCard?.rules ?? {};
  const calcResultData = useMemo(()=>{
    if(!selectedCard || !value) return null;
    const applyCap = (value, cap) => {
    if (!cap) return value;
    return value > cap ? cap : value;
    };
    const cb = selectedCard.Cashback ?? {};
    const restaurantRate = cb.Restaurants ?? 0;
    const SuperMarketsRate = cb.SuperMarkets ?? 0;
    const OnlineStoresRate = cb.OnlineStores ?? 0;
    const GasStRate = cb.GasSt ?? 0;
    const PharRate = cb.Phar ?? 0;
    const EduRate = cb.Edu ?? 0;
    const TravelRate = cb.Travel ?? 0;
    let SuperMarkets = value * SuperMarketsRate;
    let restaurants = value * restaurantRate;
    let OnlineStores = value * OnlineStoresRate;
    let GasSt = value * GasStRate;
    let Phar = value * PharRate;
    let IssuanceFee = selectedCard?.IssuanceFee;
    let AnnualFee = selectedCard?.AnnualFee;
    let ProfitRate = selectedCard?.ProfitRate;
    let ForeignFee = selectedCard?.ForeignFee;
    let AirPortJoin = selectedCard?.AirPortJoin;
    let Edu = value * EduRate;
    let Travel = value * TravelRate;
    let MTTI = selectedCard?.MTTI;
    let LocalPay = value && selectedCard?.Cashback.LocalPay ? Number((value * selectedCard.Cashback.LocalPay).toFixed(2)) : 0;
    let InterPay = value && selectedCard?.Cashback.InterPay ? Number((value * selectedCard.Cashback.InterPay).toFixed(2)) : 0;
    let TotalPayment = SuperMarkets + restaurants + OnlineStores + LocalPay + InterPay;

    const cap = selectedCard.cap ?? null;
    const tiers = selectedCard?.Tiers
    ? Object.values(selectedCard.Tiers)
    :[];
    const activeTier = tiers
    .filter(t => value >= t.Amount)
    .sort((a,b) => b.Amount - a.Amount)[0];
    let onlinepayCap = selectedCard.onlinepayCap ?? null;
    let Gascap = selectedCard.Gascap ?? null;
    let MonthCap = selectedCard.MonthCap ?? null;
    let SuperMarketCap = selectedCard.SuperMarketCap ?? null;
    let Rescap = selectedCard.Rescap ?? null;
    let PharCap = selectedCard.PharCap ?? null;
    if(rules.isRajhi && + LocalPay + InterPay + restaurants + SuperMarkets + OnlineStores > 500){
    restaurants = applyCap(value * restaurants, Rescap);
    LocalPay = applyCap(value * LocalPay, cap);
    InterPay = applyCap(value * InterPay, cap);
    SuperMarkets = applyCap(value * SuperMarkets, SuperMarketCap);
    OnlineStores = applyCap(value * OnlineStores, onlinepayCap);
}
    if(rules.isSNB && + LocalPay + InterPay + restaurants + SuperMarkets + OnlineStores > 500){
    restaurants = applyCap(value * restaurants, Rescap);
    LocalPay;
    InterPay;
    SuperMarkets = applyCap(value * SuperMarkets, cap);
    GasSt = applyCap(value * GasSt, Gascap);
    Phar = applyCap(value * Phar, PharCap);
}
    if(rules.isBSF && + LocalPay + InterPay + restaurants + SuperMarkets + Travel > 500){
    restaurants = applyCap(value * restaurants, cap);
    LocalPay;
    InterPay;
    SuperMarkets = applyCap(value * SuperMarkets, cap);
    Phar = applyCap(value * Phar, cap);
    Edu = applyCap(value * Edu , cap);
    Travel = applyCap(value * Travel , cap);
}
    if (rules.useTiers && activeTier) {
        restaurants= value * (activeTier.restaurants ?? activeTier.Restaurants);
        Rescap ? restaurants = applyCap(value * restaurants, Rescap) : ""
        LocalPay = value * (activeTier.LocalPay);
        InterPay = value * (activeTier.InterPay);
        SuperMarkets=value * (activeTier.SuperMarkets ?? activeTier.SuperMarkets);
        SuperMarketCap ? SuperMarkets = applyCap(value * SuperMarkets, SuperMarketCap) : ""
        GasSt=value * (activeTier.GasSt ?? activeTier.GasSt);
        Gascap ? GasSt = applyCap(value * GasSt, Gascap) : ""
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
        Gascap,
        Edu,
        Travel,
        LocalPay: Number(LocalPay.toFixed(2)),
        InterPay: Number(InterPay.toFixed(2)),
        IssuanceFee,
        AnnualFee,
        ProfitRate,
        ForeignFee,
        MonthCap,
        TotalPayment,
        AirPortJoin,
        MTTI
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
const [showAlert, setShowAlert] = useState(false);
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
    <br />
    <div className="p-1">
    {showAlert && calcResult.Restaurant > 0 && <AlertDemo/>}
    </div>
    <CountUp from={0} to={calcResult.LocalPay ? calcResult.LocalPay : 0} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك محلي 🇸🇦<br/>
    <CountUp from={0} to={calcResult.InterPay ? calcResult.InterPay : calcResult.LocalPay} separator="" direction="up" duration={0.1} className="count-up-text"/> كاش باك دولي ✈️<br />
   {calcResult.Restaurant > 0 && (
            <>
    <CountUp from={0} to={calcResult.Restaurant} separator="" direction="up" onEnd={()=> setShowAlert(true)} duration={0.1} className="count-up-text"/> كاش باك مطاعم 🍔 <br />
  </>
  
)}
 
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
          <TableRow>
            <TableCell className="font-medium">الحد الشهري للكاش باك</TableCell>
            <TableCell className="text-right">{SRI(calcResult.MonthCap)}</TableCell>
            {!selectedCard?.CashBackInfo ? "" : <>
            <TableCell className="font-medium">فئات الكاش باك</TableCell>
            <TableCell className="text-right">{selectedCard?.CashBackInfo}</TableCell>
            </>}
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


    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="mt-2.5">عرض مزايا البطاقة</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selectedCard?.label}</AlertDialogTitle>
          <AlertDialogDescription>
      <Table>
      <TableBody>
          <TableRow>
      <TableCell className="font-medium">الدخول لصالات المطارات</TableCell>
      <TableCell className="text-right">
        {!calcResult.AirPortJoin ? "لايوجد" : `${calcResult.AirPortJoin} صالة`}
      </TableCell>
      <TableCell className="font-medium">تأمين السفر</TableCell>
      <TableCell className="text-right">
        {!calcResult.MTTI ? "لايوجد" : calcResult.MTTI}
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