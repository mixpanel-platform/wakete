@extends('layouts.canvas')

@section('title') Ligas @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12 center">
				<div class="heading-block topmargin">
					<h1>Las mejores ligas del mundo</h1>
				</div>
			</div>
			<div class="col-xs-12 common-height">
				@foreach ($leagues as $key => $league)
					<a href="{{ url('/catalog/league') }}/{{ $league->name }}">
						<div class="col-md-3 col-xs-6 push-20" style="padding:0 0 10px 0 ; min-height: 225px;">
							<div class="col-xs-12 push-10 center" ><!-- style="background-color:#1ABC9C; " -->
							    <img src="{{ $league->logo }}" class="img-responsive" style="margin: 0px auto;" alt="{{ $league->name }}" />
							</div>
							<div class="col-xs-12">
								<h3 class="text-black font-s36 text-center center push-0" style="padding: 5px 0">
									{{ $league->name }}
								</h3>
							</div>
						</div>
					</a>
				@endforeach
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