import React from 'react';
import { Sparkles } from 'lucide-react';

// Geometric shapes & interactive floating orange scroll button
export default function GeometricShapes({ onScrollDown }) {
  return (
    <div className="shape-container">
      {/* Top Left Blue Geometric Polygon */}
      <div className="shape-blue"></div>

      {/* Bottom Left Red Parallelogram */}
      <div className="shape-red"></div>

      {/* Top Right Cyan/Teal Diagonal Strip */}
      <div className="shape-teal"></div>

      {/* Bottom Right Purple Ring Arc */}
      <div className="shape-purple-arc"></div>
    </div>
  );
}
