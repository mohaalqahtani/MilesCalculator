import { useState , useEffect, useMemo} from "react"
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfPrint from '@/components/shared/PdfPrint';
import * as dataCards from '@/assets/cards.json';
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

export default function TabsCho({price , onCalc}){
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
    return{
    card : selectedCard,
    value : Number(price),
    localcal : value && selectedCard?.localcals ? Number((value / selectedCard.localcals).toFixed(2)) : 0,
    intercal : value && selectedCard?.intercals ? Number((value / selectedCard.intercals).toFixed(2)) : 0,
    IssFee : selectedCard?.IssuanceFee,
    AnnFee : selectedCard?.AnnualFee,
    ProRate : selectedCard?.ProfitRate,
    ForeignFee : selectedCard?.ForeignFee,
    };
  }, [selectedCard,value])
useEffect(() => {
  setCalcResult(calcResultData);
  onCalc?.(calcResultData);
}, [calcResultData]);

useEffect(() => {
  setSelectedCard(null);
  setCalcResult(null);
  onCalc?.(null);
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

    return(
    <>
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
      {Object.entries(dataCards.default).map(([key, bank]) => (
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
          className="w-52 justify-between mt-3"
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
              {activeBank?.cards.map(card =>(
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
    <CountUp from={0} to={calcResult.localcal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل محلي 🇸🇦<br/>
    <CountUp from={0} to={calcResult.intercal} separator="" direction="up" duration={0.1} className="count-up-text"/> ميل دولي ✈️<br />
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
        {SRI(calcResult.IssFee)}
      </TableCell>

      <TableCell className="font-medium">الرسوم السنوية</TableCell>
      <TableCell className="text-right">
        {SRI(calcResult.AnnFee)}
      </TableCell>
          </TableRow>
          <TableRow>
      <TableCell className="font-medium">معدل الربح</TableCell>
      <TableCell className="text-right">
        {typeof calcResult.ProRate === "number"
        ? `${calcResult.ProRate}%`
        : calcResult.ProRate || ""}
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
        <Button type="submit" className="w-fit">
        <PDFDownloadLink
          document={<PdfPrint price={price} data={calcAllBanks(price)} />}
          fileName="alfursan-result.pdf"
        >
          {({ loading }) =>
            loading ? "جاري تجهيز الملف..." : "تحميل PDF"
          }
        </PDFDownloadLink>
         </Button>
      </CardFooter>
      </>)}
    </>
    )
}