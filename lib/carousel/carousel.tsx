import React, {MouseEventHandler, ReactNode, useEffect, useRef, useState} from "react";
import {PropsWithChildren} from "react";
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
  const {autoplay, children, arrowsVisible = true} = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [resultChildren] = useState((): ReactNode[] => {
    let result: ReactNode[] = []
    if (children instanceof Array) {
      if (children.length > 1) {
        const last = children[0]
        const first = children[children.length - 1]
        result = [first, ...children, last]
      }
    }
    return result
  });
  const slickDotsList = resultChildren.length ? new Array(resultChildren.length - 2).fill(true) : []

  const next: MouseEventHandler = (e) => {
    if (activeIndex === slickDotsList.length - 1) {
      wrapperRef.current!.style.transform = `translateX(0%)`
      wrapperRef.current!.style.transition = `none`
      goTo(0)
    } else {
      goTo(activeIndex + 1)
    }
  }
  const pre: MouseEventHandler = (e) => {
    if (activeIndex === 0) {
      wrapperRef.current!.style.transform = `translateX(-${resultChildren.length - 1}00%)`
      wrapperRef.current!.style.transition = `none`
      goTo(slickDotsList.length - 1)
    } else {
      goTo(activeIndex - 1)
    }
  }
  const goTo = (index) => {
    setActiveIndex(index)
    wrapperRef.current!.style.transition = `all .5s`
    wrapperRef.current!.style.transform = `translateX(-${index + 1}00%)`
  }
  useEffect(() => {
    let id;
    const init = () => {
      // if (autoplay) {
      //   id = setInterval(() => {
      //     goTo(activeIndex + 1)
      //   }, 2000)
      // }
    }
    init()
    return () => {
      if (id) clearInterval(id)
    }
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div className={classes('lm-carousel')}>
      {resultChildren.length ? <>
        {arrowsVisible &&
          <Icon onClick={(e) => pre(e)}
                className={classes('lm-carousel-helper lm-carousel-arrow lm-carousel-left-arrow')}
                name={'arrow-left'}/>}
        {arrowsVisible && <Icon onClick={(e) => next(e)}
                                className={classes('lm-carousel-helper lm-carousel-arrow lm-carousel-right-arrow')}
                                name={'arrow-right'}/>}
      </> : null}
      <div className={classes('lm-carousel-wrapper')} ref={wrapperRef} style={{transform: `translateX(-100%)`}}>
        {resultChildren.length ? resultChildren : children}
      </div>
      {slickDotsList ? <div
        className={classes('lm-carousel-helper lm-carousel-slick-dots')}>
        {slickDotsList.map((_, index) => <div onClick={() => goTo(index)}
                                              className={classes('lm-carousel-slick-dots-item', index == activeIndex ? 'active' : '')}/>)}
      </div> : null}
    </div>)
}

export default Carousel;