const seedData = [
  {
    'model' : 'Securities',
    'documents' : [
      {
        'companyName' : 'Tata Consultancy Services',
        'ticker' : 'TCS',
        'avgBuyPrice' : 1833.45,
        'quantity' : 54,
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      },
      {
        'companyName' : 'Wipro Limited',
        'ticker' : 'WIPRO',
        'avgBuyPrice' : 319.25,
        'quantity' : 15,
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      },
      { 
        '_id': '5f4a71db703f876cf07c8676',
        'companyName' : 'Godrej Group India',
        'ticker' : 'GODREJIND',
        'avgBuyPrice' : 535,
        'quantity' : 76,
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      }
    ]
  },
  {
    'model' : 'Trades',
    'documents' : [
      { 
        'securityId' : '5f4a71db703f876cf07c8676',
        'ticker' : 'GODREJIND',
        'noOfShares' : 5,
        'price' : 400,
        'typeOfTrade' : "buy",
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      },
      { 
        'securityId' : '5f4a71db703f876cf07c8676',
        'ticker' : 'GODREJIND',
        'noOfShares' : 5,
        'price' : 400,
        'typeOfTrade' : "sell",
        'createdAt' : new Date().toISOString(),
        'updatedAt' : null
      }
    ],
  }
]

module.exports = seedData