<?php 
header('Content-Type: application/json');
function Salvar($todo){
    $connection = require("dbfactory.php");                        
    if ($connection -> 
        query(@"INSERT INTO todo (description) VALUES ('$todo');")) {                 
    }
    $connection -> close();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $postData = json_decode(file_get_contents('php://input',true));    
    if(!empty($postData->descricao)){
        Salvar($postData->descricao);
    }                
}
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>