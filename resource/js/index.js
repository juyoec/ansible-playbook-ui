$('.dd').nestable();
$('.dd-handle a').on('mousedown', function(e){
    e.stopPropagation();
});

var $editor = $('#editor');
$('.pencil.blue').on('click', function(e) {
    var filename = $(this).parents('li.dd2-item').data('id');
    $.get('/getfile/' + filename, function(data) {

        setText(data);
    })
    setFilename(filename);
})
$('.run.green').on('click', function(e) {
    var filename = $(this).parents('li.dd2-item').data('id');
    addtab(filename)
    running = filename;
    localStorage.setItem(recomma(filename), '');
    $.get('/runfile/' + filename, function() {
        //location.href = '/';

    });
})
$('.trash.red').on('click', function(e) {
    var filename = $(this).parents('li.dd2-item').data('id');
    $.get('/delfile/' + filename, function() {
        location.href = '/';
    });
})
$('#editreset').on('click', function(e) {
    setFilename()
    setText()
})
$('#editsave').on('click', function(e) {
    var filename = $editor.find('input').val();
    if (!filename ) {
        alert('File Name require');
        return;
    }
    var body = $editor.find('textarea').val();
    $.post('/setfile/' + filename, {'body':body})
        .done(function(){
            location.href = '/';
        })
})
function setFilename(text) {
    var base = text || '';
    $editor.find('input').val(base);
}
function setText(text) {
    var base = text||'- hosts: localhost\n'+
        '  vars:\n'+
        '  tasks:\n';
    $editor.find('textarea').val(base);
}
var running = '';
var sse = new EventSource('/stream');

sse.addEventListener('message', function(e) {

    console.log(e.data);
    var refilename = recomma(running);
    $('#li' + refilename).click();
    var content = localStorage.getItem(refilename) + '<p>'+e.data + '</p>';
    localStorage.setItem(refilename, content);

    $('#content' + refilename).html(content);
}, false);
setText();
function recomma(text) {
    return text.replace('.', '_')
}

var $filehead = $('#filehead');
var $filecontent = $('#filecontent');
function addtab(filename) {
    var refilename = recomma(filename);
    if ($('#li' + refilename)[0]) {
        return;
    }

    var head = $('<li id="li'+refilename+'">')
        .append($('<a data-toggle="tab" href="#content' + refilename+'">')
            .append('<i class="pink ace-icon fa fa-tachometer bigger-110"></i>' + filename))
    $filehead.append(head);

    var content = $('<div id="content'+refilename+'" class="tab-pane">');
    $filecontent.append(content);
}

$filecontent.children().each(function(i,e) {
    var e = $(e);
    var key = e.data('rename');
    e.html(localStorage.getItem(key));
})
$filehead.children(':first').children().click();