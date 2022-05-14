import { Orb } from "./custom-orb/Orb";
import { useEffect, useRef, useState } from "react";
import './Orb.css'
import { Fullorb } from "./FullOrb";
import { useDashboardContext } from "../context/useDashboarContext";

export const PredictiveWorld = () => {
  // const [dragMol, setDragMol] = useState(false)
  const {state} = useDashboardContext()
  const ctx = useRef();
  // const tipCtx = useRef();
  const canvas = useRef()
  const tooltip_can = useRef()
  const bars = 4;
  const radius = 130;
  const degrees = 360/bars;

  const toolTips = [];
  // const toolTips = useRef([]);

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
  const drawToolTip = (x, y, drugName, value) => {

    const tipCanvas = tooltip_can.current;
    const tipCtx = tipCanvas.getContext("2d");

    tipCtx.font = "35px Georgia";
    tipCtx.fillStyle = '#000';
    tipCtx.fillText(drugName, 10, 30);

    // tipCtx.beginPath();
    // tipCtx.fillStyle = '#7d6dd8';
    // tipCtx.fillRect(x, y, tipCanvas.width, tipCanvas.height);
    // tipCtx.textAlign = "center";
    // tipCtx.textBaseline = "middle";
    // tipCtx.fillStyle = '#fff';
    // tipCtx.fillText(drugName, 10, 30);
    // tipCtx.beginPath();
    // tipCtx.fillStyle = '#fff';
    // tipCtx.fillRect(x , y + 15, 75, 13);
    // tipCtx.fillStyle = '#000';
    // tipCtx.fillText(value, x, y + 40);

  }

  const drawLine = (x,y,w,h,deg, text) => {
    ctx.current.save();
    ctx.current.translate(x, y);
    ctx.current.rotate(degrees_to_radians(deg+90));
    ctx.current.fillStyle = "#209ff4";
    ctx.current.fillRect(-1*(w/2), -1*(h/2), w, h);
    ctx.current.fillStyle = "#222A47";
    ctx.current.font = "13px Arial";
    ctx.current.fillText(text, -10 , -100);
    ctx.current.restore();
  }

  const drawCircleDot = (x, y) => {
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
    ctx.current.translate(x+250, y+250);
    ctx.current.rotate(-degrees_to_radians(totalDeg));
    ctx.current.fillStyle = color;
    ctx.current.strokeStyle = color;

    if (totalDeg % 90) {
      //ctx.current.fillRect(-5, value, 10, 10);
      drawCircleDot(0, value)
    }else {
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
      num = num + min*-1;
    }
    const percent = (num*100/(max-min));
    const canvasAdapted = percent - 50;
    const isIn = inValues.includes(lines[property]*degrees)
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
  }, []);

  useEffect(() => {

    Object.entries(lines).forEach(([key, value], index) => {
      let x = radius * Math.cos(degrees_to_radians(index * degrees));
      let y = radius * Math.sin(degrees_to_radians(index * degrees));
      drawLine(x + 250, y + 250, 1, 120, index * degrees , key);
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


  useEffect(() => {
    if (!state.interactingMolecules || !state.interactingMolecules.length){
      return;
    }
    state.interactingMolecules.forEach((molecule, i) => {
      const {hue, saturation, luminosity} = molecule.color;
      const moleculeColor = `hsla(${hue},${saturation}%, ${luminosity}%, 1)`;

      const mass = molecule.calculated_properties['Molecular Weight'];
      const logP = molecule.calculated_properties['logP'];
      const logS = molecule.calculated_properties['ALOGPS']['logS'];
      const ames_tox = 10;
      // const ames_tox = molecule.calculated_properties['ADMET']['ames_toxicity']['probability'];
      drawDot(lines['mass'], scale(mass, 'mass'), moleculeColor)
      drawDot(lines['logP'], scale(logP, 'logP'), moleculeColor)
      drawDot(lines['logS'], scale(logS, 'logS'), moleculeColor)
      drawDot(lines['ames_tox'], scale(ames_tox, 'ames_tox'), moleculeColor)
      
      // drawToolTip(lines['mass'], "Mass", mass);
      // drawToolTip(lines['logP'], "logP",  logP);
      // drawToolTip(lines['logS'], "logS",  logS);
      // drawToolTip(lines['ames_tox'],  "Ames Tox", ames_tox);

    })

    // create toolTips for each molecule
    Object.entries(lines).forEach(([key, value], index) => {
      let tx = radius * Math.cos(degrees_to_radians(index * degrees));
      let ty = radius * Math.sin(degrees_to_radians(index * degrees));
    
      // toolTips.current.push({
      toolTips.push({
        x: tx + 250,
        y: ty + 250,
        r: 10,
        rXr: 100,
        tip: "Tooltip: " + key
      });

    });
    
    console.log("toolTips", toolTips);

  }, [state.interactingMolecules])

  const handleMouseMove = (e) => {
    const BB = canvas.current.getBoundingClientRect();
    const offsetX = BB.left;
    const offsetY = BB.top;

    const mouseX = parseInt(e.clientX - offsetX);
    const mouseY = parseInt(e.clientY - offsetY);

    const tipCanvas = tooltip_can.current;
    const tipCtx = tipCanvas.getContext("2d");

    let hit = false;
    for (var i = 0; i < toolTips.length; i++) {
      let dot = toolTips[i];
      let dx = mouseX - dot.x;
      let dy = mouseY - dot.y;

      // console.log("dx dy", dx, dy);
      // console.log("dx dy state", dx * dx + dy * dy < dot.rXr);

      if (dx * dx + dy * dy < dot.rXr) {    
        tipCanvas.style.left = (dot.x + 5) + "px";
        tipCanvas.style.top = (dot.y - 20) + "px";
        tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);

        drawToolTip(dot.x + 5, dot.y - 20, dot.tip, 10);
        hit = true;
      }
      }
      if (!hit) {
        tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
        tipCanvas.style.left = -500 +'px';
      }
  }

  return (
    <>
      <canvas ref={canvas} style={{ position: 'absolute', height: 500, width: 500 }} onMouseMove={handleMouseMove} />
      <canvas ref={tooltip_can}  style={{position: 'absolute', height: 50, width: 100, zIndex: 10}} ></canvas>
      { state.interactingMoleculesResult !== null ? <div style={{position: 'absolute', fontSize: '30px'}}>{ state.interactingMoleculesResult.value}%</div> : '' }
      <Fullorb />
    </>
  );
}