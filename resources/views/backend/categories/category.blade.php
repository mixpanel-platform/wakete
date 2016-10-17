@extends('layouts.admin-master')


@section('externalScripts')
<link rel="stylesheet" href="{{asset('oneui/assets/js/plugins/summernote/summernote.min.css')}}">
<link rel="stylesheet" href="{{asset('oneui/assets/js/plugins/summernote/summernote-bs3.min.css')}}">
<link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css') }}">
<link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css') }}">
<link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/select2/select2.min.css') }}">
<link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/select2/select2-bootstrap.min.css') }}">
<link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/datatables/jquery.dataTables.min.css') }}">
@endsection

@section('content')
<div class="content bg-gray-lighter">
    <div class="row items-push">
        <div class="col-sm-7">
            <h1 class="page-heading">
                Categorías <small> Controla las categorías de las que disponemos en nuestro portal </small>
            </h1>
        </div>
        <div class="col-sm-5 text-right hidden-xs">
            <ol class="breadcrumb push-10-t">
                <li><a class="link-effect" href="{{ url('/admin/dashboard')}}">Admin</a></li>
                <li>Categorías</li>
            </ol>
        </div>
    </div>
</div>
<div class="content content-full bg-white">
	<div class="row">
	    <div class="col-md-12 push-30 push-t-30">
	        <div class="col-md-12">
	        	
	        	<div class="col-md-6">
	        		<div class="col-md-12  push-20" style="padding:0">
		                <h3 class="block-title font-s20 font-w700">Nuevas categorías</h3>
		            </div>
		            <form class="form-horizontal push-20-t" action="{{ url('/admin/category/create')}}" method="POST" >
		                <div class="form-group">
		                    <div class="col-sm-12">
		                        <div class="form-material">
		                            <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
		                            <input class="form-control" type="text" id="name" name="name" >
		                            <label for="name">Nombre</label>
		                        </div>
		                    </div>
		                </div>
		                <div class="form-group">
		                    <div class="col-sm-12">
		                        <div class="form-material">
                                     <?php $lastId = 0;?>
		                            <select class="js-select2 form-control" id="id_parent" name="id_parent" style="width: 100%;" data-placeholder="Seleccione una categoría">
                                        <option></option>
		                                <option value="none">Ninguna</option>
		                                <?php foreach ($categories as $category): ?>
		                                   <option value="<?php echo $category['id']; ?>">
		                                       <?php echo $category['name']; ?>
		                                   </option>
		                                   <?php $lastId = $category['id'];?>
		                                <?php endforeach ?>
		                            </select>
		                            <label for="id_parent">Categoría</label>
		                        </div>
		                        <div class="help-block text-right">Seleccione una categoría padre</div>
		                    </div>
		                </div>
		                <div class="form-group">
		                    <div class="col-sm-12 ">
		                    	<input type="hidden" name="id" value="<?php echo $lastId+1; ?>">
		                        <button class="btn btn-md btn-success" type="submit">Guardar</button>
		                    </div>
		                </div>
		            </form>
	        	</div>
	        	<div class="col-md-6">
                    <?php if (count($categories) > 0): ?>
        		    <div class="row">
        		        <!-- Dynamic Table Full -->
        		        <div class="block col-md-12">
        		            <div class="block-header">
        		                
        		            </div>
        		            <div class="block-content">
        		                <table class="table table-bordered table-striped js-dataTable-full table-header-bg">
        		                    <thead>
        		                        <tr>
        		                            <th class="text-center"></th>
        		                            <th class="text-center">id</th>
        		                            <th class="text-center">name</th>
        		                            <th class="text-center">tipo</th>
        		                            <th class="text-center">Creada</th>
        		                            <th class="text-center" style="width: 10%;">Acciones</th>
        		                        </tr>
        		                    </thead>
        		                    <tbody>
        		                    <?php foreach ($categories as $key => $category): ?>
        		                       <tr>
        		                       		<td></td>
        		                       		<td class="text-center">
        		                       			<?php echo $key+1; ?>
        		                       		</td>
        		                       		<td class="text-center">
        		                       			<?php echo $category['name']; ?>
        		                       		</td>
        		                       		<td class="text-center">
        		                       			<?php if ( $category['type']  == 'parent'): ?>
        		                       				<span class="label label-success">Padre</span>
        		                       			<?php else: ?>
        		                       				<span class="label label-primary">Subcategoría</span>
        		                       			<?php endif ?>
        		                       		</td>
        		                       		<td class="text-center">
        		                       			<?php echo $category['created']; ?>
        		                       		</td>
        		                       		<td class="text-center">
        		                       			<div class="btn-group">
                                                    <a href="{{ url('/admin/category/delete')}}/<?php echo $category['id'] ?>" class="btn btn-xs btn-danger" type="button" data-toggle="tooltip" title="" data-original-title="Remove Client"><i class="fa fa-times"></i></a href="">
                                                </div>
        		                       		</td>
        		                       </tr>
        		                    <?php endforeach ?>
        		                    </tbody>
        		                </table>

        		                
        		            </div>
        		        </div>
        		        <!-- END Dynamic Table Full -->
        		    </div> 
                    <?php else: ?>
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                            <h1 class="font-s48 font-w300 text-primary animated bounceInDown">Lo siento :(</h1>
                            <h2 class="h3 font-w300 push-50 animated fadeInUp">No hay categorías disponibles aún, puedes empezar a añadir referencias nuevas aquí mismo</h2>
                        </div>
                    </div>
                <?php endif ?>
	        	</div>
	        	
            </div>
	    </div>
	</div>
</div>
@endsection

@section('scripts')
    <link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css') }}">
    <link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css') }}">
    <link rel="stylesheet" href="{{ asset('/oneui/assets/js/plugins/datatables/jquery.dataTables.min.css') }}">

    <script src="{{ asset('/oneui/assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js')}}"></script>
    <script src="{{ asset('/oneui/assets/js/plugins/bootstrap-datetimepicker/moment.min.js')}}"></script>
    <script src="{{ asset('/oneui/assets/js/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js')}}"></script>
    <script src="{{ asset('/oneui/assets/js/plugins/jquery-auto-complete/jquery.auto-complete.min.js')}}"></script>
    <script src="{{ asset('/oneui/assets/js/plugins/select2/select2.full.min.js')}}"></script>


    <script src="{{ asset('/oneui/assets/js/pages/base_forms_pickers_more.js')}}"></script>
    <script src="{{ asset('/oneui/assets/js/plugins/datatables/jquery.dataTables.min.js')}}"></script>
    <script src="{{ asset('/oneui/assets/js/pages/base_tables_datatables.js')}}"></script>

    <script>
        jQuery(function () {
            // Init page helpers (BS Datepicker + BS Datetimepicker + BS Colorpicker + BS Maxlength + Select2 + Masked Input + Range Sliders + Tags Inputs plugins)
            App.initHelpers(['datepicker', 'datetimepicker', 'colorpicker', 'maxlength', 'select2', 'masked-inputs', 'rangeslider', 'tags-inputs']);
        });
    </script>
@endsection