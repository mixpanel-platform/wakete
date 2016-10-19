@extends('layouts.canvas')

@section('title') {{ $film['nombre'] }} - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="container clearfix">
				<div class="col-xs-12">
					<div class="heading-block">
						<h2>Películas </h2>
						<span>Disfruta de nuestro catálogode películas donde y cuando quieras</span>
					</div>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="container clearfix">
					<div class="col-lg-7">
						<h2>{{ $film['nombre'] }} (<strong>{{ $film['ano'] }}</strong>)</h2>
					</div>
					<div class="col-md-7">
						<video controls preload="auto" autoplay style="width: 100%;">
   			  				<source src="<?php echo asset('/films/'.$film['movie']); ?>" type="video/mp4">
   			  			</video>
					</div>
					<div class="col-md-5">
						<div class="col-lg-12">
							<div class="col-lg-7">
								<h2 style="margin-bottom: 0px;">{{ $film['nombre'] }} (<strong>{{ $film['ano'] }}</strong>)</h2>
							</div>
						</div>
						<div class="col-lg-12">
							<div class="col-xs-12">
								<p class="text-black font-s18" style="margin-bottom: 5px;">
									<strong>Director: </strong><small>{{ $film['director'] }}</small>
								</p>
								<p class="text-black font-s18" style="margin-bottom: 5px;">
									<strong>Reparto: </strong><small>{{ $film['reparto'] }}</small>
								</p>
							</div>
							<p class="text-justify text-black font-s18">
								{{ $film['descripcion'] }}
							</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		@include('frontend.popup-login')
	</section>
@endsection
	
@section('scripts')
	<!-- External JavaScripts
	============================================= -->
	<script type="text/javascript" src="{{ asset('canvas/js/jquery.js') }}"></script>
	<script type="text/javascript" src="{{ asset('canvas/js/plugins.js') }}"></script>

	<!-- Footer Scripts
	============================================= -->
	<script type="text/javascript" src="{{ asset('canvas/js/functions.js') }}"></script>
@endsection