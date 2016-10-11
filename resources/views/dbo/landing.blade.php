@extends('layouts.dbo-master')

@section('title') <?php echo $dataRequest["vista"] ?> @endsection


@section('body')
<div class="col-lg-12">
    <div class="row">
        <?php if ( $action != 6 && $action != 20 ): ?>
        <div class="col-xs-12 col-lg-6 landscape-6 not-padding push-10">
            <div class="col-xs-12">
                <div class="img-container">
                    <img class="img-responsive min-height" src="{{ asset('/contents') }}/<?php echo $dataRequest["vista"] ?>/assets/images/<?php echo $view['img_creative'] ?>" alt="">
                </div>
            </div>
        </div>
        <?php endif; ?>
        <div class="col-xs-12  col-lg-6 landscape-6 not-padding push-10">
            
            <div class="col-sm-12 blog-main">
                <div class="col-xs-12 colorCuerpo " id="Contenido" style="display:none">
                    
                    <button type="button" class="btn btn-success btn-full btn-full2 colorBoton" style="width: 100%"  onclick="gotoContent();  trackOutboundLink('ver_contenido');" title="Ir al contenido" alt="Ir al contenido"> Ir al contenido</button>

                </div>

                <div class="col-xs-12 colorCuerpo " id="Baja" style="display:none">
                    <h2 class="blog-post-title textColor">Se dio de baja correctamente</h2>
                    <p class="textColor" >Para subscribirse /acceder al contenido pinche <a href="/">aquí</a></p>
                </div>

                <div class="col-xs-12 colorCuerpo " id="Error" style="display:none">
                    <h2 class="blog-post-title textColor">Se ha producido un error</h2>
                </div>

                <div class="col-xs-12 push-20" id="CartaDePagoOne" style="display:none">
                    <div class="row ">
                        <div class="col-xs-6 text-left">
                           <p class="" style="font-size:16px;">pagar con mi cuenta <b><?php echo $dataRequest['operador'] ?></b></p>
                        </div>
                        <div class="col-xs-6 text-right">
                           <p class="" style="font-size:16px;">
                                <?php echo $dataRequest['coste'] ?>€/semana (i.i.i)<br>
                                renovación automática
                           </p>
                            
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-xs-6 text-center">
                            <button type="button" class="btn  cancelColorText btn-full" onclick="javascript:document.location='http://www.google.com'; trackOutboundLink('cancelar');" title="Cancelar" alt="Cancelar" style=" width:100%;">
                                Cancelar
                            </button>
                        </div>
                        <div class="col-xs-6 text-center">
                            <button type="button" class="btn btn-success btn-full btn-full2 colorBoton"  onclick="openPopUp(); trackOutboundLink('continuar');" title="Aceptar y Suscribir" alt="Aceptar y Suscribir"> 
                                Aceptar y <br> suscribir
                            </button>
                        </div>
                    </div>

                </div>


                <div class="col-xs-12 colorCuerpo " id="CartaDePago" style="display:none">
                   <div id="confirmacion" style="position: fixed;top: 25%;left: 0px;width: 100%; display:" class="confirmacion">

                        <div class="">
                            <img src="{{ asset('/contents') }}/<?php echo $dataRequest["vista"] ?>/assets/images/logoPop.png" alt="<?php echo $dataRequest["vista"] ?>" style="width:180px" title="<?php echo $dataRequest["vista"] ?>">
                            <div class="col-xs-12 text-black push-10" style="color:#000;">Estás a un solo paso de SUSCRIBIRTE en <?php echo $dataRequest["vista"] ?> pulsa en el botón CONFIRMAR
                            </div>

                            <div class="row" >
                                <div class="col-xs-6 text-center">
                                    <button type="button"  class="btn  cancelColorText btn-full " onclick="javascript:document.location='http://google.es'" title="Cancelar" alt="Cancelar" style=" width:100%;">
                                        Cancelar&nbsp;

                                    </button>
                                </div>
                                <div class="col-xs-6 text-center">
                                    <button type="button" class="btn btn-success btn-full colorBoton text-center"  onclick="sendPayCard(); trackOutboundLink('suscribir')" title="Confirmar" alt="Confirmar" style="text-transform:capitalize; padding:20px 10px; width:100%; font-size:16px; text-align:center!important;">
                                        Confirmar
                                    </button>    
                                </div>
                                <div class="col-xs-12 text-center text-black" style="font-size:10px;">
                                    SUSCRIPCIÓN: <?php echo $dataRequest['coste'] ?> € / semana (IVA incl.)
                                </div>
                            </div>

                            

                        </div>
                    </div>
                </div>
                <div class="col-xs-12 colorCuerpo " id="ErrorValidacionPIN" style="display:none">
                    <h2 class="blog-post-title textColor">PIN CODE No válido</h2>
                </div>

                <div class="col-xs-12 colorCuerpo " id="ErrorBajaUsuario" style="display:none">
                    <h2 class="blog-post-title textColor">Usuario inexistente o dado de baja. </h2>
                </div>


                <div class="col-xs-12 colorCuerpo " id="AltaCanceladaUsuario" style="display:none">
                    <h2 class="blog-post-title textColor">Alta cancelada por el usuario</h2>
                    <p class="textColor">Para darse de baja, pinche <a href="javascript:darmeDeBaja();  trackOutboundLink('baja');">aquí</a></p>
                </div>

                <div class="col-xs-12 colorCuerpo " id="CartaDePagoConPINCode" style="display:none">
                    <h2 class="blog-post-title textColor">PIN Code</h2>
                    <p style="text-align:center">&nbsp;</p>
                    <p style="text-align:center">Inserte el código PIN</p>
                    <p style="text-align:center"><input type="text" id="PinCode" size="4" maxlength="4" /></p>
                    <p style="text-align:center">&nbsp;</p>
                    <p style="text-align:center"><a href="javascript:sendPayCardWithPinCode()">Subscribirse</a></p>
                </div>

                <div class="col-xs-12 colorCuerpo " id="Identification" style="display:none">
                    <h2 class="blog-post-title textColor text-center push-10">Inserte número de movil</h2>
                    <p class="pus-10">
                        <input type="text" id="MobileNumber" name="mobile" placeholder="Número de teléfono" class="form-control">
                    </p>
                    <p class="pus-10">
                        <input type="button" onclick="IrACartaDePago()" value="Entrar" class="btn btn-success btn-full btn-full2 colorBoton" />
                    </p>
                </div>

                <div class="col-xs-12 colorCuerpo " id="Prelanding" style="display:none">
                    <h2 class="blog-post-title textColor">Prelanding exigida por el operador</h2>
                    <p>
                        <input type="button" onclick="CrearSubscripcionDesdePrelanding()" value="Acceder a carta de pago" class="btn btn-primary" />
                    </p>

                </div>
            </div><!-- /.blog-main -->
            <div class="col-xs-12 text-center">
                <p><small> Servicio prestado por <?php echo $config->empresa ?> </small></p>
            </div>
        </div>
    </div>
</div>
@endsection

@section('managerMozart')
    <script type="text/javascript">

        var key = "<?php echo $config->key_Unified_Mozart ?>";
        //  Mozart.Initialize("84187E8F-3B06-4DAA-827C-60FCDF58774C");
        var callId = '<?php echo $dataRequest['callId'] ?>';
        var Mozart = {

            Initialize: function(key){
                var key = key;
            },
            GetParams: function(){
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));    
            },
            UnSuscription: function(){
                location.href = "http://pagos.avp.monsan.net/api/Mozart/Unsubscribe/" + key + "/" + callId;
            },
            Suscription: function(){
             
             location.href = "http://pagos.avp.monsan.net/api/Mozart/CreateDirectSubscriptionPage/" + key + "/" + callId + "/empty";   
            }

        }

        function openPopUp(){
           //  sendPayCard()
           ShowView("CartaDePago");
        }


        function darmeDeBaja() {
            location.href = "http://pagos.avp.monsan.net/api/Mozart/Unsubscribe/" + key + "/" + callId;
        }

        function sendPayCard() {

            location.href = "http://pagos.avp.monsan.net/api/Mozart/CreateDirectSubscriptionPage/" + key + "/" + callId + "/empty";
        }

        function sendPayCardWithPinCode() {
            var PinCode = $("#PinCode")[0].value;
            location.href = "http://pagos.avp.monsan.net/api/Mozart/CreateDirectSubscriptionPage/" + key + "/" + callId + "/" + PinCode;
        }

        function IrACartaDePago() {

            var url = "http://pagos.avp.monsan.net/api/Mozart/CreateSubscriptionWeb/";
            var mobileNomber = "34"+$("#MobileNumber")[0].value;
            url = url + callId + "/" + mobileNomber;

            if(mobileNomber){
                location.href = url;
            }else{
                alert("Rellena los datos requeridos");
            }

        }

        function CrearSubscripcionDesdePrelanding() {

            var url = "http://pagos.avp.monsan.net/api/Mozart/CreateSubscriptionFromPrelanding/";
            url = url  + key + "/" + callId;
            location.href = url;
        }


        function procesaVistas() {

            var state = '<?php echo $state ?>';
            var action = '<?php echo $action ?>';

            if (action == Action.MostrarCartaDePagoEnClienteWAP) {
                //La causa de la llamada a la url de Callback es que la carta de pago la muestra el cliente (YOIGO y ORANGE)
                ShowView("CartaDePagoOne");


            } else if (action == Action.MostrarCartaDePagoEnClienteWEB) {

                //La causa de la llamada a la url de Callback es que la carta de pago la muestra el cliente (YOIGO y ORANGE). En este  caso estamos navegando por WEB.
                ShowView("CartaDePagoConPINCode");

            } else if (action == Action.ErrorPorValidacionDePIN) {

                //ocultaVistas();
                //$("#ErrorValidacionPIN").attr("style", "display:inline");
                ShowView("ErrorValidacionPIN");

            } else if ((action == Action.UsuarioYaExistente || action == Action.NuevaAltaUsuario)
                && state == SubscriptionStates.Active) {

                ShowView("Contenido");

            } else if (action == Action.BajaConAccesoAContenidoVigente) {

                ShowView("Contenido");

            } else if (action == Action.UsuarioHaRealizadoLaBaja) {

                ShowView("Baja");

            } else if (action == Action.SeHaProducidoUnErrorEnLaBajaDelUsuario) {

                ShowView("ErrorBajaUsuario");

            } else if (action == Action.MostrarPaginaIdentificacionNavegacionWEB) {

                //$('#land').css({ 'height':'100px' });
                ShowView("Identification");

            } else if (action == Action.AltaCanceladaPorUsuario) {

                ShowView("AltaCanceladaUsuario");

            } else if (action == Action.MostrarPrelanding) {

                ShowView("Prelanding");

            } else {

                ShowView("Error");
            }
        }

        function ShowView(view) {
            ocultaVistas();
            $("#" + view).attr("style", "display:inline");
        }

        function ocultaVistas() {
            $("#CartaDePago").attr("style", "display:none");
            $("#CartaDePagoConPINCode").attr("style", "display:none");
            $("#Contenido").attr("style", "display:none");
            $("#Baja").attr("style", "display:none");
            $("#Error").attr("style", "display:none");
            $("#ErrorValidacionPIN").attr("style", "display:none");
            $("#Identification").attr("style", "display:none");
            $("#ErrorBajaUsuario").attr("style", "display:none");
            $("#Prelanding").attr("style", "display:none");
        }

        $(document).ready(function () {
            procesaVistas();
        });


        var SubscriptionStates = {
            Active: 1,
            Closed: 2
        }

        function gotoContent(){
            document.location = "/catalogo";
        }

        var Action = {
            UsuarioYaExistente: 1,
            NuevaAltaUsuario: 2,
            Identificacion: 3,
            AltaCanceladaPorUsuario: 4,
            BajaConAccesoAContenidoVigente: 5,
            UsuarioHaRealizadoLaBaja: 6,
            MostrarPaginaIdentificacionNavegacionWEB: 7,
            PagoUnico: 12,
            MostrarPrelanding: 14,
            SeHaProducidoUnErrorEnLaBajaDelUsuario: 20,
            Indefinido: 99,
            MostrarCartaDePagoEnClienteWAP: 100,
            MostrarCartaDePagoEnClienteWEB: 101,
            ErrorPorValidacionDePIN: 102
        }

    </script>
@endsection