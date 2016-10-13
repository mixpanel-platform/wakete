<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon ;
use App\Http\Requests;
use Curl;

class FootballController extends Controller
{
	public function index()
	{
        FrontController::autenthication();
		$dataLeagues = $this->getDataLeagues();
        $dataLiveMatchs = $this->getliveMatch();

        // echo "<pre>";
        // print_r($categories);
        // die();
        return view('frontend/football/index', [ 
                                                'leagues' => $dataLeagues, 
                                                'matchs' => $dataLiveMatchs,
                                                'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
	}

    public function leagues()
    {
        FrontController::autenthication();
        $dataLeagues = $this->getDataLeagues();
        return view('frontend/football/leagues', [ 
                                                    'leagues' => $dataLeagues,
                                                    'newsCategories' =>AdminController\CategoryController::getCategories()
                                                ]);
    }


    public function league($league_name)
    {

        FrontController::autenthication();
        $dataLeagues = $this->getDataLeagues();
        /* Cargamos los datos */
        foreach ($dataLeagues as $league) {
            if ( $league->name == $league_name ) {
                $id_league = $league->id;
                $actual_league_name = $league->name;
            }
        }

        /* -------------------------- PARTIDOS --------------------------*/
        $dataMatchs = $this->getDataMatchs($id_league);
        /* ------------------------ FIN PARTIDOS ------------------------*/

        return view('frontend/football/league', [
                                        'actual_league' => $actual_league_name,
                                        'leagues'       => $dataLeagues,
                                        'matchs'        => $dataMatchs,
                                        'round'         => $dataMatchs[0]->round,
                                        'newsCategories' =>AdminController\CategoryController::getCategories()
                                    ]);

    }

    public function round($league_name, $round)
    {
        FrontController::autenthication();
        /* -------------------------- LIGAS --------------------------*/
        $dataLeagues = $this->getDataLeagues();
        foreach ($dataLeagues as $league) {
            if ( $league->name == $league_name ) {
                $id_league = $league->id;
                $actual_league_name = $league->name;
            }
        }
        /* ------------------------ FIN LIGAS ------------------------*/

        /* -------------------------- PARTIDOS --------------------------*/
        $dataMatchs = $this->getDataMatchsByLeague($id_league, $round);
        /* ------------------------ FIN PARTIDOS ------------------------*/


        return view('frontend/football/league', [
                                        'actual_league' => $actual_league_name,
                                        'leagues'       => $dataLeagues,
                                        'matchs'        => $dataMatchs,
                                        'round'         => $dataMatchs[0]->round,
                                        'newsCategories' =>AdminController\CategoryController::getCategories()
                                    ]);

    }

    public function match($match_id)
    {
        FrontController::autenthication();
        /* -------------------------- LIGAS --------------------------*/
        $dataLeagues = $this->getDataLeagues();
        /* ------------------------ FIN LIGAS ------------------------*/
        /* -------------------------- PARTIDO --------------------------*/
        $matchs = $this->getDataMatchById($match_id);

        /*Fecha para lectura del partido*/
        Carbon::setLocale('es');
        $now = Carbon::now();
        $date =  Carbon::createFromFormat('Y-m-d H:i:s', $matchs->schedule);
        $diff = $date->diffForHumans($now);

        /* ------------------------ FIN PARTIDO ------------------------*/

        /* ------------------------ ORDENAMOS EVENTOS DEL PATIDO ------------------------*/

        $events = $this->getEventByDate($matchs);


        /* ---------------------- FIN ORDENAMOS EVENTOS DEL PATIDO ----------------------*/


        return view('frontend/football/match', [
                                        'match' => $matchs,
                                        'leagues' => $dataLeagues,
                                        'events' => $events,
                                        'dateMatch' => $diff,
                                        'newsCategories' =>AdminController\CategoryController::getCategories()
                                    ]);
    }

    public function team($league_name, $alias_team)
    {
        FrontController::autenthication();
        /* -------------------------- LIGAS --------------------------*/
        /* Obtenemos las ligas de fútbol */
        $leagues = $this->getDataLeagues();
        $dataLeagues = array();
        /* Cargamos los datos */
        foreach ($leagues as $league) {
            $dataLeagues[] = $league;
            if ( $league->name == $league_name ) {
                $id_league = $league->id;
                $actual_league_name = $league->name;
            }
        }
        /* ------------------------ FIN LIGAS ------------------------*/

        /* ---------------------- EQUIPOS POR LIGA ----------------------*/
        $teams = $this->getDataTeamsByleague($id_league);

        foreach ($teams[0] as $team) {
            if ($team->basealias == $alias_team) {
                $id_team = $team->id;
            }
        }
        /* ---------------------- EQUIPOS POR LIGA ----------------------*/

        /* ---------------------- EQUIPO ----------------------*/
        $squad = $this->getDataTeamById($id_team);

        /* ---------------------- EQUIPO ----------------------*/

        // echo "<pre>";
        // print_r($squad);
        // die();
        return view('frontend/football/team', [
                                        'leagues' => $dataLeagues,
                                        'team'    => $squad->team,
                                        'newsCategories' =>AdminController\CategoryController::getCategories()
                                    ]);
    }





    static function getDataLeagues()
    {
        /* -------------------------- LIGAS --------------------------*/
        /* Obtenemos las ligas de fútbol */
        $response = Curl::to('http://apiclient.resultados-futbol.com/scripts/api/api.php')
                ->withData( [
                                'tz'     => 'Europe/Madrid',
                                'format' => 'json',
                                'req'    => 'leagues',
                                'key'    => 'b215819c45e4b7dcc116ccc2351eb1c3',
                                'top' => 1
                                ] )
                ->get();
        /* Parseamos el resultado de las distintas ligas */
        $response = json_decode($response);
        $dataLeagues = array();
        /* Cargamos los datos */
        foreach ($response->league as $league) {
            $dataLeagues[] = $league;
        }
        /* ------------------------ FIN LIGAS ------------------------*/

        return $dataLeagues;
    }


    static function getDataMatchs($id_league)
    {
        $matchs = Curl::to('http://apiclient.resultados-futbol.com/scripts/api/api.php')
                ->withData( [
                                'tz'        => 'Europe/Madrid',
                                'format'    => 'json',
                                'req'       => 'matchs',
                                'key'       => 'b215819c45e4b7dcc116ccc2351eb1c3',
                                'league'    => $id_league,
                                'twolegged' => 1
                                ] )
                ->get();
        /* Parseamos el resultado de las distintas ligas */
        $matchs = json_decode($matchs);
        $dataMatchs = array();

        /* Cargamos los datos */
        Carbon::setLocale('es');
        $now = Carbon::now();
        foreach ($matchs->match as $match) {
            $dataMatchs[] = $match;
            $date =  Carbon::createFromFormat('Y-m-d H:i:s', $match->schedule);
            $diff = $date->diffForHumans($now);

            $match->schedule = $diff;
        }

        return $dataMatchs;
    }

    static function getDataMatchsByLeague($id_league, $round)
    {
       $matchs = Curl::to('http://apiclient.resultados-futbol.com/scripts/api/api.php')
               ->withData( [
                               'tz'        => 'Europe/Madrid',
                               'format'    => 'json',
                               'req'       => 'matchs',
                               'key'       => 'b215819c45e4b7dcc116ccc2351eb1c3',
                               'league'    => $id_league,
                               'round'    =>  $round,
                               'twolegged' => 1
                               ] )
               ->get();
       /* Parseamos el resultado de las distintas ligas */
       $matchs = json_decode($matchs);
       $dataMatchs = array();

       /* Cargamos los datos */
       foreach ($matchs->match as $match) {
           $dataMatchs[] = $match;
       }
       return $dataMatchs;

    }

    static function getDataMatchById($match_id)
    {
        $matchs = Curl::to('http://apiclient.resultados-futbol.com/scripts/api/api.php')
                ->withData( [
                                'tz'     => 'Europe/Madrid',
                                'format' => 'json',
                                'req'    => 'match',
                                'key'    => 'b215819c45e4b7dcc116ccc2351eb1c3',
                                'id'     => $match_id,
                                'language' => 'es'
                                ] )
                ->get();
        /* Parseamos el resultado de las distintas ligas */
        $matchs = json_decode($matchs);

        return $matchs;
    }


    static function getDataTeamsByleague($id_league)
    {
        $response = Curl::to('http://apiclient.resultados-futbol.com/scripts/api/api.php')
               ->withData( [
                               'tz'     => 'Europe/Madrid',
                               'format' => 'json',
                               'req'    => 'teams',
                               'key'    => 'b215819c45e4b7dcc116ccc2351eb1c3',
                               'league' => $id_league,
                               ] )
               ->get();
        /* Parseamos el resultado de las distintas ligas */
        $response = json_decode($response);

        $dataTeams = array();
        foreach ($response as $team) {
            $dataTeams[] = $team;
        }

        return $dataTeams;
    }


    static function getDataTeamById($id_team)
    {
        $response = Curl::to('http://apiclient.resultados-futbol.com/scripts/api/api.php')
               ->withData( [
                               'tz'     => 'Europe/Madrid',
                               'format' => 'json',
                               'req'    => 'team',
                               'key'    => 'b215819c45e4b7dcc116ccc2351eb1c3',
                               'id' => $id_team,
                               ] )
               ->get();
        /* Parseamos el resultado de las distintas ligas */
        $response = json_decode($response);

        return $response;

    }

    static function getliveMatch()
    {
        $response = Curl::to('http://apiclient.resultados-futbol.com/scripts/api/api.php')
               ->withData( [
                               'tz'     => 'Europe/Madrid',
                               'format' => 'json',
                               'req'    => 'livescore',
                               'key'    => 'b215819c45e4b7dcc116ccc2351eb1c3'
                               ] )
               ->get();
        /* Parseamos el resultado de las distintas ligas */
        $response = json_decode($response);
        $data = array();
        foreach ($response->matches as $key => $match) {
            if (!empty($match->live_minute)) {
                $data[] = $match;
            }
        }

        return $data;
    }


    static function getEventByDate($matchs)
    {
        $dataEvent = array();
        if (isset($matchs->events->cards)) {
            foreach ($matchs->events->cards as $event) {
                $dataEvent[] = $event;
            }
        }

        if (isset($matchs->events->changes)) {
            foreach ($matchs->events->changes as $change) {
                $dataEvent[] = $change;
            }
        }

        if (isset($matchs->events->others)) {
            foreach ($matchs->events->others as $other) {
                $dataEvent[] = $other;
            }
        }

        if (isset($matchs->events->occasions)) {
            foreach ($matchs->events->occasions as $occasion) {
                $dataEvent[] = $occasion;
            }
        }

        if (isset($matchs->events->goals)) {
            foreach ($matchs->events->goals as $goal) {
                $dataEvent[] = $goal;
            }
        }

        usort($dataEvent, function($a, $b){
            return strtotime($a->date) - strtotime($b->date);
        } );

        return $dataEvent;
    }


}
