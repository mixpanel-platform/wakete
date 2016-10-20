<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
include_once('score.class.php');

$apidata = new stdClass;
$errors = array();
if(isset($_POST['act']) && (trim($_POST['act']) != '') ) {
    $act=$_POST['act'];
}
else {
    $errors[] = "Empty Action";
}

if (count($errors)==0){
	$nscore = new nGameScore('data.txt');
	$nscore->defaultscore = 0;
	if (count($nscore->errors)==0){
		if ($act =='highscore'){
			$limit = isset($_POST['limit']) ? (int) $_POST['limit'] : 0;
			$listarr = $nscore->Lists();
			arsort($listarr);
			$userarr = array();
			$creditarr = array();
			$countryarr = array();
			$c=0;
			foreach ($listarr as $key => $value){
				$userarr[] = $key;
				$creditarr[] = $value[0];
				$countryarr[] = $value[1];
				$c++;
				if ($c >= $limit && $limit >0) break;
			}
			$apidata->UserList = $userarr;
			$apidata->CreditList = $creditarr;
			$apidata->CountryList = $countryarr;
		}else if ($act =='get' || $act =='set' || $act =='check'){
			$user = '';
			if(isset($_POST['user']) && (trim($_POST['user']) != '') ) {
				$user=$_POST['user'];
				//if ($nscore->IsUserExist($user) && $act =='set')
					//$errors[] = "User already exists";
			}
			else {
				$errors[] = "Empty User";
			}
			if (count($errors)==0){
				if ($act =='check'){
					$apidata->Result = $nscore->IsUserExist($user) ? 1 : 0;
				} else {
					if ($act =='set'){
						$amount = 0;
						if(isset($_POST['amount']) && (trim($_POST['amount']) != '') ) {
							$amount = (int) $_POST['amount'];
							if ($amount <= 0)
								$errors[] = "Invalid Amount";
						}
						else {
							$errors[] = "Empty Amount";
						}
						$country = '';
						if(isset($_POST['country']) && (trim($_POST['country']) != '') ) {
							$country=$_POST['country'];
						}
						else {
							$errors[] = "Empty Country";
						}					
						if (count($errors)==0){
							$nscore->SetScore($user,$amount,$country);
						}					
					}
					$dataarr = $nscore->GetScore($user);
					$apidata->Credits = $dataarr[0];
					$apidata->Country = $dataarr[1];
				}

			}
		}
	}
	if (count($nscore->errors)>0){
		$errors[] = outputErrors($nscore->errors);
	}
}

$status = 'OK';
if (count($errors)>0){
	$status = 'FAILD';
}
$apidata->Status = $status;
$apidata->Errors = $errors;
echo json_encode($apidata);

function outputErrors($errors){
	$relarr = array();
	for ($i=0; $i<count($errors);$i++){
		list($title,$content) = $errors[$i];
		$relarr[] = "$title error: $content";
	}
	return implode(" ;;; ",$relarr);
}

?>