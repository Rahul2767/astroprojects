export function analyzeAstrologyData(astrologyData, lifeEvents) {
  const results = {};
  const modifiedData = {};

  function processEvents(events, path = '') {
    for (let event in events) {
      const fullPath = path ? `${path}.${event}` : event;
      results[fullPath] = {};
      modifiedData[fullPath] = {};

      if (events[event].POSITIVE || events[event].NEGATIVE) {
        for (let planet in astrologyData) {
          results[fullPath][planet] = {
            positivePoints: 0,
            negativePoints: 0,
            conclusion: ''
          };

          modifiedData[fullPath][planet] = {};

          for (let level in astrologyData[planet]) {
            const houses = astrologyData[planet][level];
            modifiedData[fullPath][planet][level] = new Set(); // Use Set to store unique values

            const multiplier = ['L1', 'L2', 'L3'].indexOf(level.split('_')[1]);

            if (multiplier >= 0) {
              const factor = multiplier + 1;
            
              // Iterate over houses once and check both POSITIVE and NEGATIVE events in one pass
              results[fullPath][planet].positivePoints += houses.filter(house => {
                let isPositive = false;
                let isNegative = false;
            
                // Check if the house is in the POSITIVE event
                if (events[event].POSITIVE && events[event].POSITIVE.includes(house)) {
                  modifiedData[fullPath][planet][level].add(`${house}-P`); // Add positive tag
                  isPositive = true;
                }
            
                // Check if the house is in the NEGATIVE event
                if (events[event].NEGATIVE && events[event].NEGATIVE.includes(house)) {
                  modifiedData[fullPath][planet][level].add(`${house}-N`); // Add negative tag
                  isNegative = true;
                }
            
                // If neither positive nor negative, add the house as is
                if (!isPositive && !isNegative) {
                  modifiedData[fullPath][planet][level].add(`${house}`);
                }
            
                // Return true if the house is positive, and false if only negative
                return isPositive; // We want to count positive points only here
              }).length * factor;
            
              // Iterate again to handle negative points
              results[fullPath][planet].negativePoints += houses.filter(house => {
                return events[event].NEGATIVE && events[event].NEGATIVE.includes(house);
              }).length * factor;
            }
            
          }

          // Determine conclusion based on positive and negative points
          if (results[fullPath][planet].positivePoints > results[fullPath][planet].negativePoints) {
            results[fullPath][planet].conclusion = 'Positive';
          } else if (results[fullPath][planet].positivePoints < results[fullPath][planet].negativePoints) {
            results[fullPath][planet].conclusion = 'Negative';
          } else {
            results[fullPath][planet].conclusion = 'Neutral';
          }
        }
      } else {
        processEvents(events[event], fullPath); // Recursively process nested events
      }
    }
  }

  // Process the life events and astrology data
  processEvents(lifeEvents);

  // Convert all sets to arrays before returning the result
  for (let path in modifiedData) {
    for (let planet in modifiedData[path]) {
      for (let level in modifiedData[path][planet]) {
        modifiedData[path][planet][level] = Array.from(modifiedData[path][planet][level]); // Convert Set to Array
      }
    }
  }

  return {
    results,
    modifiedData
  };
}
