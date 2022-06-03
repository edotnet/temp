import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { useWindowSize } from "../infrastructure/hooks/useWindowSize";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SynthesisDropzoneArea } from "../infrastructure/components/SynthesisDropzoneArea";



export const DrugSynthesis = () => {
  const {width, height} = useWindowSize();
  let [loading, setLoading] = useState(true);
  const [file, setFile] = useState([]);

  const handleChange = (file) => {
    setFile(file);
  }

  let hideSpinner = () => {
      setLoading(false);
  };

  return (
    <DashboardLayout style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <p>Upload Drug Synthesis</p>
            <SynthesisDropzoneArea file={file} handleChange={handleChange}/>
        </div>
    </DashboardLayout>
  );
}
