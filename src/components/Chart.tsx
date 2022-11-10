import type { Component } from "solid-js";
import type { IInfo, ICInfo } from '../types'
import { CType } from "../types"; 
import { onMount, createEffect, createSignal } from 'solid-js'

interface IProps {
  // ????????/
  data: (string | (ICInfo | IInfo))[][]
  high: number
  type: CType
}

const Chart: Component<IProps> = (props) => {
  let cvs: HTMLCanvasElement;
  let drawn = false;
  let parentH: number;
  const [view, setView] = createSignal<Boolean>(false);

  onMount(() => {
    cvs.getContext('2d'); 
    cvs.width = cvs.parentElement!.clientWidth;
    cvs.height = cvs.parentElement!.clientHeight;
    parentH = cvs.parentElement!.clientHeight;
    draw(props.data);
  });

  createEffect(() => draw(props.data))

  createEffect(() => {
    if (view() && drawn) {
      cvs.height *= 2;
      draw(props.data);
      drawn = false;
    } else {
      cvs.height = parentH; 
      draw(props.data);
      drawn = true;
    }
  })

  // had to get typescript to shutup
  const draw = (points: any[]) => {
    let x = 0, y, w = cvs.width, h = cvs.height;
    let info = '';
    let ctx: CanvasRenderingContext2D | null;
    let fg = getComputedStyle(document.body).getPropertyValue('--fg');
    let fg2 = getComputedStyle(document.body).getPropertyValue('--fg2');
    let font = getComputedStyle(document.body).getPropertyValue('--font');

    if (props.type == CType.STOCK) {
      info = '2. high'
    } else {
      info = '2b. high (USD)'
    }

    ctx = cvs.getContext('2d'); 
    ctx?.clearRect(0, 0, w, h);

    ctx?.beginPath();
    ctx!.fillStyle = fg;
    ctx!.font = `15px ${font}`

    y = h - (+ points[points.length - 1][1][info] / (props.high * 1.75) * h);
    
    let j = 0;
    for (let i = points.length - 1; i >= 0; i--) {
      if (view()) {
	ctx?.moveTo(x, 0)
	ctx?.lineTo(x, h);
	j % 2 == 1 ? y = h - 20 : y = 20;
	w > 400 ? ctx?.fillText(points[i][0], x - 5, y) : null;
      }

      ctx?.lineTo(x, y);
      y = h - (+ points[i][1][info] / (props.high * 1.75) * h);

      if (w > 400 || view()) {
        ctx?.fillText(points[i][1][info].slice(0, 7), x, y);
      }

      x = (w / points.length) * (j + 1);
      j++;

      if (w > 400 || view()) {
	i--;
	x *= 2;
      }
    }
    ctx?.lineTo(w, y);

    ctx!.strokeStyle = view() ? fg2 : fg;
    ctx?.stroke()
  }

  return (
    <canvas ref={cvs!} onClick={() => setView(a => !a)}>
    </canvas>
  );
}

export default Chart;
