<?php
namespace App\Classes;

class ConfigClass {

    public $key_Unified_Mozart;
    public $coste;
    public $analyticsCode;
    public $adWordsCode;
    public $empresa;
    public $cif;
    public $telf;
    public $mail;
    public $url;


   function __construct( $domain ) {
        switch ($domain) {
            
            default:

                $this->key_Unified_Mozart = "84187E8F-3B06-4DAA-827C-60FCDF58774C";
                
                $this->coste['movistar']  = "7,26";
                $this->coste['vodafone']  = "7,26";
                $this->coste['orange']    = "3,5";
                $this->coste['yoigo']     = "";
                
                $this->analyticsCode      = "UA-80420565-1";
                $this->adWordsCode        = "UA-72035321-1";
                
                $this->empresa            = "PYRON GESTIONA, S.L.";
                $this->cif                = "B-87168191";
                $this->telf               = "900 907 687";
                $this->mail               = 'info@pyrongestiona.com';
                
                $this->url['vodafone']  = "terminos-condiciones";
                $this->url['orange']    = "http://pagosenfactura.orange.es/UpImages/files/2316/condiciones_legales_65f38e371514938c951885c65.pdf";
                $this->url['yoigo']     = "";
                
            break;
        }      
   }
   
}
