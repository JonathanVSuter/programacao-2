<?php 
header('Content-Type: application/json');
function Recuperar(){
    $connection = require("dbfactory.php");
    $sql = "SELECT idtodo, description FROM todo";
    $result = $connection -> 
        query($sql);                            
    $connection -> close();
    $response = [];
    while ($row = $result->fetch_assoc()){
        array_push($response, $row);
    }    
    echo json_encode($response);
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    Recuperar();
}
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>