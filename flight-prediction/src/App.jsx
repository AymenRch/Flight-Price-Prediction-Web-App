// src/FlightPricePredictor.js

import React, { useState, useEffect } from 'react';

function FlightPricePredictor() {
  const [formData, setFormData] = useState({
    airline: '',
    source_city: '',
    departure_time: '',
    stops: '',
    arrival_time: '',
    destination_city: '',
    class: '',
    departure_date: '',
  });

  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);

  // Load linear_model.json once
  useEffect(() => {
  fetch('/linear_model.json')
    .then(res => res.json())
    .then(data => setModel(data))
    .catch(err => console.error('Model load error:', err));
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const airlineDict = {
  AirAsia: 0, Indigo: 1, GO_FIRST: 2, SpiceJet: 3, Air_India: 4, Vistara: 5
};
const sourceDict = {
  Delhi: 0, Hyderabad: 1, Bangalore: 2, Mumbai: 3, Kolkata: 4, Chennai: 5
};
const departureDict = {
  Early_Morning: 0, Morning: 1, Afternoon: 2, Evening: 3, Night: 4, Late_Night: 5
};
const stopsDict = { zero: 0, one: 1, two_or_more: 2 };
const arrivalDict = {
  Early_Morning: 0, Morning: 1, Afternoon: 2, Evening: 3, Night: 4, Late_Night: 5
};
const destinationDict = {
  Delhi: 0, Hyderabad: 1, Mumbai: 2, Bangalore: 3, Chennai: 4, Kolkata: 5
};
const classDict = { Economy: 0, Business: 1 };


  const encodeFeatures = (data) => {
  const airline = airlineDict[data.airline];
  const source_city = sourceDict[data.source_city];
  const departure_time = departureDict[data.departure_time];
  const stops = stopsDict[data.stops];
  const arrival_time = arrivalDict[data.arrival_time];
  const destination_city = destinationDict[data.destination_city];
  const travel_class = classDict[data.class];

  const today = new Date();
  const dep = new Date(data.departure_date);
  const dateDiff =
    Math.floor((dep - today) / (1000 * 60 * 60 * 24)) + 1;

  return [
    airline,
    source_city,
    departure_time,
    stops,
    arrival_time,
    destination_city,
    travel_class,
    dateDiff
  ];
};


  const predict = (features, model) => {
    const { coef, intercept } = model;
    let y = intercept;
    for (let i = 0; i < coef.length; i++) {
      y += coef[i] * features[i];
    }
    return Math.round(y);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model) return;

    const features = encodeFeatures(formData);
    const y = predict(features, model);
    setPrediction(y);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-blue-700 mb-8">Flight Price Prediction</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg space-y-6">
        
        {/* Airline Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Airline</label>
          <select
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Airline</option>
            <option value="SpiceJet">SpiceJet</option>
            <option value="AirAsia">AirAsia</option>
            <option value="Vistara">Vistara</option>
            <option value="GO_FIRST">GO_FIRST</option>
            <option value="Indigo">Indigo</option>
            <option value="Air_India">Air India</option>
          </select>
        </div>

        {/* Source City Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Source City</label>
          <select
            name="source_city"
            value={formData.source_city}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Source City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        {/* Departure Time Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Departure Time</label>
          <select
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Departure Time</option>
            <option value="Evening">Evening</option>
            <option value="Early_Morning">Early Morning</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
            <option value="Late_Night">Late Night</option>
          </select>
        </div>

        {/* Stops Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Stops</label>
          <select
            name="stops"
            value={formData.stops}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Stops</option>
            <option value="zero">Zero</option>
            <option value="one">One</option>
            <option value="two_or_more">Two or More</option>
          </select>
        </div>

        {/* Arrival Time Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
          <select
            name="arrival_time"
            value={formData.arrival_time}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Arrival Time</option>
            <option value="Night">Night</option>
            <option value="Morning">Morning</option>
            <option value="Early_Morning">Early Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Late_Night">Late Night</option>
          </select>
        </div>

        {/* Destination City Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Destination City</label>
          <select
            name="destination_city"
            value={formData.destination_city}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Destination City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        {/* Class Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Departure Date Field */}
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">Departure Date</label>
          <input
            type="date"
            name="departure_date"
            min={new Date().toISOString().split('T')[0]}
            value={formData.departure_date}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Predict
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg text-green-700">
          <h2 className="text-xl font-semibold">Your Flight Price: ₹{prediction}</h2>
        </div>
      )}
    </div>
  );
}

export default FlightPricePredictor;
