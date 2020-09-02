const SEED_DATA = [
  {
    'model' : 'Securities',
    'documents' : [
      {
        'companyName' : 'Tata Consultancy Services',
        'ticker' : 'TCS',
        'avgBuyPrice' : 99.45,
        'quantity' : 54,
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      },
      {
        'companyName' : 'Wipro Limited',
        'ticker' : 'WIPRO',
        'avgBuyPrice' : 29.25,
        'quantity' : 15,
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      },
      { 
        '_id': '5f4a71db703f876cf07c8676',
        'companyName' : 'Godrej Group India',
        'ticker' : 'GODREJIND',
        'avgBuyPrice' : 35,
        'quantity' : 76,
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      }
    ]
  }
]

module.exports = SEED_DATA