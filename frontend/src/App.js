import React from 'react';
import CountryInformation from './components/CountryInformation';
import GeneratePptxButton from './components/GeneratePptxButton';

function App() {
    return (
        <div className="App">
            <h1>Country Details</h1>
            <CountryInformation />
            <GeneratePptxButton />
        </div>
    );
}

export default App;