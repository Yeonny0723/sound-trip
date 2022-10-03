import {useState} from "react"
import ReactHowler from "react-howler";


const PlayPauseBtn = ({audio}) => {
  const [playing, setPlaying] = useState(false);


  const onClick = () => {
    if (playing){
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  }

  return (
    <div>
      <ReactHowler playing={playing} src={[audio]} loop={true}/>
      <button className="audioBtn" onClick={onClick}>
        {playing ? <i className="fa-solid fa-pause"></i>:
        <i className="fa-solid fa-play"></i>
        }
      </button>
    </div>
  )
}

  export default PlayPauseBtn