import { Switch } from "@/components/ui/switch"
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
        <Switch onCheckedChange={setisDark} checked={isDark}/>
        </>
    )
}