// Deterministic recommendation engine for VehicleChacha

export function calculateChachaMatch(vehicle, userPreferences) {
    const scores = {};
    
    // 1. Budget Fit (25%)
    scores.budgetFit = calculateBudgetFit(vehicle.price, userPreferences.budget);
    
    // 2. Fuel Economy (15%)
    scores.fuelEconomy = calculateFuelEconomy(vehicle.fuelEconomy, userPreferences.priorities);
    
    // 3. Family Suitability (15%)
    scores.familySuitability = calculateFamilyFit(vehicle, userPreferences.familySize);
    
    // 4. Safety (15%)
    scores.safety = calculateSafety(vehicle.features, userPreferences.priorities);
    
    // 5. Maintenance (10%)
    scores.maintenance = calculateMaintenance(vehicle.brand?.name || vehicle.brandName, userPreferences.priorities);
    
    // 6. Resale (10%)
    scores.resale = calculateResale(vehicle.brand?.name || vehicle.brandName);
    
    // 7. Features (5%)
    scores.features = calculateFeatures(vehicle.features);
    
    // 8. Performance (5%)
    scores.performance = calculatePerformance(vehicle.horsepower);
    
    // Calculate weighted total
    const weights = {
      budgetFit: 25,
      fuelEconomy: 15,
      familySuitability: 15,
      safety: 15,
      maintenance: 10,
      resale: 10,
      features: 5,
      performance: 5,
    };
    
    let totalScore = 0;
    
    Object.keys(weights).forEach(key => {
      if (scores[key] !== undefined && scores[key] !== null) {
        totalScore += scores[key] * weights[key];
      }
    });
    
    const overallScore = Math.round(totalScore / 100);
    
    return {
      overallScore: Math.min(100, Math.max(0, overallScore)),
      breakdown: scores,
      weights,
    };
  }
  
  function calculateBudgetFit(price, budgetPreference) {
    if (!budgetPreference || !price) return 70;
    
    const { min, max } = budgetPreference;
    
    if (price >= min && price <= max) {
      const midPoint = (min + max) / 2;
      const range = max - min;
      const distanceFromMid = Math.abs(price - midPoint);
      const fitPercentage = 100 - (distanceFromMid / (range / 2)) * 30;
      return Math.max(70, Math.min(100, fitPercentage));
    }
    
    if (price < min) {
      const difference = min - price;
      const percentage = (difference / min) * 100;
      return Math.max(50, 100 - percentage);
    }
    
    if (price > max) {
      const difference = price - max;
      const percentage = (difference / max) * 100;
      return Math.max(20, 100 - percentage * 2);
    }
    
    return 50;
  }
  
  function calculateFuelEconomy(fuelEconomy, priorities) {
    if (!fuelEconomy) return 60;
    
    let avgFuelEconomy = 0;
    const match = String(fuelEconomy).match(/(\d+(?:\.\d+)?)/g);
    
    if (match && match.length > 0) {
      const numbers = match.map(Number);
      avgFuelEconomy = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    } else {
      return 60;
    }
    
    let score = 0;
    if (avgFuelEconomy >= 20) score = 95;
    else if (avgFuelEconomy >= 15) score = 85;
    else if (avgFuelEconomy >= 12) score = 75;
    else if (avgFuelEconomy >= 10) score = 60;
    else score = 45;
    
    if (priorities && priorities.includes('fuel-economy')) {
      score += 10;
    }
    
    return Math.min(100, score);
  }
  
  function calculateFamilyFit(vehicle, familySize) {
    if (!familySize) return 70;
    
    const seats = vehicle.seats || 5;
    
    switch (familySize) {
      case '1-2':
        return 90;
      case '3-4':
        return seats >= 4 ? 85 : 60;
      case '5-plus':
        return seats >= 5 ? 90 : seats >= 4 ? 70 : 40;
      case 'large':
        return seats >= 7 ? 95 : seats >= 5 ? 75 : 50;
      default:
        return 70;
    }
  }
  
  function calculateSafety(features, priorities) {
    if (!features || features.length === 0) return 50;
    
    const safetyFeatures = [
      'airbag', 'abs', 'ebd', 'parking', 'camera', 'traction', 
      'stability', 'hill', 'immobilizer', 'brake assist', 'blind spot'
    ];
    
    const featuresLower = features.map(f => String(f).toLowerCase());
    const safetyCount = safetyFeatures.filter(sf => 
      featuresLower.some(f => f.includes(sf))
    ).length;
    
    let score = 50 + (safetyCount / safetyFeatures.length) * 50;
    
    if (priorities && priorities.includes('safety')) {
      score += 10;
    }
    
    return Math.min(100, Math.round(score));
  }
  
  function calculateMaintenance(brandName, priorities) {
    const maintenanceScores = {
      'Toyota': 95,
      'Honda': 90,
      'Suzuki': 92,
      'Kia': 78,
      'Hyundai': 80,
      'MG': 70,
      'Changan': 72,
      'Deepal': 65,
      'Jaecoo': 68,
    };
    
    let score = maintenanceScores[brandName] || 70;
    
    if (priorities && priorities.includes('maintenance')) {
      score += 10;
    }
    
    return Math.min(100, score);
  }
  
  function calculateResale(brandName) {
    const resaleScores = {
      'Toyota': 95,
      'Honda': 88,
      'Suzuki': 85,
      'Kia': 75,
      'Hyundai': 72,
      'MG': 60,
      'Changan': 58,
      'Deepal': 50,
      'Jaecoo': 52,
    };
    
    return resaleScores[brandName] || 60;
  }
  
  function calculateFeatures(features) {
    if (!features || features.length === 0) return 40;
    
    const premiumFeatures = [
      'sunroof', 'leather', 'navigation', 'bluetooth', 'usb', 
      'climate', 'cruise', 'push start', 'keyless', 'android auto', 
      'apple carplay', 'wireless charger', '360 camera'
    ];
    
    const featuresLower = features.map(f => String(f).toLowerCase());
    const premiumCount = premiumFeatures.filter(pf => 
      featuresLower.some(f => f.includes(pf))
    ).length;
    
    return Math.min(100, 40 + (premiumCount / premiumFeatures.length) * 60);
  }
  
  function calculatePerformance(horsepower) {
    if (!horsepower) return 50;
    
    if (horsepower >= 200) return 90;
    if (horsepower >= 150) return 80;
    if (horsepower >= 100) return 70;
    if (horsepower >= 70) return 60;
    return 50;
  }
  
  export function getRecommendations(vehicles, userPreferences) {
    const scoredVehicles = vehicles.map(vehicle => {
      const score = calculateChachaMatch(vehicle, userPreferences);
      
      return {
        ...vehicle,
        chachaMatch: score.overallScore,
        breakdown: score.breakdown,
        strengths: getStrengths(score.breakdown),
        weaknesses: getWeaknesses(score.breakdown),
      };
    });
    
    // Sort by Chacha Match score (highest first)
    scoredVehicles.sort((a, b) => b.chachaMatch - a.chachaMatch);
    
    const bestOverall = scoredVehicles[0] || null;
    const bestAlternative = scoredVehicles[1] || null;
    const bestValue = findBestValue(scoredVehicles) || scoredVehicles[2] || null;
    
    return {
      bestOverall,
      bestAlternative,
      bestValue,
      allRecommendations: scoredVehicles,
      categoryWinners: getCategoryWinners(scoredVehicles),
    };
  }
  
  function getStrengths(breakdown) {
    const strengths = [];
    const labels = {
      budgetFit: 'Fits your budget',
      fuelEconomy: 'Good fuel economy',
      familySuitability: 'Family friendly',
      safety: 'Safe choice',
      maintenance: 'Low maintenance',
      resale: 'High resale value',
      features: 'Well equipped',
      performance: 'Good performance',
    };
    
    Object.entries(breakdown).forEach(([key, value]) => {
      if (value >= 80) {
        strengths.push(labels[key]);
      }
    });
    
    return strengths.slice(0, 3);
  }
  
  function getWeaknesses(breakdown) {
    const weaknesses = [];
    const labels = {
      budgetFit: 'May not fit budget',
      fuelEconomy: 'Below average fuel economy',
      familySuitability: 'Limited family space',
      safety: 'Fewer safety features',
      maintenance: 'Higher maintenance',
      resale: 'Lower resale value',
      features: 'Limited features',
      performance: 'Underpowered',
    };
    
    Object.entries(breakdown).forEach(([key, value]) => {
      if (value < 60) {
        weaknesses.push(labels[key]);
      }
    });
    
    return weaknesses.slice(0, 3);
  }
  
  function findBestValue(scoredVehicles) {
    return scoredVehicles
      .filter(v => v.chachaMatch >= 65)
      .sort((a, b) => (a.price / a.chachaMatch) - (b.price / b.chachaMatch))[0];
  }
  
  function getCategoryWinners(scoredVehicles) {
    return {
      fuelEconomy: [...scoredVehicles].sort((a, b) => b.breakdown.fuelEconomy - a.breakdown.fuelEconomy)[0] || null,
      family: [...scoredVehicles].sort((a, b) => b.breakdown.familySuitability - a.breakdown.familySuitability)[0] || null,
      safety: [...scoredVehicles].sort((a, b) => b.breakdown.safety - a.breakdown.safety)[0] || null,
      maintenance: [...scoredVehicles].sort((a, b) => b.breakdown.maintenance - a.breakdown.maintenance)[0] || null,
      resale: [...scoredVehicles].sort((a, b) => b.breakdown.resale - a.breakdown.resale)[0] || null,
    };
  }