import React, {useEffect, useState} from "react";
import axios from "axios";
import '../CSS/main.css';

const Main =()=>{
    const SERVICE_KEY ="y9tEGirnjaTKxdLQm1GMbkml8Rz%2FkmUuMQyEv9%2Bmwfl1BBaFzMUIZ8gVIsUDMCB5aFxpAil%2FmjtuyUWL9bRAhQ%3D%3D";
    type InitHospital = [{
        "경도":string,
        "데이터기준일자":string,
        "시군구명":string,
        "시도명":string,
        "신고일자":string,
        "업체명":string,
        "연락처":string,
        "연번":number,
        "위도":string,
        "읍면동면":string,
        "지번":string,
        "형태":string,
        "거리"?:number,
    }];
    type InitLocation = {
        latitude:number,
        longitude:number
    }
    const [hospitals,setHospitals]=useState<InitHospital|any[]>([]); //병원리스트
    const [location,setLocation]=useState<InitLocation>({latitude:0,longitude:0}); //내위치state

    //내 위치 위도 경도 불러오기.


    const myLocation=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocation({latitude:position.coords.latitude, longitude:position.coords.longitude})
        })
    }
    //location 값 바뀔 떄 마다 작동함. setState 안먹을 때 해결 법.
    useEffect(()=>{
        //내 위,경도 참조해서 거리 구하기...
        setHospitals(hospitals.map(item =>
            ({...item, 거리:getDistanceFromLatLonInKm(location.latitude,location.longitude,parseFloat(item.위도),parseFloat(item.경도))})))
    },[location])

    //거리구하기
    const getDistanceFromLatLonInKm=(lat1: number, lng1: number, lat2:number, lng2:number)=> {
        function deg2rad(deg:number) {
            return deg * (Math.PI/180)
        }
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2-lat1);  // deg2rad below
        let dLon = deg2rad(lng2-lng1);
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c; // Distance in km
        return d
    }

    useEffect(()=>{
        //api 호출하기
        axios.get(`https://api.odcloud.kr/api/15097026/v1/uddi:e02c2854-c453-49ee-a659-be30bc05ad63?page=1&perPage=200&serviceKey=${SERVICE_KEY}`)
            .then(res=>{
                console.log(res.data.data)
                setHospitals(res.data.data)
                setLocation({longitude:0, latitude:0})
            })
    },[])
    return(
            <div className={"main-container"}>
                <div className={"main-container-inner"}>
                    <button onClick={()=>{
                        myLocation()
                    }}>
                        내주변 동물병원 찾기
                    </button>
                    <div className={"main-table"}>
                        <div className={"main-table-row"}>
                        <p>업체명</p>
                        <p>연락처</p>
                        <p>거리</p>
                        </div>
                        {hospitals?
                            hospitals.sort((a,b)=>(a.거리-b.거리)).map((item,i)=>(
                                <div className={"main-table-row"} key={i}>
                                    <p>{item.업체명}</p>
                                    <p>{item.연락처}</p>
                                    <p>{item.거리}</p>
                                </div>
                            )):null
                        }
                    </div>
                </div>
            </div>
    );
}

export default Main;
