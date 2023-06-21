const teams = {
    'MEN': 'Mens',
    'CMP': 'Composite',
    'MIX': 'Mixed'
}

const opponents = {
    'AJX': 'Ajax',
    'APA': 'Apollo Ashford',
    'CHR': 'Christchurch',
    'HRN': 'Herne Bay',
    'INC': 'Invicta Pilgrims',
    'KNG': 'Kings',
    'FAV': 'Faversham',
    'HRT': 'Hartsdown Park',
    'RCQ': 'Racqueteers',
    'ROV': 'Rovers',
    'WST': 'Westgate'
}

const currentYear = () => {
    const today = new Date();
        return today.getFullYear();
  }
  
module.exports = { currentYear, teams, opponents }