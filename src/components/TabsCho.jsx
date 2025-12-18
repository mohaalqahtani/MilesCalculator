import { useState } from "react"
import Alrajhi from '/alrajhi.svg'
import Alinma from '/alinma.svg'
import Sabb from '/Sab.svg'
import Snb from '/snb.svg'
import Bsf from '/bsf.svg'
import Anb from '/anb.svg'
import Riyb from '/riyb.svg'
import MobPay from '/mobilypay.svg'
import AlrajhiPage from "@/components/AlrajhiPage";
import AlinmaPage from "@/components/AlinmaPage";
import SabbPage from '@/components/SabbPage'
import SnbPage from "@/components/SnbPage"
import BsfPage from "@/components/BsfPage"
import AnbPage from "@/components/AnbPage"
import RiyPage from "@/components/RiyPage"
import MobilyPayPage from "@/components/MobilyPayPage"
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfPrint from '@/components/PdfPrint';
import * as dataCards from '@/assets/cards.json';
import {CardFooter} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Table,TableBody,TableCell,TableRow,} from "@/components/ui/table"
import {AlertDialog,AlertDialogAction,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { SaudiRiyalIcon } from "lucide-react"
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
export default function TabsCho({price}){
    const [selectedCard, setSelectedCard] = useState(null);
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
    const [activeTab, setActiveTab] = useState(0);
      const [res, setRes] = useState([]);
      const handleCalc = (data) =>{
        setRes(prev =>{
            const filtered = prev.filter(
                r => !(r.bank === data.bank && r.card === data.card)
            );
            return [...filtered, data];
        });
          setSelectedCard(data);
      };
      const canGeneratePdf = Number(price) > 0 && res.length > 0;
    return(
    <>
 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">اختيار بنك</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>قائمة البنوك</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()=> setActiveTab(1)}>
            الراجحي
            <DropdownMenuShortcut><img className="w-5" src={Alrajhi} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setActiveTab(2)}>
            الانماء
            <DropdownMenuShortcut><img className="w-5" src={Alinma} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setActiveTab(3)}>
            ساب
            <DropdownMenuShortcut><img className="w-5" src={Sabb} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setActiveTab(4)}>
            الاهلي
            <DropdownMenuShortcut><img className="w-5" src={Snb} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setActiveTab(5)}>
            الفرنسي
            <DropdownMenuShortcut><img className="w-5" src={Bsf} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
            <DropdownMenuItem onClick={()=> setActiveTab(6)}>
           العربي
            <DropdownMenuShortcut><img className="w-8" src={Anb} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setActiveTab(7)}>
            الرياض
            <DropdownMenuShortcut><img className="w-5" src={Riyb} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setActiveTab(8)}>
            موبايلي باي
            <DropdownMenuShortcut><img className="w-5" src={MobPay} alt="" /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <br /><br />
    {activeTab === 1 && <AlrajhiPage price={price} onCalc={handleCalc}/>}
    {activeTab === 2 && <AlinmaPage price={price} onCalc={handleCalc}/>}
    {activeTab === 3 && <SabbPage price={price} onCalc={handleCalc}/>}
    {activeTab === 4 && <SnbPage price={price} onCalc={handleCalc}/>}
    {activeTab === 5 && <BsfPage price={price} onCalc={handleCalc}/>}
    {activeTab === 6 && <AnbPage price={price} onCalc={handleCalc}/>}
    {activeTab === 7 && <RiyPage price={price} onCalc={handleCalc}/>}
    {activeTab === 8 && <MobilyPayPage price={price} onCalc={handleCalc}/>}
    <br />
    <CardFooter className="flex-col gap-2">
        {canGeneratePdf &&
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
      }
      {canGeneratePdf && 
       <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">عرض تفاصيل البطاقة</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selectedCard?.label}</AlertDialogTitle>
          <AlertDialogDescription>
  <Table>
      <TableBody>
          <TableRow>
            <TableCell className="font-medium">رسوم الاصدار</TableCell>
            <TableCell className="text-right">{SRI(selectedCard?.IssuanceFee)}</TableCell>
            <TableCell className="font-medium">الرسوم السنوية</TableCell>
            <TableCell className="text-right">{SRI(selectedCard?.AnnFee)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">معدل الربح</TableCell>
            <TableCell className="text-right">
                {typeof selectedCard?.ProRate === "number" ? `${selectedCard?.ProRate}%` : selectedCard?.ProRate || ""}
            </TableCell>
            <TableCell className="font-medium">نسبة الدفع الدولي</TableCell>
            <TableCell className="text-right">
                {typeof selectedCard?.ForeignFee === "number" ? `${selectedCard?.ForeignFee}%` : selectedCard?.ForeignFee || ""}
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
    }
      </CardFooter>
    </>
    )
}