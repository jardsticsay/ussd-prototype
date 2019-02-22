<?php 
// echo "Response"
$apiUrl ="http://112.206.234.26/SwissKnife_dev_stage/index.cgi";
$apiCred = "ussd:ussd2019";

function callAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $apiUrl, http_build_query($data));    
    }
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURL_AUTHBASIC);
    curl_setopt($curl, CURLOPT_USERPWD, btoa($apiCred));
    curl_setopt($curl, CURLOPT_URL, $apiUrl);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);
    curl_close($curl);

    return $result;
}
?>