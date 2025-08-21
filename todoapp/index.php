<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulário</title>
</head>
<body>
    <?php        
        function Recuperar(){
            $connection = require("dbfactory.php");
            $sql = "SELECT idtodo, description FROM todo";

            $result = $mysqli->query($sql);
            echo "<table>";
            while ($row = $result->fetch_assoc()) {  
                $rowid = "'_" . $row["idtodo"] . "'";       
                $descricao = $row["description"];
                echo "<tr id = "."_".$row["idtodo"].">"                        
                        . "<td>"
                           . @"<input type='text' class = 'valor-descricao' value = '$descricao'/>"                         
                        . "</td>"
                        . "<td>"
                        . @"<button onclick=removerTodo($rowid)>Remover</button>"
                        ."</td>"
                        . "<td>"
                        . @"<button onclick=atualizarTodo($rowid)>Atualizar</button>"
                        ."</td>"                                            
                    ."</tr>";
            }
            echo "</table>";
        }
        Recuperar(); 
    ?>
    <form method="post">
        <label for="todo-description">Descrição da tarefa:</label>
        <input name="description" id="todo-description" type="text">
        <button type="submit">Enviar</button>
    </form> 
</body>
<script src="/js/index.js"></script>
</html>