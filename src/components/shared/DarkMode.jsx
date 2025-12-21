import { Moon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useEffect, useState } from "react"
export default function DarkMode(){
    const [isDark, setisDark] = useState(()=>{
        return localStorage.getItem("Darkmode") === "true"
    });
    useEffect(()=>{
        if(isDark){
            document.body.classList.add("dark")
        } else{
            document.body.classList.remove("dark")
        }
        localStorage.setItem("Darkmode", isDark)
    },[isDark])
    return(
        <>
    <Toggle className="w-fit" size="sm"pressed={isDark} onPressedChange={setisDark}>
     <Moon/>
    </Toggle>
        </>
    )
}