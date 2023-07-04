import React, { SetStateAction } from 'react'
import StudentsInterface from '../interfaces/student'
import { Dialog, DialogTitle } from '@mui/material'
import {Document, Page} from "@react-pdf/renderer"

export type StudentPDFProps ={
   setStudentPDF:React.Dispatch<SetStateAction<boolean>>,
   student:StudentsInterface
}

export default function StudentPDF({setStudentPDF,student}:StudentPDFProps) {
  return (
    <Dialog open={true} onClose={()=>setStudentPDF(false)}>
      <DialogTitle>Student</DialogTitle>
   
    </Dialog>
  )
}
