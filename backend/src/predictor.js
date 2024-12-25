
export function analyzeAstrologyData(astrologyData, lifeEvents) {
    const results = {};

    function processEvents(events, path = '') {
        for (let event in events) {
            const fullPath = path ? `${path}.${event}` : event;
            results[fullPath] = {};

            if (events[event].POSITIVE || events[event].NEGATIVE) {
                for (let planet in astrologyData) {
                  results[fullPath][planet] = {
                    positivePoints: 0,
                    negativePoints: 0,
                    conclusion: ''
                  };
              
                  for (let level in astrologyData[planet]) {
                    const houses = astrologyData[planet][level];
                    const multiplier = ['L1', 'L2', 'L3'].indexOf(level.split('_')[1]);
              
                    if (multiplier >= 0) {
                      const factor = multiplier + 1;
              
                      if (events[event].POSITIVE) {
                        results[fullPath][planet].positivePoints += houses.filter(house => events[event].POSITIVE.includes(house)).length * factor;
                      }
              
                      if (events[event].NEGATIVE) {
                        results[fullPath][planet].negativePoints += houses.filter(house => events[event].NEGATIVE.includes(house)).length * factor;
                      }
                    }
                  }
              
                  if (results[fullPath][planet].positivePoints > results[fullPath][planet].negativePoints) {
                    results[fullPath][planet].conclusion = 'Positive';
                  } else if (results[fullPath][planet].positivePoints < results[fullPath][planet].negativePoints) {
                    results[fullPath][planet].conclusion = 'Negative';
                  } else {
                    results[fullPath][planet].conclusion = 'Neutral';
                  }
                }
              } else {
                processEvents(events[event], fullPath);
              }
        }
    }

    processEvents(lifeEvents);
    
    return results;
}

