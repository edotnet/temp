import { Orb } from "./custom-orb/Orb";
import { useEffect, useRef } from "react";
import './Orb.css'
import { Fullorb } from "./FullOrb";
import { useDashboardContext } from "../context/useDashboarContext";

export const PredictiveWorld = () => {
  const {state} = useDashboardContext()
  const ctx = useRef();
  const canvas = useRef()
  const bars = 8;
  const radius = 130;
  const degrees = 45;
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

  const obj = {
    "name": "Carbidopa",
    "calculated_properties": [
      { "name": "logP", "value": -1.2 },
      { "name": "Molecular Weight", "value": 226.2292 },
      { "name": "Rule of Five", "value": 1 },
      { "name": "Refractivity", "value": 68.77 },
      { "name": "Polarizability", "value": 21.81 },
      { "name": "pKa (strongest acidic)", "value": 2.35 },
      { "name": "pKa (strongest basic)", "value": 5.66 },
      { "name": "Physiological Charge", "value": -1 },
    ]
  }

  const drawLine = (x,y,w,h,deg, label, value) => {
    ctx.current.save();
    ctx.current.translate(x, y);
    ctx.current.rotate(degrees_to_radians(deg+90));
    ctx.current.fillStyle = "#209ff4";
    ctx.current.fillRect(-1*(w/2), -1*(h/2), w, h);
    ctx.current.fillStyle = "#222A47";
    ctx.current.fillText(label, -10 , -100);
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

  // const drawNumbers = (ctx, radius) => {
  //   var ang;
  //   var num;
  //   var drug_properties = [
  //     'Molecular weight',
  //     'Melting Point',
  //     'LogP',
  //     'LogS',
  //     'AMES Toxicity',
  //     'pKa (strongest acidic)', 
  //     'pKa (strongest) basic', 
  //     'Phsysiological charge', 
  //   ]
  //   for(num= 0; num < drug_properties.length; num++){
  //     ang = num * Math.PI / 4;
  //     ctx.current.rotate(ang);
  //     ctx.current.translate(0, -radius*1.82);
  //     ctx.current.rotate(-ang);
  //     ctx.current.fillText(drug_properties[num], 250, 250);
  //     ctx.current.rotate(ang);
  //     ctx.current.translate(0, radius*1.82);
  //     ctx.current.rotate(-ang);
  //   }
  // }

  const degrees_to_radians = (degrees) => {
    return degrees * Math.PI / 180;
  }
  const radians_to_degrees = (radians) => {
    return radians * 180 / Math.PI;
  };
  const scale = (num, property) => {
    const min = scales[property][0]
    const max = scales[property][1]
      //num*100/max-min
    if (num < scales[property][0]) {
      num = scales[property][0];
    }
    if (num > scales[property][1]) {
      num = scales[property][1];
    }
    return num*100/(max-min);
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
    for(let i = 0; i < obj.calculated_properties.length; i++) {
      let x = radius * Math.cos(degrees_to_radians(i * degrees));
      let y = radius * Math.sin(degrees_to_radians(i * degrees));
      drawLine(x + 250, y + 250, 1, 120, i * degrees, obj.calculated_properties[i].name , obj.calculated_properties[i].value);
    }
    // drawNumbers(ctx, radius);
    // drawNumbers(radius);
    /*drawDot(1, 0, "#209ff4")//out 45
    drawDot(1, 30, "red")//out 45
    drawDot(2, 0, 'red')//in 90
    drawDot(3, 0, "red")//in 135
    drawDot(3, 30, "#209ff4")//in 135
    drawDot(4, 0, 'red')//out 180
    drawDot(4, -20, '#209ff4')//out 180
    */
  }, []);

  useEffect(() => {
    if (!state.interactingMolecules || !state.interactingMolecules.length){
      return;
    }
    const colors = ['red', 'blue']
    state.interactingMolecules.forEach((molecule, i) => {
      const mass = molecule.calculated_properties['Molecular Weight'];
      const logP = molecule.calculated_properties['logP'];
      const logS = molecule.calculated_properties['ALOGPS']['logS'];
      //const ames_tox = molecule.calculated_properties['ADMET']['ames_toxicity']['probability'];
      drawDot(lines['mass'], scale(mass, 'mass'), colors[i])
      drawDot(lines['logP'], scale(logP, 'logP'), colors[i])
      drawDot(lines['logS'], scale(logS, 'logS'), colors[i])
      //drawDot(lines['ames_tox'], scale(ames_tox, 'ames_tox'), colors[i])
    })
  }, [state.interactingMolecules])

  return (
    <>
      <canvas ref={canvas} style={{position: 'absolute', height: 500, width: 500}}/>
      <Fullorb />
    </>
  );
}
