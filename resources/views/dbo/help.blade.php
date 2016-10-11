@extends('layouts.dbo-master')

@section('title')Ayuda - <?php echo $dataRequest["vista"] ?> @endsection

@section('body')
<div class="col-lg-12">
    <div class="row padding-10">
        <div class="col-xs-12 push-15">
            <div class="col-xs-12 push-10">
                <h3 class="h2 text-left block-title push-10 font-w700">
                    Ayuda
                </h3>
                <p class="text-left remove-margin-b font-s13 block-title">
                    Las formas para darse de baja del servicio son:
                </p>
            </div>
           
            <div class="col-xs-12 push-10">
                Baja automática pulsando en el siguiente botón o enlace
            </div>
            <div class="col-xs-6 col-xs-offset-3 text-center push-15">
                <!-- <form action="unsubscribe.php" method="get" accept-charset="utf-8"> -->
                    <button class="btn btn-full2 colorBoton colorConfirm" class="button" onclick="javascript:darmeDeBaja();  trackOutboundLink('baja');">
                        BAJA
                    </button>
                <!-- </form> -->
            </div>
            <div class="col-xs-12">
                <div class="font-s11 text-left textColor">
                    También puedes cancelar tu suscripción a través de:
                </div>
                <div class="h5 text-left font-s12">
                    - Email: <strong><a href="mailto:<?php echo $config->mail ?>"><?php echo $config->mail ?></a></strong>
                </div>
                <div class="h5 text-left font-s12">
                    - Teléfono no sobretarificado: <label><strong><?php echo $config->telf; ?> </strong></label>
                </div>
                <?php if($dataRequest['operador'] == "movistar"): ?>
                    <div class="h5 text-left font-s12" style="<?php if ($dataRequest['operador'] != 'movistar') { echo 'display: none';} ?>">
                        - Pagos Movistar: <a href="http://pagos.movistar.es/">Pagos.movistar.es</a>
                    </div>
                <?php endif ?>
            </div>
        </div>
            
    </div>
</div>
@endsection

@section('managerMozart')
    <script type="text/javascript">

        var key = "<?php echo $config->key_Unified_Mozart ?>";
        var callId = '<?php echo $dataRequest['callId'] ?>';

        function darmeDeBaja() {
            location.href = "http://pagos.avp.monsan.net/api/Mozart/Unsubscribe/" + key + "/" + callId;
        }

    </script>
@endsection