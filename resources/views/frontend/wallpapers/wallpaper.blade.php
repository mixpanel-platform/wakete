@extends('layouts.canvas')

@section('title') Wallpapers {{ $category }} - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<div class="heading-block">
					<h2>Wallpapers {{ $category }}</h2>
					<span>Descarga nuestros distintos fondos de pantalla</span>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="col-xs-12" style="margin-bottom: 40px;">
					<?php foreach ($wallpapers[$category] as $key => $wallpaper): ?>
						<div class="col-md-3 col-xs-12 text-center" class="bordered" style="margin-bottom: 30px;">
							<a href="<?php echo asset('/wallpapers/'.$category.'/'.$wallpaper->getFilename()) ?>" download="<?php echo asset('/wallpapers/'.$category.'/'.$wallpaper->getFilename()) ?>">
								<img src="<?php echo asset('/wallpapers/'.$category.'/'.$wallpaper->getFilename()) ?>" class="img-responsive" style="height: 270px; margin: 0 auto;" align="middle">
							</a>
						</div>
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