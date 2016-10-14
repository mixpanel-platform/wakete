@extends('layouts.canvas')

@section('title') {{ $team->nameShow }} @endsection

@section('content')
	<section id="content" style="background-image: url('{{asset('/canvas/images/cesped.jpg')}}'); background-size: inherit;">
		<div class="content-wrap">
			<div class="container clearfix" style="background-color:white; padding: 30px 15px;">
				<div class="col-xs-12 common-height push-20">
					<div class="col-xs-12 col-md-4 center text-center">
						<img src="{{ $team->shield }}" alt="Escudo {{ $team->nameShow }}" title="Escudo {{ $team->nameShow }}" align="middle" style="margin:0px auto;">
					</div>
					<div class="col-xs-12 col-md-8">
						<h1>{{ $team->fullName }}</h1>
					</div>
				</div>
				<div class="container clearfix push-20">
					<div class="col-xs-12">
						<div class="col-xs-12 col-md-3">
							<p class="text-justify push-10">
								<small>Estadio:</small><br>
								<span class="font-w700 center">{{ $team->stadium }}</span>
							</p>
							<p class="text-justify push-10">
								<small>Dirección:</small><br>
								<span class="font-w700 center">{{ $team->address }}</span>
							</p>
							<!-- <img src="{{ $team->img_stadium }}" align="middle" style="margin: 0px auto;" alt="{{ $team->stadium }}" title="{{ $team->stadium }}"> -->
						</div>
						<div class="col-xs-8 col-md-3">
							<p class="text-justify push-10">
								<small>Nombre completo:</small><br>
								<span class="font-w700 center">{{ $team->fullName }}</span>
							</p>
							<p class="text-justify push-10">
								<small>Presidente:</small><br>
								<span class="font-w700 center">{{ $team->chairman }}</span>
							</p>
							<p class="text-justify push-10">
								<small>Entrenador:</small><br>
								<span class="font-w700 center">{{ $team->managerNow }}</span>
							</p>
						</div>
						<div class="col-xs-4 col-md-3">
							<p class="text-justify push-10">
								<small>Año de fudación:</small><br>
								<span class="font-w700 center">{{ $team->yearFoundation }}</span>
							</p>
							<p class="text-justify push-10">
								<small>Socios:</small><br>
								<span class="font-w700 center">{{ $team->fans }}</span>
							</p>
							<p class="text-justify push-10">
								<small>Presupuesto anual:</small><br>
								<span class="font-w700 center">{{ $team->yearlyBudget }} €</span>
							</p>
						</div>
						<div class="col-xs-12 col-md-3">
							<p class="text-justify push-10">
								<small>Liga:</small><br>
								<span class="font-w700 center">{{ $team->category->completeName }} <?php echo date('Y') ?>/{{ $team->category->year }}</span>
							</p>
							<p class="text-justify push-10">
								<small>Patrocinador:</small><br>
								<span class="font-w700 center">{{ $team->patrocinador }}</span>
							</p>
							<p class="text-justify push-10">
								<small>Patrocinador:</small><br>
								<span class="font-w700 center">{{ $team->patrocinador_b }}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="container clearfix">
					<div class="col-xs-12 col-md-3">
						<h4>Competiciones</h4>
						<?php foreach ($team->competitions as $competition): ?>
							<a href="{{ url('catalog/league') }}/{{$competition->name }}">
								<div class="col-xs-12 push-20" style="padding:0 0 10px 0 ;">
									<div class="col-xs-3 push-10 center"><!-- style="background-color:#1ABC9C; " -->
									    <img src="{{$competition->logo }}" class="img-responsive" style="margin: 0px auto; width:40px ; " alt="{{$competition->name }}">
									</div>
									<div class="col-xs-9">
										<h5 class="text-black push-0" style="padding: 5px 0">
											{{$competition->name }}
										</h5>
									</div>
								</div>
							</a>
						<?php endforeach ?>
					</div>
					<div class="col-xs-12 col-md-3">
						<h4>Plantilla: {{ $team->t_squad}} jugadores</h4>
						<div class="row" style="height:450px; overflow-y: auto;">
							<table class="table table-hover">
								<tbody>
									@foreach ($team->squad as $squad)
										<tr>
											<td class="font-s16">{{ $squad->squadNumber }}</td>
											<td><img src="{{$squad->image}}" style="width:40px;"></td>
											<td class="font-s16">{{ $squad->nick }}</td>
										</tr>
									@endforeach
								</tbody>
							</table>		
						</div>
						
					</div>
					<div class="col-xs-12 col-md-3"></div>
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