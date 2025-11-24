import './RouteList.css';
import routesData from '../../data/routes.json';

import { TbArrowAutofitWidth } from "react-icons/tb";   // yellow arrow icon
import { FaBus } from "react-icons/fa";                  // bus count
import { MdOutlineTrain } from "react-icons/md";         // stop count
import { LuNetwork } from "react-icons/lu";              // distance

function RouteList() {
    return (
        <div className="route-list">
            <div className="cards-container">

                {routesData.map((route) => (
                    <div className="card" key={route.id}>

                        {/* TITLE (small green text) */}
                        <h4 className="route-title">{route.title}</h4>

                        {/* MAIN NAME WITH ICON */}
                        <div className="route-main">
                            <TbArrowAutofitWidth size={26} color="#FDBE34" />
                            <h3>{route.mainName}</h3>
                        </div>

                        {/* META INFO */}
                        <div className="route-meta">
                            <span>
                                <FaBus size={18} color="#777" />
                                {route.busCount} buses
                            </span>
                            <span>
                                <MdOutlineTrain size={18} color="#777" />
                                {route.stopCount} stops
                            </span>
                            <span>
                                <LuNetwork size={18} color="#777" />
                                {route.distanceKm} km
                            </span>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default RouteList;
