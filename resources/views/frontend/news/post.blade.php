@extends('layouts.canvas')

@section('title') {{ $post['title'] }} - WAKETE @endsection

@section('content')
	<section id="content">

		<div class="content-wrap">

			<div class="container clearfix">

				<div class="single-post nobottommargin">

					<div class="entry clearfix">

						<div class="entry-title">
							<h2>{{ $post['title'] }}</h2>
						</div>

						<ul class="entry-meta clearfix">
							<li><i class="icon-calendar3"></i> {{ $post['created'] }}</li>
						</ul>
						<div class="entry-content notopmargin">
							<div class="entry-image alignleft">
								<a href="{{ $post['img_post'] }}"><img src="{{ $post['img_post'] }}" alt="{{ $post['title'] }}"></a>
							</div>
							<div class="text-content">
								{!! $post['content'] !!}
							</div>
						</div>

					</div>
				</div>
				<div class="col-md-12">
					<h4>Artículos relacionados:</h4>
					<?php foreach ($relatedPost as $related): ?>
						<div class="col-md-3">
							<div class="col-md-12 clearfix">
								<div class="entry-image">
									<a href="{{ url('catalog/article') }}/<?php echo $related['uri'] ?>" >
										<img class="image_fade" src="<?php echo $related['img_post'] ?>" alt="<?php echo $related['title'] ?>">
									</a>
								</div>
								<div class="entry-title">
									<h2>
										<a href="{{ url('catalog/article') }}/<?php echo $related['uri'] ?>">
											<?php echo $related['title'] ?>
										</a>
									</h2>
								</div>
								<div class="entry-content">
									<a href="{{ url('catalog/article') }}/<?php echo $related['uri'] ?>" class="more-link">
										Ver artículo
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