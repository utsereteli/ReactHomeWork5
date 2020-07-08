import React from 'react';
import NumberFormat from 'react-number-format';

import './TotalPercentage.scss';


function TotalPercentage({ data }) {
    return (
        <>
            <div className="total-percentage">
                <h1>პროცენტული მაჩვენებელი</h1>
                <ul>
                    <li className='green'>
                        <h2>
                            <NumberFormat
                                value={data.Global ? ((data.Global.TotalRecovered / data.Global.TotalConfirmed) * 100).toFixed(2) : 0}
                                thousandSeparator={true}
                                displayType={'text'}
                            /> %
                        </h2>
                        <p>გამოჯანმრთელებული</p>
                    </li>
                    <li className='red'>
                        <h2>
                            <NumberFormat
                                value={data.Global ? ((data.Global.TotalDeaths / data.Global.TotalConfirmed) * 100).toFixed(2) : 0}
                                thousandSeparator={true}
                                displayType={'text'}
                            /> %
                        </h2>
                        <p>სიკვდილიანობა</p>
                    </li>
                    <li className='blue'>
                        <h2>
                            <NumberFormat
                                value={data.Global ? ((data.Global.NewConfirmed / data.Global.TotalConfirmed) * 100).toFixed(2) : 0}
                                thousandSeparator={true}
                                displayType={'text'}
                            /> %
                        </h2>
                        <p>კრიტიკული</p>
                    </li>
                    <li className='yellow'>
                        <h2>{data.Countries ? data.Countries.filter(el=> el.TotalConfirmed !== 0).length : 0}</h2>
                        <p>ინფიცირებული ქვეყნები</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TotalPercentage;