var main = {
  init: function () {
    let inputData = [
      [3, 4],
      [4, 5],
      [2, 3],
      [3, 4],
    ];
    main.storeQueue = 0;
    document.getElementById("passengerInQueue").focus();
    main.createDefaultTbl(inputData, 0);
    main.resetData(inputData);
    main.bookSeat(inputData);
  },

  bookSeat: function (inputData) {
    document.getElementById("button").addEventListener("click", function () {
      let passengerInQueue = document.getElementById("passengerInQueue").value;
      if (isNaN(parseInt(passengerInQueue, 10))) {
        alert("Please enter number only.");
        document.getElementById("passengerInQueue").focus();
        return;
      } else {
        passengerInQueue = parseInt(passengerInQueue, 10);
      }
      if (main.storeQueue <= passengerInQueue) {
        main.storeQueue = passengerInQueue;
        main.createDefaultTbl(inputData, passengerInQueue);
        document.getElementById("passengerInQueue").focus();
      } else {
        alert("Increase passengerInQueue value from" + " " + main.storeQueue);
        document.getElementById("passengerInQueue").focus();
      }
    });
  },

  resetData: function (inputData) {
    document.getElementById("button1").addEventListener("click", function () {
      document.getElementById("passengerInQueue").value = "";
      document.getElementById("passengerInQueue").focus();
      main.createDefaultTbl(inputData, 0);
      main.storeQueue = 0;
    });
  },

  createDefaultTbl: function (data, passengerInQueue) {
    result = [];
    main.sortSeat(data, result);
    result.sort(main.sortOrder("column"));
    result.sort(main.sortOrder("passengerSeat"));
    main.allocateSeat(result, passengerInQueue);
    result.sort(main.sortOrder("row", "column", "block"));
    document.getElementById("seats").innerHTML = "";
    seatingView.createTable(data, result);
  },

  sortOrder: function (keyName) {
    data = (a, b) => a[keyName] - b[keyName];
    return data;
  },

  isInputValid: function (arrayRowsColumns, que) {
    if (arrayRowsColumns.length > 8) {
      return false;
    }
    for (let i = 0; i < arrayRowsColumns.length; i++) {
      for (let j = 0; j < arrayRowsColumns[i].length; j++) {
        if (
          arrayRowsColumns[i][j] < 1 ||
          Number.isNaN(arrayRowsColumns[i][j])
        ) {
          document.getElementById("airPlaneSeatingArrangement").focus();
          return false;
        }
      }
    }
  },

  sortSeat: function (inputArray, resultArr) {
    for (block = 1; block <= inputArray.length; block++) {
      for (column = 1; column <= inputArray[block - 1][0]; column++) {
        for (row = 1; row <= inputArray[block - 1][1]; row++) {
          if (block === 1 && column === 1 && inputArray[block - 1][0] > 1) {
            newSeat = new SeatNode(block, column, row, 2);
            resultArr.push(newSeat);
          } else if (
            block === inputArray.length &&
            column === inputArray[block - 1][0] &&
            inputArray[block - 1][0] > 1
          ) {
            newSeat = new SeatNode(block, column, row, 2);
            resultArr.push(newSeat);
          } else if (column === 1 || column === inputArray[block - 1][0]) {
            newSeat = new SeatNode(block, column, row, 1);
            resultArr.push(newSeat);
          } else {
            newSeat = new SeatNode(block, column, row, 3);
            resultArr.push(newSeat);
          }
        }
      }
    }
  },

  allocateSeat: function (res, que) {
    if (res.length > que) {
      for (i = 0; i < que; i++) {
        res[i].passenger = i + 1;
      }
    } else {
      for (i = 0; i < res.length; i++) {
        res[i].passenger = i + 1;
      }
    }
  },
};

var seatingView = {
  // Create seating Arrangement row wise
  createTable: function (arrInput, arrResult) {
    for (i = 0; i < arrInput.length; i++) {
      table = document.createElement("table");
      table.setAttribute("row", "rowNumber" + (i + 1));
      for (j = 0; j < arrInput[i][1]; j++) {
        tr = document.createElement("tr");
        tr.setAttribute("row", "tr" + (j + 1));
        for (z = 0; z < arrResult.length; z++) {
          if (arrResult[z].block === i + 1 && arrResult[z].column === j + 1) {
            td = document.createElement("td");
            td.setAttribute("class", "row" + arrResult[z].passengerSeat);
            if (isNaN(arrResult[z].passenger) === false) {
              td.innerText = arrResult[z].passenger;
            } else {
              td.innerText = "";
            }
            tr.appendChild(td);
          }
        }
        table.appendChild(tr);
      }
      seats.appendChild(table);
    }
  },
};
function SeatNode(block, row, column, passengerSeat, passenger) {
  this.row = row;
  this.column = column;
  this.block = block;
  this.passengerSeat = passengerSeat;
  this.passenger = passenger;
}
main.init();
