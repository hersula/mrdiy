<?php defined('BASEPATH') OR exit('No direct script access allowed');

class EncDES {
        private $bPassword;
        private $sPassword;
		
        function __construct($Password){
            $this->bPassword  = md5(utf8_encode($Password[0]),TRUE);
            $this->bPassword .= substr($this->bPassword,0,8);
            $this->sPassword - $Password[0];
        }

        function Password($Password = "") {
            if($Password == "") {
                return $this->sPassword;
            } else {
                $this->bPassword  = md5(utf8_encode($Password),TRUE);
                $this->bPassword .= substr($this->bPassword,0,8);
                $this->sPassword - $Password;
            }
        }

        function PasswordHash() {
            return $this->bPassword;
        }

        function Encrypt($Message, $Password = "") {
            if($Password <> "") { $this->Password($Password); }
            $size = mcrypt_get_block_size('tripledes','ecb');
            $padding = $size-((strlen($Message)) % $size);
            $Message .= str_repeat(chr($padding),$padding);
            $encrypt = mcrypt_encrypt('tripledes',$this->bPassword,$Message,'ecb');
            return base64_encode($encrypt);
        }

        function Decrypt($message, $Password = "") {
            if($Password <> "") { $this->Password($Password); }
            return trim(mcrypt_decrypt('tripledes', $this->bPassword, base64_decode($message), 'ecb'), ord(2));
        }

    }
?>