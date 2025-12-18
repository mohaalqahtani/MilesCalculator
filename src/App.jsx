import { useState } from 'react'
import '@/App.css'
import TabsCho from '@/components/tabsCho';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import DarkToggle from '@/components/DarkMode';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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
    <br />
    <DropdownMenuSeparator/>
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-0"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>أخلاء مسؤولية</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
           الصفحة لاتقدم نصائح ولا اختيار فقط عرض بيانات البطاقات ومزاياها والاختيار بناء على احتياجك وتعتبر ارقام تقريبية فقط ,
          </p>
          <p>
            لذلك الصفحة ومطورها يخلون مسؤوليتهم حول ما يحدث .
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>المصادر</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
           مصدر الارقام من مواقع البنوك الرسمية
          </p>
          <p>
            مصدر الخط من موقع 
                <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" >كتيب</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9XSdU9k7hbtF9r609R5kvt-eCYx25z_L04w&s" />
            <AvatarFallback>kotype</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">كتيب</h4>
            <p className="text-sm">
              موقع اسطوري فيه خطوط عربية جميلة 😍
              <br />
              <a href="https://ko-type.com/">للوصول للموقع</a>
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
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