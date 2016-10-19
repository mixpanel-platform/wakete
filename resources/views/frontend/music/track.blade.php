<div class="row" style="margin-bottom: 20px;">
	<object style="width:100%;">
		<param name="movie" value="https://freemusicarchive.org/swf/trackplayer.swf"/>
		<param name="flashvars" value="track=https://freemusicarchive.org/services/playlists/embed/track/{{$song['track_id']}}.xml"/>
		<param name="allowscriptaccess" value="sameDomain"/>
		<embed type="application/x-shockwave-flash" src="https://freemusicarchive.org/swf/trackplayer.swf" style="width:100%;" flashvars="track=https://freemusicarchive.org/services/playlists/embed/track/{{$song['track_id']}}.xml" allowscriptaccess="sameDomain" />
	</object>
</div>