<!DOCTYPE html>
<html class="no-focus">
    <head>
        <meta charset="utf-8">

        <title>@yield('title')</title>

        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">

        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic">

        <link rel="stylesheet" href="{{ asset('/assets/css/bootstrap.min.css') }}">
        <link rel="stylesheet" id="css-main" href="{{ asset('/assets/css/oneui.css') }}">

        <style type="text/css">
            .colorHeader{
                background-color: <?php echo $view['header'] ?>
            }
            .colorCuerpo{
                background-color: <?php echo $view['background'] ?> !important;
            }
            .colorBoton{
                background-color: <?php echo $view['button_color'] ?>;
                border-color: <?php echo $view['button_color'] ?>;
                color: <?php echo $view['button_text_color'] ?>!important;
            }
            .textColor{
                color: <?php echo $view['text'] ?>
            }
            .colorConfirm{
                color: <?php echo $view['color_button_confirm'] ?>!important;
            }
            .cancelColorText{
                background-color: <?php echo $view['cancel_button_color'] ?>;
                border-color: <?php echo $view['cancel_button_color'] ?>;
                color: <?php echo $view['cancel_text_color'] ?>;
            }
            a, a:hover{
                color: <?php echo $view['link'] ?>
            }
        </style>
        <!--
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', '<?php echo $config->analyticsCode ?>', 'auto');
            ga('send', 'pageview');

        </script>
        -->
    </head>
    <body class="colorCuerpo textColor">
        <div id="page-container">
            <main id="main-container" class="colorCuerpo"  style="overflow-x: hidden!important ">
                <div class="col-lg-12 row colorHeader  ">
                    <div class="col-lg-4 col-lg-offset-4  col-xs-12 col-sm-12 col-md-12 text-center">
                        <img class="img-responsive logo-header" src="{{ asset('/contents') }}/<?php echo $dataRequest["vista"] ?>/assets/images/<?php echo $view['img_logo'] ?>" alt="">
                    </div>
                </div>
                <div class="row col-lg-12">
                    <section class="content-boxed" >
                        <div class="row">
                            @yield('body')
                        </div>
                    </section>
                </div>
            </main>
            <?php if($view['layer'] == 1 || $dataRequest['operador'] == 'vodafone'):  ?>
                <footer id="page-footer"  class="colorCuerpo">
                    <div class="font-s12 clearfix">
                        <hr class="remove-margin-t push-5">
                        <div class=" col-xs-6 padding-5 text-left">
                            Atencion al cliente <br><?php echo $config->telf ?>
                        </div>
                        <div class="col-xs-6 padding-5 text-right">
                            <a href="/<?php echo $view['terms_url'] ?>" title="TÉRMINOS Y CONDICIONES" alt="TÉRMINOS Y CONDICIONES" style="text-decoration: underline;">
                                TERMINOS Y CONDICIONES
                            </a>
                        </div>
                    </div>
                </footer>
            <?php else: ?>
                
                <footer id="page-footer" class="colorCuerpo">
                    <div class="font-s12 clearfix">
                        <div class=" col-xs-8 col-xs-offset-2 not-padding text-center">
                    
                            <p class="remove-margin-b">Atencion al cliente <span style="text-decoration: underline;"><?php echo $config->telf ?></span></p>
                            <span class="font-s11">Al hacer click en Aceptar acepto:</span>
                            <p class="remove-margin-b">
                                <span class="font-s12"><?php echo $view['help'] ?></span>
                            </p>
                            <p class="remove-margin-b">
                                <a href="{{ url('/compatibilidad') }}" title="TÉRMINOS Y CONDICIONES" alt="TÉRMINOS Y CONDICIONES" style="text-decoration: underline;">
                                    Compatibilidad de Dispositivos
                                </a>
                            </p>
                            <p class="remove-margin-b">
                                <a href="/<?php echo $view['terms_url'] ?>" class="textColor" title="TÉRMINOS Y CONDICIONES" alt="TÉRMINOS Y CONDICIONES" style="text-decoration: underline;">
                                   Términos y condiciones
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            <?php endif; ?>
        </div>

        <script src="{{ asset('/assets/js/core/jquery.min.js') }}"></script>
        <script src="{{ asset('/assets/js/core/bootstrap.min.js') }}"></script>
        <script src="{{ asset('/assets/js/core/jquery.slimscroll.min.js') }}"></script>
        <script src="{{ asset('/assets/js/core/jquery.scrollLock.min.js') }}"></script>
        <script src="{{ asset('/assets/js/core/jquery.appear.min.js') }}"></script>
        <script src="{{ asset('/assets/js/core/jquery.countTo.min.js') }}"></script>
        <script src="{{ asset('/assets/js/core/jquery.placeholder.min.js') }}"></script>
        <script src="{{ asset('/assets/js/core/js.cookie.min.js') }}"></script>
        <script src="{{ asset('/assets/js/app.js') }}"></script>

        <script>
            jQuery(function () {

                App.initHelpers('appear');
            });

        </script>      

       @yield('managerMozart')
       
        <script>
            /**
            * Función de Analytics que realiza un seguimiento de un clic en un enlace externo.
            * Esta función toma una cadena de URL válida como argumento y la utiliza
            * como la etiqueta del evento. Configurar el método de transporte como "beacon" permite que el hit se envíe
            * con "navigator.sendBeacon" en el navegador que lo admita.
            */
            var trackOutboundLink = function(evento) {
                  ga('send', {
                    hitType: 'event',
                    eventCategory: 'landing',
                    eventAction: evento,
                    eventLabel: evento
                });
            }
        </script>

        <!-- /.container -->
    </body>
</html>