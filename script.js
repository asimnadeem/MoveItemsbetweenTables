// Code goes here


        var validatorTable;
        var availableTable;


        var aDataSet = [['Asim', 'asim@gmail.com', 'Cardialogy'],
                    ['Jaseeca', 'jaseeca@gmail.com', 'Surgical'],
                    ['Martin', 'martin@gmail.com', 'Cardialogy'],
                    ['Kathren', 'kathreen@gmail.com', 'Cardialogy'],
                    ['Anam', 'anam@gmail.com', 'Surgical']];


        var aDataSet1 = [["Qaisar", "q@gmail.com", "Cardialogy"],
                            ["Bengt", "b@gmail.com", "Cardialogy"],
                            ["Magnus", "m@gmail.com", "Cardialogy"],
                            ["Makus", "mark@gmail.com", "Cardialogy"],
                            ["Isha", "isha@gmail.com", "Cardialogy"]];
                          

        $(document).ready(function () {

            //Initialize Available people Datatable
            availableTable = $('#availableTable').DataTable({
                'aoColumns': [
                                  { 'sTitle': 'Name' },
                                  { 'sTitle': 'Email' }
                ],
                'fnRowCallback': function (nRow, aData, iDisplayIndex) {
                    nRow.className = 'validatorRow';
                    return nRow;
                },
                'bAutoWidth': false,
                'bPaginate': false,
                'bFilter': true,
                'bLengthChange': false,
                'iDisplayLength': 5,
                'aaData': aDataSet
            });




            // Initialize Validaors Datatable
            validatorTable = $('#validatorTable').DataTable({
                "aoColumns": [
                      { "sTitle": "Name", "bSortable": false },
                      { "sTitle": "Email", }
                ],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    nRow.className = "validatorRow";
                    return nRow;
                },
                "oTableTools": {
                    "sRowSelect": "single",
                    "aButtons": [{ sExtends: 'select_none', 'sButtonText': 'Clear Selection' }],
                    "fnRowSelected": function (node) {
                        var s = $(node).children();
                    }
                },
                "bPaginate": false,
                "bJQueryUI": true,
                "bProcessing": false,
                "bStateSave": true,
                "bAutoWidth": false,
                "bFilter": true,
                "bLengthChange": false,
                "iDisplayLength": 10,
                "aaData": aDataSet1
            });



            // Removing and Adding persons from (validaor-available and available-validator) double clicking on row
            $(document).on("dblclick", ".validatorRow", function () {
                var row = $(this);
                var table = $(this).closest("table");

                if (table.attr("id") == "availableTable") {
                    RowMove(row, "#availableTable", validatorTable);
                }
                else if (table.attr("id") == "validatorTable") {
                    RowMove(row, "#validatorTable", availableTable);
                }
            });



            // Implimentation for following buttons (Add all, Add selected, Remove selected, Remove all)
            $(document).on("click", ".validationBtn", function () {

                var button = $(this);
                var rowsAvailableTable = $("#availableTable").dataTable().find("tbody tr");
                var rowsValidatorTable = $("#validatorTable").dataTable().find("tbody tr");

                var rowAvailableTable = $("#availableTable").dataTable().find("tbody tr.selected");
                var rowValidatorTable = $("#validatorTable").dataTable().find("tbody tr.selected");


                switch (button.attr("id")) {
                    case "RemoveAll":
                        $.each(rowsValidatorTable, function (index, value) {
                            RowMove(value, "#validatorTable", availableTable);
                        });
                        break;
                    case "RemoveSelected":
                        RowMove(rowValidatorTable, "#validatorTable", availableTable);
                        break;
                    case "AddAll":
                        $.each(rowsAvailableTable, function (index, value) {
                            RowMove(value, "#availableTable", validatorTable);
                        });
                        break;
                    case "AddSelected":
                        RowMove(rowAvailableTable, "#availableTable", validatorTable);
                        break;
                }

            });


            // Get selected row
            $('.validatorTable tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    availableTable.$('tr.selected').removeClass('selected');
                    validatorTable.$('tr.selected').removeClass('selected');

                    $(this).addClass('selected');
                }
            });

            // Copy and remove give person 
            function RowMove(row, copyFrom, copyTo) {
                $(copyFrom).dataTable().fnDeleteRow(row);
                copyTo.row.add(row).draw();
            }



            $('#validatorTable tbody tr').each(function (i, row) {
                var $row = $(row), $email = $(row).find('td')[1].innerHTML; 
            });


            $('#RemoveSelected, #AddSelected').css('display', 'none');
            
        });


