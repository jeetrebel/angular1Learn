<?php

     $target_dir = "./upload/";


     $url = (isset($_POST['id']) && ($_POST['id']!='')) ? 
     $_POST['url'].$_POST['id'] : 
     $_POST['url'];

     $filename = $_POST['gal_img'];


     if(!empty($_FILES["file"]["name"])){

       if(!empty($_POST['id']) && $filename !=''){
            unlink($target_dir.$filename);
     }
    

        $temp = explode(".", $_FILES["file"]["name"]);
        $filename = round(microtime(true)) . '.' . end($temp);

        $target_file = $target_dir . $filename;

        move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);  

     }
     

     $data = array(
         
        'gal_img' => $filename,
        'gal_alt' =>  $_POST['gal_alt'],
        'gal_desc' => $_POST['gal_desc'],
        'gal_status' => $_POST['gal_status'],
        'gal_modified' => $_POST['gal_modified']
     );
   
$content = json_encode($data);

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER,
        array("Content-type: application/json"));

if(isset($_POST['id']) && $_POST['id']!=''){
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
} else {
    curl_setopt($curl, CURLOPT_POST, true);
}       

curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

$json_response = curl_exec($curl);

$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);


if ( $status != 201 || 200 ) {
    die("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
}


curl_close($curl);

$response = json_decode($json_response, true);

print_r($response);

?>