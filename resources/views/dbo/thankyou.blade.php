@extends('layouts.dbo-master')

@section('title')Gracias por suscribirte a <?php echo $dataRequest["vista"] ?> @endsection

@section('body')
<div class="col-lg-12">
    <div class="row">
        <div class="col-xs-12 text-center">

            <div class="txtRegular green"><h3>¡SUSCRIPCIÓN COMPLETADA!</h3></div>
            <div class="txtRegular"><h5>Gracias por utilizar nuestro servicio.</h5></div>
            <div class="txtRegular" >
                Esta suscripción tiene un coste de <?php echo $dataRequest['coste'] ?>€ / semana(i.i.i). Renovación automática.
            </div>

            <div class="txtRegular green" style="margin-bottom:10px;">Si desea cancelarla, haz clic <a href="/help.php">aquí</a></div>
            <div class="creatividad" style="margin-bottom:15px;">
                <img class="img-responsive" src="{{ asset('/contents') }}/<?php echo $dataRequest["vista"] ?>/assets/images/<?php echo $view['img_creative'] ?>" alt="<?php echo $dataRequest["vista"] ?>" title="<?php echo $dataRequest["vista"] ?>">
            </div>
            <div class="col-xs-12">
                <a href="{{ url('/catalog') }}" onclick="trackOutboundLink('ir_contenido');" class="btn btn-success btn-full btn-full2 colorBoton">
                    Ir al CONTENIDO
                </a>
            </div>
            <!-- <button type="aceptar"  onclick="javascript:document.location='/catalogo/?start=1'; " class="btn" title="Ir a la HOME" alt="Ir a la HOME"> </button> -->
        </div>
    </div>
</div>
@endsection

@section('managerMozart')

@endsection