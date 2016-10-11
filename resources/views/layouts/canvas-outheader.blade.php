<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700|Roboto:300,400,500,700" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="<?php echo asset('canvas/css/bootstrap.css') ?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo asset('canvas/style.css') ?>" type="text/css" />

    <!-- One Page Module Specific Stylesheet -->
    <link rel="stylesheet" href="<?php echo asset('canvas/one-page/onepage.css') ?>" type="text/css" />
    <!-- / -->

    <link rel="stylesheet" href="<?php echo asset('canvas/css/dark.css') ?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo asset('canvas/css/font-icons.css') ?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo asset('canvas/one-page/css/et-line.css') ?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo asset('canvas/css/animate.css') ?>" type="text/css" />
    <link rel="stylesheet" href="<?php echo asset('canvas/css/magnific-popup.css') ?>" type="text/css" />

    <link rel="stylesheet" href="<?php echo asset('canvas/one-page/css/fonts.css') ?>" type="text/css" />

    <link rel="stylesheet" href="<?php echo asset('canvas/css/responsive.css') ?>" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--[if lt IE 9]>
        <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
    <![endif]-->

    <title>@yield('title')</title>

</head>

<body class="stretched" data-loader="11" data-loader-color="#543456">

    <div id="wrapper" class="clearfix">

        @yield('content')

    </div>
    
    <div id="gotoTop" class="icon-angle-up"></div>

    <script type="text/javascript" src="<?php echo asset('canvas/js/jquery.js'); ?>"></script>
    <script type="text/javascript" src="<?php echo asset('canvas/js/plugins.js'); ?>"></script>

    <script type="text/javascript" src="<?php echo asset('canvas/js/functions.js'); ?>"></script>

</body>
</html>