import React from 'react';
import App from './App';
import {cleanup, fireEvent, render} from '@testing-library/react';
import stocks from "./stocks";
import '@testing-library/jest-dom/extend-expect';

const renderApp = () => render(<App/>);

const TEST_IDS = {
    sort: "sort",
    selectMonth: "select-month",
    stockList: "stocks",
    totalProfit: "total-profit",
    totalLoss: "total-loss"
  };

let getByTestId, sort, selectMonth, stockList, date, high, low, profit, totalLoss, totalProfit;

beforeEach(() => {
    const app = render(<App />);
    getByTestId = app.getByTestId;
    sort = getByTestId(TEST_IDS.sort);
    selectMonth = getByTestId(TEST_IDS.selectMonth);
    stockList = getByTestId(TEST_IDS.stockList);
    totalProfit = getByTestId(TEST_IDS.totalProfit);
    totalLoss = getByTestId(TEST_IDS.totalLoss);
})

afterEach(() => {
    cleanup();
});

const renderData = (data, month) => {
    const isLoss = "❌", isProfit = "✅";
    let k = 0;
    for(let i = 0; i < data.length; i++) {

        if(data[i].date.split("-")[1] === month) { 
            date = stockList.children[k].children[0];
            high = stockList.children[k].children[1];
            low = stockList.children[k].children[2];
            profit = stockList.children[k].children[3];

            expect(date).toHaveTextContent("Date: " + data[i].date);
            expect(low).toHaveTextContent("Low: " + data[i].low);
            expect(high).toHaveTextContent("High: " + data[i].high);
            expect(profit).toHaveTextContent("Profit: " + (data[i].open > data[i].close? isLoss: isProfit) + " (" + (Math.abs(data[i].open - data[i].close).toFixed(2)) + ")");
            k = k + 1;
        }
    }
}

const sortData = (data) => {
    const sortedData = [...data].sort((a, b) => {
      if(a.open - a.close < b.open - b.close)
        return -1;
      return 1;
  }); 
  return sortedData;
}


it("initially display data for only January month", () => {
    renderData(stocks, "January");
    expect(totalProfit).toHaveTextContent("229.49");
    expect(totalLoss).toHaveTextContent("693.64");
})

it("should have all the 12 months in the select menu", () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    expect(selectMonth.children.length).toBe(12);
    for(let i = 0; i < selectMonth.children.length; i++) {
        expect(selectMonth.children[i]).toHaveValue(months[i]);
    }
})


  it("should display data according to the month selected in the dropdown", () => {
        fireEvent.change(selectMonth, {target: {value: "May"}});
        renderData(stocks, "May");
  })

  it("should display the results in sorted order of the profit/loss", async () => {
        fireEvent.click(sort);
        renderData(sortData(stocks), "January");
  });

  it("should display total profit and loss of current month", () => {
        fireEvent.change(selectMonth, {target: {value: "May"}});
        expect(totalProfit).toHaveTextContent("628.89");
        expect(totalLoss).toHaveTextContent("789.10");
  })

