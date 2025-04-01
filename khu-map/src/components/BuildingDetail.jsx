import "../styles/BuildingDetail.css";
import { loremIpsum } from "../constants/constants";


export default function BuildingDetail({ hidden }) {
    return (
        <div className="wrap" style={{ display: hidden ? "block" : "none" }} onMouseDown={(e) => { e.stopPropagation() }}>
            {/* <img src="" alt="" /> */}
            <div className="info-wrap">
                <div className="building-name">공학관 </div>
                <div className="button-wrap">
                    <button>출발</button>
                    <button>도착</button>
                </div>
                <div className="building-detail">{loremIpsum.substring(0, 400)}</div>
            </div>
        </div>
    )
}