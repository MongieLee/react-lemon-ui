import React, {useRef} from "react";
import {PropsWithChildren} from "react";
import p1 from "./assets/1.jpg"
import p2 from "./assets/2.jpg"
import p3 from "./assets/3.jpg"
import classes from "../utils/classes";
import "./carousel.less"
import Icon from "../icon/icon";

interface CarouselProps {
  autoplay?: boolean;
  dotsPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowsVisible?: boolean;
  beforeChange?: () => void;
  afterChange?: () => void;
}

const Carousel: React.FC<PropsWithChildren<CarouselProps>> = (props) => {
  console.log(props);
  const next = () => {
  }
  const pre = () => {
  }
  const goTo = (index) => {
  }
  const generateSlickDots = ()=>{
    return [1,2,3]
  }

  const wrapperRef = useRef<HTMLDivElement>(null);
  const {children} = props
  return <div className={classes('lm-carousel-wrapper')} ref={wrapperRef}>
    <div></div>
    <Icon name={'arrow-left'}/>
    <Icon name={'arrow-right'}/>
   <div></div>
    {/*{*/}
    {/*  [p1, p2, p3].map(item => {*/}
    {/*    return (<div><img src={item} alt={'carousel'}/></div>)*/}
    {/*  })*/}
    {/*}*/}
    {children}
  </div>
}

export default Carousel;