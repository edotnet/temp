import { Orb } from "./Orb";
import { useEffect, useRef } from "react";
import { Slider } from "@mui/material";

export const PredictiveWorld = () => {
  let ctx = null;
  const canvas = useRef()
  const bars = 8;
  const radius = 130;
  const graus = 45;


  const drawLine = (x,y,w,h,deg) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees_to_radians(deg+90));
    ctx.fillStyle = "#209ff4";
    ctx.fillRect(-1*(w/2), -1*(h/2), w, h);
    ctx.restore();
  }

  const drawDot = (lineDeg, value) => {
    ctx.save();
    var x = radius * Math.cos(degrees_to_radians(lineDeg * graus));
    var y = radius * Math.sin(degrees_to_radians(lineDeg * graus));
    ctx.translate(x+250, y+250);
    ctx.rotate(-degrees_to_radians(lineDeg*graus));
    ctx.fillStyle = "#209ff4";
    ctx.fillRect(-5, value, 10, 10);
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

    var bars = 8;
    var radius = 130;
    for(var i = 0; i < bars; i++) {
      var x = radius * Math.cos(degrees_to_radians(i * graus));
      var y = radius * Math.sin(degrees_to_radians(i * graus));
      drawLine(x + 250, y + 250, 1, 120, i * graus);
    }

    drawDot(1, -50)
    drawDot(2, -50)
    drawDot(3, 20)
    drawDot(4, 20)
    drawDot(5, 20)
    drawDot(6, 20)
    drawDot(7, 20)
    drawDot(8, 10)
  }, []);

  return (
    <>
      <canvas ref={canvas} style={{position: 'absolute', height: 500, width: 500}}/>
      <Orb/>
    </>
  );
}
