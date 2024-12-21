import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ExportPage = () => {
    const [slots, setslots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://patientmanagement-2eye.onrender.com/api/clinics')
          .then(res => {
            setslots(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error('Error in fetching slots at Exportpage:', err);
            setLoading(false);
          });
      }, []);

      const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('slots List', 14, 15);
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

        const tableColumn = ["Name", "Age", "Gender", "Admit Date"];
        const tableRows = slots.map(patient => [
          patient.Patient_name,
          patient.age,
          patient.gender,
        //   slots.publisher,
          new Date(patient.admite_Date).toLocaleDateString()
        ]);

        doc.autoTable({
            startY: 30,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255 }
          });

          doc.save('slots-list.pdf');
        };

        const exportToExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(slots.map(patient => ({
              Name: patient.Patient_name,
              Age: patient.age,
              Gender: patient.gender,
              Admit_Date: new Date(patient.admite_Date).toLocaleDateString()
            })));

            const workpatient = XLSX.utils.patient_new();
            XLSX.utils.patient_append_sheet(workpatient, worksheet, "slots");
            const excelBuffer = XLSX.write(workpatient, { patientType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(data, 'slots-list.xlsx');
          };

          const exportToCSV = () => {
            const worksheet = XLSX.utils.json_to_sheet(slots.map(patient => ({
                Name: patient.Patient_name,
                Age: patient.age,
                Gender: patient.gender,
                'Admit Date': new Date(patient.admite_Date).toLocaleDateString()
            })));
            
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            saveAs(data, 'slots-list.csv');
          };

          const exportToText = () => {
            let content = 'slots List\n\n';
            content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
            
            slots.forEach((patient, index) => {
              content += `${index + 1}. slots DETAILS\n`;
              content += `Name: ${patient.Patient_name}\n`;
              content += `Age: ${patient.age}\n`;
              content += `Gender: ${patient.gender}\n`;
            //   content += `Publisher: ${book.publisher}\n`;
              content += `Admite Date: ${new Date(patient.admite_Date).toLocaleDateString()}\n`;
              content += `Description: ${patient.description || 'N/A'}\n`;
              content += '\n----------------------------\n\n';
            });
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, 'slots-list.txt');
          };

          if (loading) {
            return (
              <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Container>
            );
          }

          return (
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                  Export slots
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4 }} align="center" color="text.secondary">
                  Export your patient collection in different formats
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
                  gap: 3,
                  mt: 4 
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={exportToPDF}
                    sx={{ p: 2 }}
                  >
                    Export as PDF
                  </Button>
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<TableViewIcon />}
                    onClick={exportToCSV}
                    sx={{ p: 2 }}
                  >
                    Export as CSV
                  </Button> }
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={exportToExcel}
                    sx={{ p: 2 }}
                  >
                    Export as Excel
                  </Button> }
                  { <Button
                    variant="contained"
                    size="large"
                    startIcon={<DescriptionIcon />}
                    onClick={exportToText}
                    sx={{ p: 2 }}
                  >
                    Export as Text
                  </Button> }
                </Box>
                <Typography variant="body2" sx={{ mt: 4 }} align="center" color="text.secondary">
                  Total slots: {slots.length}
                </Typography>
              </Paper>
            </Container>
          );
        };

export default ExportPage;