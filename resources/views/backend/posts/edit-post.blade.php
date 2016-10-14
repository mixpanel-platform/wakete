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
	        <div class="col-md-12">
        		<div class="col-md-12  push-20" style="padding:0">
	                <h3 class="block-title font-s20 font-w700">Nuevo post</h3>
	            </div>
	            <form class="form-horizontal push-20-t" action="{{ url('/admin/posts/update')}}" method="post" >
	                <div class="form-group">
	                    <div class="col-sm-12">
	                        <div class="form-material">
	                            <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
	                            <input class="form-control" type="text" id="post_title" name="post_title"  required value="<?php echo $post['title'] ?>">
	                            <label for="post_title">Título</label>
	                        </div>
	                    </div>
	                </div>
	                <div class="form-group">
	                    <div class="col-sm-12">
	                        <div class="form-material">
	                            <select class="js-select2 form-control" id="id_category" name="id_category" style="width: 100%;" data-placeholder="Seleccione una categoría" required >
                                    <option></option>
	                                <?php foreach ($categories as $category): ?>
	                                	<?php 
	                                		if ($post['id_category'] == $category['id']) {
	                                			$selected = "selected";
	                                		}else{
	                                			$selected = "";
	                                		}
	                                	?>
	                                   <option value="<?php echo $category['id']; ?>" <?php echo $selected ?>>
	                                       <?php echo $category['name']; ?>
	                                   </option>
	                                <?php endforeach ?>
	                            </select>
	                            <label for="id_category">Categoría</label>
	                        </div>
	                        <div class="help-block text-right">Seleccione una categoría</div>
	                    </div>
	                </div>
	               <div class="form-group">
		               	<div class="col-xs-12">
	               			<textarea  id="content" class="js-summernote" name="content">
	               				
	               				<?php echo $post['content'] ?>
	               			</textarea>
		               	</div>
	               </div>
	                <div class="form-group">
	                    <div class="col-sm-12 ">
	                    	<input type="hidden" name="id_post" value="<?php echo $post['id'] ?>">
	                        <button class="btn btn-md btn-success" type="submit">Guardar</button>
	                    </div>
	                </div>
	            </form>
            </div>
	    </div>
	</div>
</div>
@endsection


@section('scripts')

	<script src="{{asset('oneui/assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js')}}"></script>

	<script src="{{asset('oneui/assets/js/plugins/select2/select2.full.min.js')}}"></script>

	<script src="{{asset('oneui/assets/js/plugins/summernote/summernote.min.js')}}"></script>
	<script src="{{asset('oneui/assets/js/plugins/ckeditor/ckeditor.js')}}"></script>
	<script>
	    jQuery(function () {
	        App.initHelpers(['datepicker', 'select2','summernote','ckeditor']);
	    });
	</script>
@endsection