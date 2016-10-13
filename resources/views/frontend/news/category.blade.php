@extends('layouts.canvas')

@section('title') {{ $category }} - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<div class="col-xs-12">
					<div class="heading-block">
						<h2>{{ $category }}</h2>
						<!-- <span>This is the Sub Title of the Heading Block</span> -->
					</div>
				</div>
				<div class="col-xs-12">
					<div class="col-xs-12">
						<?php foreach ($posts as $key => $post): ?>
							<?php $i = $key + 1; ?>
							<div class="col-md-3 col-sm-6 clearfix" style="margin-bottom: 20px;">
								<div class="entry-image">
									<a href="{{ url('catalog/article') }}/<?php echo $post['uri'] ?>" data-lightbox="image">
										<img class="image_fade" src="<?php echo $post['img_post'] ?>" alt="<?php echo $post['title'] ?>">
									</a>
								</div>
								<div class="entry-title">
									<h2>
										<a href="{{ url('catalog/article') }}/<?php echo $post['uri'] ?>">
											<?php echo $post['title'] ?>
										</a>
									</h2>
								</div>
								<ul class="entry-meta clearfix">
									<li><i class="icon-calendar3"></i> <?php echo $post['created'] ?></li>
									<li><a href="#"><i class="icon-camera-retro"></i></a></li>
								</ul>
								
							</div>
							<?php if ($i > 0 && $i%4 == 0): ?>
								<div class="clearfix"></div>
							<?php endif ?>
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