import type { Component } from "solid-js";
import type { IInfo } from '../types'
import { onMount } from 'solid-js'

interface IProps {
    data: IInfo[] 
    high: number
}

const Chart: Component<IProps> = (props) => {
  let cvs: HTMLCanvasElement;
  onMount(() => {
    cvs.getContext('2d'); 
    draw();
  });

  function draw() {
    let x, y;
    let w = cvs.width;
    let h = cvs.height;
    let ctx: CanvasRenderingContext2D | null;

    ctx = cvs.getContext('2d'); 

    ctx?.beginPath();
    for (let i = 0; i < props.data.length; i++) {
      // improve this equation
      y = h - (+ props.data[i]['2. high'] / (props.high * 1.75) * h);
      x = (w / props.data.length) * i;
      ctx?.lineTo(x, y);
    }
    ctx?.stroke()
  }

  return (
    <canvas ref={cvs!}>
    </canvas>
  );
}

export default Chart;
