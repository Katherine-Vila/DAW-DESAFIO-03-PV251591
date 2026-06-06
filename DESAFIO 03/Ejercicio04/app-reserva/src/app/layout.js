import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Cotización de Viaje',
  description: 'Agencia de Viajes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
