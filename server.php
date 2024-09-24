<?php
$_POST = json.decoct(file_get_contents("php://input"), true);
echo var_dump($_POST);

