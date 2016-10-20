@extends('layouts.canvas')

@section('title') {{ $match->league }} - {{ $match->local }} vs {{ $match->visitor }} @endsection

@section('content')
	<section id="content" style="background-image: url('{{asset('/canvas/images/cesped.jpg')}}'); background-size: inherit;">
		<div class="content-wrap">
			<div class="container">
				<div class="container clearfix" style="background-color:white; padding: 30px 0;">
					<div class="col-xs-12 common-height">
						<div class="col-xs-1">
							<img src="{{ $match->competition_logo }}" class="img-responsive centered" alt="{{ $match->league }}">
						</div>
						<div class="col-xs-11">
							<h2 class="text-left">
								{{ $match->league }}
							</h2>
						</div>
					</div>
					<div class="col-xs-12 not-padding-mobile">
						<div class="col-xs-12 col-md-6" style="padding: 20px 15px;">
							<div class="row push-10" >
								<div class="col-xs-6 text-center not-padding-mobile">
									<p class="text-black text-center push-10">Local</p>
									<a href="{{ url('/catalog/team') }}/{{ $match->league }}/{{ $match->basealias1 }}">
										<div class="col-xs-12 text-center center">
											<img src="{{ $match->local_shield }}" class="img-responsive centered"  alt="{{ $match->local }}" />
										</div>
										<p class="text-center text-black font-s16 push-0">
											<strong>{{ $match->local }}</strong>
										</p>
									</a>
								</div>
								<div class="col-xs-6 text-center not-padding-mobile">
									<p class="text-black text-center push-10">Visitante</p>
									<a href="{{ url('/catalog/team') }}/{{ $match->league }}/{{ $match->basealias2 }}">
										<div class="col-xs-12 text-center center">
											<img src="{{ $match->visitor_shield }}" class="img-responsive centered"  alt="{{ $match->visitor }}"/>
										</div>
										<p class="text-center text-black font-s16  push-0">
											<strong>{{ $match->visitor }}</strong>
										</p>
									</a>
								</div>
								<div class="result" style="width: 120px; left:42%; top:5%;">
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
								<div class="col-xs-12">
									<?php if ($match->status == 1): ?>
										<div class="col-xs-6 col-xs-offset-3 font-s18 text-center label-danger text-white" style="border-radius:5px;">
											Finalizado {{ $dateMatch }}
										</div>
									<?php elseif($match->status == -1): ?>
										<div class="col-xs-6 col-xs-offset-3 font-s18 text-center label-primary text-white" style="border-radius:5px;">
											Pendiente {{ $dateMatch }}
										</div>
									<?php else: ?>
										<div class="col-xs-6 col-xs-offset-3 font-s18 text-center label-success text-white" style="border-radius:5px;">
											En juego {{ $dateMatch }}
										</div>
									<?php endif ?>
								</div>
								
							</div>
							<div class="row">
								<div class="col-xs-12 push-20">
									<p class="push-10">Canales TV:</p>
									@foreach($match->channels as $channel)
										<div class="col-xs-2">
											<img src="{{ $channel->image }}" class="img-responsive centered" alt="{{ $channel->name }}" style="width:40px;">
										</div>
									@endforeach
								</div>
								<div class="clearfix"></div>
								<!-- EVENTOS DEL PARTIDO -->
								<?php if (isset($events)): ?>
									<div class="col-xs-12" style="height:740px; overflow-y: auto;">
										@foreach($events as $event)
											<div class="col-xs-12 push-10" style="border-bottom:1px solid #f8f8f8;">
												<div class="col-xs-2">{{ $event->minute }}' min</div>
												<div class="col-xs-3">{{ $event->action }} <img src="{{ $event->action_icon }}"></div>
												<div class="col-xs-3"><img src="{{ $event->player_img }}" alt="{{ $event->player }}"></div>
												<div class="col-xs-3"><strong>{{ $event->player }}</strong></div>
											</div>
										@endforeach
									</div>
								<?php endif ?>
								
							</div>
						</div>
						<div class="col-xs-12 col-md-6" style="padding: 20px 15px;">
							<div class="col-xs-12 push-20" style="background-image: url('{{ $match->img_stadium }}'); background-size:cover;">
								<div class="row" style="padding:15px; background-color:rgba(255,255,255,0.45);">
									<h3 class="text-black push-10 font-s24">
										{{ $match->stadium }}
									</h3>
									<p class="text-black font-s18 push-0">
										Aforo Max: <strong>{{ $match->seats }}</strong> Pers.
									</p>
									<p class="text-black font-s18 push-0">
										Asistencia: <strong>{{ $match->attendance }}</strong> Pers.
									</p>
									<p class="text-black font-s18 push-0">
										Tipo de césped: <strong>{{ $match->typefield }}</strong> Pers.
									</p>
								</div>
							</div>
							<div class="col-xs-12 push-20">
								<div class="col-xs-12">
									<h2 class="text-black">Arbitro: <strong>{{ $match->referee }}</strong></h2>
								</div>
								<div class="col-xs-6">
									<div class="col-xs-3">
										<img src="{{ $match->local_shield }}" class="img-responsive centered"  alt="{{ $match->local }}" />
									</div>
									<div class="col-xs-9">
										<p class="text-black font-s20 push-10">{{ $match->local_coach }}</p>
									</div>
								</div>
								<div class="col-xs-6">
									<div class="col-xs-3">
										<img src="{{ $match->visitor_shield }}" class="img-responsive centered"  alt="{{ $match->visitor }}" />
									</div>
									<div class="col-xs-9">
										<p class="text-black font-s20 push-10">{{ $match->visitor_coach }}</p>
									</div>
								</div>
							</div>
							<div class="col-xs-12 col-md-6 text-center">
								<!-- LOCAL -->
								<div class="tabs clearfix" id="tab-1">
									<ul class="tab-nav clearfix">
										<li><a href="#tabs-1">Ali <strong>{{ $match->local }}</strong></a></li>
										<li><a href="#tabs-2">Plt <strong>{{ $match->local }}</strong></a></li>
									</ul>
									<div class="tab-container">
										<div class="tab-content clearfix" id="tabs-1">
											<?php if ( $match->status != -1): ?>
												<table class="table table-hover">
													<tbody>
														@foreach ($match->lineups->local as $lineup)
															<tr>
																<td class="font-s16">{{ $lineup->num }}</td>
																<td><img src="{{$lineup->image}}" style="width:40px;"></td>
																<td class="font-s16">{{ $lineup->nick }}</td>
															</tr>
														@endforeach
													</tbody>
													
												</table>
											<?php else: ?>
												<h2 class="text-black">Pendiente de confirmar</h2>
											<?php endif; ?>
										</div>
										<div class="tab-content clearfix" id="tabs-2">
											<table class="table table-hover">
												<tbody>
													@foreach ($match->squad->local as $squad)
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
								</div>
							</div>
							<div class="col-xs-12 col-md-6 text-center not-padding-mobile">
								<!-- VISITANTE -->
								<div class="tabs clearfix" id="tab-2">
									<ul class="tab-nav clearfix">
										<li><a href="#tabs-3">Ali <strong>{{ $match->visitor }}</strong></a></li>
										<li><a href="#tabs-4">Plt <strong>{{ $match->visitor }}</strong></a></li>
									</ul>
									<div class="tab-container">
										<div class="tab-content clearfix" id="tabs-3">
										<?php if ( $match->status != -1): ?>
											<table class="table table-hover">
												<tbody>
													@foreach ($match->lineups->visitor as $lineup)
														<tr>
															<td class="font-s16">{{ $lineup->num }}</td>
															<td><img src="{{$lineup->image}}" style="width:40px;"></td>
															<td class="font-s16">{{ $lineup->nick }}</td>
														</tr>
													@endforeach
												</tbody>
												
											</table>
										<?php else: ?>
											<h2 class="text-black">Pendiente de confirmar</h2>
										<?php endif; ?>	
											
										</div>
										<div class="tab-content clearfix" id="tabs-4">
											<table class="table table-hover">
												<tbody>
													@foreach ($match->squad->visitor as $squad)
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
								</div>
							</div>
							<div class="col-xs-12 text-center not-padding-mobile">
								<h3 class="text-black push-10 font-s24">
									Clasificación
								</h3>
								<div class="table-responsive">
									<table class="table table-hover">
										<thead>
											<tr>
												<td class="font-s12 text-center">Posº</td>
												<td class="font-s12 text-center">Equipo</td>
												<td class="font-s12 text-center">Ptos</td>
												<td class="font-s12 text-center">G.F</td>
												<td class="font-s12 text-center">G.C</td>
												<td class="font-s12 text-center">Vict</td>
												<td class="font-s12 text-center">Empt</td>
												<td class="font-s12 text-center">Derr</td>
												<td class="font-s12 text-center">D.G</td>
											</tr>
										</thead>
										<tbody>
											@foreach ($match->tables as $key => $teams)
												<tr>
													<td>{{ $key+1 }}</td>
													<td class="font-s16"><a href="{{ url('/catalog/team') }}/{{ $match->league }}/{{ $teams->basealias }}">{{ $teams->nameShow }}</a></td>
													<td class="font-s16">{{ $teams->points }}</td>
													<td class="font-s16">{{ $teams->gf }}</td>
													<td class="font-s16">{{ $teams->ga }}</td>
													<td class="font-s16">{{ $teams->wins }}</td>
													<td class="font-s16">{{ $teams->draws }}</td>
													<td class="font-s16">{{ $teams->loses }}</td>
													<td class="font-s16">{{ $teams->diff }}</td>
												</tr>
											@endforeach
										</tbody>
									</table>
								</div>
								
							</div>
						</div>
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