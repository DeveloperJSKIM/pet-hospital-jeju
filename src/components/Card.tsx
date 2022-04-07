import React from "react";
import cat from '../asset/cat.png'
import cat2 from '../asset/cat2.png'
import dog from '../asset/dog.png'
import '../CSS/card.css'
import {AiFillPhone} from 'react-icons/ai'


const Card =({title, address,call,rest,time,
                 distance}:{title:string, address:string,call:string,rest:string,time:string,
    distance:number} )=>{

    const randomImg = [cat,cat2,dog]
    return(
        <>
            <div className={"container"}>
                <div className={"icon-box"}>
                    <img className={"icon-img"} src={randomImg[Math.floor(Math.random() * (3))]} alt={"iconImg"}/>
                </div>
                <div className={"card-text-box"}>
                    <b>{title}</b>
                    <span>{address}</span>
                    <span>{call}</span>
                </div>
                <div className={"card-text-box card-text-box-side"}>
                    {
                        rest
                        ?<span>쉬는날: {rest}</span>
                        :<span>데이터없음</span>
                    }
                    <span>{time}</span>
                </div>
                <div className={"card-text-box card-text-box-side"}>
                    {
                        distance<100
                            ? <h4>{distance}Km</h4>
                            : <h4>999Km</h4>
                    }
                </div>
                <div className={"card-text-box card-text-box-side"}>
                    <a href={`tel:${call}`}><AiFillPhone size={30}/></a>
                </div>
            </div>
        </>
    )
}
export default Card
