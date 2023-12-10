/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let totalSpentByCategory = [];
  for (let transaction of transactions) {
    // Check if category already exists in the totalspent array
    let categoryIdx = isCategoryExists(totalSpentByCategory, transaction.category)
    // if exists, increment its value, else add the category object in array
    if (categoryIdx >= 0) {
      totalSpentByCategory[categoryIdx].totalSpent += transaction.price
    } else {
      totalSpentByCategory.push({ 'category' : transaction.category, 'totalSpent' : transaction.price })     
    }    
  }
  return totalSpentByCategory;
}


function isCategoryExists(spendingList, category) {    
    for (let i = 0; i< spendingList.length; i++) {      
      if(spendingList[i].category === category) {
        return i;
      }
    }
    return -1;
}

const transactions = [
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  },
  {
    id: 2,
    timestamp: 1656259600000,
    price: 20,
    category: 'Food',
    itemName: 'Burger',
  },
  {
    id: 3,
    timestamp: 1656019200000,
    price: 15,
    category: 'Clothing',
    itemName: 'T-Shirt',
  },
  {
    id: 4,
    timestamp: 1656364800000,
    price: 30,
    category: 'Electronics',
    itemName: 'Headphones',
  },
  {
    id: 5,
    timestamp: 1656105600000,
    price: 25,
    category: 'Clothing',
    itemName: 'Jeans',
  },
];

calculateTotalSpentByCategory(transactions);
module.exports = calculateTotalSpentByCategory;
