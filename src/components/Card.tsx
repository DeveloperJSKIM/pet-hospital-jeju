import React from "react";
import cat from '../asset/cat.png'
import cat2 from '../asset/cat2.png'
import dog from '../asset/dog.png'
import '../CSS/card.css'
import {AiFillPhone} from 'react-icons/ai'
import moment from "moment";


const Card =({title, address,call,rest,time,
                 distance}:{title:string, address:string,call:string,rest:any,time:string,
    distance:number} )=>{

    const randomImg = [cat,cat2,dog]
    const now = moment();
    const format = 'HH:mm';
    const beforeTime = moment(time?time.substring(0,5):null,format);
    const afterTime = moment(time?time.substring(6,11):null,format)
    const nowTime = moment(now,format)
    const nowDay = moment().day();
    const isOpen =()=>{
        if(nowTime.isBetween(beforeTime,afterTime)){
            if(rest.includes(nowDay)){
                return false
            }else{
                return true
            }
        }else{
            return false
        }
    }
    const restChange=()=>{
        console.log(rest)
        if(rest[0]==="무휴") {
            return "무휴"
        }else{
            let str:any=[]
            rest.map((item:number)=>{
                switch (item) {
                    case 0:
                        return str.push('일')
                    case 1:
                        return str.push('월')
                    case 2:
                        return str.push('화')
                    case 3:
                        return str.push('수')
                    case 4:
                        return str.push('목')
                    case 5:
                        return str.push('금')
                    case 6:
                        return str.push('토')
                }
            })
            return str
        }
    }

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
                        ?<span>쉬는날: {restChange()}</span>
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
                <div className={"card-text-box card-text-box-side"}>
                    {
                        isOpen()
                            ?<span style={{color:"green"}}>영업중</span>
                            :null
                    }
                </div>
            </div>
        </>
    )
}
export default Card
