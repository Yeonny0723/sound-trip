import Base from "../components/Base";
import tags from "../assets/tags_lst.json";
import {useState, useEffect} from "react";
import PlayPauseBtn from "../components/PlayPauseBtn";

const Home = () => {
    
    // clicked tag
    const [clickedElements, setClickedElements] = useState({});
    // audio api
    const [audios, setAudios] = useState([{}]);

    // Update clicked tags on change
    const onchange = (e) => {
        const new_el = e.target.value

        if (clickedElements[new_el]){
            setClickedElements(tags => {
                const copy = {...tags}
                delete copy[new_el]
                return copy
            })
        } else {
            setClickedElements(tags => ({...tags, [new_el]: true}))
        }
    }

    // update audio list
    useEffect(()=> {
        if (clickedElements){
            const params = Object.keys(clickedElements).join("-") // concat selected tags that will be passed as url param
            fetch(`/audio?tags=${params}`).then(
                res => res.json()
            ).then(
                data => {
                    setAudios(data)
                }
            )
        }
    }, [clickedElements])


    return (
    <div>
        {/* Welcome section */}
        <Base id="welcome-section" title={"Welcome! 👋"} content={
        <div style={{
            width:"fit-content",
            height:"fit-content",
            backgroundColor: "rgba(255,255,255,0.5)",
            padding: "3vw",
            borderRadius: "20px",
        }}>
            &nbsp;&nbsp;&nbsp;&nbsp;A Soundtrip is an online background noise recommender to help <br></br>
            you to focus and tune out unpleasant sounds from your environment. <br></br>
            <b><i>Click a button</i></b> below to continue! <br></br>
            I hope your experience is enjoyable and useful for you! <br></br>
            — Juyeon Kim 
        </div>
        } href={"preference-section"} />

        {/* Preference section */}
        <Base id="preference-section" title={"Choose all your sound preference"} content={
        <div className="tag-container">
            {tags.map((tag)=>{
                return (
                <div className="tag">
                    <input type="checkbox" onChange={onchange} id={tag} name={tag} value={tag} style={{display:"none"}}/>
                    <label for={tag}># {tag}</label>
                </div>
                )
            })}
        </div>
        } href={"detail-section"}/>

        {/* Detail section */}
        <Base  arrow={"up"} id="detail-section" title={"Where do you want to travel to?"} content={
        <div className="img-container">
            {audios.map((audio)=>{
                const searchWord = audio[0]
                if (searchWord !== undefined){
                    return (
                        <div className="audio-container" 
                            style={{
                            backgroundImage:`url("https://source.unsplash.com/random/?${searchWord.trim()}")`
                            }}>
                            <h3 style={{paddingLeft:"1.2vw", textShadow:"0 0 1vw rgba(0,0,0,0.7)"}}>{audio[0]}</h3>
                            <PlayPauseBtn audio={audio[1]}/>
                        </div>
                    )
                }
            })}
        </div>
        } href={"preference-section"}/>
    </div>
    )
}

export default Home;