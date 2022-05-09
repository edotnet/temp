import { Orb } from "./custom-orb/Orb";
import { useEffect, useRef } from "react";
import './Orb.css'
import { Fullorb } from "./FullOrb";

export const PredictiveWorld = () => {
  let ctx = null;
  const canvas = useRef()
  const bars = 4;
  const radius = 130;
  const degrees = 90;


  const drawLine = (x,y,w,h,deg) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees_to_radians(deg+90));
    ctx.fillStyle = "#209ff4";
    ctx.fillRect(-1*(w/2), -1*(h/2), w, h);
    ctx.restore();
  }

  const drawCircleDot = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, 2 * Math.PI, true);
    ctx.closePath()
    ctx.fill()
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
    ctx.closePath()
    ctx.stroke()
  }

  const drawDot = (lineDeg, value, color) => {
    ctx.save();

    const totalDeg = lineDeg * degrees;
    let x = radius * Math.cos(degrees_to_radians(totalDeg));
    let y = radius * Math.sin(degrees_to_radians(totalDeg));
    ctx.translate(x+250, y+250);
    ctx.rotate(-degrees_to_radians(totalDeg));
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    if (totalDeg % 90) {
      //ctx.fillRect(-5, value, 10, 10);
      drawCircleDot(0, value)
    }else {
      //ctx.fillRect(value, -5, 10, 10);
      drawCircleDot(value, 0)
    }

    ctx.restore();
  }

  const degrees_to_radians = (degrees) => {
    return degrees * Math.PI / 180;
  }
  const radians_to_degrees = (radians) => {
    return radians * 180 / Math.PI;
  };
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  }, []);
  useEffect(() => {

    for(let i = 0; i < bars; i++) {
      let x = radius * Math.cos(degrees_to_radians(i * degrees));
      let y = radius * Math.sin(degrees_to_radians(i * degrees));
      drawLine(x + 250, y + 250, 1, 120, i * degrees);
    }

    drawDot(1, 0, "#209ff4")//out 45
    drawDot(1, 30, "red")//out 45
    drawDot(2, 0, 'red')//in 90
    drawDot(3, 0, "red")//in 135
    drawDot(3, 30, "#209ff4")//in 135
    drawDot(4, 0, 'red')//out 180
    drawDot(4, -20, '#209ff4')//out 180
    /*drawDot(5, 0)//out 225
    drawDot(6, 0)//in 270
    drawDot(7, 0)//in 315
    drawDot(8, 10)//out 160*/
  }, []);

  return (
    <>
      <canvas ref={canvas} style={{position: 'absolute', height: 500, width: 500}}/>
      <Fullorb />
    </>
  );
}
