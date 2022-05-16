import { useEffect, useRef, useState } from "react";
import './Orb.css'
import { Fullorb } from "./FullOrb";
import { useDashboardContext } from "../context/useDashboarContext";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { ModalPaper } from "../../../infrastructure/components/ModalPaper";
import { Close, ContentCopy } from "@mui/icons-material";
import { Orb } from "./custom-orb/Orb";
import { fetchFromObject } from "../../../infrastructure/utils";

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

  const config = {
    logP: {
      line: 0,
      scale: [-9, 9],
      title: 'LogP'
    },
    logS: {
      line: 1,
      scale: [-11, 3],
      title: 'LogS'
    },
    mass: {
      line: 2,
      scale: [1, 900],
      title: 'Molecular Mass',
    },
    ames_tox: {
      line: 3,
      scale: [0, 100],
      title: 'AMES tox.'
    }
  }

  const inValues = [90, 135, 270, 315];

  // To create each tooltip, we need to show
  const drawToolTip = (drugName, title) => {
    tipCtx.current.fillStyle = "#6D69C0";
    tipCtx.current.fillRect(0, 0, 300, 60);
    tipCtx.current.font = "35px Arial";
    tipCtx.current.fillStyle = "#fff";
    tipCtx.current.fillText(title, 20, 40);
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
    ctx.current.fillText(text, -2.5 * text.length, -100);
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
    const min = config[property].scale[0]
    const max = config[property].scale[1]
    if (num < config[property].scale[0]) {
      num = config[property].scale[0];
    }
    if (num > config[property].scale[1]) {
      num = config[property].scale[1];
    }
    if (min < 0) {
      num = num + min * -1;
    }
    const percent = (num * 100 / (max - min));
    const canvasAdapted = percent - 50;
    const isIn = inValues.includes(config[property].line * degrees)
    if (isIn) {
      return canvasAdapted;
    }
    return -canvasAdapted;
  }

  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    ctx.current = canvasEle.getContext("2d");

    const tipCanvas = tooltipCanvas.current;
    tipCtx.current = tipCanvas.getContext("2d");
  }, []);


  const drawLines = () => {
    Object.entries(config).forEach(([key, value], index) => {
      let x = radius * Math.cos(degrees_to_radians(value.line * degrees));
      let y = radius * Math.sin(degrees_to_radians(value.line * degrees));
      drawLine(x + 250, y + 250, 1, 120, value.line * degrees, value.title);
    });
  }

  const drawMolecules = () => {
    state.interactingMolecules.forEach((molecule, i) => {
      const {hue, saturation, luminosity} = molecule.color;
      const moleculeColor = `hsla(${hue},${saturation}%, ${luminosity}%, 0.7)`;

      const mass = fetchFromObject(molecule, 'calculated_properties.Molecular Weight');
      const logP = fetchFromObject(molecule, 'calculated_properties.logP');
      const logS = fetchFromObject(molecule, 'calculated_properties.ALOGPS.logS');
      const ames_tox = fetchFromObject(molecule, 'calculated_properties.ADMET.ames_toxicity.probability');

      drawDot(config['mass'].line, scale(mass, 'mass'), moleculeColor)
      drawDot(config['logP'].line, scale(logP, 'logP'), moleculeColor)
      drawDot(config['logS'].line, scale(logS, 'logS'), moleculeColor)
      drawDot(config['ames_tox'].line, scale(ames_tox, 'ames_tox'), moleculeColor)

      createTooltipForEachMolecule(config['mass'].line, scale(mass, 'mass'), mass, config['mass'].title);
      createTooltipForEachMolecule(config['logP'].line, scale(logP, 'logP'), logP, config['logP'].title);
      createTooltipForEachMolecule(config['logS'].line, scale(logS, 'logS'), logS, config['logS'].title);
      createTooltipForEachMolecule(config['ames_tox'].line, scale(ames_tox, 'ames_tox'), ames_tox, config['ames_tox'].title);
    })

  }

  function createTooltipForEachMolecule(lineDeg, scaleValue, tipValue, tipTitle) {

    const totalDeg = lineDeg * degrees;
    let rx = radius * Math.cos(degrees_to_radians(lineDeg * degrees));
    let ry = radius * Math.sin(degrees_to_radians(lineDeg * degrees));

    // ctx.current.translate(x + 250, y + 250);

    if (totalDeg % 90) {
      toolTips.current.push(
        {x: rx + 256, y: ry + scaleValue + 256, r: 10, rXr: 100, tip: tipValue, lineDeg: totalDeg, title: tipTitle}
      );
    } else {
      toolTips.current.push(
        {x: rx + scaleValue + 256, y: ry + 256, r: 10, rXr: 100, tip: tipValue, lineDeg: totalDeg, title: tipTitle}
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
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      tipCtx.current.clearRect(0, 0, tooltipCanvas.current.width, tooltipCanvas.current.height);
      toolTips.current = [];
      return;
    }
    drawMolecules();
    drawLines();

    // create toolTips for each molecule
    // createTooltipForEachMolecule();
    // console.log("Tooltips", toolTips)

  }, [state.interactingMolecules])

  useEffect(() => {
    if (state.protein && state.interactingMoleculesResult) {
      drawarc();
    }
  }, [state]);

  const renderDropMolecule = (num) => {
    return (
      <div className="dropmolecule-blob-center">
        <div className="dropmolecule-icon">
          <div className="rectangle"/>
        </div>
        Drop {num} <br/> Molecule</div>
    )
  }

  const renderCenter = () => {
    if (!state.interactingMolecules.length) {
      return renderDropMolecule("1st")
    }
    if (state.interactingMoleculesResult) {
      return <div style={{position: 'absolute', fontSize: '30px'}}>{state.interactingMoleculesResult.value}%</div>;
    }
    return renderDropMolecule("2nd");
  }

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
      <canvas ref={canvas} style={{position: 'absolute', height: 500, width: 500}} onMouseMove={handleMouseMove}/>
      <canvas ref={tooltipCanvas} style={{position: 'absolute', height: 50, width: 100, zIndex: 10}}/>
      {renderCenter()}
      <Fullorb/>
    </>
  );
}
