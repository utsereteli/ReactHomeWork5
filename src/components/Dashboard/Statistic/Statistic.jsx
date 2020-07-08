import React from 'react';
import ReactCountryFlag from "react-country-flag";
import NumberFormat from 'react-number-format';
import axios from "axios";
import Link from 'next/link'

import './Statistic.scss';


const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '82vh'
    }
  };

const Statistic = ({ data, setSelect, pageSelect, search, filtered }) => {
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [modalData,setModalData] = React.useState([]);
    let countries = [];
    if (data.Countries) {
        countries = data.Countries;
    }

    return (
        <>
            <div className="statistic">
                <div className="infected-country-wrapper">
                    <div className="head">
                        <h1>უახლესი სტატისტიკა</h1>
                            <div className='btn export' onClick={()=> window.open("https://api.covid19api.com/export", "_blank")}>EXPOT.RAR</div>

                        <div className="sort">
                            <input type="text" name='search' placeholder='ძებნა...' onInput={(event)=> search(event.target.value)}/>

                            <select name="page" onChange={(event) => setSelect(event.target.value)}>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="75">75</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </select>

                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ქვეყანა</th>
                                <th>სულ დაინფიცირებული</th>
                                <th>დღეს დაინფიცირებულა</th>
                                <th>დღეს გარდაიცვალა</th>
                                <th>დღეს გამოჯანმრთელდა</th>
                                <th>სულ გარდაიცვლილი</th>
                                <th>სულ გამოჯანმრთელებული</th>
                                <th>ქმედება</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="table-wrapper">
                        <table>
                            <tbody>
                                {countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
                                    .filter(e => e.Country.toLowerCase().includes(filtered.toLowerCase()))
                                    .slice(0, pageSelect)
                                    .map((data, i) =>
                                        <tr key={i}>
                                            <td>
                                                <div className="country">
                                                    <ReactCountryFlag countryCode={data.CountryCode} svg style={{
                                                        width: '1.5rem',
                                                        height: '1.5rem',
                                                        marginRight: '0.5rem'
                                                    }}
                                                        title={data.Country} />
                                                    {data.Country}
                                                </div>
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    value={data.TotalConfirmed}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    value={data.NewConfirmed}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td>
                                                <span className='red'>+
                                                    <NumberFormat
                                                        value={data.NewDeaths}
                                                        thousandSeparator={true}
                                                        displayType={'text'}
                                                    />
                                                </span>
                                            </td>
                                            <td>
                                                <span className='green'>-

                                                <NumberFormat
                                                    value={data.NewRecovered}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />
                                                </span>
                                            </td>
                                            <td>
                                                <NumberFormat
                                                    value={data.TotalDeaths}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                /></td>
                                            <td>
                                                <NumberFormat
                                                    value={data.TotalRecovered}
                                                    thousandSeparator={true}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td>
                                              <Link  href="/countries/[slug]" as={`/countries/${data.CountryCode}`} >
                                                <div className='btn'>
                                                  ნახვა
                                                  </div>
                                                </Link>
                                          </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Statistic;
