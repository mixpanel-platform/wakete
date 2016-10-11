@extends('layouts.dbo-master')

@section('title')Compatibilidad de <?php echo $dataRequest["vista"] ?> @endsection

@section('body')
	<div class="div_container textColor">

     	<p class="textColor">En este artículo se enumeran los navegadores y dispositivos están oficialmente soportados por <?php echo $dataRequest['vista']; ?>, incluidas las limitaciones y diferencias entre el escritorio y móviles existentes.
     	</p>

     	<p class="textColor"><?php echo $dataRequest['vista']; ?> utiliza dos tecnologías de reproducción (HTML5 y Flash), con la lógica de selección ejecutada JavaScript. El proceso de selección se describe a continuación.
     	</p>

	    <p class="textColor">Hoy en día, las nuevas versiones de los navegadores se liberan con frecuencia. Siempre prueba la más ampliamente distribuida.</p>

	    <h2 class="textColor">Escritorio Navegadores</h2>
	     
	    <p class="textColor">
	    	Esta tabla se enumeran los navegadores de escritorio están totalmente soportados por <?php echo $dataRequest['vista']; ?>:
	    </p>

		<table class="textColor">
			<tbody class="textColor">
				<tr class="textColor">
					<th class="textColor">Navegador</th>
					<th class="textColor">HTML5</th>	
					<th class="textColor">Flash</th>
				</tr>

		     	<tr class="textColor">
					<td class="textColor">Chrome</td>
					<td class="textColor">sí</td>
					<td class="textColor">sí</td>
			    </tr>

				<tr class="textColor">
					<td class="textColor">Firefox</td>
					<td class="textColor">sí</td>
					<td class="textColor">sí</td>
				</tr>

			    <tr class="textColor">
					<td class="textColor">Internet Explorer 8</td>
					<td class="textColor">-</td>
					<td class="textColor">sí­</td>
				</tr>

				<tr class="textColor">
		 			<td class="textColor">Internet Explorer 9 +</td>
					<td class="textColor">sí</td>
					<td class="textColor">sí</td>
				</tr>

				<tr class="textColor">
					<td class="textColor">Safari</td>
					<td class="textColor">sí</td>
					<td class="textColor">sí</td>
				</tr>
			</tbody>
		</table>


	 	<p class="textColor">Todas las características de <?php echo $dataRequest['vista']; ?> se admiten en estos navegadores, con la excepción de la reproducción de medios. En pocas palabras, no todos los navegadores soportan vídeo WebM y audio Vorbis. </p>

	 	<h2 class="textColor">Dispositivos Móviles</h2>

	 	<p class="textColor">Esta tabla listas que los dispositivos móviles están oficialmente soportados por <?php echo $dataRequest['vista']; ?>, usando HTML5:</p>


	 	<table class="textColor">
	 		<tbody>
	 			<tr>
	 				<th>Dispositivo</th>
	 				<th>HTML5</th>
	 				<th>Flash</th>
	 			</tr>

	 			<tr>
	 				<td>Safari en el iPhone</td>
	 				<td>sí</td>
	 				<td>-</td>
	 			</tr>

	 			<tr>
	 				<td>Safari en el iPad</td>
	 				<td>sí</td>
	 				<td>-</td>
	 			</tr>

	 			<tr>
	 				<td>Chrome en Android 4</td>
	 				<td>sí</td>
	 				<td>-</td>
	 			</tr>

	 			<tr>
	 				<td>Navegador de Android 4</td>
	 				<td>sí</td>
	 				<td>-</td>
	 			</tr>
	 		</tbody>
	 	</table>

		<p class="textColor">Para muchos dispositivos que no están en esta lista (por ejemplo, Android 2 o BlackBerry ), <?php echo $dataRequest['vista']; ?> todavía ofrece a los usuarios una opción para reproducir el archivo de audio o vídeo incrustado. Ver 
		</p>

		<p class="textColor">Al igual que con los navegadores de escritorio, soporte de reproducción de los distintos formatos de medios varía. En pocas palabras, vídeo MP4 y audio AAC / MP3 son formatos seguros para móvil. 
		</p>

		<h3 class="textColor">Limitaciones móviles</h3>

		<p class="textColor">Hay algunas limitaciones en la reproducción de vídeo en dispositivos móviles en comparación con los navegadores de escritorio:
		</p>

		<ul class="textColor">
			<li class="textColor">Auto-iniciar un vídeo en la página de carga no disponible en el móvil.</li>
			<li class="textColor">Jugar varios vídeos al mismo tiempo no es posible en el móvil.</li>
			<li class="textColor">Cambio del silenciamiento del estado y el volumen no es posible en el móvil.</li>
			<li class="textColor">El iPhone sólo, vídeo sólo se juega en pantalla completa de modo. El iPad y Android, el vídeo se puede jugar ya sea con ventana o en pantalla completa.</li>
		</ul>

	 	<br>
     	<hr>

     	<h2 class="textColor">Selección de modo</h2>


     	<p class="textColor"><?php echo $dataRequest['vista']; ?> 6 tiene dos llamados modos de representación ; dos tecnologías subyacentes del navegador que puede utilizar para reproducir un formato de medios:
     	</p>

     	<ul class="textColor">
     		<li class="textColor">El <strong class="textColor">HTML5</strong> &lt;video&gt; elemento. Disponible en la mayoría de navegadores y la mayoría de los dispositivos.</li>
     		<li class="textColor">El reproductor <strong class="textColor">de Flash</strong> plugin. Disponible en prácticamente todos los navegadores, pero no en los dispositivos.</li>
     	</ul>

     	<p class="textColor">Todas las características de <?php echo $dataRequest['vista']; ?> (listas de reproducción, desollado, scripting, etc.) están disponibles en ambos modos de representación. Ya sea <?php echo $dataRequest['vista']; ?> se presten en Flash o HTML5, por lo tanto es totalmente dependiente del formato (s) de medios que está / están incrustados. 
     	</p>

     	<ul class="textColor">
     		<li class="textColor">MP4, AAC, MP3 y HLS se puede jugar tanto en HTML5 y Flash.</li>
     		<li class="textColor">WebM y Vorbis sólo se pueden reproducir en HTML5 en algunos navegadores.</li>
     		<li class="textColor">FLV y RTMP sólo se pueden reproducir en Flash.</li>
     	</ul>

     	<p class="textColor">En general, el mercado se está alejando de flash hacia HTML5. Por lo tanto, <?php echo $dataRequest['vista']; ?> prefiere utilizar HTML5 sobre Flash, si una parte del contenido se puede jugar en ambos modos en un determinado navegador. Este comportamiento puede ser cambiado sin embargo, mediante el establecimiento de la opción de configuración <strong class="textColor">primaria</strong> a parpadear . 
     	</p>

     	<br>
     	<hr>

     	<h2 class="textColor">Múltiples fuentes</h2>

     	<p class="textColor">Si un embed contiene múltiples fuentes de medios, <?php echo $dataRequest['vista']; ?> 6 caminará a través de todas las fuentes para seleccionar el primero que se puede jugar en el principal modo. Si ninguna de las fuentes se puede jugar, <?php echo $dataRequest['vista']; ?> cae de nuevo al modo secundario. Algunos ejemplos:
     	</p>

     	<ul class="textColor">
     		<li class="textColor">Con una configuración que contiene fuentes MP4 + WebM y HTML5 primario, <?php echo $dataRequest['vista']; ?> reproduce MP4 en HTML5 en Chrome, WebM en HTML5 en Firefox y MP4 Flash en Internet Explorer 8.</li>
     		<li class="textColor">Con una configuración que contiene fuentes MP4 RTMP + y HTML5 primario, <?php echo $dataRequest['vista']; ?> reproduce MP4 en HTML5 en Chrome y RTMP Flash en Firefox e Internet Explorer 8.</li>
     		<li class="textColor">Con una configuración que contiene fuentes MP4 RTMP + y primaria Flash, <?php echo $dataRequest['vista']; ?> reproduce RTMP Flash en Chrome, Firefox e Internet Explorer 8.</li>
     	</ul>

     	<br>
     	<hr>

     	<h2 class="textColor">Descarga de retorno</h2>

     	<p class="textColor">En ciertos casos, ni flash ni el modo HTML5 pueden ser utilizados. Por ejemplo, un visitante podría usar un telÃ©fono Android o BlackBerry mayor. En tales casos, <?php echo $dataRequest['vista']; ?> puede hacer una llamada <strong class="textColor">de retorno</strong> . Que repliegue se hace es definido por el formato de medios incorporado:
     	</p>

     	<ul class="textColor">
     		<li class="textColor">Para los archivos MP4, AAC o MP3, un enlace de descarga con un formato agradable se vuelve. El enlace consiste en la imagen de cartel con un juego botón en la parte superior de la misma. Cuando un visitante hace clic en el enlace, una función de reproductor de medios del dispositivo reproducirá el archivo.</li>
     		<li class="textColor">Para FLV, WebM y archivos Vorbis y flujos RTMP o HLS, un Media Format no compatible se muestra un mensaje de error. Esto se debe a que estos formatos no son compatibles con mediaplayers incorporadas.</li>
     	</ul>

     	<p class="textColor">La opción de reserva también se puede desactivar mediante el establecimiento de la opción de configuración <strong class="textColor">de reserva</strong> a falsa . En ese caso, el HTML original no es tocado por <?php echo $dataRequest['vista']; ?>. Esto es útil para configurar su propio mensaje de retorno (por ejemplo, una notificación para instalar Flash). 
     	</p>

	</div>
@endsection

@section('managerMozart')

@endsection