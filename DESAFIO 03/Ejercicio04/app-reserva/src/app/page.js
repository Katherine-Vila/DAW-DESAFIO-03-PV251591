'use client';
import { useState } from 'react';

export default function Page() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState('standard');
  const [restaurant, setRestaurant] = useState('none');
  const [roundTrip, setRoundTrip] = useState(true);

  // Precios base (ejemplo)
  const prices = {
    flight: 500, // solo ida
    hotel: {
      standard: 100,
      premium: 200,
      luxury: 400
    },
    restaurant: {
      none: 0,
      basic: 50,
      gourmet: 150
    }
  };

  const calculateTotal = () => {
    let total = 0;
    const flightMultiplier = roundTrip ? 2 : 1;
    const flightCost = (adults * prices.flight + children * (prices.flight * 0.5)) * flightMultiplier;
    const hotelCost = (adults + children) * prices.hotel[hotel];
    const restaurantCost = (adults + children) * prices.restaurant[restaurant];
    
    total = flightCost + hotelCost + restaurantCost;
    return total;
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Agencia de Viajes - Cotizador</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Cantidad de Adultos</label>
                <input type="number" className="form-control" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Cantidad de Niños</label>
                <input type="number" className="form-control" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Hotel de la Reserva</label>
                <select className="form-select" value={hotel} onChange={(e) => setHotel(e.target.value)}>
                  <option value="standard">Estándar ($100/persona)</option>
                  <option value="premium">Premium ($200/persona)</option>
                  <option value="luxury">Lujo ($400/persona)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Restaurante</label>
                <select className="form-select" value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
                  <option value="none">Sin plan de comidas</option>
                  <option value="basic">Básico ($50/persona)</option>
                  <option value="gourmet">Gourmet ($150/persona)</option>
                </select>
              </div>
            </div>

            <div className="mb-4 form-check">
              <input type="checkbox" className="form-check-input" id="roundTrip" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} />
              <label className="form-check-label" htmlFor="roundTrip">Vuelo de Ida y Vuelta</label>
            </div>

            <div className="alert alert-info">
              <h4>Total Estimado: ${calculateTotal().toFixed(2)}</h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
