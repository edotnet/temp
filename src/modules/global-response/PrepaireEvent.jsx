import { memo } from 'react'
import { diseaseToColor } from '.'
import './styles.scss'
import vector from './vector.png'

const PrepaireEvent = ({ onClick, created, prepaireEvent, data }) => {
  if ((data && data.type !== 'event') || (prepaireEvent && prepaireEvent.type !== 'event')) {
    const color = diseaseToColor(prepaireEvent?.type || data?.type)
    return (
      <div
        onClick={onClick}
        className='prepaire-event__round'
        style={{
          backgroundColor: color,
          opacity: created ? 1 : 0.7,
        }}
      />
    )
  }

  return (
    <div className='prepaire-event' onClick={onClick}>
      <img src={vector} alt='Prepaire Event' style={{ opacity: created ? 1 : 0.6 }} />
    </div>
  )
}

export default memo(PrepaireEvent)
