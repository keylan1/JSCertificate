function checkCashRegister(price, cash, cid) {
  let currency = [
    ['PENNY', 1],
    ['NICKEL', 5],
    ['DIME', 10],
    ['QUARTER', 25],
    ['ONE', 100],
    ['FIVE', 500],
    ['TEN', 1000],
    ['TWENTY', 2000],
    ['ONE HUNDRED', 10000],
  ];

  let amountDue = (cash - price) * 100;
  let changeArr = [];
  let amountInDrawer = 0;
  let finalResult = [];

  // Calculate total amount in the cash drawer and filter finalDenominations and finalCurrency
  for (let i = 0; i < cid.length; i++) {
    amountInDrawer += cid[i][1] * 100;
  }
  if (amountInDrawer < amountDue) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] };
  }
  if (amountInDrawer === amountDue) {
    return { status: 'CLOSED', change: cid };
  }

  // Check if the current denomination is less than or equal to the change due
  for (let i = 0; i < currency.length; i++) {
    if (currency[i][1] <= amountDue) {
      finalCurrency.push(currency[i]);
    }
  }
  // Iterate through finalDenominations and calculate the number of times each denomination can be used for change
  for (let i = 0; i < finalCurrency.length; i++) {
    changeArr.push(
      Math.floor((finalDenominations[i][1] * 100) / finalCurrency[i][1])
    );
  }

  for (let i = finalCurrency.length - 1; i >= 0; i--) {
    let denomination = finalCurrency[i][1];
    let times = changeArr[i];
    let toSubtract = times * denomination;

    if (toSubtract > amountDue) {
      times = Math.floor(amountDue / denomination);
      toSubtract = times * denomination;
    }
    amountDue -= toSubtract;
    if (toSubtract !== 0) {
      finalResult.push([finalCurrency[i][0], toSubtract / 100]);
    }
    /*  if (finalCurrency[i] < 0 && toSubtract !== 0) {
      return { status: 'INSUFFICIENT_FUNDS', change: [] };
    }*/
  }

  console.log(finalDenominations);
  console.log(finalCurrency);
  console.log(changeArr);
  console.log(finalResult);
  return { status: 'OPEN', change: finalResult };
}

checkCashRegister(3.26, 100, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);
/*should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]};*/
