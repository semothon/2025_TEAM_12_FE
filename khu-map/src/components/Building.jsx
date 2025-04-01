import { useEffect, useState } from "react"
import "../styles/building.css";
import BuildingDetail from "./BuildingDetail";

export default function Building({ src, x, y, postScale, onClick, isSelected }) {

    const [size, setSize] = useState({ width: 0, height: 0 });

    // props: { x: number, y: number, src: string, postScale: number, buildingID: number }

    useEffect(
        () => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setSize({
                    width: img.width,
                    height: img.height
                });
            }
        }
    )

    // TODO: 백엔드의 건물 데이터베이스 확인하고 API응답 조율하기
    // const fetchBuildingInfo = async (buildingID) => {
    //     const response = await fetch(`http://localhost:8080/building/${buildingID}`);
    //     const data = await response.json();
    //     return data;
    // }

    const style = {
        position: "absolute",
        width: size.width * postScale + "px",
        height: size.height * postScale + "px",
        left: x * postScale + "px",
        top: y * postScale + "px",
    }

    return (
        <div style={style}>
            <img
                style={{ width: "100%", height: "100%" }}
                src={src}
                className="building"
                onClick={onClick}
                onMouseDown={(e) => { e.stopPropagation() }}
            />
            <BuildingDetail hidden={isSelected} />
        </div>
    )
}