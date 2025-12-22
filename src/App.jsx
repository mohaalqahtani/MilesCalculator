import { useState } from 'react'
import '@/App.css'
import TabsCho from '@/components/shared/TabsCho';
import Accordions from '@/components/shared/Accordions';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DarkToggle from '@/components/shared/DarkMode';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
function App() {
  const [price,setPrice] = useState("");
  const MAX_VALUE = 1000000;
  const handleCalc = (data) => {};
  return (
    <>
    <Card className="w-full max-w-sm justify-center">
      <CardHeader>
      <DarkToggle/>
      <Input type="number" className='w-30 m-auto' value={price} id="price" placeholder='ادخل المبلغ' onChange={(e)=>{const val = e.target.value;if(val === ""){setPrice("");return;}if(Number(val) <= MAX_VALUE){setPrice(val);}}} required />
      </CardHeader>
      <CardContent>
    <TabsCho price={price} />
    <DropdownMenuSeparator className="mt-5"/>
    <Accordions/>
      </CardContent>
    </Card>
    </>
  )

}
export default App