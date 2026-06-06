"use client";
import { useState } from "react";

export default function Home() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState(50);
  const [restaurant, setRestaurant] = useState(15);
  const [flight, setFlight] = useState(100);

  const [calculatedTotal, setCalculatedTotal] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = () => {
    // Según el demo: El hotel cobra tarifa completa por adulto y mitad por niño.
    // El restaurante y vuelo parecen ser un precio fijo del "combo" en la lógica del maestro.
    const hotelCost = (hotel * adults) + ((hotel / 2) * children);
    const total = hotelCost + restaurant + flight;
    
    setCalculatedTotal(total);
    setIsCalculated(true);
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "500px", backgroundColor: "#fdfdfd" }}>
        
        <h2 className="text-center fw-bold mb-1">Agencia de Viajes - Cotizador</h2>
        <p className="text-center text-dark mb-4" style={{ fontSize: "0.95rem" }}>
          El precio del hotel se ajusta por persona y el vuelo incluye ida y vuelta.
        </p>
        
        <div className="row g-3">
          {/* Adultos y Niños */}
          <div className="col-6">
            <label className="form-label fw-bold mb-1">Adultos:</label>
            <input 
              type="number" 
              className="form-control" 
              min="1" 
              value={adults} 
              onChange={(e) => { setAdults(Number(e.target.value)); setIsCalculated(false); }} 
            />
          </div>
          
          <div className="col-6">
            <label className="form-label fw-bold mb-1">Niños:</label>
            <input 
              type="number" 
              className="form-control" 
              min="0" 
              value={children} 
              onChange={(e) => { setChildren(Number(e.target.value)); setIsCalculated(false); }} 
            />
          </div>

          {/* Hotel */}
          <div className="col-12 mt-3">
            <label className="form-label fw-bold mb-1">Selecciona un hotel:</label>
            <select 
              className="form-select" 
              value={hotel} 
              onChange={(e) => { setHotel(Number(e.target.value)); setIsCalculated(false); }}
            >
              <option value={50}>Hostal El Viajero (desde $50)</option>
              <option value={150}>Hotel Oasis (desde $150)</option>
              <option value={250}>Resort Paraíso (desde $250)</option>
              <option value={350}>Cabaña en la Montaña (desde $350)</option>
              <option value={500}>Hotel Diamante VIP (desde $500)</option>
            </select>
          </div>

          {/* Restaurante */}
          <div className="col-12 mt-3">
            <label className="form-label fw-bold mb-1">Selecciona un restaurante:</label>
            <select 
              className="form-select" 
              value={restaurant} 
              onChange={(e) => { setRestaurant(Number(e.target.value)); setIsCalculated(false); }}
            >
              <option value={15}>Solo Desayuno ($15)</option>
              <option value={30}>Almuerzo en La Brisa ($30)</option>
              <option value={80}>Cena de Lujo ($80)</option>
              <option value={120}>Plan Todo Incluido ($120)</option>
              <option value={200}>Menú Chef Estrella Michelin ($200)</option>
            </select>
          </div>

          {/* Vuelo */}
          <div className="col-12 mt-3">
            <label className="form-label fw-bold mb-1">Selecciona un vuelo de ida y vuelta:</label>
            <select 
              className="form-select" 
              value={flight} 
              onChange={(e) => { setFlight(Number(e.target.value)); setIsCalculated(false); }}
            >
              <option value={100}>Vuelo Local Express ($100)</option>
              <option value={350}>Madrid - París ($350)</option>
              <option value={500}>Madrid - Roma ($500)</option>
              <option value={800}>Nueva York - Tokio ($800)</option>
              <option value={1500}>Vuelta al Mundo VIP ($1500)</option>
            </select>
          </div>

          {/* Botón */}
          <div className="col-12 mt-4">
            <button 
              className="btn btn-primary w-100 fw-bold py-2" 
              style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
              onClick={handleCalculate}
            >
              Calcular Costo Total
            </button>
          </div>
        </div>

        {/* Resultado */}
        {isCalculated && (
          <div className="mt-4 p-3 text-center" style={{ backgroundColor: "#eaedef", borderRadius: "5px", border: "1px solid #dee2e6" }}>
            <h4 className="fw-bold mb-1">
              Costo Total: <span className="text-success">${calculatedTotal.toFixed(2)}</span>
            </h4>
            <p className="mb-0 text-dark">¡Reserva confirmada! ¡Que disfrutes tu viaje!</p>
          </div>
        )}
        
      </div>
    </div>
  );
}
