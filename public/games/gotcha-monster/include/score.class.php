<?php
/*
ngamescore class - NGame Score, simple read & write score with PHP

version 1.0.0 2016-03-01

Copyright 2016, NhutCorp
All rights reserved.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

class nGameScore{
	private $_datafile;
	private $_data;
	public $defaultscore;
	public $errors;
	
	function __construct($filedata){
		$this->_datafile = $filedata;
		$this->_readfiledata();
		$this->defaultscore = 0;
	}
	
	public function Lists(){
		return $this->_data;		
	}
	
	public function IsUserExist($key){
		return isset($this->_data[$key]);		
	}
	
	public function GetScore($key){
		if (isset($this->_data[$key])) {
			return $this->_data[$key];
		}
		return $this->defaultscore;		
	}
	
	public function SetScore($key,$score,$country){
		$this->_data[$key] = [$score,$country];
		$this->_writefiledata();
	}
	
	private function _readfiledata(){
		try {
			$this->_data = unserialize(file_get_contents($this->_datafile));
		}
		catch (Exception $e) {
			$this->_err("Read data file",$e->getMessage());
		}
	}
	
	private function _writefiledata(){
		try {
			file_put_contents($this->_datafile,serialize($this->_data));
		}
		catch (Exception $e) {
			$this->_err("Write data file",$e->getMessage());
		}
	}
	
	private function _err($title,$msg){
		$this->errors[] = array($title,$msg);
	}
	

}	
	