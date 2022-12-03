import {Box, IconButton, Stack, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import AnimationVideo from '../../../assets/animation.mp4';
import {useEffect, useRef, useState} from "react";
import Miniature from '../../../assets/img/miniature.png';
import {PlayButton} from "../../../infrastructure/components/Play.button";

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
      top: '0%',
      left: '0%',
      transform: `translate(${show ? '-10' : '23'}%, ${show ? '0' : '-20'}%) scale(${show ? 1 : 0})`,
      zIndex: 11
    }}>
      <Box sx={{position: 'relative'}}>
        <IconButton onClick={() => setShow(false)}
                    sx={{position: 'absolute', top: 5, right: '-19%', zIndex: 10, border: `2px solid white`}}>
          <Close htmlColor="white"/>
        </IconButton>
        <video ref={videoRef} src={AnimationVideo} controls width="120%" style={{borderRadius: 10}}/>
      </Box>
    </Box>
    <Box sx={{
      '.hover': {display: 'none'},
      '&:hover .hover': {display: 'block'},
      position: 'absolute',
      top: 145,
      right: 100,
      zIndex: 10,
      visibility: show ? 'hidden' : 'show'
    }}>
      <Stack direction="row" spacing={0} sx={{alignItems: 'center', pl: 2, pt: 1, pb: 1, pr: 5}}>
        <Box>
          <PlayButton onClick={() => setShow(true)}/>
        </Box>
        <Typography variant="body1" sx={{width: 50, fontSize: 12, fontWeight: 'bold', lineHeight: 1}}>BioMechanic
          Video</Typography>
      </Stack>
      <Box className="hover" sx={{
        position: 'absolute',
        zIndex: 1000000,
        width: 230,
        right: 0,
        backgroundColor: 'white',
        p: 2,
        borderRadius: 5,
      }}>
        <Stack spacing={2}>
          <Typography fontSize={16} fontWeight="bold">BioMechanic Video</Typography>
          <Typography fontSize={14}>Click on the play button to see the animation</Typography>
          <img src={Miniature} alt="miniature" style={{width: 200, height: 100}}/>
        </Stack>
      </Box>
    </Box>
  </>)
}
