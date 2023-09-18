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
    'WST': 'Westgate',
    'WYN': 'Wyndgate'
}

const contacts = [
    { 
        name: 'Jo Guy',
        position: 'Chairperson',
        phone: '07753 296773'
    },
    { 
        name: 'Mike Myles',
        position: 'Vice Chairperson',
        phone: '07929 158734'
    },
    { 
        name: 'Allan Colthart',
        position: 'Secretary',
        phone: '07599 524565'
    }
]

const currentYear = () => {
    const today = new Date();
        return today.getFullYear();
  }
  
module.exports = { currentYear, teams, opponents, contacts }