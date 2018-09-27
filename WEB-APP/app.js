$(function () {

    var $ul = $('#books');



    function request(onDone, bookId, method, data, dataType) {

        var BASE_URL = 'http://localhost:8080/books/'

        var url = bookId ?

            BASE_URL + bookId :

            BASE_URL

        $.ajax({

            url: url,

            method: method || 'GET',

            data: JSON.stringify(data) || null,

            dataType: dataType || null,

            contentType: 'application/json',

            success: onDone

        })

    }



    function getBooks() {

        function onDone(response) {

            response.forEach(function (book) {

                console.log(book.title);

                var $li = $('<li>');

                var $span = $('<span>');

                var $div = $('<div>').hide();

                var $deleteButton = $('<input type="submit" value="usun">').text('usun');

                $span.text(book.title).attr('data-id', book.id);

                $li.append($span).append($deleteButton).append($div);

                $ul.append($li)



            })



        }



        request(onDone)

    }



    function getBook(bookId, onDone) {

        request(onDone, bookId)

    }



    function addBook(onDone, data) {

        request(onDone, null, 'POST', data, "json")

    }



    function removeBook(bookId, onDone) {

        request(onDone, bookId, "delete")

    }



    getBooks()



    var $formAdd = $('#addbookform');

    $formAdd.on('click', '#submitbook', function (ev) {

        ev.preventDefault();



        function onDone() {

            location.reload()

        }



        var data = {

            'isbn': $('#isbn').val(),

            'title': $('#title').val(),

            'publisher': $('#publisher').val(),

            'type': $('#type').val(),

            'author': $('#author').val()

        };

        addBook(onDone, data)

    });



    $ul.on('click', 'input', function () {

        var $buttonClicked = $(this)

        var bookId = $buttonClicked.prev().data('id');



        function onDone() {

            $buttonClicked.parent().remove()

        }



        removeBook(bookId, onDone)

    })



    $ul.on('click', 'span', function () {

        var $span = $(this);

        var bookId = $span.data('id');

        var $div = $span.next().next();

        if ($div.text() === "") {

            function onDone(book) {

                var info = [

                    book.author,

                    book.isbn,

                    book.publisher,

                    book.type

                ];



                info.forEach(function (value) {

                    var $p = $('<p>').text(value);

                    $div.append($p)

                })

            }



            getBook(bookId, onDone)

        }

        $div.slideToggle();

    })

});

