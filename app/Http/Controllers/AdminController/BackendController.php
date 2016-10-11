<?php

namespace App\Http\Controllers\AdminController;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class BackendController extends Controller
{
	public function dashboard()
	{
		return view('backend/dashboard');
	}
    public function login()
    {
        return view('backend/login');
    }

    public function register()
    {
        return view('backend/register');
    }
}
