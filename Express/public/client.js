$(() => {
    var appendToList = (blocks) => {
        var list = [];
        var content, block;
        for (var i in blocks) {
            block = blocks[i];
            content = '<a href="/blocks/' + block + '">' + block + '</a>' + 
                '<a href="#" data-block="' + block + '">X</a>';
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list);     // appends blocks to .block-list element
    }

    $.get('/blocks', appendToList);

    $('form').on('submit',
    // avoid arrow function as 'this', for arrow functions, refers to the containing code
    // see lexographical scoping
    function (event) {
        event.preventDefault();
        var form = $(this);   // wrap in jQuery object
        var blockData = form.serialize(); // transforms form data to notation used in URL

        $.ajax({
            type: 'POST', url: '/blocks', data: blockData
        }).done((blockName) => {
            appendToList([blockName]);
            form.trigger('reset');   // cleans up form text input fields
        });
    });

    $('.block-list').on('click', 'a[data-block]', function(event) {
        if (!confirm('Are you sure?')) {
            return false;
        }

        var target = $(event.currentTarget);

        $.ajax({
            type: 'DELETE', url : '/blocks/' + target.data('block')
        }).done(function() {
            target.parents('li').remove();
        });
    });
});