import { useEffect, useRef } from "react";
import './Orb.css'
import { Fullorb } from "./FullOrb";
import { useDashboardContext } from "../context/useDashboarContext";
import { fetchFromObject } from "../../../infrastructure/utils";

export const PredictiveWorld = () => {
  const {state} = useDashboardContext()
  const ctx = useRef();
  const tipCtx = useRef();
  const canvas = useRef()
  const tooltipCanvas = useRef()
  const toolTips = useRef([]);
  const radius = 130;

  const config = {
    logP: {
      line: 0,
      scale: [-9, 9],
      title: 'LogP',
      property: 'calculated_properties.logP'
    },
    logS: {
      line: 1,
      scale: [-11, 3],
      title: 'LogS',
      property: 'calculated_properties.ALOGPS.logS'
    },
    mass: {
      line: 2,
      scale: [1, 900],
      title: 'Molecular Mass',
      property: 'calculated_properties.Molecular Weight'
    },
    ames_tox: {
      line: 3,
      scale: [0, 100],
      title: 'AMES tox.',
      property: 'calculated_properties.ADMET.ames_toxicity.probability',
    },
    biodegradation: {
      line: 4,
      scale: [0.5, 1],
      title: 'Biodegradation',
      property: 'experimental_properties.ADMET.biodegradation.probability'
    },
    caco2: {
      line: 7,
      scale: [0.5, 0.9481],
      title: 'CACO2 prob.',
      property: 'calculated_properties.ADMET.caco2.probability'
    },
    bbb: {
      line: 5,
      scale: [0, 1],
      title: 'BBB',
      property: 'calculated_properties.ADMET.bbb.probability'
    },
    hia: {
      line: 6,
      scale: [0, 1],
      title: 'HIA',
      property: 'calculated_properties.ADMET.hia.probability'
    }
  }
  const degrees = 360 / Object.keys(config).length;

  const inValues = [135, 180];

  const [drug1, drug2] = state.interactingMolecules;
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
    ctx.current.lineWidth = 4;
    ctx.current.strokeStyle = "#6d69c0";
    ctx.current.beginPath();
    ctx.current.moveTo(102, 74);
    // ctx.current.bezierCurveTo(286, 253, 218, 225, 44, 196);
    //ctx.current.bezierCurveTo(246, 253, 318, 225, -10, 220)
    ctx.current.bezierCurveTo(206, 222, 249, 238, 420, 104)
    ctx.current.stroke();

    ctx.current.lineWidth = 4;
    ctx.current.strokeStyle = "#d7834c";
    ctx.current.beginPath();
    ctx.current.moveTo(498, 213);
    ctx.current.bezierCurveTo(206, 222, 249, 238, 420, 104)
    //ctx.current.bezierCurveTo(206, 222, 249, 238, 520, 104)
    ctx.current.stroke();
  }

  const drawLine = (x, y, w, h, deg, text) => {
    ctx.current.save();
    ctx.current.translate(x, y);
    ctx.current.rotate(degrees_to_radians(deg + 90));
    ctx.current.fillStyle = "#209ff4";
    ctx.current.fillRect(-1 * (w / 2), -1 * (h / 2), w, h);
    ctx.current.fillStyle = "#1d1d1d";
    ctx.current.font = "9px Work Sans ";
    ctx.current.fillText(text, -2.5 * text.length, -68);
    ctx.current.restore();
  }

  const drawCircleDot = (x, y) => {
    ctx.current.beginPath();
    ctx.current.arc(x, y, 4, 0, 2 * Math.PI, true);
    ctx.current.closePath()
    ctx.current.fill()
    ctx.current.beginPath();
    ctx.current.arc(x, y, 6, 0, 2 * Math.PI, true);
    ctx.current.closePath()
    ctx.current.stroke()
  }

  const drawDot = (lineDeg, value, color) => {
    ctx.current.save();
    let canvasAdapted = value - 50;
    const isIn = inValues.includes(lineDeg * degrees)
    if (!isIn) {
     canvasAdapted = -canvasAdapted;
    }
    const totalDeg = lineDeg * degrees;
    let x = radius * Math.cos(degrees_to_radians(totalDeg));
    let y = radius * Math.sin(degrees_to_radians(totalDeg));

    ctx.current.translate(x + 250, y + 250);
    ctx.current.rotate(degrees_to_radians(totalDeg));
    ctx.current.fillStyle = color;
    ctx.current.strokeStyle = color;
    drawCircleDot(canvasAdapted, 0);

    ctx.current.restore();
  }

  const degrees_to_radians = (degrees) => {
    return degrees * Math.PI / 180;
  }

  const scale = (num, property) => {
    const min = config[property].scale[0]
    const max = config[property].scale[1]
    if (num < min) {
      num = min;
    }
    if (num > max) {
      num = max;
    }
    if (min < 0) {
      num = num + min * -1;
    }
    const div = (max - min) < 1 ? 1 : max - min;
    return (num * 100 / div);
    /*const canvasAdapted = percent - 50;
    const isIn = inValues.includes(config[property].line * degrees)
    if (isIn) {
      return canvasAdapted;
    }
    return -canvasAdapted;*/
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

      Object.keys(config).forEach((key) => {
        const prop = config[key];
        const value = parseFloat(fetchFromObject(molecule, prop.property));
        const scaled = scale(value, key);
        drawDot(prop.line, scaled, moleculeColor);
        // addPropertyTooltip(prop.line, scaled, value, prop.title); // Temporary tooltip added
      })
    })
  }

  const addPropertyTooltip = (lineDeg, scaleValue, tipValue, tipTitle) => {
    //scaleValue = Math.abs(scaleValue)
    const totalDeg = lineDeg * degrees;
    /*if (inValues.includes(totalDeg)) {
      scaleValue -= 50;
    }*/
    if (totalDeg === 90 || totalDeg === 45) {
      scaleValue += 100;
    }
    if (totalDeg === 135) {
      scaleValue += 50;
    }
  
    const x = (scaleValue) * Math.cos(degrees_to_radians(totalDeg));
    const y = (scaleValue) * Math.sin(degrees_to_radians(totalDeg));

    toolTips.current.push(
      {x: x + 250, y: 250 + y, rXr: 36, tip: tipValue, title: tipTitle}
    );

  }

  useEffect(() => {
    if (!state.interactingMolecules || !state.interactingMolecules.length) {
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      tipCtx.current.clearRect(0, 0, tooltipCanvas.current.width, tooltipCanvas.current.height);
      toolTips.current = [];
      return;
    }
    drawMolecules();
    if(state.interactingMolecules.length > 0){
      drawLines();
    }
  }, [state.interactingMolecules])

  useEffect(() => {
    if (state.protein && state.interactingMoleculesResult) {
     //  drawarc();
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
    let i = 0, leni = toolTips.current.length;
    for (; i < leni; i++) {
      let dot = toolTips.current[i];
      let dx = mouseX - dot.x;
      let dy = mouseY - dot.y;

      if (dx * dx + dy * dy < dot.rXr) {
        tooltipCanvas.current.style.left = (dot.x + 5) + "px";
        tooltipCanvas.current.style.top = (dot.y - 20) + "px";
        tipCtx.current.clearRect(0, 0, tooltipCanvas.current.width, tooltipCanvas.current.height);

        drawToolTip(dot.tip, dot.title);
        hit = true;
        break;
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
      { drug1 && drug2 &&
        <div>
          <div className="tempTooltips">
            <div className="tips-table">
              <div className="t-header t-row">
                <div>-</div>
                <div style={{'position':'relative'}}>
                  <div className="mlc-color-dot" style={{borderColor: `hsla(${drug1.color.hue},${drug1.color.saturation}%, ${drug1.color.luminosity}%, 0.7)`}}>
                    <span style={{backgroundColor: `hsla(${drug1.color.hue},${drug1.color.saturation}%, ${drug1.color.luminosity}%, 0.7)`}}></span>
                  </div>
                  <span style={{paddingLeft: '20px'}}>{drug1.name? drug1.name : 'Molecular Name'}</span>
                </div>
                <div style={{'position':'relative'}}>
                  <div className="mlc-color-dot" style={{borderColor: `hsla(${drug2.color.hue},${drug2.color.saturation}%, ${drug2.color.luminosity}%, 0.7)`}}>
                    <span style={{backgroundColor: `hsla(${drug2.color.hue},${drug2.color.saturation}%, ${drug2.color.luminosity}%, 0.7)`}}></span>
                  </div>
                  <span style={{paddingLeft: '20px'}}>{drug2.name? drug2.name : 'Molecular Name'}</span>
                </div>
              </div>
              <div className="drug1-row body-row">
                <div className="properties">
                  <div>LogP</div>
                  <div>LogS</div>
                  <div>Mass</div>
                  <div>AMES tox.</div>
                  <div>CACO2 Prob.</div>
                  <div>BBB</div>
                  <div>HIA</div>
                  <div>Biodegradation</div>
                </div>
                <div className="drugvalues">
                  <div>{drug1.calculated_properties.ALOGPS ? drug1.calculated_properties.ALOGPS['logP'] : '-'}</div>
                  <div>{drug1.calculated_properties.ALOGPS ? drug1.calculated_properties.ALOGPS['logS'] : '-'}</div>
                  <div>{drug1.calculated_properties ? drug1.calculated_properties['Molecular Weight'] : '-'}</div>
                  <div>{drug1.calculated_properties.ADMET ? drug1.calculated_properties.ADMET.ames_toxicity['probability'] : '-'}</div>
                  <div>{drug1.calculated_properties.ADMET ? drug1.calculated_properties.ADMET.caco2['probability'] : '-'}</div>
                  <div>{drug1.calculated_properties.ADMET ? drug1.calculated_properties.ADMET.hia['probability'] : '-'}</div>
                  <div>{drug1.calculated_properties.ADMET ? drug1.calculated_properties.ADMET.bbb['probability'] : '-'}</div>
                  <div>{drug1.calculated_properties.ADMET ? drug1.calculated_properties.ADMET.biodegradation['probability'] : '-'}</div>
                </div>
                <div className="drugvalues2">
                  <div>{drug2.calculated_properties.ALOGPS ? drug2.calculated_properties.ALOGPS['logP'] : '-'}</div>
                  <div>{drug2.calculated_properties.ALOGPS ? drug2.calculated_properties.ALOGPS['logS'] : '-'}</div>
                  <div>{drug2.calculated_properties ? drug2.calculated_properties['Molecular Weight'] : '-'}</div>
                  <div>{drug2.calculated_properties.ADMET ? drug2.calculated_properties.ADMET.ames_toxicity['probability'] : '-'}</div>
                  <div>{drug2.calculated_properties.ADMET ? drug2.calculated_properties.ADMET.caco2['probability'] : '-'}</div>
                  <div>{drug2.calculated_properties.ADMET ? drug2.calculated_properties.ADMET.bbb['probability'] : '-'}</div>
                  <div>{drug2.calculated_properties.ADMET ? drug2.calculated_properties.ADMET.hia['probability'] : '-'}</div>
                  <div>{drug2.calculated_properties.ADMET ? drug2.calculated_properties.ADMET.biodegradation['probability'] : '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {renderCenter()}
      <Fullorb/>
    </>
  );
}