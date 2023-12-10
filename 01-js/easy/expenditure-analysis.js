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

module.exports = calculateTotalSpentByCategory;
