import { Document, Page, Text, StyleSheet, Font } from "@react-pdf/renderer";
import KFont from '/fonts/KOOkies-Bold.otf';
Font.register({
    family:"KOOkies",
    src:KFont
})
const styles = StyleSheet.create({
    page:{
        padding:30,
        fontSize: 12,
        fontFamily:"KOOkies",
        direction:"rtl",
        textAlign:"right",
    },
    title:{
        fontSize:18,
        marginBottom:10,
    },
    row:{
        marginBottom:6,
    },
});

export default function PdfPrint({data, price}){
return(
    <Document>
        <Page style={styles.page}>
        <Text style={styles.title}>نتيجة الحساب</Text>
        <Text style={styles.title}>المبلغ المُدخل : {price} ريال </Text>
        {data.map((item,i)=>(
        <Text style={styles.row} key={i}>
            {item.bank} - {item.card}
            {"\n"}
            ميل محلي : {item.localcal}
            {" | "}
            ميل دولي : {item.intercal}
        </Text>
        ))}
        </Page>
    </Document>
);
}