@extends('layouts.canvas')

@section('title') {{ $actual_league }} @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<div class="col-xs-12 text-black not-padding-mobile">
					<div class="col-xs-4">
						<h5 class="text-black">
							<a href="{{ url('/catalog/league/') }}/{{ $actual_league }}/round/{{ $round-1 }}">
								<i class="fa fa-chevron-left" aria-hidden="true"></i> Jornada {{ $round-1 }}
							</a>
						</h5>
					</div>
					
					<div class="col-xs-4 text-center not-padding-mobile">
						<h3 class="font-s36  text-black">Jornada {{ $round }}</h3>
					</div>
					<div class="col-xs-4">
						<h5 class="text-black" style="text-align:right;">
							<a href="{{ url('/catalog/league/') }}/{{ $actual_league }}/round/{{ $round+1 }}"> 
								Jornada {{ $round+1 }} <i class="fa fa-chevron-right" aria-hidden="true"></i>
							</a>
						</h5>
					</div>
				</div>
			</div>
			<div class="col-xs-12">
				@foreach ($matchs as $match)
					<a href="{{ url('/catalog/match') }}/{{ $match->id }}" class="bordered">
						<div class="col-md-3 col-xs-12" style="min-height: 280px;vertical-align:middle">	
							<div class="row">
								<div class="col-xs-6 text-center">
									<p class="text-black text-center push-10">Local</p>
									<div class="col-xs-12 text-center center">
										<img src="{{ $match->local_shield }}" class="img-responsive centered"  alt="{{ $match->local }}" />
									</div>
									<p class="text-center text-black font-s16">
										{{ $match->local }}
									</p>
								</div>
								<div class="col-xs-6 text-center">
									<p class="text-black text-center push-10">Visitante</p>
									<div class="col-xs-12 text-center center">
										<img src="{{ $match->visitor_shield }}" class="img-responsive centered"  alt="{{ $match->visitor }}"/>
									</div>
									<p class="text-center text-black font-s16">
										{{ $match->visitor }}
									</p>
								</div>
								<div class="result">
									<div class="col-xs-6 local-result">
										{{ $match->local_goals }}
									</div>
									<div class="divisor">
										-
									</div>
									<div class="col-xs-6 visitor-result">
										{{ $match->visitor_goals }}
									</div>
								</div>
							</div>
							<div class="col-xs-12">
								<p class="text-center text-black font-s16">
									{{ $match->schedule }}
								</p>
							</div>
							<div class="col-xs-12">
								
							</div>
						</div>
					</a>
				@endforeach
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