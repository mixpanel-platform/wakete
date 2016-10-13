@extends('layouts.canvas-outheader')
@section('title') Inicia @endsection
@section('content')

	<section id="content">

		<div class="content-wrap nopadding">

			<div class="section nopadding nomargin" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; background: url('{{ asset('canvas/images/parallax/home/1.jpg') }}') center center no-repeat; background-size: cover;"></div>

			<div class="section nobg full-screen nopadding nomargin">
				<div class="container vertical-middle divcenter clearfix">

					<div class="row center">
						<img src="{{ asset('contents/logo.png') }}" >
					</div>

					<div class="panel panel-default divcenter noradius noborder" style="max-width: 400px; background-color: rgba(255,255,255,0.93);">
						<div class="panel-body" style="padding: 40px;">
							@include('frontend.form-login')
						</div>
					</div>

					<!-- <div class="row center dark"><small>Copyrights &copy; All Rights Reserved</small></div> -->

				</div>
			</div>

		</div>

	</section>

@endsection