import { useState } from 'react'
import './App.css'
import TabsCho from './components/tabsCho';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import DarkToggle from './components/DarkMode';
function App() {
  const [price,setPrice] = useState("");
  const MAX_VALUE = 1000000;
  return (
    <>
    <Card className="w-full max-w-sm justify-center">
      <CardHeader>
                  <DarkToggle/>
      <Input type="number" className='w-30 m-auto' value={price} id="price" placeholder='ادخل المبلغ' onChange={(e)=>{const val = e.target.value;if(val === ""){setPrice("");return;}if(Number(val) <= MAX_VALUE){setPrice(val);}}} required />
      </CardHeader>
      <CardContent>
    <TabsCho price={price}/>
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>أخلاء مسؤولية</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
           الصفحة لاتقدم نصائح ولا اختيار فقط عرض بيانات البطاقات ومزاياها والاختيار بناء على احتياجك ,
          </p>
          <p>
            لذلك الصفحة ومطورها يخلون مسؤوليتهم حول ما يحدث .
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you&apos;re not completely satisfied, simply return the
            item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      </CardContent>
      
    </Card>
  
    </>
  )

}
export default App
