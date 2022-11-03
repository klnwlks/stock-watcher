import type { Component } from "solid-js";
import type { IInfo, ICInfo } from '../types'
import { CType } from "../types"; 
import { onMount, createEffect } from 'solid-js'

interface IProps {
    data: IInfo[] | ICInfo[] 
    high: number
    type: CType
}

const Chart: Component<IProps> = (props) => {
  let cvs: HTMLCanvasElement;

  onMount(() => {
    cvs.getContext('2d'); 
    draw(props.data);
  });

  createEffect(() => draw(props.data))

  // had to get typescript to shutup
  const draw = (points: any[]) => {
    points.reverse();
    let x, y;
    let w = cvs.width;
    let h = cvs.height;
    let ctx: CanvasRenderingContext2D | null;

    ctx = cvs.getContext('2d'); 
    ctx!.clearRect(0, 0, w, h);

    ctx?.beginPath();
    for (let i = 0; i < points.length; i++) {
      // improve this equation
      if (props.type == CType.STOCK) {
	y = h - (+ points[i]['2. high'] / (props.high * 1.75) * h);
      } else {
	y = h - (+ points[i]['2b. high (USD)'] / (props.high * 1.75) * h);
      }
      
      x = (w / points.length) * i;

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
