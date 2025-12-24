import '@/App.css'
import Accordions from '@/components/shared/Accordions';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
// import TabsCho from '@/components/shared/TabsCho';
import DarkToggle from '@/components/shared/DarkMode';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
function App() {

  return (
    <>
    <Card className="w-full max-w-sm justify-center">
      <CardHeader>
      <DarkToggle/>
      </CardHeader>
      <CardContent>
      <a href="/cashback">الكاش باك</a><br />
      <a href="/miles">الاميال</a>
    {/* <TabsCho/> */}
    <DropdownMenuSeparator className="mt-5"/>
    <Accordions/>
      </CardContent>
    </Card>
    </>
  )

}
export default App