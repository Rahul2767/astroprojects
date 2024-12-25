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

              houses.forEach(house => {
                let isPositive = false;
                let isNegative = false;

                if (events[event].POSITIVE && events[event].POSITIVE.includes(house)) {
                  modifiedData[fullPath][planet][level].add(`${house}-P`);
                  isPositive = true;
                }

                if (events[event].NEGATIVE && events[event].NEGATIVE.includes(house)) {
                  modifiedData[fullPath][planet][level].add(`${house}-N`);
                  isNegative = true;
                }

                if (!isPositive && !isNegative) {
                  modifiedData[fullPath][planet][level].add(`${house}`); // Neutral
                }
              });
            }
          }
        }
      } else {
        processEvents(events[event], fullPath); // Recursively process nested events
      }
    }
  }

  // Process the life events and astrology data
  processEvents(lifeEvents);

  // Convert all sets to arrays and apply 6-8-12 rule
  for (let path in modifiedData) {
    for (let planet in modifiedData[path]) {
      // Apply the rule before calculating positive/negative points
      modifiedData[path][planet] = applyRule(modifiedData[path][planet]);

      results[path][planet].positivePoints = 0;
      results[path][planet].negativePoints = 0;

      // Now, calculate the positive and negative points after applying the rule
      for (let level in modifiedData[path][planet]) {
        const multiplier = ['L1', 'L2', 'L3'].indexOf(level.split('_')[1]) + 1;
        
        Array.from(modifiedData[path][planet][level]).forEach(item => {
          if (item.endsWith('-P')) {
            results[path][planet].positivePoints += multiplier; // Positive points
          }
          if (item.endsWith('-N')) {
            results[path][planet].negativePoints += multiplier; // Negative points
          }
        });

        // Convert Set to Array for the final modified data
        modifiedData[path][planet][level] = Array.from(modifiedData[path][planet][level]);
      }

      // Determine final conclusion based on positive and negative points
      const { positivePoints, negativePoints } = results[path][planet];
      if (positivePoints > negativePoints) {
        results[path][planet].conclusion = 'Positive';
      } else if (positivePoints < negativePoints) {
        results[path][planet].conclusion = 'Negative';
      } else {
        results[path][planet].conclusion = 'Neutral';
      }
    }
  }

  return { results, modifiedData };
}

// Function to apply the 6, 8, 12 rule
function applyRule(obj) {
  const targetNumbers = ['6', '8', '12'];
  let connectedNumbers = new Set();

  // Step 1: Check horizontal connections
  const objEntries = Object.entries(obj);
  objEntries.forEach(([key, set]) => {
    let currentNumbers = new Set([...set].map(item => item.split('-')[0]));
    let hasTargetNumbers = targetNumbers.filter(num => currentNumbers.has(num));
    if (hasTargetNumbers.length > 1) {
      hasTargetNumbers.forEach(num => connectedNumbers.add(num));
    }
  });

  // Step 2: Check vertical connections (same index across different sets)
  for (let i = 0; i < objEntries[0][1].size; i++) {
    let columnNumbers = new Set();
    objEntries.forEach(([key, set]) => {
      let currentSetArray = [...set];
      if (currentSetArray[i]) {
        let number = currentSetArray[i].split('-')[0];
        if (targetNumbers.includes(number)) {
          columnNumbers.add(number);
        }
      }
    });

    if (columnNumbers.size > 1) {
      columnNumbers.forEach(num => connectedNumbers.add(num));
    }
  }

  // Step 3: Apply transformation based on connection status
  let newObj = {};
  objEntries.forEach(([key, set]) => {
    newObj[key] = new Set([...set].map(item => {
      let [number, suffix] = item.split('-');
      if (targetNumbers.includes(number)) {
        return `${number}-${connectedNumbers.has(number) ? 'N' : 'P'}`;
      }
      return item; // Keep unchanged if not 6, 8, or 12
    }));
  });

  return newObj;
}
