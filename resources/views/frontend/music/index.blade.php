@extends('layouts.canvas')

@section('title') Música - WAKETE @endsection

@section('content')
	<section id="content">
		<div class="content-wrap">
			<div class="col-xs-12">
				<div class="heading-block">
					<h2>Música </h2>
					<span>Disfruta de nuestra música donde y cuando quieras</span>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="container clearfix">

					<!-- Portfolio Filter
					============================================= -->
					<ul class="portfolio-filter clearfix" data-container="#portfolio">

						<li class="activeFilter"><a href="#" data-filter="*">Mostrar todos</a></li>
						<?php foreach ($categories as $key => $category): ?>
							<li><a href="#" data-filter=".<?php echo $key ?>"><?php echo $category ?></a></li>
						<?php endforeach ?>

					</ul>

					<div class="clear"></div>

					<!-- Portfolio Items
					============================================= -->
					<div id="portfolio" class="portfolio grid-container clearfix">
						<?php foreach ($songs as $key => $song): ?>
							<?php if (isset($song['track_genres'])): ?>
								<?php 
									$cats = '';
									$tags = array(); 
									foreach ($song['track_genres'] as $key => $cat){
										$cats .= " ".strtolower(str_replace(' ', '_', $cat['genre_title'])); 
										$tags[] = $cat;
									} 
								?>
								<article class="portfolio-item pf-graphics pf-media <?php echo $cats ?>">
									<div class="portfolio-image">
										<a href="{{url('/catalog/music')}}/<?php echo str_replace(' ', '-', $song['track_title']) ?>">
											<img src="<?php echo $song['track_image_file'] ?>" alt="$song['track_title']">
										</a>
										<div class="portfolio-overlay">
											<a href="{{url('/catalog/music')}}/<?php echo str_replace(' ', '-', $song['track_title']) ?>" class="center-icon"><i class="icon-line-play i-xlarge"></i></a>
										</div>
									</div>
									<div class="portfolio-desc">
										<h3>
											<a href="{{url('/catalog/music')}}/<?php echo str_replace(' ', '-', $song['track_title']) ?>">
												<?php echo $song['track_title'] ?>	
											</a>
										</h3>
										
									</div>
								</article>
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