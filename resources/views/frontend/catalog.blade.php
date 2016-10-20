@extends('layouts.canvas')

@section('title') Catálogo  @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="container">
				<div class="col-xs-12">
					<div class="heading-block">
						<h2>Catálogo de WAKETE </h2>
						<span>Disfruta de nuestro contenido sin limites</span>
					</div>
				</div>
				<div class="col-xs-12">
					<div class="col-md-3 col-xs-12">
						<a href="{{ url('/catalog/football') }}">
							<div class="col-xs-12" style="border: 1px solid #1ABC9C; padding:0 0 10px 0 ;">
								<div class="col-xs-12 push-10" style="background-color:#1ABC9C; ">
									<h3 class="text-white font-s24 text-center center push-0" style="padding: 5px 0">
										FÚTBOL	
									</h3>
								</div>
								<div class="col-xs-12">
									@foreach ($leagues as $league)
									    <img src="{{ $league->logo }}" style="width: 50px; height:50px; " />
									@endforeach
								</div>
							</div>
						</a>
					</div>
					<div class="col-md-3 col-xs-12">	
						<a href="{{ url('/catalog/film') }}">
							<div class="col-xs-12" style="border: 1px solid #1ABC9C; padding:0 0 10px 0 ;">
								<div class="col-xs-12 push-10" style="background-color:#1ABC9C; ">
									<h3 class="text-white font-s24 text-center center push-0" style="padding: 5px 0">
										Peliculas	
									</h3>
								</div>
								<div class="col-xs-12">
								</div>
							</div>
						</a>
					</div>						
					<div class="col-md-3 col-xs-12">
						<a href="{{ url('/catalog/music') }}">
							<div class="col-xs-12" style="border: 1px solid #1ABC9C; padding:0 0 10px 0 ;">
								<div class="col-xs-12 push-10" style="background-color:#1ABC9C; ">
									<h3 class="text-white font-s24 text-center center push-0" style="padding: 5px 0">
										MÚSICA	
									</h3>
								</div>
								<div class="col-xs-12">
								</div>
							</div>
						</a>
					</div>
					<div class="col-md-3 col-xs-12">					
						<a href="{{ url('/catalog/games') }}">
							<div class="col-xs-12" style="border: 1px solid #1ABC9C; padding:0 0 10px 0 ;">
								<div class="col-xs-12 push-10" style="background-color:#1ABC9C; ">
									<h3 class="text-white font-s24 text-center center push-0" style="padding: 5px 0">
										GAMES	
									</h3>
								</div>
								<div class="col-xs-12">
								</div>
							</div>
						</a>
					</div>
					<div class="clearfix"></div>
					<div class="line"></div>
					

					<div class="col-md-3 col-xs-12">
						<a href="{{ url('/catalog/news/pokemon-go') }}">
							<div class="col-xs-12" style="border: 1px solid #1ABC9C; padding:0 0 10px 0 ;">
								<div class="col-xs-12 push-10" style="background-color:#1ABC9C; ">
									<h3 class="text-white font-s24 text-center center push-0" style="padding: 5px 0">
										POKEMON GO	
									</h3>
								</div>
								<div class="col-xs-12">
								</div>
							</div>
						</a>
					</div>
					<div class="col-md-3 col-xs-12">
						<a href="{{ url('/catalog/wallpapers') }}">
							<div class="col-xs-12" style="border: 1px solid #1ABC9C; padding:0 0 10px 0 ;">
								<div class="col-xs-12 push-10" style="background-color:#1ABC9C; ">
									<h3 class="text-white font-s24 text-center center push-0" style="padding: 5px 0">
										WALLPAPERS
									</h3>
								</div>
								<div class="col-xs-12">
								</div>
							</div>
						</a>
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