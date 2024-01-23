import React, { useState } from 'react';

function App() {
  const [temperature, setTemperature] = useState('');
  const [fromScale, setFromScale] = useState('c');
  const [toScale, setToScale] = useState('f');
  const [result, setResult] = useState(null);
  const scales = ['c', 'f', 'k'];

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleFromScaleChange = (e) => {
    setFromScale(e.target.value);
  };

  const handleToScaleChange = (e) => {
    setToScale(e.target.value);
  };

  const convertTemperature = () => {
    const inputTemperature = parseFloat(temperature);
    if (isNaN(inputTemperature)) {
      setResult('Geçerli bir sayı giriniz.');
      return;
    }

    const convertedTemperature = convert(fromScale, toScale, inputTemperature);
    setResult(`${inputTemperature} ${getScaleName(fromScale)} = ${convertedTemperature.toFixed(2)} ${getScaleName(toScale)}`);
  };

  const convert = (from, to, value) => {
    if (from === 'c' && to === 'f') {
      return (value * 9/5) + 32;
    } else if (from === 'f' && to === 'c') {
      return (value - 32) * 5/9;
    } else if (from === 'c' && to === 'k') {
      return value + 273.15;
    } else if (from === 'k' && to === 'c') {
      return value - 273.15;
    } else if (from === 'f' && to === 'k') {
      return (value - 32) * 5/9 + 273.15;
    } else if (from === 'k' && to === 'f') {
      return (value - 273.15) * 9/5 + 32;
    } else {
      return value; // no conversion needed
    }
  };

  const getScaleName = (scale) => {
    switch (scale) {
      case 'c':
        return 'Celsius';
      case 'f':
        return 'Fahrenheit';
      case 'k':
        return 'Kelvin';
      default:
        return '';
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ color: '#333' }}>Sıcaklık Dönüştürücü</h1>
      <input type="text" value={temperature} onChange={handleTemperatureChange} placeholder="Sıcaklık Değeri" style={{ margin: '10px' }} />
      <br />
      <select value={fromScale} onChange={handleFromScaleChange} style={{ margin: '10px' }}>
        {scales.map(scale => (
          <option key={scale} value={scale}>{getScaleName(scale)}</option>
        ))}
      </select>
      <span style={{ fontSize: '24px', margin: '10px' }}>&rarr;</span>
      <select value={toScale} onChange={handleToScaleChange} style={{ margin: '10px' }}>
        {scales.map(scale => (
          <option key={scale} value={scale}>{getScaleName(scale)}</option>
        ))}
      </select>
      <br />
      <button onClick={convertTemperature} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Dönüştür</button>
      {result && <div style={{ marginTop: '20px', color: 'green' }}>{result}</div>}
    </div>
  );
}

export default App;
