@extends('layouts.canvas')

@section('title') Películas - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<div class="heading-block">
					<h2>Películas </h2>
					<span>Disfruta de nuestro catálogode películas donde y cuando quieras</span>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="container clearfix">
					<?php foreach ($films as $key => $film): ?>
						<div class="col-md-3" style="margin-bottom: 30px; min-height: 350px;">
							<div class="portfolio-image">
								<a href="{{ url('/catalog/film') }}/<?php echo str_replace(' ', '-', $film['nombre']) ?>" >
									<div class="col-xs-12" style="background-image: url(<?php echo asset('/films/'.$film['fondo']); ?>); background-position: center; background-size: cover;background-repeat: no-repeat; height: 250px; "></div>
								</a>
							</div>
							<div class="portfolio-desc">
								<div class="col-xs-12 common-height" style="padding: 0">
									<div class="col-md-8">
										<h4 style="padding:10px 0;">
											<a href="{{ url('/catalog/film') }}/<?php echo str_replace(' ', '-', $film['nombre']) ?>">
												<?php echo substr($film['nombre'], 0, 25); ?>
												<?php if (strlen($film['nombre']) > 25): ?>...<?php endif ?>	
											</a>
										</h4>
									</div>
									<div class="col-md-4">
										<a href="{{ url('/catalog/film') }}/<?php echo str_replace(' ', '-', $film['nombre']) ?>" class="button button-rounded button-reveal button-medium button-red tright">
											<i class="icon-play"></i> <span style="color: #fff">ver</span>
										</a>
									</div>
								</div>
							</div>
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