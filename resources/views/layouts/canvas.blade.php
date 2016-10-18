<!DOCTYPE html>
<html dir="ltr" lang="es">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />

        <link href="http://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
        <link rel="stylesheet" href="{{ asset('canvas/css/bootstrap.css') }}" type="text/css" />
        <link rel="stylesheet" href="{{ asset('canvas/style.css') }}" type="text/css" />

        <!-- One Page Module Specific Stylesheet -->
        <link rel="stylesheet" href="{{ asset('canvas/css/swiper.css') }}" type="text/css" />
        <!-- / -->

        <link rel="stylesheet" href="{{ asset('canvas/css/dark.css') }}" type="text/css" />
        <link rel="stylesheet" href="{{ asset('canvas/css/font-icons.css') }}" type="text/css" />
        <link rel="stylesheet" href="{{ asset('canvas/css/animate.css') }}" type="text/css" />
        <link rel="stylesheet" href="{{ asset('canvas/css/magnific-popup.css') }}" type="text/css" />

        <link rel="stylesheet" href="{{ asset('canvas/css/responsive.css') }}" type="text/css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!--[if lt IE 9]>
            <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
        <![endif]-->

        <title>@yield('title')</title>
    </head>

    <body class="no-transition stretched side-header">

        <!-- Document Wrapper
        ============================================= -->
        <div id="wrapper" class="clearfix">

            <!-- Header
            ============================================= -->
            <header id="header" class="no-sticky">

                <div id="header-wrap">

                    <div class="container clearfix">

                        <div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

                        <!-- Logo
                        ============================================= -->
                        <div id="logo" class="nobottomborder">
                            <a href="{{url('/catalog')}}" class="standard-logo" data-dark-logo="{{ asset('/contents/logo.png')}}"><img src="{{ asset('/contents/logo.png')}}"></a>
                            <a href="{{url('/catalog')}}" class="retina-logo" data-dark-logo="{{ asset('/contents/logo.png')}}"><img src="{{ asset('/contents/logo.png')}}"></a>
                        </div><!-- #logo end -->

                        <!-- Primary Navigation
                        ============================================= -->
                        <nav id="primary-menu">

                            <ul>
                                <li {{{ (Request::is('/catalog') ? 'class=current' : '') }}}>
                                    <a href="{{url('/catalog')}}"><div>Home</div></a>
                                </li>
                                <li {{{ (Request::is('/catalog/football') ? 'class=current' : '') }}}><a href="{{url('/catalog/football')}}"><div>Fútbol</div></a>
                                    <ul>
                                        <li {{{ (Request::is('/catalog/leagues') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/leagues') }}"><div>Ligas</div></a> 
                                            <ul>
                                                @foreach ($leagues as $league)
                                                    <li {{{ (Request::is('/catalog/league/'.$league->name) ? 'class=current' : '') }}}>
                                                        <a href="{{ url('/catalog/league') }}/{{ $league->name }}" style="text-transform: capitalize;">
                                                            <div><img src="{{ $league->logo }}" style="width: 30px;" /> {{ $league->name }} </div>
                                                        </a> 
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li {{{ (Request::is('/catalog/music') ? 'class=current' : '') }}}>
                                    <a href="{{url('/catalog/music')}}"><div>Música</div></a>
                                </li>
                                <li {{{ (Request::is('/catalog/games') ? 'class=current' : '') }}}>
                                    <a href="{{url('/catalog/games')}}"><div>Juegos HTML5</div></a>
                                </li>
                                <li>
                                    <?php foreach ($newsCategories as $newCat): ?>
                                        <a href="{{ url('/catalog/news') }}/<?php echo str_replace(' ', '-', strtolower($newCat['name'])) ?>"><div><?php echo $newCat['name'] ?></div></a>
                                        <?php if (count($newCat['subCategories']) > 0 ): ?>
                                            <ul>
                                            <?php foreach ($newCat['subCategories'] as $subCat): ?>
                                                <li {{{ (Request::is('/catalog/'.$subCat['uri']) ? 'class=current' : '') }}}>
                                                    <a href="{{ url('/catalog/news') }}/<?php echo $subCat['uri'] ?>">
                                                        <div><?php echo $subCat['name'] ?></div>
                                                        <div class="circle-count">
                                                            <?php echo $subCat['count_posts'] ?>    
                                                        </div>
                                                    </a> 
                                                </li>
                                            <?php endforeach ?>
                                            </ul>
                                        <?php endif ?>
                                    <?php endforeach ?>
                                </li>
                                <li {{{ (Request::is('/catalog/wallpapers') ? 'class=current' : '') }}}>
                                    <a href="{{url('/catalog/wallpapers')}}"><div>Wallpapers</div></a>
                                    <ul>
                                        <li {{{ (Request::is('/catalog/wallpapers/pokemon') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/pokemon') }}">
                                                <div>pokemon</div>
                                            </a> 
                                        </li>
                                        <li {{{ (Request::is('/catalog/wallpapers/deportes') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/deportes') }}">
                                                <div>deportes</div>
                                            </a> 
                                        </li>
                                        <li {{{ (Request::is('/catalog/wallpapers/fondos') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/fondos') }}">
                                                <div>fondos</div>
                                            </a> 
                                        </li>
                                        <li {{{ (Request::is('/catalog/wallpapers/naturaleza') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/naturaleza') }}">
                                                <div>naturaleza</div>
                                            </a> 
                                        </li>
                                        <li {{{ (Request::is('/catalog/wallpapers/navidad') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/navidad') }}">
                                                <div>navidad</div>
                                            </a> 
                                        </li>
                                        <li {{{ (Request::is('/catalog/wallpapers/playa') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/playa') }}">
                                                <div>playa</div>
                                            </a> 
                                        </li>
                                        <li {{{ (Request::is('/catalog/wallpapers/superheroes') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/super heroes') }}">
                                                <div>super heroes</div>
                                            </a> 
                                        </li>
                                        <li {{{ (Request::is('/catalog/wallpapers/viajes') ? 'class=current' : '') }}}>
                                            <a href="{{ url('/catalog/wallpapers/viajes') }}">
                                                <div>viajes</div>
                                            </a> 
                                        </li>
                                    </ul>
                                </li>
                                <li class="log-out">
                                    <a href="{{ url('/exit') }}"><i class="fa fa-sign-out" aria-hidden="true"></i> Salir</a></ul>
                                </li>
                            </ul>

                        </nav><!-- #primary-menu end -->

                        <div class="clearfix visible-md visible-lg">
                            
                        </div>
                    </div>

                </div>

            </header><!-- #header end -->

            @yield('content')
            
            @include('frontend.footer')
        </div><!-- #wrapper end -->

        <!-- Go To Top
        ============================================= -->
        <div id="gotoTop" class="icon-angle-up"></div>

        @yield('scripts')

    </body>
</html>