$('input').keypress(function(e) {
  if (e.keyCode == 13) {
    var $this = $(this),
      currentRow = $this.closest('tr'),
      currentIndex = $this.closest('td').index(),
      $table = $this.closest('table'),
      $allRows = $table.find('tr'),
      lastRowIndex = $allRows.length - 1;

    // Function to calculate sum and count filled cells
    function recalculateTable() {
      var totalSum = 0;
      var filledCellsCount = 0;

      $table.find('td').each(function() {
        var $input = $(this).find('input'); // Find the input within the cell
        var cellValue = parseFloat($input.val().trim()); // Get the value, trim spaces, and convert to number
        if (!isNaN(cellValue)) {
          totalSum += cellValue;
          filledCellsCount++;
        }
      });

      return {
        sum: totalSum,
        filledCells: filledCellsCount
      };
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

    // Recalculate the sum and count filled cells
    var result = recalculateTable();
    var totalSum = result.sum;
    var filledCellsCount = result.filledCells;

    $total = $('#total');
    $total.text("Total: " + totalSum + " (" + filledCellsCount + " bucati)");

    console.log('Total Sum:', totalSum);
    console.log('Filled Cells Count:', filledCellsCount);

    e.preventDefault(); // Prevent the default Enter key action
  }
});