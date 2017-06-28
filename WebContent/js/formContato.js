$('#txtNome').keyup(function () {
        this.value = this.value.replace(/[^a-zA-Zà-úÀ-Ú.]/g, '');
    });
    
    $('#txtSobrenome').keyup(function () {
        this.value = this.value.replace(/[^a-zA-Zà-úÀ-Ú.]/g, '');
    });
    
    $('#btnContato').on('click', function (e) {
        var txtNome = $('#txtNome').val()
            , txtSobrenome = $('#txtSobrenome').val()
            , slctEstado = $('#slctEstado').val()
            , slctCidade = $('#slctCidade').val();
        
        var vazio = camposVazios(txtNome, txtSobrenome, slctEstado, slctCidade);
        
        if(vazio){
        	$('#modalError').modal('show')
        } else {
            // campos validados, prontos para serem enviados
        	$('#modalSucess').modal('show')
        	limparCampos();
        }
    });
    
    function camposVazios(txtNome, txtSobrenome, slctEstado, slctCidade){
        if(txtNome == null || txtSobrenome == null || slctEstado === '0'){
           return true;
        } else {
            return false;
        }
    }
    
    $('#slctEstado').on('change', function (e) {
        var valorSelecionado = this.value;
        if (valorSelecionado === '1') {
            $.getJSON('json/sao_paulo.json', function (json) {
                popularSelectCidades(json);
            });
        }
        else if (valorSelecionado === '2') {
            $.getJSON('json/rio_de_janeiro.json', function (json) {
                popularSelectCidades(json);
            });
        } else {
            $('#slctCidade').empty();
            $('#slctCidade').prop('disabled', true);
        }
    });

    function popularSelectCidades(json) {
        $('#slctCidade').empty();
        $('#slctCidade').prop('disabled', false);
        $.each(json, function (i, field) {
            $('#slctCidade').append("<option value='" + json[i][0] + "'>" + json[i][1] + "</option>");
        });
    }
    
    function limparCampos() {
		$('#txtNome').val('');
		$('#txtSobrenome').val('');
		$('#slctEstado option:eq(0)').prop('selected', true);
		$('#slctCidade').empty();
	}