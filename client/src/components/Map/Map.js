import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import styles from "./Map.module.css";
import MapChart from "./MapChart";

const Map = ({ _globalData }) => {
  const [countryData, setCountryData] = useState([]);
  const [countryDataForMap, setCountryDataForMap] = useState({
    countryIsoCode: null,
    countryName: null,
    cntryDataNotAvailable: false
  })
  const [showToolTip, setshowToolTip] = useState(false);

  let globalData = _globalData;

  const handleCountryChange = async (countryName, countryCode) => {

    setCountryDataForMap({
      countryName: null,
      countryIsoCode: null,
      cntryDataNotAvailable: false
    })

    const countryData = globalData.filter(country => country[0].location === countryName)

    if (countryData.length) {
      setCountryData(countryData[0])

      setCountryDataForMap({
        countryName: countryName,
        countryIsoCode: countryCode,
        cntryDataNotAvailable: false
      })

    } else {
      setCountryDataForMap({
        countryName: countryName,
        countryIsoCode: countryCode,
        cntryDataNotAvailable: true
      })
    }
  }

  return (
    <div className={styles.mapcontainer}>
      <MapChart
        countryData={countryData}
        handleCountryChange={handleCountryChange}
        setTooltipVisibility={setshowToolTip}
      />

      {showToolTip && <ReactTooltip>
        {countryData && countryData[0] && (
          <div className={styles.tooltipcontainer}>
            <div className={styles.image}>
              <img
                src={`https://flagcdn.com/w40/${countryDataForMap.countryIsoCode}.png`}
                alt={countryDataForMap.countryName || countryData[0].location}
              />
              <h2>{countryDataForMap.countryName || countryData[0].location}</h2>
            </div>
            {countryDataForMap.cntryDataNotAvailable ? (<span>
              <i style={{ color: "rgba(255,0,0.5)", width: '25px' }} className="fas fa-window-close"></i>
              <strong>Data Not Available</strong>
            </span>) : countryData && countryData[0] && (<> <span>
              <i style={{ color: "rgba(0,0,255,0.5)", width: '25px' }} className="fas fa-clinic-medical"></i>
              <strong>Total Cases: </strong>
              {new Intl.NumberFormat('en-IN').format(countryData[0]?.total_cases ? countryData[0].total_cases : 0)}
            </span>
              <span>
                <i style={{ color: "rgba(0,255,0,0.5)", width: '25px' }} className="fas fa-hospital-user"></i>
                <strong>Total Vaccinations: </strong>
                {new Intl.NumberFormat('en-IN').format(countryData[0]?.total_vaccinations ? countryData[0].total_vaccinations : 0)}
              </span>
              <span>
                <i style={{ color: "rgba(255,0,0.5)", width: '25px' }} className="fas fa-skull-crossbones"></i>
                <strong>Total Deaths: </strong>
                {new Intl.NumberFormat('en-IN').format(countryData[0]?.total_deaths ? countryData[0].total_deaths : 0)}
              </span>
              <span>
                <i style={{ color: "rgba(239,255,0,0.5)", width: '25px' }} className="fas fa-procedures"></i>
                <strong>New Active: </strong>
                {new Intl.NumberFormat('en-IN').format(countryData[0]?.new_cases ? countryData[0].new_cases : 0)}
              </span> </>)}
          </div>
        )}
      </ReactTooltip>}
    </div>
  );
}

export default Map;