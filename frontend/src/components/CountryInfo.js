import PropTypes from 'prop-types';

function CountryInfo({ countryData }) {
    return (
        <div className="country-info">
            <h2>{countryData.name.common}</h2>
            <p><strong>Capital:</strong> {countryData.capital ? countryData.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> {countryData.region}</p>
            <p><strong>Subregion:</strong> {countryData.subregion}</p>
            <p><strong>Population:</strong> {countryData.population}</p>
            <p><strong>Area:</strong> {countryData.area} km²</p>
            <p><strong>Languages:</strong> {Object.values(countryData.languages).join(', ')}</p>
            <p><strong>Currencies:</strong> {Object.values(countryData.currencies).map(currency => currency.name).join(', ')}</p>
            <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} />
        </div>
    );
}
CountryInfo.propTypes = {
    countryData: PropTypes.object.isRequired
};

export default CountryInfo;