import { useState } from "react"
import Alrajhi from '/alrajhi.svg'
import Alinma from '/alinma.svg'
import Sabb from '/Sab.svg'
import Snb from '/snb.svg'
import Bsf from '/bsf.svg'
import Anb from '/anb.svg'
import Riyb from '/riyb.svg'
import MobPay from '/mobilypay.svg'
import AlrajhiPage from "./AlrajhiPage";
import AlinmaPage from "./AlinmaPage";
import SabbPage from './SabbPage'
import SnbPage from "./SnbPage"
import BsfPage from "./BsfPage"
import AnbPage from "./AnbPage"
import RiyPage from "./RiyPage"
import MobilyPayPage from "./MobilyPayPage"
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfPrint from './PdfPrint';
import * as dataCards from '../assets/cards.json';
import DarkToggle from "./DarkMode"
import {
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
export default function TabsCho({price}){
const tabClass = (id) =>
  `inline-block px-4 py-2.5 rounded-base cursor-pointer
   hover:bg-neutral-secondary-soft
   ${activeTab === id ? "bg-green-500 text-white" : ""}`;

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
      };
      const canGeneratePdf = Number(price) > 0 && res.length > 0;

    return(
    <>
<ul className="justify-center flex flex-wrap text-sm font-medium text-center text-body">

        <li className="me-2">
        <a onClick={() => setActiveTab(1)} className={tabClass(1)}><img className="w-5" src={Alrajhi} alt="" /></a>
    </li>
    <li className="me-2">
        <a onClick={()=> setActiveTab(2)} className={tabClass(2)}><img className="w-5" src={Alinma} alt="" /></a>
    </li>
    <li className="me-2">
        <a onClick={()=> setActiveTab(3)} className={tabClass(3)}><img className="w-5" src={Sabb} alt="" /></a>
    </li>
    <li className="me-2">
        <a onClick={()=> setActiveTab(4)} className={tabClass(4)}><img className="size-14" src={Snb} alt="" /></a>
    </li>
    <li className="me-2">
        <a onClick={()=> setActiveTab(5)} className={tabClass(5)}><img className="w-5" src={Bsf} alt="" /></a>
    </li>
    <li className="me-2">
        <a onClick={()=> setActiveTab(6)} className={tabClass(6)}><img className="w-8" src={Anb} alt="" /></a>
    </li>
    <li className="me-2">
        <a onClick={()=> setActiveTab(7)} className={tabClass(7)}><img className="w-15" src={Riyb} alt="" /></a>
    </li>
    <li className="me-2">
        <a onClick={()=> setActiveTab(8)} className={tabClass(8)}><img className="w-5" src={MobPay} alt="" /></a>
    </li>


</ul>
    {activeTab === 1 && <AlrajhiPage price={price} onCalc={handleCalc}/>}
    {activeTab === 2 && <AlinmaPage price={price} onCalc={handleCalc}/>}
    {activeTab === 3 && <SabbPage price={price} onCalc={handleCalc}/>}
    {activeTab === 4 && <SnbPage price={price} onCalc={handleCalc}/>}
    {activeTab === 5 && <BsfPage price={price} onCalc={handleCalc}/>}
    {activeTab === 6 && <AnbPage price={price} onCalc={handleCalc}/>}
    {activeTab === 7 && <RiyPage price={price} onCalc={handleCalc}/>}
    {activeTab === 8 && <MobilyPayPage price={price} onCalc={handleCalc}/>}

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

      </CardFooter>



    </>
    )
}