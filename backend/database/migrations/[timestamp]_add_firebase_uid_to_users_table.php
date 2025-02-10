<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('users', 'firebase_uid')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('firebase_uid')->nullable()->unique()->after('id');
            });
        }
    }

    public function down()
    {
        if (DB::getDriverName() === 'sqlite') {
            // For SQLite, we need to recreate the table
            $tempTableName = 'users_temp';
            
            Schema::create($tempTableName, function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->rememberToken();
                $table->timestamps();
            });

            // Copy data
            DB::statement("INSERT INTO {$tempTableName} SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at FROM users");

            // Drop the original table
            Schema::drop('users');

            // Rename temp table to users
            Schema::rename($tempTableName, 'users');
        } else {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('firebase_uid');
            });
        }
    }
}; 