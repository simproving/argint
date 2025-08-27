

// Global function to get table values
function getTableValues($table) {
  var valuesList = [];
  
  if (!$table) {
    $table = $('table').first(); // Default to first table if none specified
  }
  
  $table.find('td').each(function() {
    var $input = $(this).find('input'); // Find the input within the cell
    var cellValue = parseFloat($input.val().trim()); // Get the value, trim spaces, and convert to number
    if (!isNaN(cellValue)) {
      valuesList.push(cellValue);
    }
  });

  return valuesList;
}

$('input').keypress(function(e) {
  if (e.keyCode == 13) {
    var $this = $(this),
      currentRow = $this.closest('tr'),
      currentIndex = $this.closest('td').index(),
      $table = $this.closest('table'),
      $allRows = $table.find('tr'),
      lastRowIndex = $allRows.length - 1;

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

    var tableValues = getTableValues($table);

    // Recalculate the sum and count filled cells
    var totalSum = tableValues.reduce((sum, value) => sum + value, 0);
    var filledCellsCount = tableValues.length;
    $total = $('#total');
    $total.text("Total: " + totalSum + " lei (" + filledCellsCount + " bucati)");

    console.log('Total Sum:', totalSum);
    console.log('Filled Cells Count:', filledCellsCount);

    var frequencies = computeFrequencies(tableValues);
    createTable(frequencies);

    // Auto-save data on every Enter press
    autoSaveTableData();

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

function createTable(frequencies) {
  // Convert frequencies object to arrays for table
  var labels = Object.keys(frequencies);
  var counts = Object.values(frequencies);

  // Sort by price (ascending)
  labels.sort(function(a, b) { return parseFloat(a) - parseFloat(b); });
  
  // Calculate how many columns we need
  var maxRows = 8;
  var totalItems = labels.length;
  var numColumns = Math.ceil(totalItems / maxRows);
  
  // Create table HTML
  var tableHTML = '<table id="frequency-table">';
  tableHTML += '<tbody>';
  
  // Create data rows
  for (var row = 0; row < maxRows; row++) {
    tableHTML += '<tr>';
    
    // Add cells for each column
    for (var col = 0; col < numColumns; col++) {
      var index = row + (col * maxRows);
      if (index < totalItems) {
        tableHTML += '<td>' + labels[index] + '</td>';
        tableHTML += '<td>' + frequencies[labels[index]] + '</td>';
      } else {
        // Empty cells for incomplete columns
        tableHTML += '<td></td><td></td>';
      }
    }
    
    tableHTML += '</tr>';
  }
  
  tableHTML += '</tbody></table>';
  
  // Update the container
  $('#frequency-table-container').html(tableHTML);
}

// Auto-save function (called on every Enter press)
function autoSaveTableData() {
  var tableData = [];
  $('table tr').each(function() {
    var rowData = [];
    $(this).find('td input').each(function() {
      rowData.push($(this).val() || '');
    });
    tableData.push(rowData);
  });
  
  // Save to localStorage
  localStorage.setItem('argintTableData', JSON.stringify(tableData));
}

function loadTableData() {
  var savedData = localStorage.getItem('argintTableData');
  if (savedData) {
    try {
      var tableData = JSON.parse(savedData);
      
      // Restore table data
      $('table tr').each(function(rowIndex) {
        if (tableData[rowIndex]) {
          $(this).find('td input').each(function(colIndex) {
            if (tableData[rowIndex][colIndex]) {
              $(this).val(tableData[rowIndex][colIndex]);
            }
          });
        }
      });
      
      // Recalculate totals and frequencies
      var tableValues = getTableValues($('table').first());
      var totalSum = tableValues.reduce((sum, value) => sum + value, 0);
      var filledCellsCount = tableValues.length;
      $('#total').text("Total: " + totalSum + " lei (" + filledCellsCount + " bucati)");
      
      var frequencies = computeFrequencies(tableValues);
      createTable(frequencies);
      
      showMessage('Datele au fost incarcate cu succes!', 'success');
    } catch (e) {
      showMessage('Eroare la incarcarea datelor salvate', 'error');
    }
  } else {
    showMessage('Nu s-au gasit date salvate', 'info');
  }
}

function clearTableData() {
  if (confirm('Sigur doriti sa stergeti toate datele? Aceasta actiune nu poate fi anulata.')) {
    // Clear all input fields
    $('table input').val('');
    
    // Clear localStorage
    localStorage.removeItem('argintTableData');
    
    // Reset totals and frequency table
    $('#total').text("Total: 0 lei (0 bucati)");
    $('#frequency-table-container').empty();
    
    showMessage('Datele din tabel au fost sterse', 'info');
  }
}

function showMessage(message, type) {
  // Remove existing message
  $('.message').remove();
  
  // Create message element
  var messageHtml = '<div class="message message-' + type + '">' + message + '</div>';
  $('body').append(messageHtml);
  
  // Auto-remove after 3 seconds
  setTimeout(function() {
    $('.message').fadeOut(500, function() {
      $(this).remove();
    });
  }, 3000);
}

// Load saved data when page loads
$(document).ready(function() {
  // Add event listener for clear button
  $('#clear-btn').click(clearTableData);
  
  // Auto-load saved data if available
  if (localStorage.getItem('argintTableData')) {
    loadTableData();
  }
});
