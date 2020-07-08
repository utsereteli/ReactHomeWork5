
import React from 'react';
import NumberFormat from 'react-number-format';

const CountryStatistic = ({ countryData }) => {

    return (
      <>
          <table>
              <thead>
                  <tr>
                      <th>ქვეყანა</th>
                      <th>დაიმფიცირებული</th>
                      <th>გარდაცვლილი</th>
                      <th>გამოჯანმრთელებულ</th>
                      <th>თარიღი</th>
                  </tr>
              </thead>
          </table>

          <div className="table-wrapper">
            <table>
                <tbody>
                {
                    countryData.sort((a, b) => b.Confirmed - a.Confirmed).map((data, i) =>
                    <tr key={i}>
                    <td>
                        {data.Country}
                    </td>
                    <td>
                        <NumberFormat
                            value={data.Confirmed}
                            thousandSeparator={true}
                            displayType={'text'}
                        />
                    </td>
                    <td>
                        <span className="red">
                        <NumberFormat
                            value={data.Deaths}
                            thousandSeparator={true}
                            displayType={'text'}
                        />
                        </span>
                    </td>
                    <td>
                        <span className='green'>
                            <NumberFormat
                                value={data.Recovered}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        </span>
                    </td>
                    <td>{data.Date.split('T')[0]}</td>
                </tr>
                    )
                }
                </tbody>
            </table>
          </div>
        </>
    )
};

export default CountryStatistic;
