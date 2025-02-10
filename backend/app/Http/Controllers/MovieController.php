<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MovieController extends Controller
{
    private $movies = [
        [
            'id' => 1,
            'title' => 'Inception',
            'year' => 2010,
            'genre' => 'Sci-Fi',
            'cover' => 'https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
            'resume' => 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            'added_on' => '2024-02-01'
        ],
        [
            'id' => 2,
            'title' => 'The Matrix',
            'year' => 1999,
            'genre' => 'Action',
            'cover' => 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
            'resume' => 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
            'added_on' => '2024-02-02'
        ],
        [
            'id' => 3,
            'title' => 'Interstellar',
            'year' => 2014,
            'genre' => 'Sci-Fi',
            'cover' => 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            'resume' => 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            'added_on' => '2024-02-03'
        ]
    ];

    public function index()
    {
        return response()->json($this->movies);
    }

    public function show($id)
    {
        $movie = collect($this->movies)->firstWhere('id', (int)$id);

        if ($movie) {
            return response()->json($movie);
        }

        return response()->json(['message' => 'Movie not found'], 404);
    }
}
