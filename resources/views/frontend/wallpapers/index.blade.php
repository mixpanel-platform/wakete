@extends('layouts.canvas')

@section('title') Wallpapers - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<div class="heading-block">
					<h2>Wallpapers </h2>
					<span>Descarga nuestros distintos fondos de pantalla</span>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="col-xs-12" style="margin-bottom: 40px;">
					<?php foreach ($wallpapers as $key => $wallpaper): ?>
						<a href="{{ url('/catalog/wallpapers') }}/{{ $wallpaper }}" class="bordered">
							
							<div class="col-md-3 col-xs-12" style="min-height: 280px; background-image: url('<?php echo asset('/wallpapers/'.$wallpaper.'/background.jpg') ?>'); background-size: cover; background-repeat: no-repeat;">
								<p class="text-left text-white font-s32">
									{{ $wallpaper }}
								</p>
							</div>
						</a>
					<?php endforeach ?>
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