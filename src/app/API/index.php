<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// Configuración de cabeceras
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

require 'vendor/autoload.php';

// Using Medoo namespace
use Medoo\Medoo;

// Initialize
$database = new Medoo(
    [
    'database_type' => 'mysql',
    'database_name' => 'pixel_seed_db',
    'server' => 'localhost',
    'username' => 'root',
    'password' => ''
    ]
);

$app = new \Slim\App;

$app->post('/productos', function (Request $request, Response $response) {
    global $database;
    //$json = $app->request->post('json');    
    $json = $_POST['json'];    
    $data = json_decode($json, true);
    if ($data['id'] === 0) {
        $database->insert('productos', [
            'nombre' => $data['nombre'],
            'descripcion' => $data['descripcion'],
            'precio' => $data['precio'],
            'imagen' => $data['imagen']
        ]);
    } else {
        $database->update('productos', [
            'nombre' => $data['nombre'],
            'descripcion' => $data['descripcion'],
            'precio' => $data['precio'],
            'imagen' => $data['imagen']
        ], ['id' => $data['id']]);
    }
    

    $res = "success";
    echo json_encode($res);
});

$app->get('/get_productos', function(Request $request, Response $response){
    global $database;
    $data = $database->select('productos', '*');
    echo json_encode($data);
});

$app->get('/get_producto/{id_producto}', function(Request $request, Response $response){
    global $database;
    $id_producto = $request->getAttribute('id_producto');
    $data = $database->select('productos', '*', [ 'id' => $id_producto ]);
    echo json_encode($data);
});

$app->get('/delete_producto/{id_producto}', function(Request $request, Response $response){
    global $database;    
    $id_producto = $request->getAttribute('id_producto');
    $data = $database->delete("productos", ["id" => $id_producto]);
    echo json_encode($data);
});

$app->post('/upload', function(Request $request, Response $response){
    global $database;

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'No se puede subir'
    );

    if(isset($_FILES['uploads'])){
        $piramide = new PiramideUploader();
        $upload = $piramide->upload('image', 'uploads', 'uploads', array('image/jpeg', 'image/png', 'image/gif'));
        $file = $piramide->getInfoFile();
        $file_name = $file['complete_name'];

        if(isset($upload) && $upload['uploaded'] == false){
            $result = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'No se puede subir'
            );
        } else {
            $result = array(
                'status' => 'success',
                'code' => 200,
                'message' => 'Se subio el archivo',
                'filename' => $file_name
            );
        }
    }

    echo json_encode($result);
});

$app->post('/uploadFile', function(Request $request, Response $response){    
    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'No se puede subir'
    );

    if(isset($_FILES['uploads'])){
        $file = $_FILES['uploads'];
        $directory = 'uploads';
        $nombre = "file_" . time() . "_" . $file["name"][0];

        if(!is_dir($directory)){
            $dir = mkdir($directory, 0777, true);
        }else{
            $dir = true;
        }
        
        if($dir){
            $mpf = move_uploaded_file($file["tmp_name"][0], $directory . "/" . $nombre);
    
            if($mpf){
                $uploaded = true;
            }else{
                $uploaded = false;
                $error = "The file has not moved";
            }
        }else{
            $upload = false;
            $error = "The directory does not exist";
        }

        if($uploaded) {
            $result = array(
                'status' => 'success',
                'code' => 200,
                'message' => 'Se subio el archivo',
                'filename' => $nombre
            );
        }        
    }

    echo json_encode($result);
});

$app->run();
