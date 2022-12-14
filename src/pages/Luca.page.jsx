import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {Document, Page, pdfjs} from "react-pdf";
import {useState} from "react";
import {DashboardLayout} from "../infrastructure/layouts/Dashboard.layout";
import {Container, LinearProgress} from "@mui/material";
import {useWindowSize} from "../infrastructure/hooks/useWindowSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export const LucaPage = () => {
  const [numPages, setNumPages] = useState(null);
  const {width} = useWindowSize();
  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  return (
    <DashboardLayout style={{height: '100%'}}>
      <Container maxWidth="xl">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Document file="./luca.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={width} loading={<LinearProgress variant="indeterminate"/> }/>
            ))}
          </Document>

        </div>
      </Container>
    </DashboardLayout>
  )
}
