var chartInstance = null;

$('input').keypress(function(e) {
  if (e.keyCode == 13) {
    var $this = $(this),
      currentRow = $this.closest('tr'),
      currentIndex = $this.closest('td').index(),
      $table = $this.closest('table'),
      $allRows = $table.find('tr'),
      lastRowIndex = $allRows.length - 1;

    // Function to calculate sum and count filled cells
    function getTableValues() {
      var valuesList = [];
    
      $table.find('td').each(function() {
        var $input = $(this).find('input'); // Find the input within the cell
        var cellValue = parseFloat($input.val().trim()); // Get the value, trim spaces, and convert to number
        if (!isNaN(cellValue)) {
          valuesList.push(cellValue);
        }
      });

      return valuesList;
    }

    // Check if the current row is the last row 
    if (currentRow.index() === lastRowIndex) {
      // Move to the next column
      var nextColumn = currentIndex + 1;
      if (nextColumn < $this.closest('tr').find('td').length) {
        // Focus the input in the next column of the first row
        var $firstRow = $table.find('tr').first();
        var $nextInput = $firstRow.find('td').eq(nextColumn).find('input');
        if ($nextInput.length) {
          $nextInput.focus();
        }
      }
    } else {
      // Move to the next cell down
      var $nextRow = currentRow.next();
      var $nextInput = $nextRow.find('td').eq(currentIndex).find('input');
      if ($nextInput.length) {
        $nextInput.focus();
      }
    }

    var tableValues = getTableValues();

    // Recalculate the sum and count filled cells
    var totalSum = tableValues.reduce((sum, value) => sum + value, 0);
    var filledCellsCount = tableValues.length;
    $total = $('#total');
    $total.text("Total: " + totalSum + " lei (" + filledCellsCount + " bucati)");

    console.log('Total Sum:', totalSum);
    console.log('Filled Cells Count:', filledCellsCount);

    var frequencies = computeFrequencies(tableValues);
    createGraph(frequencies);

    e.preventDefault(); // Prevent the default Enter key action
  }
});

function computeFrequencies(valuesList) {
  var frequencies = {};
  
  valuesList.forEach(value => {
    if (frequencies[value]) {
      frequencies[value]++;
    } else {
      frequencies[value] = 1;
    }
  });
  return frequencies;
}

function createGraph(frequencies) {
  // Convert frequencies object to arrays for Chart.js
  var labels = Object.keys(frequencies);
  var counts = Object.values(frequencies);

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Frecventa preturi',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
