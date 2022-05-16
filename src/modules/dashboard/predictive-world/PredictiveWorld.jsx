import { useEffect, useRef, useState } from "react";
import './Orb.css'
import { Fullorb } from "./FullOrb";
import { useDashboardContext } from "../context/useDashboarContext";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { ModalPaper } from "../../../infrastructure/components/ModalPaper";
import { Close, ContentCopy } from "@mui/icons-material";

export const PredictiveWorld = () => {
  const [cxValue, setCxValue] = useState(0)
  const [cyValue, setCyValue] = useState(0)
  const {state} = useDashboardContext()
  const ctx = useRef();
  const tipCtx = useRef();
  const canvas = useRef()
  const tooltipCanvas = useRef()
  const toolTips = useRef([]);
  const bars = 4;
  const radius = 130;
  const degrees = 360 / bars;

  const lines = {
    logP: 1,
    logS: 2,
    mass: 3,
    ames_tox: 4,
  }

  const scales = {
    logP: [-9, 9],
    logS: [-11, 3],
    mass: [1, 900],
    ames_tox: [0, 100],
  }

  const inValues = [90, 135, 270, 315];

  // To create each tooltip, we need to show
  const drawToolTip = (drugName, title) => {
    tipCtx.current.fillStyle = "#6D69C0";
    tipCtx.current.fillRect(0, 0, 300, 60);
    tipCtx.current.font = "35px Arial";
    tipCtx.current.fillStyle = "#fff";
    tipCtx.current.fillText(title, 20, 40 );
    tipCtx.current.fillStyle = "#fff";
    tipCtx.current.fillRect(0, 60, 200, 50);
    tipCtx.current.fillStyle = "#000";
    tipCtx.current.fillText(drugName, 20, 97);
  }

  const drawarc = () => {
    ctx.current.lineWidth = 2;
    ctx.current.strokeStyle = "#6d69c0";
    ctx.current.beginPath();
    ctx.current.moveTo(102, 74);
    // ctx.current.bezierCurveTo(286, 253, 218, 225, 44, 196);
    ctx.current.bezierCurveTo(246, 253, 318, 225, -10, 220)
    ctx.current.stroke();

    ctx.current.lineWidth = 2;
    ctx.current.strokeStyle = "#d7834c";
    ctx.current.beginPath();
    ctx.current.moveTo(498, 213);
    ctx.current.bezierCurveTo(206, 222, 249, 238, 420, 104)
    ctx.current.stroke();
  }

  const drawLine = (x, y, w, h, deg, text) => {
    ctx.current.save();
    ctx.current.translate(x, y);
    ctx.current.rotate(degrees_to_radians(deg + 90));
    ctx.current.fillStyle = "#209ff4";
    ctx.current.fillRect(-1 * (w / 2), -1 * (h / 2), w, h);
    ctx.current.fillStyle = "#222A47";
    ctx.current.font = "13px Arial";
    ctx.current.fillText(text, -10, -100);
    ctx.current.restore();
  }

  const drawCircleDot = (x, y) => {
    // console.log("Dot x, y", x, y);

    ctx.current.beginPath();
    ctx.current.arc(x, y, 7, 0, 2 * Math.PI, true);
    ctx.current.closePath()
    ctx.current.fill()
    ctx.current.beginPath();
    ctx.current.arc(x, y, 10, 0, 2 * Math.PI, true);
    ctx.current.closePath()
    ctx.current.stroke()
  }

  const drawDot = (lineDeg, value, color) => {
    ctx.current.save();

    const totalDeg = lineDeg * degrees;
    let x = radius * Math.cos(degrees_to_radians(totalDeg));
    let y = radius * Math.sin(degrees_to_radians(totalDeg));
    ctx.current.translate(x + 250, y + 250);
    ctx.current.rotate(-degrees_to_radians(totalDeg));
    ctx.current.fillStyle = color;
    ctx.current.strokeStyle = color;

    // console.log("Value", value);

    if (totalDeg % 90) {
      //ctx.current.fillRect(-5, value, 10, 10);
      drawCircleDot(0, value)
    } else {
      //ctx.current.fillRect(value, -5, 10, 10);
      drawCircleDot(value, 0)
    }

    ctx.current.restore();
  }

  const degrees_to_radians = (degrees) => {
    return degrees * Math.PI / 180;
  }

  const scale = (num, property) => {
    num = parseFloat(num);
    const min = scales[property][0]
    const max = scales[property][1]
    if (num < scales[property][0]) {
      num = scales[property][0];
    }
    if (num > scales[property][1]) {
      num = scales[property][1];
    }
    if (min < 0) {
      num = num + min * -1;
    }
    const percent = (num * 100 / (max - min));
    const canvasAdapted = percent - 50;
    const isIn = inValues.includes(lines[property] * degrees)
    if (isIn) {
      return canvasAdapted;
    }
    return -canvasAdapted;
  }

  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx.current = canvasEle.getContext("2d");

    const tipCanvas = tooltipCanvas.current;
    tipCtx.current = tipCanvas.getContext("2d");
  }, []);

  useEffect(() => {

    Object.entries(lines).forEach(([key, value], index) => {
      let x = radius * Math.cos(degrees_to_radians(index * degrees));
      let y = radius * Math.sin(degrees_to_radians(index * degrees));
      drawLine(x + 250, y + 250, 1, 120, index * degrees, key);
      //console.log(`${index}: ${key} = ${value}`);
      // console.log(value);
    });


    let canvass = document.getElementsByTagName('canvas');
    canvass[0].addEventListener('mousemove', on_canvas_move, false);

    function on_canvas_move(ev) {
      var x = ev.clientX - this.offsetLeft;
      var y = ev.clientY - this.offsetTop;
      // console.log(x + ' ,'+ y);
    }

    // for(let i in lines) {
    //   console.log('lines', i);
    //   let x = radius * Math.cos(degrees_to_radians(i * degrees));
    //   let y = radius * Math.sin(degrees_to_radians(i * degrees));
    //   drawLine(x + 250, y + 250, 1, 120, i * degrees);
    // }

    /*drawDot(1, 0, "#209ff4")//out 45
     drawDot(2, 0, 'red')//in 90
     drawDot(3, 0, "red")//in 135
     drawDot(4, 0, 'red')//out 180
     /*drawDot(5, 0)//out 225
     drawDot(6, 0)//in 270
     drawDot(7, 0)//in 315
     drawDot(8, 10)//out 360
    */

  }, []);


  function drawMolecules() {
    state.interactingMolecules.forEach((molecule, i) => {
      const {hue, saturation, luminosity} = molecule.color;
      const moleculeColor = `hsla(${hue},${saturation}%, ${luminosity}%, 0.7)`;

      const mass = molecule.calculated_properties['Molecular Weight'];
      const logP = molecule.calculated_properties['logP'];
      const logS = molecule.calculated_properties['ALOGPS']['logS'];
      const ames_tox = 10;
      // const ames_tox = molecule.calculated_properties['ADMET']['ames_toxicity']['probability'];
      drawDot(lines['mass'], scale(mass, 'mass'), moleculeColor)
      drawDot(lines['logP'], scale(logP, 'logP'), moleculeColor)
      drawDot(lines['logS'], scale(logS, 'logS'), moleculeColor)
      drawDot(lines['ames_tox'], scale(ames_tox, 'ames_tox'), moleculeColor)


      // console.log("Value mass", scale(mass, 'mass'));
      // drawToolTip(lines['mass'], "Mass", mass);
      // drawToolTip(lines['logP'], "logP",  logP);
      // drawToolTip(lines['logS'], "logS",  logS);
      // drawToolTip(lines['ames_tox'],  "Ames Tox", ames_tox);

      // create toolTips for each molecule
      createTooltipForEachMolecule(lines['mass'], scale(mass, 'mass'), mass, "Molecular Weight");
      createTooltipForEachMolecule(lines['logP'], scale(logP, 'logP'), logP, " LogP");
      createTooltipForEachMolecule(lines['logS'], scale(logS, 'logS'), logS, "LogS");
      createTooltipForEachMolecule(lines['ames_tox'], scale(ames_tox, 'ames_tox'), ames_tox, "Ames Tox");

    })

  }

  function createTooltipForEachMolecule(lineDeg, scaleValue, tipValue, tipTitle) {
    
    const totalDeg = lineDeg * degrees;
    let rx = radius * Math.cos(degrees_to_radians(lineDeg * degrees));
    let ry = radius * Math.sin(degrees_to_radians(lineDeg * degrees));

    // ctx.current.translate(x + 250, y + 250);

    if (totalDeg % 90) {
      toolTips.current.push(
        { x: rx + 256, y: ry + scaleValue + 256, r: 10, rXr: 100, tip: tipValue, lineDeg: totalDeg, title: tipTitle }
      );
    } else {
      toolTips.current.push(
        { x: rx + scaleValue + 256, y: ry + 256, r: 10, rXr: 100, tip: tipValue, lineDeg: totalDeg, title: tipTitle }
      );
    }
  }

  // function createTooltipForEachMolecule() {
  //   Object.entries(lines).forEach(([key, value], index) => {
  //     let tx = radius * Math.cos(degrees_to_radians(index * degrees));
  //     let ty = radius * Math.sin(degrees_to_radians(index * degrees));

  //     toolTips.current.push({
  //       x: tx + 250,
  //       y: ty + 250,
  //       r: 10,
  //       rXr: 100,
  //       tip: "Tooltip: " + key
  //     });

  //   });
  // }

  useEffect(() => {
    if (!state.interactingMolecules || !state.interactingMolecules.length) {
      return;
    }
    drawMolecules();

    // create toolTips for each molecule
    // createTooltipForEachMolecule();
    // console.log("Tooltips", toolTips)

  }, [state.interactingMolecules])

  useEffect(() => {
    if(state.protein && state.molecules.length > 0) {
      drawarc();
    }
  }, [state]);

  const handleMouseMove = (e) => {
    const BB = canvas.current.getBoundingClientRect();
    const offsetX = BB.left;
    const offsetY = BB.top;

    const mouseX = parseInt(e.clientX - offsetX);
    const mouseY = parseInt(e.clientY - offsetY);

    let hit = false;
    for (var i = 0; i < toolTips.current.length; i++) {
      let dot = toolTips.current[i];
      let dx = mouseX - dot.x;
      let dy = mouseY - dot.y;

      if (dx * dx + dy * dy < dot.rXr) {
        tooltipCanvas.current.style.left = (dot.x + 5) + "px";
        tooltipCanvas.current.style.top = (dot.y - 20) + "px";
        tipCtx.current.clearRect(0, 0, tooltipCanvas.current.width, tooltipCanvas.current.height);

        drawToolTip(dot.tip, dot.title);
        hit = true;
      }
    }
    if (!hit) {
      tipCtx.current.clearRect(0, 0, tooltipCanvas.current.width, tooltipCanvas.current.height);
      tooltipCanvas.current.style.left = -500 + 'px';
    }
  }

  return (
    <>
      <canvas ref={canvas} style={{position: 'absolute', height: 500, width: 500}}/>
      <canvas ref={canvas} style={{position: 'absolute', height: 500, width: 500}} onMouseMove={handleMouseMove}/>
      <canvas ref={tooltipCanvas} style={{position: 'absolute', height: 50, width: 100, zIndex: 10}} />
      {
        state.interactingMoleculesResult !== null 
        ? 
        <div style={{position: 'absolute', fontSize: '30px'}}>{ state.interactingMoleculesResult.value}%</div> 
        :
        state.interactingMolecules.length === 0 
        ? 
        <div className="dropmolecule-blob-center"><div className="dropmolecule-icon"><div className="rectangle"></div></div>Drop 1st <br/> Molecule</div> 
        : 
        <div className="dropmolecule-blob-center"><div className="dropmolecule-icon"><div className="rectangle"></div></div>Drop 2nd <br/> Molecule</div> 
      }
      <Fullorb />
      {
        state.protein && state.molecules.length > 0 ?
        <Box sx={{position: 'absolute', top: '200px', left: '-250px', 'z-index': 999}}>
          <ModalPaper elevation={2} sx={{width: 250, marginBottom: '50px', px: 2}}>
            {/* <IconButton sx={{position: "absolute", top: 0, right: 0}} size="large">
              <Close/>
            </IconButton> */}
            <Box p={2} pb={3}>
              <Grid container columnSpacing={3}>
                <Grid item xs={8}>Favipiravir</Grid>
                <Grid item xs={4}>6.3</Grid>
                <Grid item xs={8}>Osetalmivir</Grid>
                <Grid item xs={4}>6</Grid>
                <Grid item xs={8}>Balicatib</Grid>
                <Grid item xs={4}>4</Grid>
                <Grid item xs={8}>Remdesivir</Grid>
                <Grid item xs={4}>3.8</Grid>
              </Grid>
            </Box>
          </ModalPaper>
        </Box>
      : ''
    }
    </>
  );
}
