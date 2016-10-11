@extends('layouts.dbo-master')

@section('title')Términos y condiciones de <?php echo $dataRequest["vista"] ?> @endsection

@section('body')
<div class="col-lg-12 text-center">
    <h3 class="h6 text-center">TÉRMINOS Y CONDICIONES DE USO</h3>
    <p class="text-left push-5"><span class="h6">1.- Identificación de la Compañía.</span></p>
    <?php if($dataRequest["operador"]=='vodafone'  OR $dataRequest["operador"]=='AIRTEL' OR $dataRequest["operador"]=='airtel'): ?>  <p class="text-justify push-10">El servicio proporcionado por <?php echo $domain ?> consiste en una suscripción semanal variable segun el operador ( <?php echo $dataRequest["operador"] ?>: <?php echo $dataRequest["coste"] ?>€ ) del cliente. La renovación se realizará de forma automática y el usuario dispondrá a cambio de un amplio catálogo de películas online de todos los géneros y épocas pudiendo disfrutar de forma ilimitada de todo el catálogo de películas disponible.</p>
    <?php else: ?>
        <p class="text-justify push-10">El servicio proporcionado por <?php echo $domain ?> consiste en una suscripción semanal variable segun el operador ( <?php echo $dataRequest["operador"] ?>: <?php echo $dataRequest["coste"] ?>€ ) del cliente. La renovación se realizará de forma automática y el usuario dispondrá a cambio de un amplio catálogo de películas online de todos los géneros y épocas pudiendo disfrutar de hasta 5 visualizaciones a la semana.</p>
    <?php endif; ?>
    <p class="text-justify push-10">El titular y responsable del dominio <?php echo $domain ?> es <?php echo $config->empresa ?>  (la &ldquo;Compañía&rdquo;), con domicilio social en C/Azcona nº36, planta baja exterior.</p>

    <p class="text-justify push-10">C.I.F. n&ordm; <?php echo $config->cif ?>   </p>

    <p class="text-justify push-10">Datos mercantiles: Registro Mercantil de Madrid, al Tomo 31654, Folio 91, Sección 8&ordf;, Hoja M569608, Inscripción 1&ordf;.</p>

    <p class="text-justify push-10">E-mail de contacto: <a href="mailto:<?php echo $config->mail ?>"><?php echo $config->mail ?></a> </p>

    <p class="text-justify push-10">Teléfono de contacto: <a tel="<?php echo $config->telf ?>"><?php echo $config->telf ?> (9:00 - 18:00)</a></p>


    <p class="h6 text-justify push-10">2.- Aceptación del Usuario.</p>

    <p class="text-justify push-10">Estas términos y condiciones de uso (en adelante “Aviso Legal”) regulan el acceso y utilización de la página web www.<?php echo $domain; ?> (en adelante la "Web") que la Compañía pone a disposición de los usuarios de Internet (el "Usuario"). El Usuario de la Web, mediante su acceso y/o navegación por la misma, se obliga a utilizarla conforme a la legislación vigente de cada momento y a las condiciones establecidas en el Aviso Legal, la moral y las buenas costumbres generalmente aceptadas y el orden público. El usuario responderá frente a la Compañía y/o frente a terceros, de cualesquiera daños y perjuicios que pudieran causarse como consecuencia del incumplimiento de dicha obligación. En consecuencia, el Usuario debe leer atentamente el Aviso Legal, en cada una de las ocasiones en las que se proponga acceder y/o navegar la página web.</p>

    <p class="text-justify push-10">El acceso y/o navegación por la Web por parte del Usuario implica la aceptación sin reservas del presente Aviso Legal en la versión publicada por la Compañía en el momento en el que el Usuario acceda y/o navegue la página Web, incluyendo nuestra Política de Privacidad, privacidad que se incorpora a estas Condiciones por referencia, en cuanto no se oponga a ellas. El mero acceso no implica el establecimiento de ningún tipo de relación comercial entre la Compañía y el Usuario.</p>

    <p class="text-justify push-10">La Compañía puede ofrecer a través de la Web, servicios que podrán encontrarse sometidos a unas condiciones particulares propias sobre las cuales se informará al Usuario en cada caso concreto.</p>

    <p class="text-justify push-10">El Usuario de la Web deberá abstenerse, en todo caso, de suprimir, alterar, eludir o manipular cualquier dispositivo de protección o sistema de seguridad que puedan estar instalados en la misma. En este sentido, la Compañía podrá prohibir el acceso a la Web de cualquier Usuario que realice conductas ilícitas.</p>

    <p class="h6 text-justify push-10">3.- Descripción del Servicio.</p>

    <p class="text-justify push-10">La Web permite el acceso a través de internet a un amplio catálogo de películas, tráiler y otros contenidos digitales, los “Contenidos Digitales”, recién estrenados o ya clásicos, organizados en diferentes secciones, para el disfrute de los mismos, por parte del Usuario de forma personalizada y según su elección, de acuerdo con este Aviso legal y nuestra Política de Privacidad</p>

    <p class="text-justify push-10">Periódicamente la Compañía podrá agregar o sustituir parte de los Contenidos Digitales en las diferentes modalidades de contratación que, en todo caso, quedarán igualmente sujetas a las presentes Condiciones.</p>

    <p class="text-justify push-10">La Web incluye los servicios de acceso a los Contenido Digitales vía “video streaming”. Asimismo, la Web ofrece servicios adicionales e interactivos de información, clasificación, recomendación, comentarios, y discusiones, foros y otros medios de comunicación con nosotros y entre usuarios respecto del de acceso a los Contenido Digitales vía “video streaming”, todo ello conjuntamente denominado el “Servicio”</p>

    <p class="text-justify push-10">La Web le permite al Usuario pagar un precio previamente determinado por la Compañía para poder acceder a un número limitado de visualizaciones del Contenido Digital de la Web durante un período limitado de tiempo, el cual dependerá del operador de cada Usuario.</p>

    <p class="text-justify push-10">El Usuario es consciente de que el Servicio puede, en su caso, incluir publicidad y así lo acepta libre y voluntariamente.</p>

    <p class="text-justify push-10">Algunos Contenidos Digitales están disponibles (accesibles) durante un plazo limitado, indicado para cada Contenido, y la Compañía se reserva el derecho en todo momento de retirar uno o más Contenidos Digitales de su catálogo sin aviso. La Compañía intentará en todo caso avisar a los Usuarios de la retirada anticipada de cualquier Contenido Digital de su catálogo.</p>

    <p class="text-justify push-10">Asimismo, de forma ocasional la Compañía, de forma discrecional, podrá  efectuar modificaciones en el servicio prestado a través de su Web y en los contratos con los Usuarios. Cuando se realice cualquier modificación que se considere importante, se notificará al Usuario a través de la Web. Al continuar utilizando el servicio después de haberse producido las citadas modificaciones, el Usuario manifiesta y reconoce su aceptación de esas modificaciones.</p>

    <p class="text-justify push-10">Los Contenidos Digitales puestos a disposición por la Compañía a través de la Web están identificados por información para la gestión de derechos y protegidos por sistemas tecnológicos de protección, destinados a impedir o restringir actos referidos a las obras protegidas que no cuenten con la autorización de los titulares de los correspondientes derechos de propiedad intelectual, en particular su transformación, redistribución o comunicación pública. Dentro de los límites establecidos por el Derecho de obligado cumplimiento, queda prohibido suprimir o alterar dicha información y eludir o destruir, dichas medidas de protección tecnológicas.</p>

    <p class="text-justify push-10">Todos los precios indicados en la Web incluyen todos los impuestos aplicables</p>

    <p class="h6 text-justify push-10">4.- Dispositivos autorizados de conexión.</p>

    <p class="text-justify push-10">Para poder visualizar los Contenidos Digitales del Servicio, es condición de acceso al Servicio, utilizar una tablet o un móvil que (i) cumpla los requisitos mínimos del sistema que la Compañía podrá establecer en cada momento y (ii) sea compatible con el sistema de gestión de derechos digitales para los contenidos digitales a los que tiene acceso en el Servicio (cada uno de esos productos, un "Dispositivo Autorizado").</p>


    <p class="text-justify push-10">Un Dispositivo Autorizado debe vincularse con una cuenta de usuario (y solamente una). Un Dispositivo puede ser desvinculado y, en caso que fuera necesario, puede volver a vincularse siguiendo las instrucciones que se indican en nuestro Portal. La tecnología incorporada en cada Dispositivo Autorizado (software/firmware) deberá estar actualizada en cada momento, tal y como se describe en la Web, sino el acceso y la visualización de los Contenidos Digitales podría verse afectado.</p>

    <p class="text-justify push-10">No se permite la visualización en modo streaming de un mismo Contenido Digital adquirido o alquilado por una cuenta en dos dispositivos simultáneamente. No obstante, se permite ver de modo simultáneo dos (o más) Contenidos Digitales en dos (o más) Dispositivos asociados a una misma cuenta.</p>

    <p class="h6 text-justify push-10">5.- Suscripción en el servicio ofrecido por la Compañía.</p>

    <p class="text-justify push-10">
        Para poder contratar los servicios que la Compañía ofrece a través de la Web es necesario suscribirse a los mismos al acceder a la Web. La suscripción se realizará mediante Servicio Unlimited, esto es, un servicio de suscripción mediante una tarifa, cuyos requisitos dependerán del operador de cada Usuario.<br><br>
        La suscripción al citado servicio está destinada a personas mayores de 18 años por lo que el registro que se requiera para la utilización de la Web no está permitida a los menores de 18 años. Por tanto, al aceptar este Aviso Legal, el usuario garantiza que es mayor de 18 años y se responsabiliza enteramente de esta declaración.<br><br>
        Para registrarse en el servicio mediante datos móviles, no será necesario introducir el número de teléfono del Usuario, debiendo ser el Usuario el que acepte los términos y condiciones y se suscriba pinchando en el botón de “Aceptar y suscribir”, tras lo cual el operador del Usuario le envía un sms informándole de que se ha dado de alta en dicho servicio. Tras registrase mediante datos móviles, el Usuario, si lo desea, puede acceder a la página mediante Wifi.<br><br>
        Para registrarse en el servicio mediante Wifi, el Usuario deberá introducir su número de teléfono y pinchar en el botón de “Aceptar y suscribir”, tras lo cual el operador del Usuario le envía un sms indicando el código con el que el Usuario debe acceder a la Web.<br><br>
        El Usuario es el único responsable de mantener la confidencialidad y seguridad de su cuenta, y de todas las actividades que ocurran en o a través de su cuenta, y acepta notificar inmediatamente a la Compañía sobre cualquier fallo de seguridad en su cuenta. La Compañía no será responsable por ninguna pérdida derivada del uso no autorizado de su Cuenta.<br><br>
        La Compañía adopta las medidas técnicas y organizativas necesarias para garantizar la protección de los datos de carácter personal y evitar su alteración, pérdida, tratamiento y/o acceso no autorizado, habida cuenta del estado de la técnica, la naturaleza de los datos almacenados y los riesgos a que están expuestos, todo ello, conforme a lo establecido por la legislación española de Protección de Datos de Carácter Personal.<br><br>
        La Compañía no se hace responsable frente a los Usuarios, por la revelación de sus datos personales a terceros que no sea debida a causas directamente imputables a la Compañía, ni por el uso que de tales datos hagan terceros ajenos a la Compañía.
    </p>
    
    <p class="h6 text-justify push-10">6.- Operatividad del Servicio.           </p>

    <p class="text-justify push-10">El Usuario es consciente de que existen requisitos mínimos para poder utilizar el Servicio, y garantiza que dispone de ellos antes de proceder a la contratación. Estos requisitos se encuentran publicados en la Web y pueden ser actualizados por la Compañía en cualquier momento. La Compañía comunicará a través de la Web a los Usuarios cualquier modificación de las condiciones técnicas que les afecten.

    </p>

    <p class="text-justify push-10">El Usuario debe ser mayor de edad para contratar el Servicio.<br>

    </p>

    <p class="text-justify push-10">El Usuario proporcionará información exacta y completa en todo momento cuando se registre y durante el uso del Servicio, y acepta actualizar esta información para mantenerla exacta y completa. El Usuario acepta que la Compañía puede almacenar y utilizar esta información para el mantenimiento del Servicio proporcionado y otras finalidades de acuerdo con nuestra <a href="/politica_privacidad.php">Política de Privacidad.</a></p>

    <p class="text-justify push-10">Para la utilización del Servicio, el Usuario deberá emplear su número de teléfono.<br>

    </p>

    <p class="text-justify push-10">Tal y como se ha establecido en el apartado anterior, el Usuario es el único responsable de mantener la confidencialidad y seguridad de su cuenta, y de todas las actividades que ocurran en o a través de su cuenta, y acepta notificar inmediatamente a la Compañía sobre cualquier fallo de seguridad en su cuenta. La Compañía no será responsable por ninguna pérdida derivada del uso no autorizado de su Cuenta.<br>

    </p>

    <p class="text-justify push-10">Es por ello, por lo que el Usuario responderá de los gastos correspondientes a la utilización del Servicio por cualquier tercero que emplee su cuenta hasta el momento en que, en su caso, el Usuario haya solicitado a la Compañía la baja. Por excepción a lo anterior, el Usuario no responderá de los gastos correspondientes a la utilización del Servicio por un tercero que emplee su cuenta cuando dicho empleo se deba a un error administrativo o de gestión de la Compañía o por otra razón sea imputable exclusivamente a la Compañía.<br>

    </p>


    <p class="h6 text-justify push-10">7.- Limitaciones del servicio<br>

    </p>

    <p class="text-justify push-10">La Compañía realiza sus mejores esfuerzos para que el Servicio esté disponible de 10 a 14 horas de lunes a viernes. Ello no obstante, la Compañía no garantiza la disponibilidad, continuidad ni, en general, el normal funcionamiento del Servicio en el caso de incidencias, interrupciones, o cualesquiera otras acciones u omisiones ajenas a la Compañía del Servicio, así como en el caso de deficiencias o fallos técnicos que impidan el normal funcionamiento de las redes involucradas en el Servicio y, en particular, en la red Internet.<br>

    </p>

    <p class="text-justify push-10">La Compañía limita su responsabilidad por los daños y perjuicios de cualquier naturaleza que puedan deberse a la falta de continuidad, interrupciones o deficiencias en la prestación del servicio no previstas en el párrafo anterior, al precio del servicio efectivamente pagado por el Usuario. La devolución del pago realizado por parte de la Compañía, eximirá a ésta de cualquier responsabilidad, en la medida permitida por ley aplicable de obligado cumplimiento.<br>
        La Compañía excluye cualquier responsabilidad derivada del servicio y, en particular, aunque no de forma exhaustiva, por la calidad, disponibilidad y continuidad en el funcionamiento, así como por defectos del mismo.
    </p>

    <p class="text-justify push-10">La Compañía no garantiza que los Usuarios utilicen el Servicio de conformidad con la ley, estas Condiciones, la moral y buenas costumbres generalmente aceptadas y el orden público, ni que lo hagan de forma diligente y prudente. La Compañía excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la utilización del servicio y al contenido introducido por los usuarios a través de las funcionalidades que el servicio pone a su disposición.<br>

    </p>

    <p class="text-justify push-10">En caso de incumplir el Usuario este Aviso Legal, cualquier licencia sobre Contenidos otorgada al mismo será resuelta de manera automática y la Compañía podrá, a su discreción, terminar y prohibir el acceso del Usuario a la Web y a los Servicios sin compensación.</p>

    <p class="h6 text-justify push-10">8.- Uso correcto de la Web, de los Contenidos Digitales y del Servicio</p>

    <p class="text-justify push-10">El Usuario se compromete a utilizar la Web, los Contenidos Digitales y el Servicio de conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden público. Del mismo modo el Usuario se obliga a no utilizar la página web, sus contenidos o los servicios que se presten a través de ésta con fines o efectos ilícitos o contrarios al contenido del presente Aviso Legal, lesivos de los intereses o derechos de terceros, o que de cualquier forma pueda dañar, inutilizar, hacer inaccesibles o deteriorar la página web, sus contenidos o sus servicios o impedir un normal disfrute de la misma por otros Usuarios.<br>

    </p>

    <p class="text-justify push-10">Asimismo, el Usuario se compromete expresamente a no destruir, alterar, inutilizar o, de cualquier otra forma, dañar los datos, programas o documentos electrónicos que se encuentren en la Web.<br>

    </p>

    <p class="text-justify push-10">El Usuario se compromete a no obstaculizar el acceso de otros Usuarios mediante el consumo masivo de los recursos informáticos a través de los cuales la Compañía presta el servicio, así como realizar acciones que dañen, interrumpan o generen errores en dichos sistemas o servicios.<br>

    </p>

    <p class="text-justify push-10">El Usuario se compromete a no introducir programas, virus, macros, applets, controles ActiveX o cualquier otro dispositivo lógico o secuencia de caracteres que causen o sean susceptibles de causar cualquier tipo de alteración en los sistemas informáticos de la Compañía o de terceros. Asimismo, la Compañía declina toda responsabilidad por cualquier interrupción de la Web que se pudiese producir por la actualización o mejora de la misma o por causas ajenas.<br>

    </p>

    <p class="text-justify push-10">El Usuario se compromete, dentro de los límites establecidos por las leyes de obligatorio cumplimiento, a</p>

    <ul class="text-justify push-10">

        <li>

            <p>utilizar el Servicio, única y exclusivamente, para fines personales y a abstenerse, en consecuencia, de utilizarlo con cualquier clase de finalidad comercial. </p>

        </li>

        <li><p>no permitir el uso de la Web con su datos de acceso a terceras personas</p>

        </li>

        <li>

            <p>no copiar los contenidos de la Web, los Contenidos Digitales o parte/s de los mismos de una forma no autorizada por este Aviso Legal.</p>

        </li>

        <li>

            <p>no transformar, distribuir, comunicar públicamente, traducir, descompilar o crear obras derivadas del contenido original de la Web, los Contenidos Digitales o parte/s de los mismos</p>

        </li>

        <li>

            <p>no vender, alquilar, realizar leasing, transferir, distribuir, difundir, o asignar derechos sobre los Contenidos Digitales y la Web a terceros</p>

        </li>

        <li>

            <p>no realizar respecto de los Contenidos Digitales o de la Web cualquier acción cuyo objetivo sea la modificación, o eliminación de cualquier información de gestión de derechos y medidas de protección contra actos ilícitos que los protejan</p>

        </li>

        <li>

            <p>no modificar y/o usar los Contenidos Digitales o el software de la Web de manera que pueda resultar una invasión de la privacidad de los usuarios u obtener información personal acerca de los mismos</p>

        </li>

        <li>

            <p>no copiar, modificar, borrar o dañar cualquier tipo de información contenida en los servidores usados para el control y/o funcionamiento de la Web</p>

        </li>

        <li>

            <p>no usar cualquier aplicación para la extracción de cualquier tipo de datos acerca de la Web ni su contenido.</p>

        </li>

        <li>

            <p>no proporcionar a la Compañía a través de Web datos u otra información en contravención de la legalidad vigente.</p>

        </li>

        <li>

            <p>no realizar ninguna actividad que pueda contravenir o facilitar directa o indirectamente la contravención de la legalidad vigente,</p>

        </li>

        <li>

            <p>no publicar servicios de directorios de enlaces que permiten la comunicación pública no autorizada de obras protegidas por derechos de autor (servidores eDonkey, trackers BitTorrent).</p>

        </li>

    </ul>

    <p class="text-justify push-10">La Compañía no tiene obligación de controlar y no controla el contenido y naturaleza de los mensajes y archivos transmitidos, difundidos o puestos a disposición de terceros por los Usuarios a través de la Web que no tengan su origen en el servidor de la Compañía, en particular, aquellos que puedan estar accesibles a través de los espacios proporcionados para interacción entre Usuarios. Ello no obstante, y dentro de los límites del ordenamiento jurídico vigente, la Compañía se reserva el derecho a revisar, en cualquier momento y sin previo aviso, por propia iniciativa o a petición de tercero, los contenidos transmitidos, difundidos o puestos a disposición de terceros por los Usuarios a través de la Web y a impedir su transmisión, difusión o puesta a disposición de terceros, en el caso de que resulten contrarios al ordenamiento jurídico o a lo dispuesto en este Aviso Legal.</p>

    <p class="h6 text-justify push-10">9.- Limitación y/o exclusión de garantías y de responsabilidad.</p>

    <p class="text-justify push-10">El Usuario es consciente de y acepta voluntariamente que el uso dela Web, los Contenidos Digitales y el Servicio tiene lugar, en todo caso, bajo su única y exclusiva responsabilidad.</p>

    <p class="text-justify push-10">El Usuario acepta que al utilizar el Servicio, podrá encontrar contenido que podría considerar ofensivo, indecente o censurable, cuyo contenido puede o no ser identificadas como de lenguaje explícito o de otras características. No obstante, el Usuario acepta usar el Servicio bajo su propio riesgo, y la Compañía no tendrá ninguna responsabilidad hacia el Usuario por el contenido que pueda encontrar que sea ofensivo, indecente u objetable. Los tipos de contenido (incluidos los géneros, subgéneros y categorías y subcategorías y similares) y las descripciones se proporcionan para la conveniencia, y el Usuario reconoce y acepta que la Compañía no garantiza su exactitud.</p>

    <p class="text-justify push-10">Si el Usuario no puede llevar a cabo las visualizaciones se ha de poner en contacto con la Compañía.<br>

    </p>

    <p class="text-justify push-10">Una vez que el Usuario ha contratado el Servicio, el mismo queda disponible para el Usuario y  éste tiene la responsabilidad de realizar el número de visualizaciones pactadas en el plazo establecido al efecto.</p>

    <p class="text-justify push-10">En general, el Contenido estará a disposición del Usuario durante el período de acceso, según sea el caso, pero puede llegar a ser indisponible debido a posibles restricciones de licencias de proveedor de contenido y por otras razones. La Compañía no será responsable ante el Usuario si alguno de los Contenidos Digitales de la Web no están más disponible para la visualización en streaming.</p>

    <p class="text-justify push-10">La Compañía no se responsabiliza del mal uso que se realice de las aplicaciones o de los contenidos de la Web, recayendo únicamente la responsabilidad el Usuario que haya realizado el mal uso.</p>

    <p class="text-justify push-10">La Compañía no asume responsabilidad alguna por la información contenida en la página web de terceros a los que se pueda acceder mediante enlaces (links) desde nuestra Web, o por la información contenida en páginas web de terceros vinculada de algún modo a esta Web.</p>

    <p class="text-justify push-10">De igual forma, la Compañía declina toda responsabilidad que se derive del intercambio de información entre usuarios a través de su página web. La responsabilidad de las manifestaciones difundidas en esta página web corresponde a quienes las realizan.Asimismo, la Compañía declina toda responsabilidad que se derive de la divulgación, puesta a disposición de terceros y/o descarga de cualquier contenido realizada por los usuarios, correspondiendo dicha responsabilidad a dicho usuario.<br>

        La Compañía cooperará, si es requerido por orden judicial o por las autoridades pertinentes, en la identificación de las personas responsables de aquellos usos que violen la ley.<br>

        <br>

        La Compañía se reserva el derecho a denegar o retirar el acceso a su Web, en cualquier momento y sin necesidad de preaviso, por iniciativa propia o a instancia de un tercero, a aquellos usuarios que violen la ley o que incumplan el presente &quot;Aviso Legal&quot; o la <a href="http://<?php echo $domain ?>/politica_privacidad.php">Política de Privacidad</a>.</p>

        <p class="text-justify push-10"> o bien vulneren los derechos existentes sobre los contenidos, productos y/o servicios de la presente web.<br>

        </p>

        <p class="h6 text-justify push-10">10.- Propiedad intelectual y licencia.</p>

        <span class="text-justify push-10"><br>

        </span>

        <p class="text-justify push-10">Todos los contenidos de la página Web, salvo que se indique lo contrario, son titularidad exclusiva de LA COMPAÑÍA y, con carácter enunciativo, que no limitativo, el diseño gráfico, código fuente, logos, textos, gráficos, ilustraciones, fotografías, y demás elementos que aparecen en la página Web.<br>

        </p>

        <p class="text-justify push-10">Igualmente, todos los nombres comerciales, marcas o signos distintivos de cualquier clase contenidos en la página Web están protegidos por la Ley.<br>

        </p>

        <p class="text-justify push-10">LA COMPAÑÍA no concede ningún tipo de licencia o autorización de uso personal al Usuario sobre sus derechos de propiedad intelectual e industrial o sobre cualquier otro derecho relacionado con su Web y los servicios ofrecidos en la misma.<br>

        </p>

        <p class="text-justify push-10">Queda prohibida la reproducción, distribución, comunicación pública, transformación y/o puesta a disposición del público de todo o parte de los Contenido Digitales de la Web y/o su contenido &nbsp;y diseños, marcas, nombres comerciales y diseños industriales, sin la previa autorización expresa de su legítimo titular.</p>

        <p class="text-justify push-10">Queda expresamente prohibida cualquier otra utilización, acceso, reproducción, distribución, comunicación pública, transformación, traducción, alquiler, venta, explotación comercial o puesta a disposición de terceras personas de ninguna forma, y especialmente en una red informática o a través de tecnologías de acceso remoto, de todo o de parte de los contenidos, productos y/o servicios incluidos en la presente web.<br>

            <br>

        </p>

        <p class="text-justify push-10">Por ello, el Usuario reconoce que la reproducción, distribución, comercialización, transformación, y en general, cualquier otra forma de explotación, por cualquier procedimiento, de todo o parte de los contenidos de esta página Web constituye una infracción de los derechos de propiedad intelectual y/o industrial de LA COMPAñíA o del titular de los mismos y dará lugar a las correspondientes responsabilidades legales.<br>

        </p>

        <p class="text-justify push-10">En caso de que detectes cualquier actividad susceptible de vulnerar algún derecho de propiedad intelectual, industrial o de cualquier tipo de derecho, te rogamos que nos lo comuniques a través del formulario de contacto, en el e-mail <a href="mailto:<?php echo $config->mail ?>"><?php echo $config->mail ?></a> </p>

        <span class="text-justify push-10"><br>

        </span>

        <p class="h6 text-justify push-10">11.- Publicidad.<br>

        </p>

        <p class="text-justify push-10">Parte de la Web puede albergar contenidos publicitarios o estar patrocinada. Los anunciantes y patrocinadores son los únicos responsables de asegurarse de que el material remitido para su inclusión en el sitio web cumple las leyes que en cada caso puedan ser de aplicación.<br>

        </p>

        <p class="text-justify push-10">la Compañía no será responsable de cualquier error, inexactitud o irregularidad que puedan incluir los contenidos publicitarios o de los patrocinadores. En todo caso, para interponer cualquier reclamación relacionada con los contenidos publicitarios insertados en este sitio web, pueden dirigirse a la siguiente dirección de correo electrónico: <a href="mailto:<?php echo $config->mail ?>"><?php echo $config->mail ?></a> .</p>

        <p class="h6 text-justify push-10">12.- Enlaces de terceros.<br>

        </p>

        <p class="text-justify push-10">El presente Aviso Legal se refiere únicamente a la Web y contenidos de la Compañía, y no se aplica a los enlaces o a las páginas web de terceros accesibles a través de la Web.</p>

        <p class="text-justify push-10">Los destinos de dichos enlaces no están bajo el control de la Compañía, y la Compañía no es responsable del contenido de ninguna de las páginas web de destino de un enlace, ni de ningún enlace incluido en una página web a la que se llegue desde la Web de la Compañía, ni de ningún cambio o actualización de dichas páginas.</p>

        <p class="text-justify push-10">Estos enlaces se proporcionan únicamente para informar al Usuario sobre la existencia de otras fuentes de información sobre un tema concreto, y la inclusión de un enlace no implica la aprobación de la página web enlazada por parte de la Compañía.<br>

        </p>

        <p class="h6 text-justify push-10">13.- Redes sociales.<br>

        </p>

        <p class="text-justify push-10">El usuario podrá unirse a los Grupos que la Compañía tiene en distintas redes sociales, así como en su propia Comunidad virtual.</p>

        <p class="text-justify push-10">El usuario que se haga fan de la Compañía, acepta las condiciones de uso y política de privacidad de la red social correspondiente.<br>

        </p>

        <p class="h6 text-justify push-10">14.- Protección de datos de carácter personal.<br>

        </p>

        <p class="text-justify push-10">La Compañía garantiza que el tratamiento de los datos personales de los Usuarios que se registren en la Web se realizará de conformidad con lo dispuesto en la Ley Orgánica 15/1999 de 13 de Diciembre sobre Protección de Datos de Carácter Personal, y en la Política de Privacidad</p>

        <p class="text-justify push-10">Es posible que el Usuario encuentres links, enlaces o banners en la Web que redireccionen al Usuario a otra página web, se consciente que, en este caso, te será de aplicación una política de privacidad distinta a la de la Compañía, por lo que recomendamos al Usuario que lea detenidamente dicha política de privacidad. Además en estas web es posible que se utilicen cookies u otras tecnologías con la finalidad de recabar tus datos. La Compañía no se hace responsable de los contenidos de las web a las que el usuario pueda ser redireccionado<br>

        </p>

        <p class="h6 text-justify push-10">15.- Cookies. Ver <a href="http://<?php echo $domain ?>/politica_cookies.php">Política de Cookies</a><br>

        </p>

        <p class="h6 text-justify push-10">16.- Termino de la relación contractual<br>

        </p>

        <p class="text-justify push-10">Este Aviso Legal es efectivo y vincula a las partes mientras se encuentren vigentes.<br>

            En caso de que el usuario no esté conforme con las mismas, y desee finalizar la presente relación contractual con la Compañía, éste deberá darse de baja en el apartado habilitado al efecto y abandonar la conexión de la Web. Además, para rescindir el presente Aviso Legal de forma efectiva, el usuario deberá eliminar y/o destruir los contenidos, programas y aplicaciones informáticas, copias e instalaciones de cualquier documentación, así como toda la documentación relacionada u obtenida a través de la esta Web, al margen de que estas actividades las haya llevado a cabo bajo el presente Aviso Legal.<br>

        </p>

        <p class="text-justify push-10">En caso de que la Compañía detecte que un Usuario infringe los derechos en general y/o los derechos derivados de la propiedad intelectual o industrial de ésta Web o de cualquiera de sus contenidos, la Compañía podrá rescindir inmediatamente estas condiciones con respecto al infractor, comunicárselo al legítimo titular de los derechos y/o iniciar las oportunas acciones judiciales contra el presunto infractor.<br>

        </p>

        <p class="h6 text-justify push-10">17.- Modificaciones y cancelación del Servicio.<br>

        </p>

        <p class="text-justify push-10">La Compañía se reserva el derecho de modificar unilateralmente, en cualquier momento y sin aviso previo, la presentación y configuración de la Web, los Contenidos Digitales y del Servicio, así como las condiciones requeridas para acceder y/o utilizar la Web y el Servicio, sin más requisito que su publicación en la URL de la Web y/o en el presente Aviso Legal.</p>

        <p class="text-justify push-10">Las características del Servicio podrán verse modificadas con la finalidad de adaptarlo a la evolución técnica, pudiendo introducirse variantes en el Servicio que segmenten el mercado o que incorporen nuevos servicios, así como cualquier mejora técnica que permita incorporar un mayor número de prestaciones, en aras de la mejora del Servicio.</p>

        <p class="text-justify push-10">La Compañía, por su parte, podrá modificar, cancelar y/o suspender, en cualquier momento, temporal o definitivamente, a iniciativa propia o a requerimiento de tercero, el acceso a la Web y al Servicio. La Compañía comunicará al Usuario la modificación, cancelación o la suspensión del Servicio con un plazo de diez (10) días de antelación respecto del día en que deba ser efectiva la modificación, cancelación o la suspensión, y de su derecho a resolver anticipadamente el Contrato sin penalización alguna en caso de no aceptación de las nuevas condiciones<br>

        </p>

        <p class="h6 text-justify push-10">18.- Ley Aplicable y Jurisdicción.<br>

        </p>

        <p class="text-justify push-10">Este Aviso Legal se rige por la ley española. En el supuesto de que surja cualquier conflicto o discrepancia en la interpretación o aplicación del presente Aviso Legal, los Juzgados y Tribunales que, en su caso, conocerán del asunto, serán los que disponga la normativa legal aplicable en materia de jurisdicción competente, en la que se atiende, tratándose de consumidores finales, al lugar del cumplimiento de la obligación o al del domicilio del consumidor, todo ello sin perjuicio de la facultad del Usuario de acudir a la Junta Arbitral de Consumo o de su demarcación.</p>

        <p class="text-justify push-10">En el caso de que se trate de una transacción realizada por una empresa, ambas partes se someten, con renuncia expresa a cualquier otro fuero, a los Juzgados y Tribunales de Madrid.</p>


        <p class="h6 text-justify push-10">19.- Servicio de atención al Usuario</p>

        <p class="text-justify push-10">Los Usuarios pueden solicitar la resolución de las reclamaciones, quejas e incidencias que plantearan. Deberán poner en conocimiento de la Compañía, a través del email <a href="mailto:<?php echo $config->mail ?>"><?php echo $config->mail ?></a>, aportando prueba de la identidad del reclamante, el contenido de la reclamación y la fecha en la que se interpusiere. Recibida por la Compañía la reclamación en cuestión, dentro del plazo al efecto establecido en la ley vigente, se procederá a su contestación.</p>
</div>
@endsection

@section('managerMozart')

@endsection