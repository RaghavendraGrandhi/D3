<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

    <title>*</title>
<style>
.box {
    height: 200px;
    width: 140px;
    border-radius: 10px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
    box-shadow: 1px 1px 10px 0px #f1f1f1;
    position: relative;
    background: linear-gradient(to bottom right, #ffffff, #c9b5e070);
     background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNm9A-lEJ_6i2WkXDZvI85dsEXz4vIFqzyrmIKEeMgMKOjLAbAYA');
    
}
.box:hover {        
    box-shadow: 0px 0px 20px 0px #ebdbff;
}
.box > img {
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    visibility: hidden;
}
.box:hover > img {
    visibility: visible;
}
    .text-top-left {
        position: absolute;
        top: 0;
        left: 0;
        color: red;
        font-weight: bold;
        font-family: INITIAL;
        font-size: 24px;
        margin: 0;
        padding: 10px;
    }
    .text-bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
        color: red;
        font-weight: bold;
        font-family: INITIAL;
        font-size: 24px;
        margin: 0;
        padding: 10px;
        transform: rotate(-180deg);
    }
</style>      
  </head>
  <body>
<div class="container">
    <br>
    <div class="row">
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="box">
            <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-32.png" data-toggle="modal" onclick="openModal(1)">
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="box">
            <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-32.png" data-toggle="modal" onclick="openModal(1)">
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="box">
            <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-32.png" data-toggle="modal" onclick="openModal(1)">
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="box">
            <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-32.png" data-toggle="modal" onclick="openModal(1)">
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="box">
            <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-32.png" data-toggle="modal" onclick="openModal(1)">
        </div>
      </div>
      <div class="col-md-2 col-sm-4 col-xs-6">
        <div class="box">
            <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-32.png" data-toggle="modal" onclick="openModal(1)">
        </div>
      </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modal-body">
       <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>      
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
  	<script  src="resources/js/trinet.js"></script>
  </body>
</html>