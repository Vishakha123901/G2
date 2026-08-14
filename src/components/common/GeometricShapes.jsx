// Background shapes image from G2
export default function GeometricShapes() {
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        top: '-30%',
        left: '-10%',
        width: '120%',
        height: '160%',
        backgroundImage: 'url(https://www.g2.com/assets/dashboard-shapes-620-0f13059ab8ea94d94fcfe4dc0a2dd65fe29e6c073d03cc9ffbb4b3c7b0b18db3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        zIndex: 0
      }}
    />
  );
}
