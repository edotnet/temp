import {Box, IconButton} from "@mui/material";
import {Close, PlayCircle} from "@mui/icons-material";
import AnimationVideo from '../../../assets/animation.mp4';
import {useEffect, useRef, useState} from "react";
import theme from "../../../infrastructure/config/theme";


export const Animation = () => {
  const [show, setShow] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef.current) {
      if (show) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [show]);

  return (<>
      <Box sx={{
        transition: 'all 0.5s ease-in-out',
        visibility: show ? 'visible' : 'hidden',
        position: 'absolute',
        top: '50%',
        left: '0%',
        transform: `translate(${show?'-10':'-0'}%, ${show?'-50':'-70'}%) scale(${show?1:0})`,
        zIndex: 11
      }}>
        <Box sx={{position: 'relative'}}>
          <IconButton onClick={() => setShow(false)} sx={{position: 'absolute', top: 5, right: '-19%', zIndex: 10, border: `2px solid white`}}>
            <Close htmlColor="white"/>
          </IconButton>
          <video ref={videoRef} src={AnimationVideo} controls width="120%" style={{borderRadius: 10}}/>
        </Box>
      </Box>
      <IconButton sx={{position: 'absolute', top: '35%', zIndex: 10, visibility: show ? 'hidden' : 'show'}}
                  onClick={() => setShow(true)}>
        <PlayCircle htmlColor="green"/>
      </IconButton>
    </>)
}
