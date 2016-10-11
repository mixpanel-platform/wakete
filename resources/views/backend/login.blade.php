@extends('layouts.canvas-outheader')

@section('content')

	<section id="content">

		<div class="content-wrap nopadding">

			<div class="section nopadding nomargin" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; background: url('{{ asset ('canvas/images/parallax/home/1.jpg')}}') center center no-repeat; background-size: cover;"></div>

			<div class="section nobg full-screen nopadding nomargin">
				<div class="container vertical-middle divcenter clearfix">

					<div class="row center">
						<a href="{{url('/admin')}}"><img src="{{ asset('/contents/logo.png')}}"></a>
					</div>

					<div class="panel panel-default divcenter noradius noborder" style="max-width: 400px; background-color: rgba(255,255,255,0.93);">
						<div class="panel-body" style="padding: 40px;">
							<form class="nobottommargin" method="post" action="{{ url('/login') }}">
								{!! csrf_field() !!}

								<h3>Login to your Account</h3>

								<div class="col_full">
									<label for="email">Email:</label>
									<input type="email" id="email" name="email" value="{{ old('email') }}" class="form-control not-dark" />
									@if ($errors->has('email'))
	                                    <span class="help-block">
	                                        <strong>{{ $errors->first('email') }}</strong>
	                                    </span>
	                                @endif
								</div>

								<div class="col_full">
									<label for="password">Password:</label>
									<input type="password" name="password" id="password" class="form-control not-dark" />
									@if ($errors->has('password'))
	                                    <span class="help-block">
	                                        <strong>{{ $errors->first('password') }}</strong>
	                                    </span>
	                                @endif
								</div>
								<div class="col_full">
									<label>Remember Me</label>
									<input type="checkbox" name="remember"> 
								</div>
								<div class="col_full nobottommargin">
									<button class="button button-3d button-black nomargin">Login</button>
									<!-- <a class="fright" href="{{ url('/password/reset') }}">Forgot Your Password?</a> -->
								</div>
							</form>
						</div>
					</div>

					<div class="row center dark"><small>Copyrights &copy; All Rights Reserved</small></div>

				</div>
			</div>

		</div>

	</section>

@endsection