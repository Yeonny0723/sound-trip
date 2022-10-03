import { useEffect, useState } from "react";

const Base = ({arrow="down", id, title, content, href}) => {

    // scroll event listener to window 
    const [progress, setProgress] = useState(33);

    useEffect(() => {
        const handleScroll = event => {
            const total_height = document.documentElement.scrollHeight
            let current_height = document.documentElement.scrollTop + 950
            setProgress(Math.round(current_height / total_height * 100))
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
        
    }, []);

    return (
    <div className="container" id={id}>
        <div className="bar">
            <div className="progress" style={{width: `${progress}%`}}></div>
        </div>
        <div className="title">
            <h1>{title}</h1>
        </div>
        <div className="content">{content}</div>
        <a href={`#${href}`} style={{textDecoration:"none"}}>
        <div id="page-button">
            <i className={`fa-solid fa-angle-${arrow} fa-2xl`}></i>
        </div>
        </a>
    </div>
    )
}

export default Base;