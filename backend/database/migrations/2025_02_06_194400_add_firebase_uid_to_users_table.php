<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFirebaseUidToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('firebase_uid')->nullable()->unique()->after('id');
        });
    }

    public function down()
    {
        if (Schema::hasColumn('users', 'firebase_uid')) {
            if (DB::getDriverName() === 'sqlite') {
                // SQLite does not support dropColumn, so we need to recreate the table
                Schema::table('users', function (Blueprint $table) {
                    $table->dropUnique(['firebase_uid']);
                });
    
                $tempTableName = 'users_temp';
    
                // Create a new table without the firebase_uid column
                Schema::create($tempTableName, function (Blueprint $table) {
                    $table->id();
                    $table->string('name');
                    $table->string('email')->unique();
                    $table->timestamp('email_verified_at')->nullable();
                    $table->string('password');
                    $table->rememberToken();
                    $table->timestamps();
                });
    
                // Copy data from old table to the new table
                DB::statement("INSERT INTO $tempTableName (id, name, email, email_verified_at, password, remember_token, created_at, updated_at)
                               SELECT id, name, email, email_verified_at, password, remember_token, created_at, updated_at FROM users");
    
                // Drop the old table and rename the new one
                Schema::drop('users');
                Schema::rename($tempTableName, 'users');
            } else {
                // For other databases
                Schema::table('users', function (Blueprint $table) {
                    $table->dropUnique(['firebase_uid']);
                    $table->dropColumn('firebase_uid');
                });
            }
        }
    }
}