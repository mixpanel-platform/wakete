@extends('layouts.canvas')

@section('title') Juegos HTML5 - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<div class="col-xs-12">
					<div class="heading-block">
						<h2>Juegos HTML5</h2>
						<span>Encuentra una gran selección de juegos HTML5 y disfruta de ellos</span>
					</div>
				</div>
				<div class="col-xs-12">
					<?php foreach ($games as $key => $game): ?>
						<div class="col-md-3 col-xs-12" class="bordered" style="margin-bottom: 30px; min-height: 300px;">
							<a href="{{ url('/catalog/games') }}/{{ $game['ruta'] }}" class="bordered" target="_blank">
								<div class="col-xs-12" style="background-image: url('<?php echo asset("games/".$game['ruta']."/".$game['ruta'].".PNG") ?>'); background-size: cover; height: 200px; background-position: center;">
								</div>
							</a>	
							<div class="col-xs-12 common-height" style="padding: 0">
								<div class="col-md-8">
									<h3 style="padding:10px 0;">
										<a href="{{ url('/catalog/games') }}/{{ $game['ruta'] }}" target="_blank">
										<?php if (isset($game['nombre'])): ?>
											<?php echo $game['nombre'] ?>
										<?php else: ?>
											<?php echo $game['name'] ?>
										<?php endif ?>
										</a>
									</h3>
								</div>
								<div class="col-md-4">
									<a href="{{ url('/catalog/games') }}/{{ $game['ruta'] }}" class="button button-rounded button-reveal button-medium button-red tright" target="_blank">
										<i class="icon-play"></i> <span>Jugar</span>
									</a>
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