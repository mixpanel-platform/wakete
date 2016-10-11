@extends('layouts.canvas')

@section('title') Inicio @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<a href="{{ url('/catalog/leagues') }}">
					<div class="col-md-3 col-xs-6" style="border: 1px solid #1ABC9C; padding:0 0 10px 0 ;">
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
		</div>
		@include('canvas.popup-login')
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