import { Orb } from "./Orb";
import { useEffect, useRef } from "react";
import { Slider } from "@mui/material";

export const PredictiveWorld = () => {
  let ctx = null;
  const canvas = useRef()
  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = 'black', width = 1 } = style;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  const draw_rectangle = (x,y,w,h,deg) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees_to_radians(deg+90));
    ctx.fillStyle = "#209ff4";
    ctx.fillRect(-1*(w/2), -1*(h/2), w, h);
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
    /*drawLine({ x: 0, y: 0, x1: 300, y1: 300 }, { color: '#209ff4', width: 2, opacity: 0.24 });
    drawLine({ x: 300, y: 0, x1: 0, y1: 300 }, { color: '#209ff4', width: 2, opacity: 0.24 });*/

    var bars = 8;
    var radius = 130;
    for(var i = 0; i < bars; i++) {
      var x = radius * Math.cos(degrees_to_radians(i * 45));
      var y = radius * Math.sin(degrees_to_radians(i * 45));
      draw_rectangle(x + 250, y + 250, 1, 120, i * 45);
    }

    ctx.fillRect(150,150,10,10);
    ctx.fillRect(180,180,10,10);

    ctx.fillRect(360,360,10,10);
    ctx.fillRect(320,320,10,10);
  }, []);

  return (
    <>
      <canvas ref={canvas} style={{position: 'absolute', height: 500, width: 500}}/>
      <Orb/>
    </>
  );
}
