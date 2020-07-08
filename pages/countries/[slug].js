import CountryStatistic from '../../src/components/CountryStatistic'
import axios from 'axios'

const Index = (props) => (
  <div >
    <CountryStatistic countryData={props.countryData} />
  </div>
)

Index.getInitialProps = async (context) => {
  const resposne = await axios.get(`https://api.covid19api.com/total/country/${context.query.slug}`)

  return {
    countryData: resposne.data
  }
}

export default Index
