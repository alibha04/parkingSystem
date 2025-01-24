// import React, { useState, useEffect, useCallback } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   CircularProgress,
//   Box,
// } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
// import axios from 'axios';

// const QRCodePage = () => {
//   const [parkingSlots, setParkingSlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const frontendBaseUrl = `${window.location.origin}/parking-slots`;

//   // Fetching parking slots data
//   const fetchParkingSlots = useCallback(async () => {
//     try {
//       const res = await axios.get('https://parkingsystem-8xdu.onrender.com/api/lots');
//       setParkingSlots(res.data);
//     } catch (err) {
//       console.error('Error fetching parking slots:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchParkingSlots();
//   }, [fetchParkingSlots]);

//   const downloadQR = useCallback((slotId, slotName) => {
//     const canvas = document.createElement('canvas');
//     const svg = document.getElementById(`qr-${slotId}`);
//     const serializer = new XMLSerializer();
//     const source = serializer.serializeToString(svg);

//     const img = new Image();
//     img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);

//       const a = document.createElement('a');
//       a.download = `QR-${slotName.replace(/\s+/g, '-')}.png`;
//       a.href = canvas.toDataURL('image/png');
//       a.click();
//     };
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
//         Parking Slot QR Codes
//       </Typography>
//       <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
//         Scan QR codes to quickly access parking slot details
//       </Typography>

//       <Grid container spacing={3}>
//         {parkingSlots.map((slot) => (
//           <Grid item xs={12} sm={6} md={4} key={slot._id}>
//             <Card
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 p: 2,
//               }}
//               role="region"
//               aria-labelledby={`slot-${slot._id}`}
//             >
//               <CardContent
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   width: '100%',
//                 }}
//               >
//                 <QRCodeSVG
//                   id={`qr-${slot._id}`}
//                   value={`${frontendBaseUrl}/${slot._id}`} // Point to the frontend route
//                   size={200}
//                   level="H"
//                   includeMargin
//                   aria-label={`QR code for Parking Slot ${slot.slot_number}`}
//                 />
//                 <Typography
//                   variant="h6"
//                   component="div"
//                   align="center"
//                   sx={{ mt: 2, mb: 1 }}
//                   id={`slot-${slot._id}`}
//                 >
//                   Slot {slot.slot_number}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   align="center"
//                   aria-label={`Location: ${slot.location}`}
//                 >
//                   Location: {slot.location}
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   startIcon={<DownloadIcon />}
//                   onClick={() => downloadQR(slot._id, slot.slot_number)}
//                   size="small"
//                   aria-label={`Download QR for Slot ${slot.slot_number}`}
//                 >
//                   Download QR
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default QRCodePage;




import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Container, Typography, Grid, Card, CardContent, Button, CircularProgress, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const QRCodePage = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const frontendBaseUrl = `${window.location.origin}/slots`;

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/slots'); // Update API if needed
        setSlots(res.data);
      } catch (err) {
        console.error('Error fetching slots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const downloadQR = (slotId, slotNumber) => {
    const canvas = document.createElement('canvas');
    const svg = document.getElementById(`qr-${slotId}`);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = `QR-Slot-${slotNumber}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        Parking Slot QR Codes
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
        Scan QR codes to view parking slot details
      </Typography>

      <Grid container spacing={3}>
        {slots.map((slot) => (
          <Grid item xs={12} sm={6} md={4} key={slot._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <QRCodeSVG
                  id={`qr-${slot._id}`}
                  value={`${frontendBaseUrl}/${slot._id}`}
                  size={200}
                  level="H"
                  includeMargin
                />
                <Typography variant="h6" component="div" align="center" sx={{ mt: 2, mb: 1 }}>
                  Slot {slot.slotNumber}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadQR(slot._id, slot.slotNumber)}
                  size="small"
                >
                  Download QR
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QRCodePage;
