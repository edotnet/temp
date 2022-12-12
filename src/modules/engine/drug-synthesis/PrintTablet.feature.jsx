import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton, MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import Automatic from '../../../assets/img/automatic.png';

const tabletQuantity = [1, 10, 20, 50, 100, 500, 1000, 5000, 10000]

export const PrintTabletFeature = ({drugName}) => {
  const [open, setOpen] = useState(false);
  const [numPills, setNumPills] = useState(undefined);
  const [message, setMessage] = useState('');

  const [request, setRequest] = useState({
    drugName,
    numPills,
    name: '',
    dateOfBirth: undefined,
    clientNo: '',
    shippingMethod: '',
    shipToName: '',
    shipToBuildingName: '',
    shipToFloor: '',
    shipToStreetAddress: '',
    shipToPostalCode: '',
    tel: '',
    contactNumber: '',
    specialInstructions: ''
  });

  const submit = () => {
    //api.post()
    setMessage("Thank you ! Your order has been sent to AutoMedic for printing.");
    setTimeout(() => {
      setOpen(false);
      setMessage('');
    },8000);
  }

  return (<>
    <Stack direction="row">
      <TextField
        select
        onChange={e => {
          setNumPills(e.target.value);
          setOpen(true);
        }}
        sx={{"width": "200px", "background": "#fff", "maxWidth": "200px"}}
        label="Tablet quantity"
      >
        {tabletQuantity.map((i) => (<MenuItem key={i} value={i}>
          {i}
        </MenuItem>))}
      </TextField>
      {/*<IconButton onClick={() => {}}>
        <History/>
      </IconButton>*/}
    </Stack>

    <Dialog open={open} onClose={() => setOpen(false)}>
      <IconButton sx={{position: 'absolute', right: 10, top: 0}} onClick={() => setOpen(false)}><Close /></IconButton>
      <Box sx={{p: 3,}}>
        <Typography variant="h6" sx={{fontWeight: 700, textAlign: 'center', pb: 2}}>
          Delivery Order
        </Typography>
        <Box pb={2}>
          <Stack direction="row" spacing={2}>
            <Typography variant="body1" sx={{fontWeight: 700}}>Drug Name:</Typography>
            <Typography variant="body1">{drugName}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography variant="body1" sx={{fontWeight: 700}}>Number of Tablets:</Typography>
            <Typography variant="body1">{numPills??0}</Typography>
          </Stack>
        </Box>
        <Divider sx={{mb:4}}/>
        <Stack spacing={2} sx={{minHeight: '50vh'}}>
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth
              label="Name"
              value={request.name}
              onChange={e => setRequest({...request, name: e.target.value})}
            />
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="D"
              value={request.dateOfBirth}
              onChange={(newValue) => setRequest({...request, dateOfBirth: newValue})}
              renderInput={(params) => <TextField {...params} fullWidth/>}
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField
              label="Client No."
              value={request.clientNo}
              fullWidth
              onChange={e => setRequest({...request, clientNo: e.target.value})}
            />
            <TextField
              label="Shipping Method"
              fullWidth
              select
              value={request.shippingMethod}
              onChange={e => setRequest({...request, shippingMethod: e.target.value})}
            >
              <MenuItem value="Post">Post</MenuItem>
              <MenuItem value="FedEx">FedEx</MenuItem>
            </TextField>
          </Stack>
          <Divider sx={{pt:2}}/>
          <Typography fontWeight="700">Ship to</Typography>
          <Stack spacing={2} direction="row">
            <TextField
              label="Name"
              fullWidth
              value={request.shipToName}
              onChange={e => setRequest({...request, shipToName: e.target.value})}
            />
            <TextField
              label="Building Name"
              fullWidth
              value={request.shipToBuildingName}
              onChange={e => setRequest({...request, shipToBuildingName: e.target.value})}
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <TextField
              label="Apt No. Floor"
              fullWidth
              value={request.shipToFloor}
              onChange={e => setRequest({...request, shipToFloor: e.target.value})}
            />
            <TextField
              label="Postal Code"
              fullWidth
              value={request.shipToPostalCode}
              onChange={e => setRequest({...request, shipToPostalCode: e.target.value})}
            />
          </Stack>
          <TextField
            label="Street Address"
            fullWidth
            value={request.shipToStreetAddress}
            onChange={e => setRequest({...request, shipToStreetAddress: e.target.value})}
          />
          <Stack spacing={2} direction="row">
            <TextField
              label="Tel."
              fullWidth
              value={request.tel}
              onChange={e => setRequest({...request, tel: e.target.value})}
            />
            <TextField
              label="Contact Name"
              fullWidth
              value={request.contactNumber}
              onChange={e => setRequest({...request, contactNumber: e.target.value})}
            />
          </Stack>
          <TextField
            label="Special Instructions"
            fullWidth
            value={request.specialInstructions}
            multiline
            rows={3}
            onChange={e => setRequest({...request, specialInstructions: e.target.value})}
          />
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <img src={Automatic} alt="Automatic" style={{width: 100}}/>
            <Box>
              <Typography variant="body1" sx={{fontWeight: 700}}>{message}</Typography>
            </Box>
            {!message && <Box>
              <Button variant="contained" onClick={submit}>Print your tablets</Button>
            </Box>}
          </Box>
        </Stack>
      </Box>
    </Dialog>
  </>)
}
