function sendInformations() {
    let email = $("#email").val();
    let sentiment = $("#sentiment").val();

    console.log(email);
    console.log(sentiment);

    if (!email) {
        $("#email").addClass('invaid-input');
    }

    if (!sentiment) {
        $("#sentiment").addClass('invaid-input');
    }

    if (!email || !sentiment) {
        toastr["error"]("Campos inválidos existentes");
        return;
    } else {
        clearForm();
        toastr["success"]("Informações enviadas com sucesso!");

        var data = {
            email: email,
            sentiment: sentiment
        }
      
        $.post('/filmInfo', data, function (res) {
            // if(res === 'ok') {
            //     toastr["success"]("Cadastro realizado com sucesso!");
            // } else {
            //     toastr["error"]("Erro: " + res);
            // }
        })
    }

}

function clearForm() {
    $("#email").removeClass('invaid-input');
    $("#sentiment").removeClass('invaid-input');
    $("#email").val('');
    $("#sentiment").val('');
}