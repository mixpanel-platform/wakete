<form class="nobottommargin" method="post" action="{{ url('/log') }}">
	{!! csrf_field() !!}

	<h3>Entra y diviértete</h3>

	<div class="col_full">
		<label for="phone">Teléfono:</label>
		<input type="phone" id="phone" name="phone" value="{{ old('phone') }}" class="form-control not-dark" />
		<?php if (isset( $error )): ?>
			<span class="help-block">
                <strong><?php echo $error ?></strong>
            </span>
		<?php endif ?>
	</div>
	<div class="col_full">
		<label>Recordarme</label>
		<input type="checkbox" name="remember"> 
	</div>
	<div class="col_full nobottommargin">
		<button class="button button-3d button-black nomargin" type="submit">Login</button>
		<!-- <a class="fright" href="{{ url('/password/reset') }}">Forgot Your Password?</a> -->
	</div>
</form>