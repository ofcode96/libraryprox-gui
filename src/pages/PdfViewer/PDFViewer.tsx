import { Document, Page, View, StyleSheet, Text, PDFViewer as Pdf, Image, Font, } from '@react-pdf/renderer'

import JsBarcode from 'jsbarcode';
import { useContext, useEffect, useState } from 'react';
import { PDFContext } from '../../contexts/PDFContext';

import Allgender from '../../assets/fonts/All-Genders-Regular-v4.ttf'
import {  enterpriceApi } from '../../constants/utils';
import EnterPriseInterface from '../../interfaces/enterprise';
import { Box } from '@mui/material';
import { convertFileSrc  } from '@tauri-apps/api/tauri';
import {  join} from '@tauri-apps/api/path';

Font.register({
  family: "allganders",
  src: Allgender
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  section: {
    margin: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row"
  }
});

export default function PDFViewer() {
  const { studentPDF, setStudentPDF } = useContext(PDFContext)

  const [enterprise, setEnterprise] = useState<EnterPriseInterface>({ name: "", subname: "", img: "" })

  // For Barcode
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, "" + studentPDF.id, {
    height: 40,
    textAlign: "center"
  });
  const barcode = canvas.toDataURL();


  const getAll = async () => {
    const all = await enterpriceApi.all()
    setEnterprise({
      name: all.name,
      img: all.img,
      subname: all.subname
    })



  }

  useEffect(() => {
    getAll()
  }, [])



  const [imgSrc, setImgSrc] = useState<string>("")



  useEffect(() => {
    const fetchImg = async () => {

       const filePath = await join('enterprise.jpg')

       setImgSrc(convertFileSrc(filePath))
      

    }

    fetchImg()

  

 }, [])

  return (
    <Box mx={"10%"} height={"80vh"}>
      <Pdf style={{ width: "90%", height:"100%" }} >
        <Document
          title={studentPDF.fname}
        >
          <Page orientation='landscape' size="A7" style={styles.page}>
            <View style={styles.section}>
              <Image src={imgSrc+ `?v=${new Date().getTime()}`}
                style={{
                  width: "30px",
                  marginHorizontal: "5px"
                }} />
              <Text
                style={{
                  fontSize: "10px",
                  marginVertical: "10px",
                }}>{enterprise.name} </Text>
            </View>
            <View style={{
              margin: 15,
              marginTop: 30
            }}>
              <Text style={{
                fontSize: studentPDF.fname?.length! > 12  ? 12 : 14,
                fontFamily: "allganders"
              }}>Full Name :  {studentPDF.fname} </Text>
              <Text style={{
                fontSize: "14px",
                marginTop: 4
              }}>ID : {studentPDF.id} </Text>
            </View>
            <View style={{
              border: "1px solid #000",
              height: "70px",
              width: "70px",
              position: "absolute",
              right: 20,
              top: 70
            }}>
            </View>
            <View>
              <Image style={{
                width: "70px",
                marginHorizontal: "10px"
              }} src={barcode} />
            </View>
            <View>
              <Text textAnchor='middle' style={{
                textAlign: "center",
                marginTop: 2
              }}>{new Date().getFullYear()}</Text>
            </View>
          </Page>
        </Document>
      </Pdf>
    </Box>
  )
}
