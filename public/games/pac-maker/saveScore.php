<?php
/////////// config

$SCORE_CRYPT_TEXT = "p@cM@k3r";
date_default_timezone_set("Europe/Rome");

/////////// end config


if(isset($_POST["playerName"])){
	$nome=$_POST["playerName"];
}else{
	if(isset($_GET["playerName"])){
		$nome=$_GET["playerName"];
	}else{
		$nome="";
	}
}
if(isset($_POST["playerScore"])){
	$realScore=$_POST["playerScore"];
}else{
	if(isset($_GET["playerScore"])){
		$realScore=$_GET["playerScore"];
	}else{
		$realScore="0";
	}
}
$score=substr("        ".$realScore,-8);
$host=$_SERVER['REMOTE_ADDR'];
if(isset($_POST['magic'])){$magic=$_POST['magic'];}else{$magic=$_GET['magic'];}
if($magic=="getScore"){
    getScore();
}else{
    saveScore($nome, $score, $host, $magic, $realScore);
}
function getScore(){
header('Access-Control-Allow-Origin: *');
$today = getdate();
    $month = $today['month'];
    $mday = $today['mday'];
    $year = $today['year']; 
    $hiscore=@file("scores/".$year.$month.$mday);
    if($hiscore==""){
    	echo "[]";
    }else{
		echo "[";
		for($i=0; $i<50; $i++){
			if(count($hiscore)>$i){
		    	$piece = explode("|", $hiscore[$i]);
		    }else{
		    	break;
		    }
		    if ($i==0){
		        echo "{ \"name\": \"".$piece[1]."\", \"score\": \"".$piece[0]."\"}";
		    }else{
		        echo ", { \"name\": \"".$piece[1]."\", \"score\": \"".$piece[0]."\"}";
		    }
		}
		echo "]";
    }
}
function saveScore($nome, $score, $host, $magic, $realScore){
	global $SCORE_CRYPT_TEXT;
    $a1=md5(($realScore*2));
    $a2=md5($nome);
    $chk=md5($a1.$a2);
    $chk=md5($realScore.$nome.$SCORE_CRYPT_TEXT);
    $today = getdate();
    $month = $today['month'];
    $mday = $today['mday'];
    $year = $today['year']; 
    $rq = "";
    foreach($_REQUEST as $r){
    	$rq = $rq." - ". $r;
    }
    if ($magic==$chk){
        do {
        } while (file_exists("scores/lock"));
        if (!file_exists("scores/lock") ){
            $f = @fopen("scores/lock", "w");
            @fputs($f,"-");
            fclose($f);
            $f = @fopen("scores/".$year.$month.$mday, "a");
            @fputs($f,"$score|$nome|$host\n");
            @fclose($f);
            $f = @fopen("scores/".$year.$month, "a");
            @fputs($f,"$score|$nome|$host\n");
            @fclose($f);
            $f = @fopen("scores/".$year, "a");
            @fputs($f,"$score|$nome|$host\n");
            @fclose($f);    
            $hiscore=@file("scores/".$year.$month.$mday);
            rsort ($hiscore, SORT_NUMERIC);
            $Yhiscore=@file("scores/".$year);
            rsort ($Yhiscore, SORT_NUMERIC);
            $Mhiscore=@file("scores/".$year.$month);
            rsort ($Mhiscore, SORT_NUMERIC);
            $f = @fopen("scores/".$year.$month.$mday, "w");
            $fm= @fopen("scores/".$year.$month, "w");
            $fy= @fopen("scores/".$year, "w");
            $i=0;
            foreach($hiscore as $score){
                $i++;
                if ($i<1000){
                    @fputs($f,$score);
                }
            }
            $i=0;
            foreach($Yhiscore as $score){
                $i++;
                if ($i<100){
                    @fputs($fy,$score);
                }
            }
            $i=0;
            foreach($Mhiscore as $score){
                $i++;
                if ($i<100){
                    @fputs($fm,$score);
                }
            }
            fclose($f);
            fclose($fm);
            fclose($fy);
            unlink("scores/lock");
        }
    }
    getScore();
}
?>
