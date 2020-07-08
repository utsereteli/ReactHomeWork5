import React from 'react';
import NumberFormat from 'react-number-format';

import './GlobalInfo.scss';

function GlobalInfo({ data }) {
    let globalData = [];
    if (data.Global) {
        globalData = data.Global;
    }

    return (
        <>
            <div className="global-info">
                <ul>
                    <li className='blue'>
                        <h1>სულ ინფიცირებული</h1>
                        <div className="wrapper">
                            <div className="percentage">{((globalData.NewConfirmed / globalData.TotalConfirmed) * 100).toFixed(2)}%</div>

                            <div className="right">
                                <div className="total">
                                    <NumberFormat value={globalData.TotalConfirmed} thousandSeparator={true} displayType={'text'} />
                                </div>
                                <div className="today">
                                    <NumberFormat value={globalData.NewConfirmed} thousandSeparator={true} displayType={'text'} />
                                    <span> დღეს</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='green'>
                        <h1>გამოჯანმრთელებული</h1>
                        <div className="wrapper">
                        <div className="percentage">{((globalData.NewRecovered / globalData.TotalRecovered) * 100).toFixed(2)}%</div>

                            <div className="right">
                                <div className="total">
                                    <NumberFormat value={globalData.TotalRecovered} thousandSeparator={true} displayType={'text'} />
                                </div>
                                <div className="today">
                                    <NumberFormat value={globalData.NewRecovered} thousandSeparator={true} displayType={'text'} />
                                    <span> დღეს</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='yellow'>
                        <h1>ამჟამად დაავადებული</h1>
                        <div className="wrapper">
                        <div className="percentage">{(((globalData.TotalConfirmed - globalData.TotalRecovered - globalData.TotalDeaths) / globalData.TotalConfirmed) * 100).toFixed(2)}%</div>

                            <div className="right">
                                <div className="total">
                                    <NumberFormat value={globalData.TotalConfirmed - globalData.TotalRecovered - globalData.TotalDeaths} thousandSeparator={true} displayType={'text'} />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className='red'>
                        <h1>გარდაცვლილი</h1>
                        <div className="wrapper">
                        <div className="percentage">{((globalData.NewDeaths / globalData.TotalDeaths) * 100).toFixed(2)}%</div>

                            <div className="right">
                                <div className="total">
                                    <NumberFormat value={globalData.TotalDeaths} thousandSeparator={true} displayType={'text'} />
                                </div>
                                <div className="today">
                                    <NumberFormat value={globalData.NewDeaths} thousandSeparator={true} displayType={'text'} />
                                    <span> დღეს</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default GlobalInfo;