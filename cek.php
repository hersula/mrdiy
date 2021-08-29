<?php
	function cekModules($modules) {
		try {
			if (extension_loaded($modules)) {
				return "OK";
			} else {
				return "MISSING";
			}
		}
		catch (Exception $e) {
			 return $e->getMessage();
		}
		catch (InvalidArgumentException $e) {
			 return $e->getMessage();
		}
	}

	$list_mod = array(
		'opcache',
		'bz2',
		'calendar',
		'ctype',
		'curl',
		'exif',
		'fileinfo',
		'ftp',
		'gd',
		'gettext',
		'iconv',
		'json',
		'mysqlnd',
		'pdo',
		'pgsql',
		'phar',
		'sockets',
		'sqlite3',
		'tokenizer',
		'mcrypt',
		'mysqli',
		'pdo_mysql',
		'pdo_pgsql',
		'pdo_sqlite',
		'zip',
	);
 	echo '<p>Checking extension ['.date('d/m/Y H:i:s').'] :</p>';
	
	foreach($list_mod as $key => $val) {
		echo $val." : ", cekModules($val), '<br>';
	}
?>