@extends('layouts.admin-master')

@section('content')
<div class="content bg-gray-lighter">
    <div class="row items-push">
        <div class="col-sm-7">
            <h1 class="page-heading">
                Noticias <small> inserta nuevas noticias para las distintas categorias </small>
            </h1>
        </div>
        <div class="col-sm-5 text-right hidden-xs">
            <ol class="breadcrumb push-10-t">
                <li><a class="link-effect" href="{{ url('/admin/dashboard')}}">Admin</a></li>
                <li>Noticias</li>
            </ol>
        </div>
    </div>
</div>
<div class="content content-boxed bg-white">
	<div class="row">
	    <div class="col-md-12 push-30 push-t-30">
	    	<div class="col-xs-12">
	    		<div class="col-sm-6 col-md-3">
                    <a class="block block-link-hover3 text-center" href="{{url('/admin/posts/new')}}">
                        <div class="block-content block-content-full">
                            <div class="h1 font-w700 text-success"><i class="fa fa-plus"></i></div>
                        </div>
                        <div class="block-content block-content-full block-content-mini bg-gray-lighter text-success font-w600">Añadir nueva noticia</div>
                    </a>
                </div>
	    	</div>
	        <div class="col-md-12">
			    <div class="row">
			        <!-- Dynamic Table Full -->
			        <div class="block col-md-12">
			            <div class="block-content">
			                <table class="table table-bordered table-striped js-dataTable-full table-header-bg">
			                    <thead>
			                        <tr>
			                            <th class="text-center">id</th>
			                            <th class="text-center">imagen</th>
			                            <th class="text-center">titulo</th>
			                            <th class="text-center">categoría</th>
			                            <th class="text-center">URL</th>
			                            <th class="text-center">Creada</th>
			                            <th class="text-center" style="width: 10%;">Acciones</th>
			                        </tr>
			                    </thead>
			                    <tbody>
			                    <?php foreach ($posts as $key => $post): ?>
			                       <tr>
			                       		<td class="text-center"> 
			                       			<?php echo $key+1; ?>
			                       		</td>
			                       		<td class="text-center">
			                       			<img src="<?php echo asset($post['img_post']); ?>" class="img-responsive" style="width: 60px;" aling="middle">
			                       		</td> 
			                       		<td class="text-center">
			                       			<?php echo $post['title']; ?>
			                       		</td>
			                       		<td class="text-center">
			                       			<?php echo $post['category']['name']; ?>
			                       		</td>
			                       		<td class="text-center">
			                       			<a href="https://wakete.com/catalog/article/<?php echo $post['uri']; ?>" target="_blank">
			                       				https://wakete.com/catalog/article/<?php echo $post['uri']; ?>
			                       			</a>
			                       		</td>
			                       		<td class="text-center">
			                       			<?php echo $post['created']; ?>
			                       		</td>
			                       		<td class="text-center">
			                       			<div class="btn-group">
			                       				<a href="{{ url('/admin/posts/update')}}/<?php echo $post['id'] ?>" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" title="" data-original-title="Editar articulo"><i class="fa fa-pencil"></i></a>
	                                            <a href="{{ url('/admin/posts/delete')}}/<?php echo $post['id'] ?>" class="btn btn-xs btn-danger" type="button" data-toggle="tooltip" title="" data-original-title="Eliminar articulo"><i class="fa fa-times"></i></a>
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