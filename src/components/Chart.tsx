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
    cvs.width = cvs.parentElement!.clientWidth;
    cvs.height = cvs.parentElement!.clientHeight;
    draw(props.data);
  });

  createEffect(() => draw(props.data))

  // had to get typescript to shutup
  const draw = (points: any[]) => {
    points.reverse();
    let x, y;
    let w = cvs.width;
    let h = cvs.height;
    let info = ''
    let ctx: CanvasRenderingContext2D | null;

    ctx = cvs.getContext('2d'); 
    ctx!.clearRect(0, 0, w, h);

    ctx?.beginPath();

    if (props.type == CType.STOCK) {
      y = h - (+ points[0]['2. high'] / (props.high * 1.75) * h);
    } else {
      y = h - (+ points[0]['2b. high (USD)'] / (props.high * 1.75) * h);
    }
    
    x = 0;

    ctx?.lineTo(x, y);
    
    for (let i = 0; i < points.length; i++) {
      // improve this equation
      if (props.type == CType.STOCK) {
	info = '2. high'
      } else {
	info = '2b. high (USD)'
      }
      y = h - (+ points[i][info] / (props.high * 1.75) * h);
      
      x = (w / points.length) * (i + 1);

      ctx?.lineTo(x, y);
      ctx?.fillText(points[i][info].slice(0, 7), x, y);
    }
    ctx?.stroke()
  }

  return (
    <canvas ref={cvs!}>
    </canvas>
  );
}

export default Chart;
