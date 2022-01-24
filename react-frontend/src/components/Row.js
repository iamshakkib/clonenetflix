import React, { useState } from 'react';
import Fade from 'react-reveal';
import Slider from "react-slick";
import DetailContent from './DetailContent';
import * as Icon from 'react-bootstrap-icons';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Row = ({
  actions,
  adventures,
  comedys,
  documentarys,
  familys,
  fantasys,
  horrors,
  populars,
}) => {
  //   console.log("props action value:", actions);
  //   console.log("props adventures:", adventures);
  // console.log('props comedys:', comedys);
  // console.log('props documentarys:', documentarys);
  // console.log('props familys:', familys);
  // console.log('props fantasys:', fantasys);
  // console.log('props horrors:', horrors);

  const RightArrow = (props) => {
    const { onClick } = props;
  return (
      <div
        className='slick_button'
        style={{ marginLeft: '99%' }}
        onClick={onClick}
      ><Icon.ChevronCompactRight style={{height: '100%'}} /></div>
    );
  }
  
  const LeftvArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className='slick_button'
        onClick={onClick}
      ><Icon.ChevronCompactLeft style={{height: '100%'}} /></div>
    );
  }
  const settings = {  // Slider settings
    infinite : true,
    slidesToShow : 1,
    slidesToScroll : 5,
    variableWidth : true,
    nextArrow: <RightArrow />,
    prevArrow: <LeftvArrow />
  };
  return (
    <div>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>Popular content</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {populars
                  ? populars.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>action</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {actions
                  ? actions.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>adventure</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {adventures
                  ? adventures.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
              </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>comedy</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {comedys
                  ? comedys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>documentary</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {documentarys
                  ? documentarys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>family movie</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {familys
                  ? familys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>fantasy</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {fantasys
                  ? fantasys.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className='rowStyle'>
          <h3 className='titleFont'>horror</h3>
          <div className="row">
            <div className='col'>
              <Slider {...settings}>
                {horrors
                  ? horrors.map((item) => {
                      return (
                        <div className='slick'>
                          <DetailContent id={item.id} movie={item}></DetailContent>
                        </div>
                      );
                    })
                  : ''}
                </Slider>
              </div>
            </div>
          </div>
        </Fade>
    </div>
  );
};
export default Row;
