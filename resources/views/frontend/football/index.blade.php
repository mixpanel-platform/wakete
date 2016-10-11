@extends('layouts.canvas')

@section('title') Fútbol en directo - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				@foreach ($matchs as $match)
					<a href="{{ url('/catalog/match') }}/{{ $match->id }}" class="bordered">
						
						<div class="col-md-3 col-xs-12" style="min-height: 280px;padding-top: 40px;">
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
								<div class="result live live-match">
									<div class="col-xs-6 local-result">
										<?php
											$localGoals = explode('-', $match->result); 
											echo $localGoals[0]
										?>
									</div>
									<div class="divisor">
										-
									</div>
									<div class="col-xs-6 visitor-result">
										<?php
											$visitorGoals = explode('-', $match->result); 
											echo $visitorGoals[1]
										?>
									</div>
									<div class="col-xs-12 text-center">
										<small><strong>{{ $match->live_minute }}</strong> Min</small>
									</div>
								</div>
							</div>
							<div class="col-xs-12">
								<p class="text-center text-black font-s16">
									{{ $match->date }}
								</p>
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