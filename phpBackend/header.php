<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/fontawesome-all.css"/>
    <title>Clip Collector</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <style type="text/css">
        .lnk-trash {
            font-size: 12px; color: #999999 !important;
        }

        .lnk-trash:hover {
            color: #333333 !important;
            text-decoration: underline;
        }

    </style>


    <script>
       $(function(){
           $('.lnk-trash').on('click', function(evt){
               evt.preventDefault();
               console.log(evt)
                $(evt.currentTarget).closest('.media').fadeOut(400);
           })


       });
    </script>
</head>
<body>
<div class="container">

