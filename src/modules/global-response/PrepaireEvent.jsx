import { memo } from 'react'
import { diseaseToColor } from '.'
import './styles.scss'
import vector from './vector.png'

const PrepaireEvent = ({ onClick, created, prepaireEvent, data }) => {
  // const [isShow, setIsShow] = useState(false)
  // console.log(data)
  // console.log(prepaireEvent)

  // const showInfo = () => (
  //   <div
  //     className='prepaire-event__modal'
  //     style={{ opacity: isShow ? 1 : 0, visibility: isShow ? 'visible' : 'hidden' }}>
  //     <p>{data.city.name}</p>
  //     <h3 style={{ textAlign: data.description ? 'center' : 'left' }}>{data.title}</h3>
  //     <p style={{ textAlign: 'center' }}>{data.description}</p>
  //   </div>
  // )

  if ((data && data.type !== 'event') || (prepaireEvent && prepaireEvent.type !== 'event')) {
    return (
      <div
        onClick={onClick}
        style={{
          width: 15,
          height: 15,
          backgroundColor: diseaseToColor(prepaireEvent?.type || data?.type),
          border: '1px solid #000',
          borderRadius: '50%',
          position: 'relative',
          zIndex: 100,
          opacity: created ? 1 : 0.7,
          // boxShadow: `${generateShadow()} ${color}`,
          cursor: 'pointer',
        }}>
        {/* {created && showInfo()} */}
      </div>
    )
  }

  return (
    <div className='prepaire-event' onClick={onClick}>
      {/* {created && showInfo()} */}
      <img src={vector} alt='Prepaire Event' style={{ opacity: created ? 1 : 0.6 }} />
    </div>
  )
}

export default memo(PrepaireEvent)
