// Smart description generator based on car specs
export function generateCarDescription(car) {
    const descriptions = [];
    
    // Body type based description
    const bodyTypeDescriptions = {
      'SUV': 'This powerful SUV offers commanding road presence and spacious interior',
      'Sedan': 'A premium sedan delivering comfort and sophistication',
      'Hatchback': 'A compact and efficient hatchback perfect for city driving',
      'Crossover': 'A versatile crossover blending style with practicality',
      'MPV': 'A family-oriented MPV with maximum space and comfort',
    };
    
    if (bodyTypeDescriptions[car.bodyType]) {
      descriptions.push(bodyTypeDescriptions[car.bodyType]);
    }
  
    // Brand based description
    const brandDescriptions = {
      'Toyota': 'Built with Toyota\'s legendary reliability',
      'Honda': 'Engineered with Honda\'s precision and performance',
      'Suzuki': 'Delivering Suzuki\'s fuel efficiency and affordability',
      'Kia': 'Featuring Kia\'s modern design language',
      'Hyundai': 'Showcasing Hyundai\'s innovative technology',
    };
    
    if (car.brand?.name && brandDescriptions[car.brand.name]) {
      descriptions.push(brandDescriptions[car.brand.name]);
    }
  
    // Price based
    if (car.price) {
      if (car.price < 3000000) {
        descriptions.push('an excellent budget-friendly choice');
      } else if (car.price < 5000000) {
        descriptions.push('offering great value for money');
      } else if (car.price < 7000000) {
        descriptions.push('a premium mid-range option');
      } else {
        descriptions.push('a luxurious high-end vehicle');
      }
    }
  
    // Fuel economy
    if (car.fuelEconomy) {
      descriptions.push(`with impressive fuel economy of ${car.fuelEconomy} km/l`);
    }
  
    // Engine
    if (car.engine) {
      descriptions.push(`powered by a ${car.engine} engine`);
    }
  
    return descriptions.join(', ') + '.';
  }
  
  // Smart pros generator
  export function generatePros(car) {
    const pros = [];
    
    if (car.fuelEconomy) {
      const match = String(car.fuelEconomy).match(/(\d+)/);
      if (match && parseInt(match[0]) >= 15) {
        pros.push('Excellent fuel economy');
      }
    }
    
    if (car.brand?.name === 'Toyota') pros.push('Legendary reliability');
    if (car.brand?.name === 'Honda') pros.push('Superior build quality');
    if (car.brand?.name === 'Suzuki') pros.push('Affordable maintenance');
    
    if (car.seats >= 7) pros.push('Spacious for large families');
    if (car.horsepower >= 150) pros.push('Powerful performance');
    if (car.horsepower < 100) pros.push('Fuel efficient engine');
    
    if (car.bodyType === 'SUV') pros.push('High ground clearance');
    if (car.bodyType === 'Hatchback') pros.push('Easy to park in city');
    
    return pros;
  }
  
  // Smart cons generator
  export function generateCons(car) {
    const cons = [];
    
    if (car.price > 7000000) cons.push('Higher price point');
    if (car.bodyType === 'SUV') cons.push('Higher fuel consumption');
    if (car.bodyType === 'Hatchback') cons.push('Limited cargo space');
    
    const fuelMatch = car.fuelEconomy ? String(car.fuelEconomy).match(/(\d+)/) : null;
    if (fuelMatch && parseInt(fuelMatch[0]) < 12) cons.push('Below average fuel economy');
    
    return cons;
  }