<!DOCTYPE html>
    <head>
        <meta charset="utf-8">

        <title>Admin</title>

        <meta name="description" content="Admin - New sponsor">
        <meta name="robots" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">


        <link rel="shortcut icon" href="{{ asset('/oneui/assets/img/favicons/favicon.png') }}">

        <link rel="icon" type="image/png" href="{{ asset('/oneui/assets/img/favicons/favicon-16x16.png') }}" sizes="16x16">
        <link rel="icon" type="image/png" href="{{ asset('/oneui/assets/img/favicons/favicon-32x32.png') }}" sizes="32x32">
        <link rel="icon" type="image/png" href="{{ asset('/oneui/assets/img/favicons/favicon-96x96.png') }}" sizes="96x96">
        <link rel="icon" type="image/png" href="{{ asset('/oneui/assets/img/favicons/favicon-160x160.png') }}" sizes="160x160">
        <link rel="icon" type="image/png" href="{{ asset('/oneui/assets/img/favicons/favicon-192x192.png') }}" sizes="192x192">

        <link rel="apple-touch-icon" sizes="57x57" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-57x57.png') }}">
        <link rel="apple-touch-icon" sizes="60x60" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-60x60.png') }}">
        <link rel="apple-touch-icon" sizes="72x72" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-72x72.png') }}">
        <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-76x76.png') }}">
        <link rel="apple-touch-icon" sizes="114x114" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-114x114.png') }}">
        <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-120x120.png') }}">
        <link rel="apple-touch-icon" sizes="144x144" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-144x144.png') }}">
        <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-152x152.png') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('/oneui/assets/img/favicons/apple-touch-icon-180x180.png') }}">

        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400italic,600,700%7COpen+Sans:300,400,400italic,600,700">

        <link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/slick/slick.min.css') }}">
        <link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/slick/slick-theme.min.css') }}">

        <link rel="stylesheet" href="{{ asset('/oneui/assets/css/bootstrap.min.css') }}">
        <link rel="stylesheet" id="css-main" href="{{ asset('/oneui/assets/css/oneui.css') }}">
        @yield('externalScripts')
    </head>
    <body>
       
        <div id="page-container" class="sidebar-l sidebar-o side-scroll header-navbar-fixed">            
            <nav id="sidebar">                
                <div id="sidebar-scroll">                                        
                    <div class="sidebar-content">                        
                        <div class="side-header side-content bg-white-op">                            
                            <button class="btn btn-link text-gray pull-right hidden-md hidden-lg" type="button" data-toggle="layout" data-action="sidebar_close">
                                <i class="fa fa-times"></i>
                            </button>
                            <a class="h5 text-white" href="index.html">
                                <i class="fa fa-circle-o-notch text-primary"></i> <span class="h4 font-w300 sidebar-mini-hide">Admin</span>
                            </a>
                        </div>                        
                        
                        <div class="side-content">
                            <ul class="nav-main">
                                <li>
                                    <a href="{{ url('/admin/dashboard') }}" {{{ (Request::is('/admin/dashboard') ? 'class=open' : '') }}}>
                                        <i class="si si-speedometer"></i><span class="sidebar-mini-hide">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{ url('/admin/category') }}" {{{ (Request::is('/admin/category') ? 'class=open' : '') }}}>
                                        <i class="si si-rocket"></i><span class="sidebar-mini-hide">Categorías</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="nav-submenu" data-toggle="nav-submenu" href="#"><i class="si si-bag"></i><span class="sidebar-mini-hide">Noticias</span></a>
                                    <ul>
                                        <li>
                                            <a href="{{ url('/admin/posts') }}" {{{ (Request::is('/admin/posts') ? 'class=active' : '') }}}>
                                                <span class="sidebar-mini-hide">Listado artículos</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="{{ url('/admin/posts/new') }}" {{{ (Request::is('/admin/posts/new') ? 'class=active' : '') }}}>
                                                <span class="sidebar-mini-hide">Nuevo artículos</span>
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </li>
                                <li  class="text-danger">
                                    <a tabindex="-1" href="{{ url('/logout') }}" alt="Salir" class="text-danger" style="color: #d26a5c;">
                                        <i class="fa fa-btn fa-sign-out"></i>  Salir ({{ Auth::user()->name }})<!-- -->
                                    </a>
                                </li>
                            </ul>
                        </div>                        
                    </div>                    
                </div>                
            </nav>            
            
            <header id="header-navbar" class="content-mini content-mini-full">                
                <ul class="nav-header pull-right">
                   
                </ul>                
                
                <ul class="nav-header pull-left">
                    <li class="hidden-md hidden-lg">                        
                        <button class="btn btn-default" data-toggle="layout" data-action="sidebar_toggle" type="button">
                            <i class="fa fa-navicon"></i>
                        </button>
                    </li>
                    <li class="hidden-xs hidden-sm">                        
                        <button class="btn btn-default" data-toggle="layout" data-action="sidebar_mini_toggle" type="button">
                            <i class="fa fa-ellipsis-v"></i>
                        </button>
                    </li>
                </ul>                
            </header>            


            <main id="main-container" >
                    @yield('content')
            </main>

            <footer id="page-footer" class="content-mini content-mini-full font-s12 bg-gray-lighter clearfix">
                <div class="content content-boxed">
                    <div class="pull-right">
                        Creado por <a class="font-w600" href="http://www.natibes.com" target="_blank">Natibes</a>
                    </div>
                    <div class="pull-left">
                        <a class="font-w600" href="/admin">NewSponsor</a> &copy; <span class="js-year-copy"></span>
                    </div>  
                </div>
                
            </footer>
        </div>

        <script src="{{ asset('oneui/assets/js/core/jquery.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/core/bootstrap.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/core/jquery.slimscroll.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/core/jquery.scrollLock.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/core/jquery.appear.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/core/jquery.countTo.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/core/jquery.placeholder.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/core/js.cookie.min.js') }}"></script>
        <script src="{{ asset('oneui/assets/js/app.js') }}"></script>

        @yield('scripts')
    </body>
</html>