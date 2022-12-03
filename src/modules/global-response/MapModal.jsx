import { Close } from '@mui/icons-material'
import { Backdrop, Button, Fade, IconButton, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo } from 'react'

const MapModal = ({ data, setData }) => {
  const { isOpen, cases, deaths, name: country, disease } = data

  const showStatistic = (num, info) => (
    <>
      <Typography variant='h5' fontWeight={700} fontSize={20} {...num?.typographyProps}>
        {num.title}
      </Typography>
      <Typography variant='body2' {...info?.typographyProps}>
        {info.title}
      </Typography>
    </>
  )

  const modalCloseButton = () => (
    <IconButton
      onClick={() => setData({ ...data, isOpen: false })}
      sx={{
        borderRadius: 1,
        backgroundColor: '#000',
        height: 30,
        ml: 'auto',
        ':hover': { backgroundColor: '#000c' },
      }}>
      <Close sx={{ color: '#fff' }} />
    </IconButton>
  )

  console.log(data)

  return (
    <Modal
      open={isOpen}
      onClose={() => setData({ ...data, isOpen: false })}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500, sx: { backgroundColor: '#0000' } }}>
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: '52.5%',
            transform: 'translate(0, -50%)',
            width: 250,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 1,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          <div style={{ paddingLeft: 10, paddingBottom: 25 }}>
            {data.modalType === 'PrepaireEvent' && (
              <>
                <div style={{ display: 'flex', alignItems: 'end', mb: 2.5 }}>
                  {modalCloseButton()}
                </div>
                <div style={{ paddingRight: 10 }}>
                  <Typography textTransform='uppercase' fontWeight={700} variant='h6'>
                    {data.title}
                  </Typography>
                  <Typography variant='body1' fontWeight={700} sx={{ mb: 1.5 }}>
                    {data.city.name}
                  </Typography>
                  <div style={{ height: 2, backgroundColor: '#000', marginBottom: 12 }}></div>
                  <Typography variant='body2'>{data.description}</Typography>
                </div>
              </>
            )}
            {data.modalType === 'marker' && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'end', mb: 2.5 }}>
                  <Typography variant='subtitle2'>Highlights</Typography>
                  {modalCloseButton()}
                </Box>
                <Typography textTransform='uppercase' fontWeight={700} variant='h6'>
                  {disease}
                </Typography>
                <Typography variant='body1' fontWeight={700} sx={{ mb: 1.5 }}>
                  {country}
                </Typography>
                <div style={{ height: 2, backgroundColor: '#000', marginBottom: 12 }}></div>
                {showStatistic({ title: cases }, { title: 'Total cases (confirmed)' })}
                {showStatistic({ title: deaths }, { title: 'Total deaths (confirmed)' })}
              </>
            )}
          </div>
          <Button
            variant='contained'
            color='primary'
            size='small'
            onClick={() => setData({ ...data, isOpen: false })}>
            send
          </Button>
        </Box>
      </Fade>
    </Modal>
  )
}

export default memo(MapModal)
