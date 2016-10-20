@extends('layouts.canvas')

@section('title') Pokemon GO - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="container">
				<div class="col-xs-12">
					<div class="col-xs-12">
						<div class="heading-block">
							<h2>Pokemon GO</h2>
							<span>Encuentra todo lo relacionado con Pokemon GO</span>
						</div>
					</div>
					<div class="col-xs-12">
						<?php foreach ($categories as $key => $category): ?>
							<div class="col-md-3 col-xs-12">
								<a href="{{ url('/catalog/news') }}/{{ $category['uri'] }}" class="bordered" style="margin-bottom: 30px;">
								
									<div class="col-xs-12" style="min-height: 280px; background-image: url('<?php echo asset('/posts/categories/'.strtolower($category['name']).'.jpg') ?>'); background-size: cover; background-repeat: no-repeat;">
										<p class="text-left text-white font-s32">
											{{ $category['name'] }}
										</p>
									</div>
								</a>
							</div>
						<?php endforeach ?>
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